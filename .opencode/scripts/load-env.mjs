import { readFile } from 'node:fs/promises';

// Load only the credential this application uses. Never evaluate shell syntax.
export async function loadPixazoEnv(file = new URL('../../.env', import.meta.url), env = process.env) {
  let text;
  try { text = await readFile(file, 'utf8'); }
  catch (error) { if (error.code === 'ENOENT') return; throw error; }
  const line = text.replace(/^\uFEFF/, '').split(/\r?\n/).find(line => /^\s*(?:export\s+)?PIXAZO_API_KEY\s*=/.test(line));
  if (!line) return;
  const raw = line.slice(line.indexOf('=') + 1).trim();
  let value;
  if (raw.startsWith('"') || raw.startsWith("'")) {
    const end = raw.indexOf(raw[0], 1);
    if (end < 0 || !/^\s*(?:#.*)?$/.test(raw.slice(end + 1))) throw new Error('Invalid PIXAZO_API_KEY syntax in .env. Use one single-line value.');
    value = raw.slice(1, end).trim();
  } else value = raw.split('#')[0].trim();
  // A non-empty local value takes priority so editing .env takes effect immediately.
  if (value) env.PIXAZO_API_KEY = value;
}
