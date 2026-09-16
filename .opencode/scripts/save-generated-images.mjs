import { mkdir, writeFile } from 'node:fs/promises';
import { randomUUID } from 'node:crypto';
import path from 'node:path';

export function imageUrls(result) {
  if (result.status && !['COMPLETED', 'SUCCESS', 'SUCCEEDED'].includes(String(result.status).toUpperCase())) return [];
  const value = result.imageUrl ?? result.output?.media_url ?? result.output;
  return [...new Set((Array.isArray(value) ? value : [value]).filter(item => typeof item === 'string' && item))];
}

function extension(bytes) {
  if (bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))) return '.png';
  if (bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255) return '.jpg';
  if (bytes.toString('ascii', 0, 4) === 'RIFF' && bytes.toString('ascii', 8, 12) === 'WEBP') return '.webp';
  throw new Error('Response is not a supported PNG, JPEG or WebP image.');
}

export async function saveImages(result, directory, name = 'image', fetchImpl = fetch) {
  const files = [], errors = [];
  const urls = imageUrls(result);
  const stem = name.replace(/[^a-zA-Z0-9_-]/g, '-').slice(0, 80) || 'image';
  for (const [index, value] of urls.entries()) {
    try {
      const url = new URL(value);
      if (url.protocol !== 'https:' || url.username || url.password) throw new Error('Image URL must use HTTPS without credentials.');
      // Never forward the API subscription key to image storage or follow redirects.
      const response = await fetchImpl(url.href, { redirect: 'error', signal: AbortSignal.timeout(60000) });
      if (!response.ok) throw new Error(`Image download HTTP ${response.status}.`);
      const maxBytes = 32 * 1024 * 1024;
      if (Number(response.headers.get('content-length')) > maxBytes) {
        await response.body?.cancel();
        throw new Error('Image exceeds 32 MB.');
      }
      if (!response.body) throw new Error('Empty image response.');
      const chunks = [];
      let size = 0;
      for await (const chunk of response.body) {
        size += chunk.length;
        if (size > maxBytes) throw new Error('Image exceeds 32 MB.');
        chunks.push(chunk);
      }
      const bytes = Buffer.concat(chunks);
      const ext = extension(bytes);
      await mkdir(directory, { recursive: true });
      const file = path.resolve(directory, `${stem}-${randomUUID()}${ext}`);
      await writeFile(file, bytes, { flag: 'wx' });
      files.push(file);
    } catch (error) {
      const detail = error.cause?.code === 'CERT_HAS_EXPIRED'
        ? 'TLS certificate has expired. Check system time/certificate chain; TLS verification was not disabled.'
        : error.message;
      errors.push({ image: index + 1, error: detail });
    }
  }
  return { image_files: files, download_errors: errors,
    image_status: errors.length ? 'download-failed' : files.length ? 'saved' : 'no-image-ready' };
}
