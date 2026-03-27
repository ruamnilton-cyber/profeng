const LEVELS = {
  A0: {
    id: 'A0',
    label: 'Starter (Pre-A1)',
    responseWindow: 'single words to 1 very short sentence',
    vocabularyScope:
      'greetings, classroom words, numbers 0-20, colors, family words, basic food and daily objects',
    grammarScope:
      'word recognition, simple chunks (I am, this is), yes/no understanding and very short prompts',
    teacherFocus: [
      'Prioritize confidence and comprehension over grammar perfection.',
      'Teach with repetition, visual anchors and very short examples.',
      'Use Portuguese support when needed to avoid learner frustration.',
    ],
    exerciseTypes: ['matching', 'multiple_choice', 'word_identification', 'micro_gap_fill'],
  },
  A1: {
    id: 'A1',
    label: 'Beginner',
    responseWindow: '1 to 3 very short sentences',
    vocabularyScope:
      'daily routine, greetings, numbers, family, food, time and simple preferences',
    grammarScope:
      'verb to be, simple present, basic questions, can/cannot, there is/are',
    teacherFocus: [
      'Use very simple vocabulary and short examples.',
      'Correct one main mistake at a time.',
      'Prefer guided prompts over open-ended tasks.',
    ],
    exerciseTypes: ['matching', 'multiple_choice', 'gap_fill', 'guided_speaking'],
  },
  A2: {
    id: 'A2',
    label: 'Elementary',
    responseWindow: '2 to 4 short sentences',
    vocabularyScope:
      'travel, hobbies, work, shopping, common chunks and everyday verbs',
    grammarScope:
      'simple past, future with going to, comparatives, frequency adverbs, countable vs uncountable',
    teacherFocus: [
      'Build confidence before increasing complexity.',
      'Keep examples concrete and practical.',
      'Use short follow-up questions to reinforce usage.',
    ],
    exerciseTypes: ['multiple_choice', 'gap_fill', 'ordering', 'guided_writing'],
  },
  B1: {
    id: 'B1',
    label: 'Intermediate',
    responseWindow: '3 to 5 medium sentences',
    vocabularyScope:
      'school, work, travel, opinions, feelings and common problem-solving language',
    grammarScope:
      'present perfect, first conditional, relative clauses, modals for advice and obligation',
    teacherFocus: [
      'Balance fluency and correction.',
      'Encourage fuller answers with reasons and examples.',
      'Introduce natural connectors without overloading the learner.',
    ],
    exerciseTypes: [
      'reading_comprehension',
      'conversation',
      'error_correction',
      'writing_task',
    ],
  },
  B2: {
    id: 'B2',
    label: 'Upper Intermediate',
    responseWindow: '4 to 6 clear and natural sentences',
    vocabularyScope:
      'abstract topics, workplace language, argumentation, nuance and idiomatic everyday English',
    grammarScope:
      'second conditional, passive voice, reported speech, discourse markers, gerunds and infinitives',
    teacherFocus: [
      'Push for precision and cohesion.',
      'Highlight unnatural phrasing and offer better alternatives.',
      'Use more realistic scenarios and debates.',
    ],
    exerciseTypes: ['debate', 'writing_task', 'roleplay', 'listening_followup'],
  },
  C1: {
    id: 'C1',
    label: 'Advanced',
    responseWindow: '5 to 7 well-structured sentences',
    vocabularyScope:
      'professional, academic and nuanced conversational English with strong collocations',
    grammarScope:
      'advanced conditionals, inversion, hedging, cleft sentences and sophisticated cohesion',
    teacherFocus: [
      'Refine register, nuance and accuracy.',
      'Challenge vague wording and repetitive structures.',
      'Simulate professional or academic communication.',
    ],
    exerciseTypes: ['essay', 'presentation', 'case_study', 'advanced_roleplay'],
  },
  C2: {
    id: 'C2',
    label: 'Proficient',
    responseWindow: 'natural native-like paragraphs when useful',
    vocabularyScope:
      'idiomatic, specialized and stylistically flexible English across contexts',
    grammarScope: 'full command of complex structures, style shifts and subtle discourse control',
    teacherFocus: [
      'Polish style, rhetorical control and precision.',
      'Treat errors as fine-tuning, not basic correction.',
      'Use demanding, realistic communication tasks.',
    ],
    exerciseTypes: ['critical_analysis', 'advanced_roleplay', 'presentation', 'debate'],
  },
};

const LEVEL_ALIASES = {
  a0: 'A0',
  'pre-a1': 'A0',
  prea1: 'A0',
  prea: 'A0',
  starter: 'A0',
  zero: 'A0',
  inicianteabsoluto: 'A0',
  iniciantezero: 'A0',
  beginner: 'A1',
  iniciante: 'A1',
  basic: 'A2',
  basico: 'A2',
  'básico': 'A2',
  intermediate: 'B1',
  intermediario: 'B1',
  'intermediário': 'B1',
  'upper intermediate': 'B2',
  'upper-intermediate': 'B2',
  avancado: 'C1',
  'avançado': 'C1',
  advanced: 'C1',
  fluent: 'C2',
  proficiency: 'C2',
};

const LEVEL_IDS = Object.keys(LEVELS);

function normalizeLevel(value, fallback = 'B1') {
  if (!value) {
    return fallback;
  }

  const asString = String(value).trim();
  const upper = asString.toUpperCase();
  if (LEVELS[upper]) {
    return upper;
  }

  const aliasKey = asString.toLowerCase();
  return LEVEL_ALIASES[aliasKey] || fallback;
}

function getLevelProfile(level) {
  return LEVELS[normalizeLevel(level)];
}

function getPublicLevels() {
  return LEVEL_IDS.map((levelId) => LEVELS[levelId]);
}

module.exports = {
  LEVELS,
  LEVEL_IDS,
  normalizeLevel,
  getLevelProfile,
  getPublicLevels,
};
