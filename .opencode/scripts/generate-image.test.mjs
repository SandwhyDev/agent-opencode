import test from 'node:test';
import assert from 'node:assert/strict';
import { generate, endpoint, makeBody, prepareRequest, inpaintEndpoint, getStatus } from './generate-image.mjs';

test('Luna edits use free inpainting with original image and required mask', async () => {
  const input = await prepareRequest({ character: 'luna-kucing-penasaran', scene: 'Surprised mouth.', mask_url: 'https://example.com/mask.png' });
  assert.equal(input.mode, 'inpaint');
  assert.match(input.imageUrl, /prompt-1789459570227-403591/);
  await generate(input, 'test', async (url, options) => {
    assert.equal(url, inpaintEndpoint);
    const body = JSON.parse(options.body);
    assert.equal(body.maskUrl, 'https://example.com/mask.png');
    assert.equal(body.imageUrl, input.imageUrl);
    assert.equal(body.guidance, 5);
    assert.equal(body.mode, undefined);
    assert.equal(body.width, undefined);
    assert.equal(body.seed, 40);
    return { ok: true, json: async () => ({ imageUrl: 'https://example.com/result.png' }) };
  });
});

test('free-only policy blocks paid mode and missing masks before any network call', async () => {
  const never = () => assert.fail('must not send');
  await assert.rejects(generate({ mode: 'reference', allow_paid: true }, 'test', never), /disabled/);
  await assert.rejects(generate({ mode: 'other' }, 'test', never), /disabled/);
  await assert.rejects(prepareRequest({ character: 'luna-kucing-penasaran', scene: 'x' }), /mask_url/);
  await assert.rejects(generate({ mode: 'inpaint', prompt: 'x', imageUrl: 'https://example.com/a.png' }, 'test', never), /maskUrl/);
  await assert.rejects(generate({ mode: 'inpaint', prompt: 'x', imageUrl: 'https://example.com/a.png', maskUrl: 'file:///mask.png' }, 'test', never), /HTTPS/);
  await assert.rejects(generate({ prompt: 'x', imageUrl: 'https://example.com/a.png' }, 'test', never), /fallback/);
});

test('status uses only the fixed Pixazo endpoint and rejects path injection', async () => {
  await assert.rejects(getStatus('../evil', 'test'), /Invalid/);
  const result = await getStatus('job-123', 'test', async (url, options) => {
    assert.equal(url, 'https://gateway.pixazo.ai/v2/requests/status/job-123');
    assert.equal(options.redirect, 'error');
    return { ok: true, json: async () => ({ status: 'COMPLETED' }) };
  });
  assert.equal(result.status, 'COMPLETED');
});

test('character requests reject identity bypass, path traversal and seed drift', async () => {
  await assert.rejects(prepareRequest({ character: '../secret', scene: 'x' }), /identifier/);
  await assert.rejects(prepareRequest({ character: 'luna-kucing-penasaran', scene: 'x', seed: 42 }), /locked/);
  await assert.rejects(prepareRequest({ character: 'luna-kucing-penasaran', prompt: 'flat vector', scene: 'x' }), /scene, not prompt/);
  await assert.rejects(prepareRequest({ character: 'luna-kucing-penasaran', scene: 'x' }, async () => 'missing'), /blocks/);
});

test('sends the specified Pixazo request and preserves response', async () => {
  const result = await generate({ prompt: 'a mountain' }, 'test-key', async (url, options) => {
    assert.equal(url, endpoint);
    assert.equal(options.method, 'POST');
    assert.equal(options.headers['Ocp-Apim-Subscription-Key'], 'test-key');
    assert.equal(options.redirect, 'error');
    assert.deepEqual(JSON.parse(options.body), { prompt: 'a mountain', height: 1024, width: 1024, num_steps: 20, guidance_scale: 5, seed: 40 });
    return { ok: true, json: async () => ({ output: 'example-image' }) };
  });
  assert.deepEqual(result, { output: 'example-image' });
});

test('rejects invalid inputs and missing credentials before sending', async () => {
  assert.throws(() => makeBody({ prompt: ' ' }));
  assert.throws(() => makeBody({ prompt: 'x', width: -1 }));
  await assert.rejects(generate({ prompt: 'x' }, '', () => assert.fail('must not send')), /PIXAZO_API_KEY/);
});

test('HTTP failures and network failures do not retry or expose response secrets', async () => {
  let calls = 0;
  await assert.rejects(generate({ prompt: 'x' }, 'test-key', async () => {
    calls++; return { ok: false, status: 401 };
  }), /HTTP 401/);
  assert.equal(calls, 1);
  await assert.rejects(generate({ prompt: 'x' }, 'test-key', async () => { throw new Error('test-key'); }), /status is unknown/);
});
