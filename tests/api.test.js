const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs/promises');
const os = require('os');
const path = require('path');

const tempDir = path.join(os.tmpdir(), `profeng-tests-${process.pid}-${Date.now()}`);
process.env.NODE_ENV = 'test';
process.env.APP_DATA_FILE = path.join(tempDir, 'app-data.json');
process.env.ALLOWED_ORIGIN = '';
delete process.env.OPENAI_API_KEY;
delete process.env.GOOGLE_CLIENT_ID;

const { createApp } = require('../src/app');

let server;
let baseUrl;

async function requestJson(route, options = {}) {
  const response = await fetch(`${baseUrl}${route}`, options);
  const text = await response.text();
  const json = text ? JSON.parse(text) : null;
  return { response, json };
}

test.before(async () => {
  await fs.mkdir(tempDir, { recursive: true });
  const app = createApp();

  await new Promise((resolve) => {
    server = app.listen(0, '127.0.0.1', resolve);
  });

  const address = server.address();
  baseUrl = `http://127.0.0.1:${address.port}`;
});

test.after(async () => {
  if (server) {
    await new Promise((resolve, reject) => {
      server.close((error) => {
        if (error) {
          reject(error);
          return;
        }
        resolve();
      });
    });
  }

  await fs.rm(tempDir, { recursive: true, force: true });
});

test('health and meta endpoints expose available features', async () => {
  const { response: healthResponse, json: health } = await requestJson('/health');
  assert.equal(healthResponse.status, 200);
  assert.equal(health.status, 'ok');
  assert.equal(health.services.auth, true);
  assert.equal(health.services.openai, false);

  const { response: metaResponse, json: meta } = await requestJson('/meta/options');
  assert.equal(metaResponse.status, 200);
  assert.ok(Array.isArray(meta.levels));
  assert.ok(meta.levels.some((level) => level.id === 'A0'));
  assert.ok(meta.levels.some((level) => level.id === 'A1'));
  assert.ok(meta.levels.some((level) => level.id === 'C2'));
  assert.deepEqual(meta.auth, {
    email: true,
    googleConfigured: false,
    googleClientId: null,
    openAiConfigured: false,
  });
});

test('email auth flow creates a user, returns a token and exposes profile stats', async () => {
  const registerPayload = {
    email: 'aluna@profeng.dev',
    password: 'Senha1234',
    name: 'Aluna Teste',
    level: 'A2',
  };

  const { response: registerResponse, json: register } = await requestJson('/auth/register', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(registerPayload),
  });

  assert.equal(registerResponse.status, 200);
  assert.equal(register.user.email, registerPayload.email);
  assert.equal(register.user.level, 'A2');
  assert.ok(register.token);

  const { response: loginResponse, json: login } = await requestJson('/auth/login', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      email: registerPayload.email,
      password: registerPayload.password,
    }),
  });

  assert.equal(loginResponse.status, 200);
  assert.ok(login.token);

  const { response: meResponse, json: me } = await requestJson('/auth/me', {
    headers: {
      Authorization: `Bearer ${login.token}`,
    },
  });

  assert.equal(meResponse.status, 200);
  assert.equal(me.user.name, 'Aluna Teste');
  assert.equal(me.stats.exerciseAttempts, 0);
  assert.equal(me.stats.voiceSessions, 0);
});

test('activity progress endpoint syncs completion stats for the logged user', async () => {
  const { response: registerResponse, json: register } = await requestJson('/auth/register', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      email: 'trilha@profeng.dev',
      password: 'Senha1234',
      name: 'Aluno Trilha',
      level: 'B1',
    }),
  });

  assert.equal(registerResponse.status, 200);
  assert.ok(register.token);

  const { response: progressResponse, json: progress } = await requestJson('/progress/activity', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${register.token}`,
    },
    body: JSON.stringify({
      activityId: 'b1-opinion',
      level: 'B1',
      score: 84,
    }),
  });

  assert.equal(progressResponse.status, 200);
  assert.equal(progress.success, true);
  assert.equal(progress.stats.completedActivities, 1);
  assert.equal(progress.stats.currentStreakDays >= 1, true);

  const { response: meResponse, json: me } = await requestJson('/auth/me', {
    headers: {
      Authorization: `Bearer ${register.token}`,
    },
  });

  assert.equal(meResponse.status, 200);
  assert.equal(me.stats.completedActivities, 1);
  assert.equal(me.stats.bestStreakDays >= 1, true);
});

test('progress state endpoint syncs trail data by authenticated account', async () => {
  const { response: registerResponse, json: register } = await requestJson('/auth/register', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      email: 'sync@profeng.dev',
      password: 'Senha1234',
      name: 'Aluno Sync',
      level: 'A2',
    }),
  });

  assert.equal(registerResponse.status, 200);
  assert.ok(register.token);

  const statePayload = {
    completed: { A2: ['a2-weekend'] },
    drafts: { 'A2:a2-weekend': { 'a2-fill-1': 'are' } },
    activitySets: { 'A2:a2-weekend': [{ id: 'a2-fill-1', type: 'fill' }] },
    activityResults: { 'A2:a2-weekend': { score: 83, correct: 5, total: 6 } },
  };

  const { response: putResponse, json: putResult } = await requestJson('/progress/state', {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${register.token}`,
    },
    body: JSON.stringify({ state: statePayload }),
  });

  assert.equal(putResponse.status, 200);
  assert.equal(putResult.success, true);
  assert.deepEqual(putResult.state.completed.A2, ['a2-weekend']);

  const { response: getResponse, json: getResult } = await requestJson('/progress/state', {
    headers: {
      Authorization: `Bearer ${register.token}`,
    },
  });

  assert.equal(getResponse.status, 200);
  assert.deepEqual(getResult.state.completed.A2, ['a2-weekend']);
  assert.equal(getResult.state.activityResults['A2:a2-weekend'].score, 83);

  const { response: registerOtherResponse, json: registerOther } = await requestJson('/auth/register', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      email: 'other@profeng.dev',
      password: 'Senha1234',
      name: 'Outra Conta',
      level: 'A1',
    }),
  });

  assert.equal(registerOtherResponse.status, 200);
  const { response: otherGetResponse, json: otherGet } = await requestJson('/progress/state', {
    headers: {
      Authorization: `Bearer ${registerOther.token}`,
    },
  });

  assert.equal(otherGetResponse.status, 200);
  assert.deepEqual(otherGet.state.completed, {});
});

test('chat route fails gracefully when OpenAI is not configured', async () => {
  const { response, json } = await requestJson('/chat', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      level: 'B1',
      messages: [{ role: 'user', content: 'Hello there' }],
    }),
  });

  assert.equal(response.status, 503);
  assert.match(json.error, /OPENAI_API_KEY/i);
});

test('voice speak route fails gracefully when OpenAI is not configured', async () => {
  const { response, json } = await requestJson('/voice/speak', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      text: 'Hello from the app',
      voice: 'alloy',
    }),
  });

  assert.equal(response.status, 503);
  assert.match(json.error, /OPENAI_API_KEY/i);
});
