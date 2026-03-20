const fs = require('fs');
const path = require('path');

function stripQuotes(value) {
  if (!value) {
    return value;
  }

  const first = value[0];
  const last = value[value.length - 1];

  if ((first === '"' && last === '"') || (first === "'" && last === "'")) {
    return value.slice(1, -1);
  }

  return value;
}

function loadEnvFile(filePath = path.join(process.cwd(), '.env')) {
  if (!fs.existsSync(filePath)) {
    return;
  }

  const lines = fs.readFileSync(filePath, 'utf8').split(/\r?\n/);

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) {
      continue;
    }

    const separatorIndex = trimmed.indexOf('=');
    if (separatorIndex === -1) {
      continue;
    }

    const key = trimmed.slice(0, separatorIndex).trim();
    const value = stripQuotes(trimmed.slice(separatorIndex + 1).trim());

    if (key && process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
}

function toNumber(value, fallback) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function toList(value) {
  if (!value) {
    return [];
  }

  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

loadEnvFile();

const ENV = {
  port: toNumber(process.env.PORT, 3000),
  nodeEnv: process.env.NODE_ENV || 'development',
  appUrl: process.env.APP_URL || '',
  allowedOrigins: toList(process.env.ALLOWED_ORIGIN),
  openAiApiKey: process.env.OPENAI_API_KEY || '',
  openAiBaseUrl: (process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1').replace(/\/+$/, ''),
  openAiTextModel: process.env.OPENAI_TEXT_MODEL || 'gpt-4o-mini',
  openAiTranscribeModel:
    process.env.OPENAI_TRANSCRIBE_MODEL || 'gpt-4o-mini-transcribe',
  openAiTtsModel: process.env.OPENAI_TTS_MODEL || 'gpt-4o-mini-tts',
  openAiTtsVoice: process.env.OPENAI_TTS_VOICE || 'alloy',
  sessionCookieName: process.env.SESSION_COOKIE_NAME || 'profeng_session',
  sessionTtlDays: toNumber(process.env.SESSION_TTL_DAYS, 30),
  googleClientId: process.env.GOOGLE_CLIENT_ID || '',
};

module.exports = {
  ENV,
  loadEnvFile,
};
