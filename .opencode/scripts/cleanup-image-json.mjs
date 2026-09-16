import { readFile, realpath, unlink, lstat } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';

export const digest = text => createHash('sha256').update(text).digest('hex');

// Only delete the exact JSON versions associated with a fully saved result.
export async function cleanupJson(saved, entries, root = path.resolve('generated-images')) {
  const deleted_json = [], cleanup_errors = [];
  if (saved.image_status !== 'saved' || !saved.image_files.length || saved.download_errors.length) return { deleted_json, cleanup_errors };
  const actualRoot = await realpath(root);
  for (const entry of entries) {
    if (!entry?.file || !entry.sha256) continue;
    try {
      const file = path.resolve(entry.file);
      if ((await lstat(file)).isSymbolicLink()) continue;
      const target = await realpath(file);
      const relative = path.relative(actualRoot, target);
      if (!relative || relative.startsWith('..') || path.isAbsolute(relative) || path.extname(target) !== '.json') continue;
      if (digest(await readFile(target, 'utf8')) !== entry.sha256) continue;
      await unlink(target);
      deleted_json.push(target);
    } catch (error) {
      if (error.code !== 'ENOENT') cleanup_errors.push({ file: entry.file, error: error.message });
    }
  }
  return { deleted_json, cleanup_errors };
}
