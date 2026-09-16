import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, writeFile, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { cleanupJson, digest } from './cleanup-image-json.mjs';

test('cleanup removes only matching JSON after complete save, preserves changed files and images', async () => {
  const root = await mkdtemp(path.join(tmpdir(), 'json-cleanup-'));
  try {
    const request = path.join(root, 'request.json'), response = path.join(root, 'response.json'), image = path.join(root, 'luna.png');
    await writeFile(request, 'updated'); await writeFile(response, '{}'); await writeFile(image, 'image');
    const saved = { image_status: 'saved', image_files: [image], download_errors: [] };
    const entries = [{ file: request, sha256: digest('original') }, { file: response, sha256: digest('{}') }, { file: image, sha256: digest('image') }];
    for (const status of ['download-failed', 'no-image-ready']) {
      assert.deepEqual((await cleanupJson({ ...saved, image_status: status }, entries, root)).deleted_json, []);
    }
    const result = await cleanupJson(saved, entries, root);
    assert.deepEqual(result.deleted_json, [response]);
    assert.equal(await readFile(request, 'utf8'), 'updated');
    assert.equal(await readFile(image, 'utf8'), 'image');
    await assert.rejects(readFile(response), { code: 'ENOENT' });
  } finally { await rm(root, { recursive: true, force: true }); }
});
