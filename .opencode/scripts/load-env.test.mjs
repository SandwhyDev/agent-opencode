import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { loadPixazoEnv } from './load-env.mjs';

test('loads local key without evaluating values, supports comments and preserves fallback', async () => {
  const dir = await mkdtemp(path.join(tmpdir(), 'pixazo-env-'));
  const file = path.join(dir, '.env');
  try {
    const env = { PIXAZO_API_KEY: 'existing' };
    await loadPixazoEnv(file, env);
    assert.equal(env.PIXAZO_API_KEY, 'existing');
    for (const content of ['PIXAZO_API_KEY=local # comment', '\uFEFF# config\r\nPIXAZO_API_KEY="local"\r\n', "export PIXAZO_API_KEY='local'"]) {
      await writeFile(file, content);
      await loadPixazoEnv(file, env);
      assert.equal(env.PIXAZO_API_KEY, 'local');
    }
    await writeFile(file, 'PIXAZO_API_KEY=\nOTHER_KEY=ignored');
    await loadPixazoEnv(file, env);
    assert.equal(env.PIXAZO_API_KEY, 'local');
    assert.equal(env.OTHER_KEY, undefined);
    await writeFile(file, 'PIXAZO_API_KEY=$(not-executed)');
    await loadPixazoEnv(file, env);
    assert.equal(env.PIXAZO_API_KEY, '$(not-executed)');
    await writeFile(file, 'PIXAZO_API_KEY="unterminated');
    await assert.rejects(loadPixazoEnv(file, env), /Invalid/);
  } finally { await rm(dir, { recursive: true, force: true }); }
});
