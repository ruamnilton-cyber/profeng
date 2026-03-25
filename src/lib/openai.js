const { getLevelProfile, normalizeLevel } = require('../constants/levels');
const { ENV } = require('../env');
const { createHttpError } = require('./http');
const {
  buildExerciseCheckPrompt,
  buildExerciseGenerationPrompt,
  buildFeedbackPrompt,
  buildLevelAssessmentPrompt,
  buildSpeechInstructions,
  buildTutorSystemPrompt,
} = require('./prompting');

function assertOpenAiConfigured() {
  if (!ENV.openAiApiKey) {
    throw createHttpError(
      503,
      'OPENAI_API_KEY is not configured. Add it to your .env file before using AI routes.',
    );
  }
}

function normalizeMessageContent(content) {
  if (typeof content === 'string') {
    return content;
  }

  if (Array.isArray(content)) {
    return content
      .map((part) => normalizeMessageContent(part))
      .filter(Boolean)
      .join('\n');
  }

  if (content && typeof content === 'object') {
    if (typeof content.text === 'string') {
      return content.text;
    }

    return JSON.stringify(content);
  }

  return '';
}

function normalizeMessages(messages) {
  if (!Array.isArray(messages)) {
    return [];
  }

  return messages
    .map((message) => {
      const role =
        message && typeof message.role === 'string' ? message.role.toLowerCase() : 'user';
      const safeRole = ['user', 'assistant', 'system'].includes(role) ? role : 'user';
      return {
        role: safeRole,
        content: normalizeMessageContent(message ? message.content : ''),
      };
    })
    .filter((message) => message.content);
}

function buildOpenAiHeaders(extraHeaders = {}) {
  return {
    authorization: `Bearer ${ENV.openAiApiKey}`,
    ...extraHeaders,
  };
}

function uniqueCandidates(values = []) {
  return Array.from(
    new Set(
      values
        .map((value) => (typeof value === 'string' ? value.trim() : ''))
        .filter(Boolean),
    ),
  );
}

async function readOpenAiErrorMessage(response) {
  const cloned = response.clone();
  const data = await response.json().catch(() => null);
  if (data && data.error && typeof data.error.message === 'string' && data.error.message.trim()) {
    return data.error.message.trim();
  }

  const fallbackText = await cloned.text().catch(() => '');
  return fallbackText || 'OpenAI request failed.';
}

function isVoiceCompatibilityError(status, message = '') {
  if (![400, 404].includes(status)) {
    return false;
  }

  const text = String(message).toLowerCase();
  const patterns = [
    'model',
    'voice',
    'audio',
    'transcribe',
    'speech',
    'unsupported',
    'not found',
    'not available',
    'does not support',
    'invalid voice',
    'unknown model',
    'instruction',
    'compatible',
  ];

  return patterns.some((pattern) => text.includes(pattern));
}

async function handleOpenAiResponse(response, { expectJson = true } = {}) {
  if (expectJson) {
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw createHttpError(
        response.status,
        data && data.error && data.error.message
          ? data.error.message
          : 'OpenAI request failed.',
      );
    }
    return data;
  }

  if (!response.ok) {
    const text = await response.text().catch(() => '');
    throw createHttpError(response.status, text || 'OpenAI request failed.');
  }

  return response;
}

async function createChatCompletion(options) {
  assertOpenAiConfigured();

  const payload = {
    model: options.model || ENV.openAiTextModel,
    temperature: options.temperature ?? 0.7,
    max_tokens: options.maxTokens ?? 700,
    messages: options.messages,
  };

  if (options.responseFormat) {
    payload.response_format = options.responseFormat;
  }

  const response = await fetch(`${ENV.openAiBaseUrl}/chat/completions`, {
    method: 'POST',
    headers: buildOpenAiHeaders({
      'content-type': 'application/json',
    }),
    body: JSON.stringify(payload),
  });

  const data = await handleOpenAiResponse(response);
  return data.choices && data.choices[0] && data.choices[0].message
    ? data.choices[0].message.content || ''
    : '';
}

function extractJson(text) {
  if (typeof text !== 'string') {
    throw createHttpError(502, 'Model did not return a valid JSON string.');
  }

  const trimmed = text.trim().replace(/^```json/i, '').replace(/^```/i, '').replace(/```$/, '');
  const firstBrace = trimmed.indexOf('{');
  const lastBrace = trimmed.lastIndexOf('}');
  const candidate =
    firstBrace !== -1 && lastBrace !== -1 ? trimmed.slice(firstBrace, lastBrace + 1) : trimmed;

  try {
    return JSON.parse(candidate);
  } catch (_error) {
    throw createHttpError(502, 'Model returned malformed JSON.', candidate);
  }
}

async function createJsonCompletion(options) {
  const content = await createChatCompletion({
    messages: options.messages,
    temperature: options.temperature ?? 0.3,
    maxTokens: options.maxTokens ?? 1200,
    responseFormat: { type: 'json_object' },
  });

  return extractJson(content);
}

async function createTutorReply(options = {}) {
  const normalizedMessages = normalizeMessages(options.messages);
  if (!normalizedMessages.length) {
    throw createHttpError(400, 'Field "messages" is required and must contain at least one item.');
  }

  const systemPrompt = buildTutorSystemPrompt({
    level: options.level,
    mode: options.mode,
    topic: options.topic,
    goals: options.goals,
    learnerName: options.learnerName,
    nativeLanguage: options.nativeLanguage,
    correctionMode: options.correctionMode,
    extraSystemPrompt: options.extraSystemPrompt,
  });

  const reply = await createChatCompletion({
    temperature: 0.7,
    maxTokens: 700,
    messages: [{ role: 'system', content: systemPrompt }, ...normalizedMessages],
  });

  return {
    reply: typeof reply === 'string' ? reply.trim() : '',
    level: normalizeLevel(options.level, 'B1'),
  };
}

async function createFeedback(options = {}) {
  if (typeof options.text !== 'string' || !options.text.trim()) {
    throw createHttpError(400, 'Field "text" is required.');
  }

  const feedback = await createChatCompletion({
    temperature: 0.4,
    maxTokens: 220,
    messages: [
      { role: 'system', content: buildFeedbackPrompt(options) },
      { role: 'user', content: options.text.trim() },
    ],
  });

  return { feedback: feedback.trim() };
}

function getAudioFileExtension(mimeType) {
  const map = {
    'audio/webm': 'webm',
    'audio/mp3': 'mp3',
    'audio/mpeg': 'mp3',
    'audio/wav': 'wav',
    'audio/wave': 'wav',
    'audio/ogg': 'ogg',
    'audio/mp4': 'm4a',
    'audio/m4a': 'm4a',
  };

  return map[mimeType] || 'webm';
}

async function resolveAudioInput(options = {}) {
  if (typeof options.audioBase64 === 'string' && options.audioBase64.trim()) {
    const trimmed = options.audioBase64.trim();
    const dataUriMatch = trimmed.match(/^data:(.+?);base64,(.+)$/);
    const mimeType = dataUriMatch ? dataUriMatch[1] : options.mimeType || 'audio/webm';
    const base64Data = dataUriMatch ? dataUriMatch[2] : trimmed;
    return {
      buffer: Buffer.from(base64Data, 'base64'),
      mimeType,
    };
  }

  if (typeof options.audioUrl === 'string' && options.audioUrl.trim()) {
    const response = await fetch(options.audioUrl.trim());
    if (!response.ok) {
      throw createHttpError(
        400,
        `Could not download the audio file (${response.status} ${response.statusText}).`,
      );
    }

    return {
      buffer: Buffer.from(await response.arrayBuffer()),
      mimeType: response.headers.get('content-type') || options.mimeType || 'audio/webm',
    };
  }

  throw createHttpError(
    400,
    'Provide "audioBase64" or "audioUrl" to use the voice transcription route.',
  );
}

async function transcribeAudio(options = {}) {
  assertOpenAiConfigured();

  const { buffer, mimeType } = await resolveAudioInput(options);
  const sizeInMb = buffer.length / (1024 * 1024);
  if (sizeInMb > 20) {
    throw createHttpError(400, 'Audio file is too large. Keep it under 20 MB.');
  }

  const modelsToTry = uniqueCandidates([
    options.model,
    ENV.openAiTranscribeModel,
    'gpt-4o-transcribe',
    'gpt-4o-mini-transcribe',
    'whisper-1',
  ]);

  const fileName = `voice.${getAudioFileExtension(mimeType)}`;
  const blob = new Blob([new Uint8Array(buffer)], { type: mimeType });
  const attempts = [];

  for (const model of modelsToTry) {
    const form = new FormData();
    form.append('file', blob, fileName);
    form.append('model', model);
    form.append('response_format', 'verbose_json');

    if (options.language) {
      form.append('language', options.language);
    }

    if (options.prompt) {
      form.append('prompt', options.prompt);
    }

    const response = await fetch(`${ENV.openAiBaseUrl}/audio/transcriptions`, {
      method: 'POST',
      headers: buildOpenAiHeaders(),
      body: form,
    });

    if (response.ok) {
      const data = await response.json().catch(() => ({}));
      return {
        text: data.text || '',
        duration: data.duration || null,
        language: data.language || options.language || null,
        segments: Array.isArray(data.segments) ? data.segments : [],
        modelUsed: model,
      };
    }

    const message = await readOpenAiErrorMessage(response);
    attempts.push({ model, status: response.status, message });

    if (!isVoiceCompatibilityError(response.status, message)) {
      throw createHttpError(response.status, message);
    }
  }

  const lastAttempt = attempts[attempts.length - 1];
  throw createHttpError(
    lastAttempt ? lastAttempt.status : 502,
    'Sua chave OpenAI nao conseguiu usar um modelo de transcricao de voz compativel. Configure OPENAI_TRANSCRIBE_MODEL com um modelo habilitado na sua conta.',
    attempts,
  );
}

async function synthesizeSpeech(options = {}) {
  assertOpenAiConfigured();

  if (typeof options.text !== 'string' || !options.text.trim()) {
    throw createHttpError(400, 'Field "text" is required to synthesize speech.');
  }

  const modelsToTry = uniqueCandidates([
    options.model,
    ENV.openAiTtsModel,
    'gpt-4o-mini-tts',
    'gpt-4o-tts',
    'tts-1',
    'tts-1-hd',
  ]);

  const voicesToTry = uniqueCandidates([options.voice, ENV.openAiTtsVoice, 'alloy']);
  const instructions = options.instructions || buildSpeechInstructions(options);
  const attempts = [];

  for (const model of modelsToTry) {
    for (const voice of voicesToTry) {
      const variants = [
        {
          model,
          voice,
          input: options.text.trim(),
          response_format: 'mp3',
          instructions,
        },
        {
          model,
          voice,
          input: options.text.trim(),
          response_format: 'mp3',
        },
      ];

      for (const payload of variants) {
        const response = await fetch(`${ENV.openAiBaseUrl}/audio/speech`, {
          method: 'POST',
          headers: buildOpenAiHeaders({
            'content-type': 'application/json',
          }),
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          const arrayBuffer = await response.arrayBuffer();
          return {
            audioBase64: Buffer.from(arrayBuffer).toString('base64'),
            mimeType: 'audio/mpeg',
            voice,
            modelUsed: model,
          };
        }

        const message = await readOpenAiErrorMessage(response);
        attempts.push({
          model,
          voice,
          withInstructions: Boolean(payload.instructions),
          status: response.status,
          message,
        });

        if (!isVoiceCompatibilityError(response.status, message)) {
          throw createHttpError(response.status, message);
        }
      }
    }
  }

  const lastAttempt = attempts[attempts.length - 1];
  throw createHttpError(
    lastAttempt ? lastAttempt.status : 502,
    'Sua chave OpenAI nao conseguiu usar um modelo de resposta por voz compativel. Configure OPENAI_TTS_MODEL com um modelo de TTS habilitado na sua conta.',
    attempts,
  );
}

async function createVoiceReply(options = {}) {
  const transcription = await transcribeAudio(options);
  const reply = await createTutorReply({
    ...options,
    mode: options.mode || 'voice',
    messages: [...(Array.isArray(options.messages) ? options.messages : []), {
      role: 'user',
      content: transcription.text,
    }],
  });

  let speech = null;
  if (options.speakResponse !== false) {
    speech = await synthesizeSpeech({
      level: options.level,
      voice: options.voice,
      text: reply.reply,
    });
  }

  return {
    transcript: transcription.text,
    transcription,
    reply: reply.reply,
    speech,
    level: reply.level,
  };
}

async function generateExercises(options = {}) {
  const level = normalizeLevel(options.level, 'B1');
  const result = await createJsonCompletion({
    messages: [
      { role: 'system', content: buildExerciseGenerationPrompt(options) },
      {
        role: 'user',
        content: JSON.stringify({
          level,
          skill: options.skill || 'mixed',
          topic: options.topic || 'daily life',
          count: options.count || 5,
        }),
      },
    ],
  });

  return {
    ...result,
    level,
    levelProfile: getLevelProfile(level),
  };
}

async function checkExerciseAnswer(options = {}) {
  if (typeof options.userAnswer !== 'string' || !options.userAnswer.trim()) {
    throw createHttpError(400, 'Field "userAnswer" is required.');
  }

  const level = normalizeLevel(options.level, 'B1');
  const result = await createJsonCompletion({
    messages: [
      { role: 'system', content: buildExerciseCheckPrompt(options) },
      {
        role: 'user',
        content: JSON.stringify({
          prompt: options.prompt || '',
          expectedAnswer: options.expectedAnswer || '',
          userAnswer: options.userAnswer,
        }),
      },
    ],
  });

  return {
    ...result,
    level,
  };
}

async function assessLevel(options = {}) {
  if (typeof options.sampleText !== 'string' || !options.sampleText.trim()) {
    throw createHttpError(400, 'Field "sampleText" is required.');
  }

  const result = await createJsonCompletion({
    messages: [
      { role: 'system', content: buildLevelAssessmentPrompt(options) },
      { role: 'user', content: options.sampleText.trim() },
    ],
  });

  return {
    ...result,
    recommendedLevel: normalizeLevel(result.recommendedLevel, 'B1'),
  };
}

module.exports = {
  assessLevel,
  checkExerciseAnswer,
  createFeedback,
  createTutorReply,
  createVoiceReply,
  generateExercises,
  synthesizeSpeech,
  transcribeAudio,
};
