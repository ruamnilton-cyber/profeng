const { getLevelProfile, normalizeLevel } = require('../constants/levels');

const CORRECTION_MODES = {
  gentle: 'Correct only the most important issue and keep the tone encouraging.',
  balanced: 'Balance fluency and accuracy, with one or two targeted corrections when helpful.',
  strict: 'Act like a demanding tutor: correct mistakes clearly and explain why they matter.',
};

const CHAT_MODES = {
  conversation: 'Keep a natural conversation going and help the learner express ideas clearly.',
  grammar: 'Teach with clear examples and short practice moments focused on grammar accuracy.',
  speaking: 'Prioritize speaking fluency, pronunciation-friendly phrasing and oral follow-up prompts.',
  writing: 'Prioritize sentence quality, organization and better written wording.',
  roleplay: 'Simulate a real-life situation and stay in character when useful.',
  voice: 'Assume the answer may be spoken aloud, so keep rhythm and clarity high.',
};

function buildTutorSystemPrompt(options = {}) {
  const level = normalizeLevel(options.level, 'B1');
  const profile = getLevelProfile(level);
  const correctionMode = CORRECTION_MODES[options.correctionMode] || CORRECTION_MODES.balanced;
  const mode = CHAT_MODES[options.mode] || CHAT_MODES.conversation;
  const learnerName =
    typeof options.learnerName === 'string' && options.learnerName.trim()
      ? options.learnerName.trim()
      : null;
  const goals =
    Array.isArray(options.goals) && options.goals.length > 0
      ? options.goals.filter(Boolean).join(', ')
      : null;

  return [
    'You are ProfEng, a warm but demanding English tutor.',
    `Target CEFR level: ${profile.id} (${profile.label}).`,
    `Expected response length: ${profile.responseWindow}.`,
    `Vocabulary scope: ${profile.vocabularyScope}.`,
    `Grammar scope: ${profile.grammarScope}.`,
    learnerName ? `Learner name: ${learnerName}.` : null,
    options.nativeLanguage ? `Learner native language: ${options.nativeLanguage}.` : null,
    goals ? `Learner goals: ${goals}.` : null,
    options.topic ? `Current topic: ${options.topic}.` : null,
    `Mode guidance: ${mode}`,
    `Correction guidance: ${correctionMode}`,
    'Tutor priorities:',
    ...profile.teacherFocus.map((item) => `- ${item}`),
    'Global rules:',
    '- Answer in natural English adapted to the target level.',
    level === 'A1' || level === 'A2'
      ? '- You may use a very short Portuguese clarification only when it prevents confusion.'
      : '- Avoid switching to Portuguese unless the learner explicitly asks for it.',
    '- If the learner makes a mistake, briefly model the improved version before moving on.',
    '- End with a short follow-up question or a concrete next step whenever possible.',
    typeof options.extraSystemPrompt === 'string' && options.extraSystemPrompt.trim()
      ? `Extra project instructions: ${options.extraSystemPrompt.trim()}`
      : null,
  ]
    .filter(Boolean)
    .join('\n');
}

function buildFeedbackPrompt(options = {}) {
  const level = normalizeLevel(options.level, 'B1');
  const profile = getLevelProfile(level);

  return [
    'You are reviewing an English learner response.',
    `Target CEFR level: ${profile.id} (${profile.label}).`,
    'Return a short, practical answer with exactly these parts:',
    '1. one grammar tip',
    '2. one vocabulary or phrasing suggestion',
    '3. one short encouragement',
    'Keep it concise and learner-friendly.',
  ].join('\n');
}

function buildExerciseGenerationPrompt(options = {}) {
  const level = normalizeLevel(options.level, 'B1');
  const profile = getLevelProfile(level);
  const count = Math.min(Math.max(Number(options.count) || 5, 1), 10);

  return [
    'Create English-learning exercises for a mobile app.',
    `Target CEFR level: ${profile.id} (${profile.label}).`,
    `Skill focus: ${options.skill || 'mixed practice'}.`,
    `Topic focus: ${options.topic || 'general daily English'}.`,
    options.nativeLanguage ? `Learner native language: ${options.nativeLanguage}.` : null,
    `Generate exactly ${count} exercises.`,
    `Suitable exercise types for this level include: ${profile.exerciseTypes.join(', ')}.`,
    'Return a JSON object only.',
    'Required JSON shape:',
    '{',
    '  "title": "string",',
    '  "instructions": "string",',
    '  "warmup": "string",',
    '  "exercises": [',
    '    {',
    '      "id": "string",',
    '      "type": "string",',
    '      "prompt": "string",',
    '      "choices": ["string"],',
    '      "answer": "string",',
    '      "hint": "string",',
    '      "explanation": "string",',
    '      "skillFocus": "string",',
    '      "level": "string"',
    '    }',
    '  ],',
    '  "reviewChecklist": ["string"]',
    '}',
    'Rules:',
    '- choices can be an empty array for open-ended tasks.',
    '- Make prompts realistic and clearly leveled.',
    '- If the task is speaking or listening oriented, still provide text prompts the frontend can read aloud.',
    '- Avoid markdown, code fences and extra commentary.',
  ]
    .filter(Boolean)
    .join('\n');
}

function buildExerciseCheckPrompt(options = {}) {
  const level = normalizeLevel(options.level, 'B1');
  const profile = getLevelProfile(level);

  return [
    'Evaluate a learner answer for an English exercise.',
    `Target CEFR level: ${profile.id} (${profile.label}).`,
    `Exercise type: ${options.exerciseType || 'general'}.`,
    options.topic ? `Topic: ${options.topic}.` : null,
    'Return a JSON object only with these fields:',
    '{',
    '  "score": 0,',
    '  "correct": false,',
    '  "strengths": ["string"],',
    '  "mistakes": ["string"],',
    '  "improvedAnswer": "string",',
    '  "explanation": "string",',
    '  "nextStep": "string"',
    '}',
    'Rules:',
    '- score must be an integer from 0 to 100.',
    '- Be fair to the level: do not grade A1 learners like C1 learners.',
    '- improvedAnswer should sound natural and achievable for the learner.',
  ]
    .filter(Boolean)
    .join('\n');
}

function buildLevelAssessmentPrompt(options = {}) {
  return [
    'Assess the learner CEFR level based on the sample provided.',
    options.currentLevel ? `Current claimed level: ${normalizeLevel(options.currentLevel)}.` : null,
    options.goals ? `Learner goals: ${options.goals}.` : null,
    'Return a JSON object only with these fields:',
    '{',
    '  "recommendedLevel": "A1|A2|B1|B2|C1|C2",',
    '  "confidence": 0,',
    '  "strengths": ["string"],',
    '  "gaps": ["string"],',
    '  "nextMilestones": ["string"],',
    '  "sampleRewrite": "string",',
    '  "explanation": "string"',
    '}',
    'Rules:',
    '- confidence must be a number from 0 to 1.',
    '- Use strict CEFR reasoning, not inflated praise.',
    '- sampleRewrite should be slightly better than the learner sample, not perfect if the level is low.',
  ]
    .filter(Boolean)
    .join('\n');
}

function buildSpeechInstructions(options = {}) {
  const level = normalizeLevel(options.level, 'B1');
  const profile = getLevelProfile(level);
  return `Speak like a supportive English tutor for a ${profile.label} learner. Keep the delivery clear, calm and easy to follow.`;
}

module.exports = {
  CHAT_MODES,
  CORRECTION_MODES,
  buildExerciseCheckPrompt,
  buildExerciseGenerationPrompt,
  buildFeedbackPrompt,
  buildLevelAssessmentPrompt,
  buildSpeechInstructions,
  buildTutorSystemPrompt,
};
