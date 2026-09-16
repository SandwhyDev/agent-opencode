import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { saveImages, imageUrls } from './save-generated-images.mjs';

const png = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aF1sAAAAASUVORK5CYII=', 'base64');
test('recognizes Pixazo outputs and waits for completed jobs', () => {
  assert.deepEqual(imageUrls({ output: 'https://example.com/a' }), ['https://example.com/a']);
  assert.deepEqual(imageUrls({ imageUrl: 'https://example.com/a' }), ['https://example.com/a']);
  assert.deepEqual(imageUrls({ status: 'QUEUED', output: 'https://example.com/a' }), []);
  assert.deepEqual(imageUrls({ status: 'COMPLETED', output: { media_url: ['a', 'a', 'b'] } }), ['a', 'b']);
});
test('saves original bytes with actual format, no credentials and no overwrite', async () => {
  const dir = await mkdtemp(path.join(tmpdir(), 'image-save-'));
  try {
    const fetchImage = async (url, options) => {
      assert.equal(options.headers, undefined);
      assert.equal(options.redirect, 'error');
      return new Response(png);
    };
    const result = { output: 'https://example.com/image.jpg' };
    const first = await saveImages(result, dir, '../luna', fetchImage);
    const second = await saveImages(result, dir, '../luna', fetchImage);
    assert.equal(first.image_status, 'saved');
    assert.match(first.image_files[0], /\.png$/);
    assert.equal(path.dirname(first.image_files[0]), dir);
    assert.notEqual(first.image_files[0], second.image_files[0]);
    assert.deepEqual(await readFile(first.image_files[0]), png);
  } finally { await rm(dir, { recursive: true, force: true }); }
});
test('reports download failure without submitting generation or saving HTML', async () => {
  const result = await saveImages({ output: 'https://example.com/a' }, tmpdir(), 'x', async () => new Response('<html>error</html>'));
  assert.equal(result.image_status, 'download-failed');
  assert.equal(result.image_files.length, 0);
  const invalid = await saveImages({ output: 'file:///secret' }, tmpdir(), 'x', () => assert.fail('must not fetch'));
  assert.equal(invalid.download_errors.length, 1);
});
