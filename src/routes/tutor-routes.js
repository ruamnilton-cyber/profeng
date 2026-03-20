const express = require('express');

const { getPublicLevels, normalizeLevel } = require('../constants/levels');
const { ENV } = require('../env');
const { getAuthenticatedSession, updateUserProfile } = require('../lib/auth');
const { asyncRoute } = require('../lib/http');
const {
  assessLevel,
  checkExerciseAnswer,
  createFeedback,
  createTutorReply,
  createVoiceReply,
  generateExercises,
  transcribeAudio,
} = require('../lib/openai');
const {
  recordExerciseAttempt,
  recordLevelAssessment,
  recordVoiceSession,
} = require('../lib/progress');
const { CHAT_MODES, CORRECTION_MODES } = require('../lib/prompting');

const tutorRouter = express.Router();

const EXERCISE_SKILLS = [
  'mixed',
  'grammar',
  'vocabulary',
  'reading',
  'writing',
  'speaking',
  'listening',
  'conversation',
];

tutorRouter.get(
  '/health',
  asyncRoute(async (_req, res) => {
    res.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      services: {
        auth: true,
        openai: Boolean(ENV.openAiApiKey),
        googleLogin: Boolean(ENV.googleClientId),
      },
    });
  }),
);

tutorRouter.get(
  '/meta/options',
  asyncRoute(async (_req, res) => {
    res.json({
      levels: getPublicLevels(),
      chatModes: Object.keys(CHAT_MODES),
      correctionModes: Object.keys(CORRECTION_MODES),
      exerciseSkills: EXERCISE_SKILLS,
      voices: ['alloy', 'verse', 'sage', 'ash', 'coral'],
      auth: {
        email: true,
        googleConfigured: Boolean(ENV.googleClientId),
        googleClientId: ENV.googleClientId || null,
        openAiConfigured: Boolean(ENV.openAiApiKey),
      },
    });
  }),
);

tutorRouter.post(
  '/chat',
  asyncRoute(async (req, res) => {
    if (req.body && req.body.ping) {
      return res.json({ ok: true });
    }

    const auth = await getAuthenticatedSession(req);
    const result = await createTutorReply({
      messages: req.body ? req.body.messages : [],
      level: req.body && req.body.level ? req.body.level : auth && auth.user.level,
      mode: req.body && req.body.mode,
      topic: req.body && req.body.topic,
      goals: req.body && req.body.goals,
      learnerName:
        (req.body && req.body.learnerName) || (auth && auth.user && auth.user.name) || null,
      nativeLanguage: req.body && req.body.nativeLanguage ? req.body.nativeLanguage : 'pt-BR',
      correctionMode: req.body && req.body.correctionMode,
      extraSystemPrompt: req.body && req.body.systemPrompt,
    });

    return res.json(result);
  }),
);

tutorRouter.post(
  '/feedback',
  asyncRoute(async (req, res) => {
    const result = await createFeedback(req.body || {});
    res.json(result);
  }),
);

tutorRouter.post(
  '/voice/transcribe',
  asyncRoute(async (req, res) => {
    const auth = await getAuthenticatedSession(req);
    const result = await transcribeAudio(req.body || {});

    if (auth) {
      await recordVoiceSession({
        userId: auth.user.id,
        level: auth.user.level,
        transcriptLength: result.text.length,
      });
    }

    res.json(result);
  }),
);

tutorRouter.post(
  '/voice/respond',
  asyncRoute(async (req, res) => {
    const auth = await getAuthenticatedSession(req);
    const result = await createVoiceReply({
      ...(req.body || {}),
      level:
        (req.body && req.body.level) || (auth && auth.user ? auth.user.level : normalizeLevel()),
      learnerName:
        (req.body && req.body.learnerName) || (auth && auth.user && auth.user.name) || null,
      nativeLanguage: (req.body && req.body.nativeLanguage) || 'pt-BR',
    });

    if (auth) {
      await recordVoiceSession({
        userId: auth.user.id,
        level: result.level,
        transcriptLength: result.transcript.length,
      });
    }

    res.json(result);
  }),
);

tutorRouter.post(
  '/exercises/generate',
  asyncRoute(async (req, res) => {
    const auth = await getAuthenticatedSession(req);
    const result = await generateExercises({
      ...(req.body || {}),
      level: (req.body && req.body.level) || (auth && auth.user && auth.user.level) || 'B1',
      nativeLanguage: (req.body && req.body.nativeLanguage) || 'pt-BR',
    });

    res.json(result);
  }),
);

tutorRouter.post(
  '/exercises/check',
  asyncRoute(async (req, res) => {
    const auth = await getAuthenticatedSession(req);
    const result = await checkExerciseAnswer({
      ...(req.body || {}),
      level: (req.body && req.body.level) || (auth && auth.user && auth.user.level) || 'B1',
    });

    if (auth) {
      await recordExerciseAttempt({
        userId: auth.user.id,
        exerciseType: req.body && req.body.exerciseType,
        level: result.level,
        score: typeof result.score === 'number' ? result.score : null,
        correct: result.correct,
        topic: req.body && req.body.topic,
      });
    }

    res.json(result);
  }),
);

tutorRouter.post(
  '/levels/assess',
  asyncRoute(async (req, res) => {
    const auth = await getAuthenticatedSession(req);
    const result = await assessLevel({
      ...(req.body || {}),
      currentLevel:
        (req.body && req.body.currentLevel) || (auth && auth.user && auth.user.level) || 'B1',
    });

    if (auth) {
      await recordLevelAssessment({
        userId: auth.user.id,
        currentLevel: auth.user.level,
        recommendedLevel: result.recommendedLevel,
        confidence: result.confidence,
      });

      if (req.body && req.body.applyRecommendation === true) {
        await updateUserProfile(auth.user.id, { level: result.recommendedLevel });
      }
    }

    res.json(result);
  }),
);

module.exports = {
  tutorRouter,
};
