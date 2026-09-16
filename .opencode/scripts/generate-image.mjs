import { readFile, writeFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { saveImages } from './save-generated-images.mjs';
import { cleanupJson, digest } from './cleanup-image-json.mjs';

export const inpaintEndpoint = 'https://gateway.pixazo.ai/inpainting/v1/getImage';

export const endpoint = 'https://gateway.pixazo.ai/flux-1-schnell/v1/getData';

export async function prepareRequest(input, loadProfile = slug => readFile(new URL(`../../characters/${slug}.md`, import.meta.url), 'utf8')) {
  if (!input.character) return input;
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(input.character)) throw new Error('Invalid character identifier.');
  if (input.prompt !== undefined) throw new Error('Character requests use scene, not prompt.');
  if (typeof input.scene !== 'string' || !input.scene.trim()) throw new Error('A non-empty scene is required.');
  const profile = await loadProfile(input.character);
  const identity = profile.match(/<!-- identity:start -->([\s\S]*?)<!-- identity:end -->/)?.[1].trim();
  const settingsText = profile.match(/<!-- settings:start -->\s*```json\s*([\s\S]*?)```\s*<!-- settings:end -->/)?.[1];
  if (!identity || !settingsText) throw new Error('Character profile requires identity and settings blocks.');
  const settings = JSON.parse(settingsText);
  for (const field of ['seed', 'width', 'height', 'num_steps', 'guidance_scale']) {
    if (settings[field] === undefined) throw new Error(`Missing character setting: ${field}.`);
    if (input[field] !== undefined && input[field] !== settings[field]) throw new Error(`Character setting ${field} is locked in the profile.`);
  }
  const reference = profile.match(/<!-- reference-url:start -->\s*(https:\/\/\S+)\s*<!-- reference-url:end -->/)?.[1];
  if (!reference) throw new Error('Character needs a canonical public reference URL; no text-only fallback.');
  if (input.allow_paid || (input.mode && input.mode !== 'inpaint')) throw new Error('Only free inpainting is enabled for characters.');
  if (!input.mask_url) throw new Error('A public mask_url is required for explicit inpainting requests. The local mask tool has been removed; consistent pose generation is not supported.');
  return { mode: 'inpaint', prompt: `${input.scene.trim()} Match the supplied character image: same smooth delicate fur, same rendering style, colors and lighting. Change only the white masked area.`,
    imageUrl: reference, maskUrl: input.mask_url, negative_prompt: 'coarse fur, plush toy fibers, different character, redesigned face, different art style, text, watermark',
    num_steps: settings.num_steps, guidance: settings.guidance_scale, seed: settings.seed };


}

export function makeBody(input) {
  if (typeof input?.prompt !== 'string' || !input.prompt.trim()) {
    throw new Error('A non-empty prompt is required.');
  }
  const body = { prompt: input.prompt.trim(), height: input.height ?? 1024,
    width: input.width ?? 1024, num_steps: input.num_steps ?? 20,
    guidance_scale: input.guidance_scale ?? 5, seed: input.seed ?? 40 };
  for (const field of ['height', 'width', 'num_steps']) {
    if (!Number.isInteger(body[field]) || body[field] <= 0) throw new Error(`Invalid ${field}.`);
  }
  if (!Number.isSafeInteger(body.seed) || body.seed < 0) throw new Error('Invalid seed.');
  if (!Number.isFinite(body.guidance_scale) || body.guidance_scale < 0) throw new Error('Invalid guidance_scale.');
  return body;
}

export async function generate(input, key, fetchImpl = fetch) {
  if (!key?.trim()) throw new Error('Set PIXAZO_API_KEY before launching OpenCode.');
  if (input.allow_paid || (input.mode && input.mode !== 'inpaint')) throw new Error('Paid or unknown modes are disabled.');
  const inpaint = input.mode === 'inpaint';
  let body;
  if (inpaint) {
    if (typeof input.prompt !== 'string' || !input.prompt.trim()) throw new Error('Edit prompt is required.');
    for (const field of ['imageUrl', 'maskUrl']) {
      let url;
      try { url = new URL(input[field]); } catch { throw new Error(`A public HTTPS ${field} is required.`); }
      if (url.protocol !== 'https:' || url.username || url.password) throw new Error(`A public HTTPS ${field} is required.`);
    }
    const numeric = makeBody({ prompt: input.prompt, num_steps: input.num_steps, guidance_scale: input.guidance, seed: input.seed });
    if (numeric.num_steps > 20) throw new Error('Inpainting supports at most 20 steps.');
    body = { prompt: numeric.prompt, imageUrl: input.imageUrl, maskUrl: input.maskUrl,
      negative_prompt: input.negative_prompt ?? '', num_steps: numeric.num_steps,
      guidance: numeric.guidance_scale, seed: numeric.seed };
    // Omit width/height: preserve source sizing rather than force square output.
  } else {
    if (input.image_urls || input.imageUrl || input.maskUrl || input.character) throw new Error('Reference input requires prepared inpaint mode; refusing text-only fallback.');
    body = makeBody(input);
  }
  let response;
  try {
    response = await fetchImpl(inpaint ? inpaintEndpoint : endpoint, { method: 'POST', redirect: 'error',
      headers: { 'Content-Type': 'application/json', 'Ocp-Apim-Subscription-Key': key.trim() },
      body: JSON.stringify(body), signal: AbortSignal.timeout(180000) });
  } catch {
    throw new Error('Network failure or timeout. Generation status is unknown; no automatic retry was made.');
  }
  if (!response.ok) throw new Error(`Pixazo HTTP ${response.status}; no automatic retry was made.`);
  try { return await response.json(); }
  catch { throw new Error('Pixazo returned a non-JSON response; image status is unverified.'); }
}

export async function getStatus(requestId, key, fetchImpl = fetch) {
  if (!key?.trim()) throw new Error('Set PIXAZO_API_KEY.');
  if (!/^[a-zA-Z0-9_-]+$/.test(requestId)) throw new Error('Invalid request ID.');
  const response = await fetchImpl(`https://gateway.pixazo.ai/v2/requests/status/${requestId}`, {
    redirect: 'error', headers: { 'Ocp-Apim-Subscription-Key': key.trim() }, signal: AbortSignal.timeout(30000)
  });
  if (!response.ok) throw new Error(`Pixazo status HTTP ${response.status}.`);
  return response.json();
}

async function main() {
  if (process.argv[2] === '--download') {
    if (process.argv.length !== 4) throw new Error('Usage: --download <saved-response.json>');
    const responseFile = process.argv[3];
    const raw = await readFile(responseFile, 'utf8');
    const result = JSON.parse(raw);
    const saved = await saveImages(result, path.resolve('generated-images'), path.basename(responseFile, '.json'));
    const cleanup = await cleanupJson(saved, [result._local_request, { file: responseFile, sha256: digest(raw) }]);
    console.log(JSON.stringify({ ...saved, ...cleanup }));
    if (saved.download_errors.length) process.exitCode = 1;
    return;
  }
  if (process.argv[2] === '--status') {
    const key = process.env.PIXAZO_API_KEY;
    try {
      const result = await getStatus(process.argv[3] ?? '', key);
      const saved = await saveImages(result, path.resolve('generated-images'), process.argv[3]);
      const entries = [];
      if (saved.image_status === 'saved') {
        for (const name of await readdir('generated-images')) {
          if (!name.endsWith('.response.json')) continue;
          const file = path.resolve('generated-images', name);
          try {
            const raw = await readFile(file, 'utf8');
            const previous = JSON.parse(raw);
            if (previous.request_id === process.argv[3]) entries.push(previous._local_request, { file, sha256: digest(raw) });
          } catch { /* Unrelated or unreadable JSON is never removed. */ }
        }
      }
      const cleanup = await cleanupJson(saved, entries);
      console.log(JSON.stringify({ ...result, ...saved, ...cleanup }).split(key.trim()).join('[REDACTED]'));
      if (saved.download_errors.length) process.exitCode = 1;
    } catch { throw new Error('Status lookup failed. Keep the saved request ID; do not resubmit generation.'); }
    return;
  }
  const file = process.argv[2];
  if (!file || process.argv.length !== 3) throw new Error('Usage: node .opencode/scripts/generate-image.mjs generated-images/<request>.json');
  const requestText = await readFile(file, 'utf8');
  const input = await prepareRequest(JSON.parse(requestText));
  const key = process.env.PIXAZO_API_KEY;
  const result = await generate(input, key);
  // Avoid overwriting previous generations, and never persist an echoed credential.
  const output = path.join(path.dirname(file), `${path.basename(file, '.json')}.${Date.now()}.response.json`);
  const requestEntry = { file: path.resolve(file), sha256: digest(requestText) };
  const serialized = JSON.stringify({ ...result, _local_request: requestEntry }, null, 2).split(key.trim()).join('[REDACTED]');
  await writeFile(output, serialized + '\n', { flag: 'wx' });
  const saved = await saveImages(result, path.resolve('generated-images'), path.basename(file, '.json'));
  const cleanup = await cleanupJson(saved, [requestEntry, { file: output, sha256: digest(serialized + '\n') }]);
  console.log(JSON.stringify({ response_file: cleanup.deleted_json.includes(path.resolve(output)) ? null : path.resolve(output), status: 'response-received', ...saved, ...cleanup }));
  if (saved.download_errors.length) process.exitCode = 1;
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  main().catch(error => { console.error(error.message); process.exitCode = 1; });
}
