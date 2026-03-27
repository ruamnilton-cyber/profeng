
const STORAGE_KEYS = {
  token: 'profeng_token',
  completed: 'profeng_completed',
  drafts: 'profeng_drafts',
  activitySets: 'profeng_activity_sets',
  activityResults: 'profeng_activity_results',
};

const LEVELS_FALLBACK = [
  { id: 'A1', label: 'Iniciante' },
  { id: 'A2', label: 'Basico' },
  { id: 'B1', label: 'Intermediario' },
  { id: 'B2', label: 'Intermediario Avancado' },
  { id: 'C1', label: 'Avancado' },
  { id: 'C2', label: 'Proficiente' },
];

const LEVEL_LABELS_PT = {
  A1: 'Iniciante',
  A2: 'Basico',
  B1: 'Intermediario',
  B2: 'Intermediario Avancado',
  C1: 'Avancado',
  C2: 'Proficiente',
};

const LEVEL_FOCUS_PT = {
  A1: 'frases curtas, vocabulario do dia a dia e perguntas simples',
  A2: 'situacoes comuns, passado basico e planos futuros',
  B1: 'conversa com opiniao, justificativas e leitura pratica',
  B2: 'fluidez, argumentacao e contexto profissional',
  C1: 'precisao, nuance e comunicacao formal avancada',
  C2: 'naturalidade de alto nivel, estilo e controle total do idioma',
};

const CHAT_MODES_FALLBACK = ['conversation', 'explain', 'correction', 'roleplay'];
const EXERCISE_SKILLS_FALLBACK = ['mixed', 'grammar', 'vocabulary', 'reading', 'writing'];
const VOICES_FALLBACK = ['alloy', 'verse', 'sage', 'ash', 'coral'];
const CHAT_TOPIC_SUGGESTIONS = [
  { label: 'viagem internacional', prompt: 'Vamos conversar sobre uma viagem internacional que voce quer fazer.' },
  { label: 'entrevista de emprego', prompt: 'Simule uma entrevista de emprego em ingles comigo.' },
  { label: 'ingles no trabalho', prompt: 'Pratique uma conversa de trabalho com reuniao e e-mails.' },
  { label: 'restaurante e pedidos', prompt: 'Pratique ingles para pedir comida em um restaurante.' },
  { label: 'apresentacao pessoal', prompt: 'Me ajude a fazer uma apresentacao pessoal natural em ingles.' },
  { label: 'conversa no aeroporto', prompt: 'Treine dialogos comuns de aeroporto e voo internacional.' },
  { label: 'small talk no dia a dia', prompt: 'Pratique small talk curto para situacoes do dia a dia.' },
  { label: 'planejamento de estudos', prompt: 'Monte comigo um plano de estudos de ingles para 30 dias.' },
  { label: 'ingles para viagem de negocios', prompt: 'Simule situacoes de viagem de negocios em ingles.' },
  { label: 'corrigir frases comuns', prompt: 'Quero praticar frases comuns e voce corrige de forma simples.' },
];

const ACTIVITY_BY_LEVEL = {
  A1: [
    {
      id: 'a1-self',
      title: 'Apresentacao pessoal simples',
      objective: 'Falar sobre voce com frases curtas e claras.',
      tips: ['Use simple present.', 'Fale nome, cidade e rotina.', 'Feche com uma pergunta simples.'],
      tasks: [
        { id: 'words', title: '10 palavras-chave', placeholder: 'name, city, work, family...' },
        { id: 'text', title: 'Mini texto (6 frases)', placeholder: 'My name is... I live in...' },
      ],
    },
    {
      id: 'a1-shopping',
      title: 'Dialogo no mercado',
      objective: 'Pedir informacoes basicas em ingles.',
      tips: ['Use how much e where.', 'Mantenha frases curtas.', 'Repita perguntas importantes.'],
      tasks: [
        { id: 'list', title: 'Lista de compras', placeholder: 'milk, bread, rice...' },
        { id: 'dialog', title: 'Dialogo curto (8 linhas)', placeholder: 'Hi. I need...' },
      ],
    },
  ],
  A2: [
    {
      id: 'a2-weekend',
      title: 'Plano de fim de semana',
      objective: 'Treinar planos com going to.',
      tips: ['Use going to para falar de planos.', 'Defina horario e local.', 'Termine com plano fechado.'],
      tasks: [
        { id: 'ideas', title: 'Ideias de passeio', placeholder: 'visit a museum, go to the park...' },
        { id: 'plan', title: 'Plano final (8 frases)', placeholder: 'On Saturday we are going to...' },
      ],
    },
    {
      id: 'a2-yesterday',
      title: 'Ontem x hoje',
      objective: 'Praticar simple past com comparacao.',
      tips: ['Use verbos regulares e irregulares.', 'Mostre ordem do dia.', 'Compare passado e presente.'],
      tasks: [
        { id: 'past', title: 'Texto sobre ontem', placeholder: 'Yesterday I woke up at...' },
        { id: 'compare', title: 'Comparacao com hoje', placeholder: 'Yesterday I..., today I...' },
      ],
    },
  ],
  B1: [
    {
      id: 'b1-opinion',
      title: 'Defendendo uma opiniao',
      objective: 'Argumentar com clareza e exemplos.',
      tips: ['Use conectores: because, however, therefore.', 'Diga um exemplo real.', 'Responda um contra-argumento.'],
      tasks: [
        { id: 'view', title: 'Sua opiniao', placeholder: 'I believe remote work...' },
        { id: 'arguments', title: 'Dois argumentos', placeholder: 'First... Second...' },
      ],
    },
    {
      id: 'b1-summary',
      title: 'Resumo de noticia',
      objective: 'Ler e resumir com opiniao pessoal.',
      tips: ['Separe fato de opiniao.', 'Mantenha estrutura clara.', 'Feche com sua leitura critica.'],
      tasks: [
        { id: 'summary', title: 'Resumo (8 frases)', placeholder: 'The article explains...' },
        { id: 'opinion', title: 'Sua opiniao (4 frases)', placeholder: 'In my view...' },
      ],
    },
  ],
  B2: [
    {
      id: 'b2-email',
      title: 'Email profissional',
      objective: 'Escrever email formal e convincente.',
      tips: ['Use tom profissional.', 'Mostre beneficio concreto.', 'Finalize com proximo passo.'],
      tasks: [
        { id: 'subject', title: 'Assunto + abertura', placeholder: 'Subject: Proposal...' },
        { id: 'body', title: 'Corpo do email', placeholder: 'This solution will help...' },
      ],
    },
    {
      id: 'b2-meeting',
      title: 'Fala de reuniao internacional',
      objective: 'Conduzir uma reuniao em ingles.',
      tips: ['Abra com agenda objetiva.', 'Interaja com educacao.', 'Feche com proximos passos.'],
      tasks: [
        { id: 'agenda', title: 'Abertura da reuniao', placeholder: 'Today we will cover...' },
        { id: 'closing', title: 'Fechamento', placeholder: 'By next week we will...' },
      ],
    },
  ],
  C1: [
    {
      id: 'c1-presentation',
      title: 'Apresentacao executiva',
      objective: 'Apresentar dados com narrativa forte.',
      tips: ['Use linguagem precisa.', 'Evite frases vagas.', 'Feche com recomendacao clara.'],
      tasks: [
        { id: 'insights', title: '3 insights principais', placeholder: 'Sales grew..., churn...' },
        { id: 'speech', title: 'Pitch (150-180 palavras)', placeholder: 'Our key takeaway...' },
      ],
    },
    {
      id: 'c1-review',
      title: 'Analise critica',
      objective: 'Responder a um texto com profundidade.',
      tips: ['Mapeie a tese central.', 'Aponte fragilidades com base.', 'Proponha alternativa melhor.'],
      tasks: [
        { id: 'map', title: 'Mapa do argumento', placeholder: 'The author claims...' },
        { id: 'critique', title: 'Resposta critica', placeholder: 'While this is compelling...' },
      ],
    },
  ],
  C2: [
    {
      id: 'c2-editorial',
      title: 'Editorial avancado',
      objective: 'Escrever com estilo e controle retorico.',
      tips: ['Trabalhe ritmo e enfase.', 'Mantenha consistencia de voz.', 'Revise para precisao maxima.'],
      tasks: [
        { id: 'thesis', title: 'Tese central', placeholder: 'Education systems must...' },
        { id: 'editorial', title: 'Texto editorial', placeholder: 'In contemporary debates...' },
      ],
    },
    {
      id: 'c2-register',
      title: 'Mudanca de registro',
      objective: 'Adaptar mensagem para contextos distintos.',
      tips: ['Mantenha a ideia central.', 'Ajuste tom e vocabulario.', 'Evite mistura de estilos.'],
      tasks: [
        { id: 'formal', title: 'Versao formal', placeholder: 'Due to unforeseen constraints...' },
        { id: 'technical', title: 'Versao tecnica', placeholder: 'The deployment timeline has...' },
      ],
    },
  ],
};

const QUIZ_QUESTIONS = [
  {
    id: 'q1',
    question: 'Qual frase descreve melhor uma rotina em ingles?',
    options: [
      { label: 'I goes to work at 8 every day.', score: 1 },
      { label: 'I go to work at 8 every day.', score: 2 },
      { label: 'I usually go to work at 8, but sometimes I work from home.', score: 4 },
      { label: 'I normally start around 8, depending on the projects and team priorities.', score: 6 },
    ],
  },
  {
    id: 'q2',
    question: 'Qual resposta esta melhor estruturada para um problema no trabalho?',
    options: [
      { label: 'It was difficult and I fix fast.', score: 1 },
      { label: 'It was difficult, but I solved it.', score: 2 },
      { label: 'I reorganized the tasks and solved it with my team.', score: 4 },
      { label: 'I reframed the issue, aligned stakeholders and coordinated the recovery plan.', score: 6 },
    ],
  },
  {
    id: 'q3',
    question: 'Escolha a opcao com melhor conexao de ideias:',
    options: [
      { label: 'I like this idea. Is very good.', score: 1 },
      { label: 'I like this idea because it is practical.', score: 2 },
      { label: 'I like this idea; however, we should test it before launch.', score: 4 },
      { label: 'Although the proposal is promising, it still requires deeper validation and resource alignment.', score: 6 },
    ],
  },
  {
    id: 'q4',
    question: 'Qual frase tem tom mais profissional para email?',
    options: [
      { label: 'Send me the file now.', score: 1 },
      { label: 'Can you send the file today?', score: 2 },
      { label: 'Could you share the updated file by the end of the day?', score: 4 },
      { label: 'Would you mind sharing the revised version by EOD so we can finalize the deliverable?', score: 6 },
    ],
  },
];

const OBJECTIVE_BANK_BY_LEVEL = {
  A1: [
    { id: 'a1-mc-1', type: 'mc', prompt: 'Complete: She ___ at school every morning.', options: ['study', 'studies', 'studying'], answer: 'studies', explanation: 'Para he/she/it no presente simples, usamos verbo com -s.' },
    { id: 'a1-mc-2', type: 'mc', prompt: 'Choose the correct sentence:', options: ['They is happy.', 'They are happy.', 'They am happy.'], answer: 'They are happy.', explanation: 'Com "they", usamos "are".' },
    { id: 'a1-fill-1', type: 'fill', prompt: 'I ___ from Brazil.', answer: ['am'], explanation: 'Use o verbo to be com I.' },
    { id: 'a1-fill-2', type: 'fill', prompt: 'We ___ to school by bus.', answer: ['go'], explanation: 'Com "we", o verbo fica sem -s.' },
    { id: 'a1-tf-1', type: 'tf', prompt: '"He have a dog." is correct.', answer: false, correction: 'He has a dog.' },
    { id: 'a1-check-1', type: 'check', prompt: 'Sentence: "My sister live in Rio." This is...', answer: 'wrong', correction: 'My sister lives in Rio.' },
  ],
  A2: [
    { id: 'a2-mc-1', type: 'mc', prompt: 'Choose the best sentence about yesterday:', options: ['I go to the market yesterday.', 'I went to the market yesterday.', 'I goed to the market yesterday.'], answer: 'I went to the market yesterday.', explanation: 'Simple past de go: went.' },
    { id: 'a2-mc-2', type: 'mc', prompt: 'Complete: We are ___ visit our grandparents this weekend.', options: ['going to', 'go to', 'goes to'], answer: 'going to', explanation: 'Para planos, use going to.' },
    { id: 'a2-fill-1', type: 'fill', prompt: 'There ___ two books on the table.', answer: ['are'], explanation: 'Com plural, use "are".' },
    { id: 'a2-fill-2', type: 'fill', prompt: 'She ___ TV last night.', answer: ['watched'], explanation: 'Simple past regular: watched.' },
    { id: 'a2-tf-1', type: 'tf', prompt: '"How much apples do you need?" is correct.', answer: false, correction: 'How many apples do you need?' },
    { id: 'a2-check-1', type: 'check', prompt: 'Sentence: "I am going to travel tomorrow." This is...', answer: 'correct', correction: 'Correta para plano futuro.' },
  ],
  B1: [
    { id: 'b1-mc-1', type: 'mc', prompt: 'Choose the best option:', options: ['I have finished my report yesterday.', 'I finished my report yesterday.', 'I was finish my report yesterday.'], answer: 'I finished my report yesterday.', explanation: 'Com marcador de passado definido (yesterday), use simple past.' },
    { id: 'b1-mc-2', type: 'mc', prompt: 'Complete: If it rains, we ___ at home.', options: ['stay', 'stays', 'stayed'], answer: 'stay', explanation: 'First conditional: if + present, will/imperative/base na principal.' },
    { id: 'b1-fill-1', type: 'fill', prompt: 'I have lived here ___ 2019.', answer: ['since'], explanation: 'Use since para ponto inicial no tempo.' },
    { id: 'b1-fill-2', type: 'fill', prompt: 'You should ___ your manager before changing the plan.', answer: ['inform', 'tell'], explanation: 'Verbos adequados no contexto de conselho.' },
    { id: 'b1-tf-1', type: 'tf', prompt: '"He said me to wait." is correct.', answer: false, correction: 'He told me to wait.' },
    { id: 'b1-check-1', type: 'check', prompt: 'Sentence: "If I will see her, I will tell her." This is...', answer: 'wrong', correction: 'If I see her, I will tell her.' },
  ],
  B2: [
    { id: 'b2-mc-1', type: 'mc', prompt: 'Choose the most natural business sentence:', options: ['The meeting was canceled by weather.', 'The meeting was canceled due to weather conditions.', 'The meeting canceled because weather.'], answer: 'The meeting was canceled due to weather conditions.', explanation: 'Uso mais formal e natural para contexto profissional.' },
    { id: 'b2-mc-2', type: 'mc', prompt: 'Complete: The report ___ by the team before the deadline.', options: ['was completed', 'completed', 'has complete'], answer: 'was completed', explanation: 'Passive voice correta no passado.' },
    { id: 'b2-fill-1', type: 'fill', prompt: 'She suggested ___ the launch by one week.', answer: ['postponing'], explanation: 'Suggest + verb-ing.' },
    { id: 'b2-fill-2', type: 'fill', prompt: 'By this time next year, we ___ the new platform.', answer: ['will have launched'], explanation: 'Future perfect para algo concluido ate um momento futuro.' },
    { id: 'b2-tf-1', type: 'tf', prompt: '"He explained me the process." is correct.', answer: false, correction: 'He explained the process to me.' },
    { id: 'b2-check-1', type: 'check', prompt: 'Sentence: "The issue was solved quickly by our team." This is...', answer: 'correct', correction: 'Correta e natural.' },
  ],
  C1: [
    { id: 'c1-mc-1', type: 'mc', prompt: 'Choose the best formal connector:', options: ['But', 'However', 'And then'], answer: 'However', explanation: 'Conector mais apropriado para registro formal.' },
    { id: 'c1-mc-2', type: 'mc', prompt: 'Complete: Not only ___ costs, but it also improved quality.', options: ['we reduced', 'did we reduce', 'we did reduce'], answer: 'did we reduce', explanation: 'Inversion after "Not only".' },
    { id: 'c1-fill-1', type: 'fill', prompt: 'The proposal is effective; ___, it needs budget approval.', answer: ['nevertheless', 'however'], explanation: 'Conector de contraste adequado.' },
    { id: 'c1-fill-2', type: 'fill', prompt: 'Had we known the risk, we ___ differently.', answer: ['would have acted', 'would have responded'], explanation: 'Third conditional.' },
    { id: 'c1-tf-1', type: 'tf', prompt: '"Despite of the delay, we delivered." is correct.', answer: false, correction: 'Despite the delay, we delivered.' },
    { id: 'c1-check-1', type: 'check', prompt: 'Sentence: "Rarely do we see such consistent results." This is...', answer: 'correct', correction: 'Inversion correta para enfase formal.' },
  ],
  C2: [
    { id: 'c2-mc-1', type: 'mc', prompt: 'Choose the most idiomatic option:', options: ['The plan failed in the last hour.', 'The plan fell through at the eleventh hour.', 'The plan was bad in the final moment.'], answer: 'The plan fell through at the eleventh hour.', explanation: 'Expressao idiomatica com naturalidade de alto nivel.' },
    { id: 'c2-mc-2', type: 'mc', prompt: 'Select the most nuanced sentence:', options: ['I disagree with the policy.', 'I find the policy problematic in several respects.', 'The policy is wrong.'], answer: 'I find the policy problematic in several respects.', explanation: 'Tom sofisticado e argumentativo.' },
    { id: 'c2-fill-1', type: 'fill', prompt: 'The argument is compelling; ___, its assumptions remain contestable.', answer: ['nonetheless', 'however'], explanation: 'Conector de contraste em registro elevado.' },
    { id: 'c2-fill-2', type: 'fill', prompt: 'Were this strategy to fail, we ___ an alternative framework.', answer: ['would require', 'would need'], explanation: 'Estrutura condicional formal.' },
    { id: 'c2-tf-1', type: 'tf', prompt: '"The data are inconclusive." is acceptable in formal English.', answer: true, correction: 'Uso formal aceitavel com "data" plural.' },
    { id: 'c2-check-1', type: 'check', prompt: 'Sentence: "No sooner had we launched than the first feedback arrived." This is...', answer: 'correct', correction: 'Estrutura avancada correta.' },
  ],
};

const state = {
  token: localStorage.getItem(STORAGE_KEYS.token) || '',
  user: null,
  stats: null,
  options: null,
  openAiConfigured: false,
  selectedLevel: 'A2',
  screen: 'welcome',
  aiTopic: 'conversation',
  selectedActivityId: null,
  quizRecommendation: null,
  completed: readStoredJson(STORAGE_KEYS.completed, {}),
  drafts: readStoredJson(STORAGE_KEYS.drafts, {}),
  activitySets: readStoredJson(STORAGE_KEYS.activitySets, {}),
  activityResults: readStoredJson(STORAGE_KEYS.activityResults, {}),
  aiChatHistory: [],
  aiChatLoading: false,
  aiTopicSuggestions: [],
  aiExerciseBatch: null,
  aiExercises: [],
  mediaRecorder: null,
  recordedChunks: [],
  activityAutoSaveTimer: null,
  deferredInstallPrompt: null,
  isInstallAvailable: false,
};

const $ = (id) => document.getElementById(id);

const elements = {
  screens: Array.from(document.querySelectorAll('.screen')),
  userBadge: $('userBadge'),
  logoutButton: $('logoutButton'),
  statusBanner: $('statusBanner'),

  stepAuth: $('stepAuth'),
  stepLevel: $('stepLevel'),
  stepPlan: $('stepPlan'),
  stepDo: $('stepDo'),

  openRegisterButton: $('openRegisterButton'),
  openLoginButton: $('openLoginButton'),

  registerName: $('registerName'),
  registerEmail: $('registerEmail'),
  registerPassword: $('registerPassword'),
  registerLevel: $('registerLevel'),
  registerSubmitButton: $('registerSubmitButton'),
  registerBackButton: $('registerBackButton'),
  registerToLoginButton: $('registerToLoginButton'),
  registerMessage: $('registerMessage'),

  loginEmail: $('loginEmail'),
  loginPassword: $('loginPassword'),
  loginSubmitButton: $('loginSubmitButton'),
  loginBackButton: $('loginBackButton'),
  loginToRegisterButton: $('loginToRegisterButton'),
  googleSlot: $('googleSlot'),
  googleHint: $('googleHint'),
  loginMessage: $('loginMessage'),

  levelSelect: $('levelSelect'),
  manualLevelInfo: $('manualLevelInfo'),
  saveLevelButton: $('saveLevelButton'),
  quizList: $('quizList'),
  checkQuizButton: $('checkQuizButton'),
  applyQuizButton: $('applyQuizButton'),
  quizRecommendationBox: $('quizRecommendationBox'),
  levelSampleText: $('levelSampleText'),
  levelAssessApply: $('levelAssessApply'),
  levelAssessButton: $('levelAssessButton'),
  levelAssessResult: $('levelAssessResult'),
  levelMessage: $('levelMessage'),

  homeGreeting: $('homeGreeting'),
  homeSubtitle: $('homeSubtitle'),
  homeLevelPill: $('homeLevelPill'),
  homeProgressText: $('homeProgressText'),
  homeStreakValue: $('homeStreakValue'),
  homeBestStreakValue: $('homeBestStreakValue'),
  homeDoneValue: $('homeDoneValue'),
  homeAverageValue: $('homeAverageValue'),
  homeLastActiveText: $('homeLastActiveText'),
  homeStartTrailButton: $('homeStartTrailButton'),
  homeOpenAiButton: $('homeOpenAiButton'),
  installAppButton: $('installAppButton'),
  homeChangeLevelButton: $('homeChangeLevelButton'),

  activitiesTitle: $('activitiesTitle'),
  activitiesProgressText: $('activitiesProgressText'),
  activitiesProgressCount: $('activitiesProgressCount'),
  activitiesProgressFill: $('activitiesProgressFill'),
  activitiesList: $('activitiesList'),
  activitiesMessage: $('activitiesMessage'),

  aiTopicConversation: $('aiTopicConversation'),
  aiTopicGrammar: $('aiTopicGrammar'),
  aiTopicExercise: $('aiTopicExercise'),
  aiTopicVoice: $('aiTopicVoice'),
  aiChatPanel: $('aiChatPanel'),
  aiExercisePanel: $('aiExercisePanel'),
  aiVoicePanel: $('aiVoicePanel'),

  aiChatLevel: $('aiChatLevel'),
  aiChatMode: $('aiChatMode'),
  aiChatTopic: $('aiChatTopic'),
  aiChatLog: $('aiChatLog'),
  aiChatSuggestions: $('aiChatSuggestions'),
  aiChatInput: $('aiChatInput'),
  aiVoiceLanguage: $('aiVoiceLanguage'),
  aiChatVoiceButton: $('aiChatVoiceButton'),
  aiChatVoiceStopButton: $('aiChatVoiceStopButton'),
  aiChatSendButton: $('aiChatSendButton'),
  aiChatClearButton: $('aiChatClearButton'),

  aiExerciseLevel: $('aiExerciseLevel'),
  aiExerciseSkill: $('aiExerciseSkill'),
  aiExerciseTopic: $('aiExerciseTopic'),
  aiExerciseGenerateButton: $('aiExerciseGenerateButton'),
  aiExerciseList: $('aiExerciseList'),
  aiExercisePick: $('aiExercisePick'),
  aiExerciseAnswer: $('aiExerciseAnswer'),
  aiExerciseCheckButton: $('aiExerciseCheckButton'),
  aiExerciseResult: $('aiExerciseResult'),

  aiVoiceLevel: $('aiVoiceLevel'),
  aiVoiceName: $('aiVoiceName'),
  aiVoiceRecordButton: $('aiVoiceRecordButton'),
  aiVoiceStopButton: $('aiVoiceStopButton'),
  aiVoiceTranscript: $('aiVoiceTranscript'),
  aiVoiceReply: $('aiVoiceReply'),
  aiVoicePlayer: $('aiVoicePlayer'),
  aiScreenMessage: $('aiScreenMessage'),

  activityBackButton: $('activityBackButton'),
  activityTitle: $('activityTitle'),
  activityObjective: $('activityObjective'),
  activityTips: $('activityTips'),
  activityTasks: $('activityTasks'),
  regenerateActivityButton: $('regenerateActivityButton'),
  saveDraftButton: $('saveDraftButton'),
  requestFeedbackButton: $('requestFeedbackButton'),
  completeActivityButton: $('completeActivityButton'),
  activityAutosaveHint: $('activityAutosaveHint'),
  activityMessage: $('activityMessage'),
  activityFeedback: $('activityFeedback'),

  bottomNav: $('bottomNav'),
  navHome: $('navHome'),
  navActivities: $('navActivities'),
  navAi: $('navAi'),
  navLevel: $('navLevel'),
};

function readStoredJson(key, fallbackValue) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallbackValue;
  } catch (_error) {
    return fallbackValue;
  }
}

function writeStoredJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function setToken(token) {
  state.token = token || '';
  if (state.token) {
    localStorage.setItem(STORAGE_KEYS.token, state.token);
  } else {
    localStorage.removeItem(STORAGE_KEYS.token);
  }
}

function escapeHtml(value) {
  return String(value || '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

async function api(path, options = {}) {
  const headers = {
    ...(state.token ? { Authorization: `Bearer ${state.token}` } : {}),
    ...(options.body ? { 'Content-Type': 'application/json' } : {}),
    ...(options.headers || {}),
  };

  const response = await fetch(path, { ...options, headers });
  const text = await response.text();
  let data = null;

  if (text) {
    try {
      data = JSON.parse(text);
    } catch (_error) {
      data = { error: text };
    }
  }

  if (!response.ok) {
    throw new Error((data && data.error) || `Erro ${response.status}`);
  }

  return data;
}

function setMessage(element, text, tone = 'neutral', html = false) {
  element.className = tone === 'success' ? 'message success' : tone === 'error' ? 'message error' : 'message';
  if (html) {
    element.innerHTML = text;
  } else {
    element.textContent = text;
  }
}

function levels() {
  return state.options && Array.isArray(state.options.levels) && state.options.levels.length
    ? state.options.levels
    : LEVELS_FALLBACK;
}

function chatModes() {
  return state.options && Array.isArray(state.options.chatModes) && state.options.chatModes.length
    ? state.options.chatModes
    : CHAT_MODES_FALLBACK;
}

function exerciseSkills() {
  return state.options && Array.isArray(state.options.exerciseSkills) && state.options.exerciseSkills.length
    ? state.options.exerciseSkills
    : EXERCISE_SKILLS_FALLBACK;
}

function voices() {
  return state.options && Array.isArray(state.options.voices) && state.options.voices.length
    ? state.options.voices
    : VOICES_FALLBACK;
}

function getLevelProfile(levelId) {
  return levels().find((item) => item.id === levelId) || null;
}

function levelNamePt(levelId, fallbackLabel = '') {
  return LEVEL_LABELS_PT[levelId] || fallbackLabel || levelId;
}

function levelLabel(levelId) {
  const profile = getLevelProfile(levelId);
  if (!profile) {
    return `${levelId} - ${levelNamePt(levelId)}`;
  }
  return `${profile.id} - ${levelNamePt(profile.id, profile.label)}`;
}

function fillSelect(selectElement, values, valueFn, labelFn, selectedValue) {
  const current = selectedValue || selectElement.value;
  selectElement.innerHTML = values
    .map((item) => `<option value="${escapeHtml(valueFn(item))}">${escapeHtml(labelFn(item))}</option>`)
    .join('');

  const hasValue = Array.from(selectElement.options).some((option) => option.value === current);
  if (hasValue) {
    selectElement.value = current;
  }
}

function protectedScreens() {
  return new Set(['level', 'home', 'activities', 'activity', 'ai']);
}

function setScreen(screen) {
  const next = !state.user && protectedScreens().has(screen) ? 'welcome' : screen;
  state.screen = next;

  if (next !== 'activity' && state.activityAutoSaveTimer) {
    clearTimeout(state.activityAutoSaveTimer);
    state.activityAutoSaveTimer = null;
  }

  elements.screens.forEach((node) => node.classList.toggle('active', node.dataset.screen === next));

  if (next === 'home') {
    renderHome();
  }
  if (next === 'activities') {
    renderActivities();
  }
  if (next === 'activity') {
    renderActivity();
  }
  if (next === 'ai') {
    renderAiScreen();
  }

  syncJourney();
  syncBottomNav();
  syncStatusBanner();
}

function setStepClasses(active, done = []) {
  const all = [
    { key: 'auth', el: elements.stepAuth },
    { key: 'level', el: elements.stepLevel },
    { key: 'plan', el: elements.stepPlan },
    { key: 'do', el: elements.stepDo },
  ];

  all.forEach((step) => {
    step.el.classList.remove('active', 'done');
    if (done.includes(step.key)) {
      step.el.classList.add('done');
    }
    if (step.key === active) {
      step.el.classList.add('active');
    }
  });
}

function syncJourney() {
  if (!state.user) {
    setStepClasses('auth');
    return;
  }

  if (state.screen === 'level') {
    setStepClasses('level', ['auth']);
    return;
  }
  if (state.screen === 'activity') {
    setStepClasses('do', ['auth', 'level', 'plan']);
    return;
  }
  setStepClasses('plan', ['auth', 'level']);
}

function syncBottomNav() {
  const show = Boolean(state.user);
  elements.bottomNav.classList.toggle('hidden', !show);

  const navMap = {
    home: ['home'],
    activities: ['activities', 'activity'],
    ai: ['ai'],
    level: ['level'],
  };

  elements.navHome.classList.toggle('active', navMap.home.includes(state.screen));
  elements.navActivities.classList.toggle('active', navMap.activities.includes(state.screen));
  elements.navAi.classList.toggle('active', navMap.ai.includes(state.screen));
  elements.navLevel.classList.toggle('active', navMap.level.includes(state.screen));
}

function syncStatusBanner() {
  if (!state.user) {
    elements.statusBanner.textContent = 'Crie sua conta para receber uma trilha pronta no seu nivel.';
    return;
  }

  if (!state.openAiConfigured) {
    elements.statusBanner.textContent = 'Modo Trilha ativo. Para liberar Modo IA, configure OPENAI_API_KEY no servidor.';
    return;
  }

  elements.statusBanner.textContent =
    state.screen === 'ai'
      ? 'Voce esta no Modo IA: chat, exercicios e voz inteligente.'
      : 'Voce esta no Modo Trilha: atividades por nivel com progresso guiado.';
}

function formatLastActiveText(isoDate) {
  if (!isoDate) {
    return 'Conclua uma atividade para iniciar seu historico de evolucao.';
  }

  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) {
    return 'Seu progresso aparece em tempo real.';
  }

  const dateText = date.toLocaleDateString('pt-BR');
  const timeText = date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  return `Ultima atividade registrada em ${dateText} as ${timeText}.`;
}

function syncInstallButton() {
  if (!elements.installAppButton) {
    return;
  }
  elements.installAppButton.classList.toggle('hidden', !state.isInstallAvailable);
}

function syncUserBadge() {
  if (!state.user) {
    elements.userBadge.textContent = 'Visitante';
    elements.logoutButton.classList.add('hidden');
    return;
  }

  const name = state.user.name || state.user.email || 'Aluno';
  const levelId = state.user.level || state.selectedLevel || 'A2';
  elements.userBadge.textContent = `${name} - ${levelLabel(levelId)}`;
  elements.logoutButton.classList.remove('hidden');
}

function populateCoreSelects() {
  const levelValues = levels();

  fillSelect(elements.registerLevel, levelValues, (item) => item.id, (item) => levelLabel(item.id), state.selectedLevel);
  fillSelect(elements.levelSelect, levelValues, (item) => item.id, (item) => levelLabel(item.id), state.selectedLevel);
  fillSelect(elements.aiChatLevel, levelValues, (item) => item.id, (item) => levelLabel(item.id), state.selectedLevel);
  fillSelect(elements.aiExerciseLevel, levelValues, (item) => item.id, (item) => levelLabel(item.id), state.selectedLevel);
  fillSelect(elements.aiVoiceLevel, levelValues, (item) => item.id, (item) => levelLabel(item.id), state.selectedLevel);

  fillSelect(elements.aiChatMode, chatModes(), (item) => item, (item) => item, elements.aiChatMode.value || 'conversation');
  fillSelect(elements.aiExerciseSkill, exerciseSkills(), (item) => item, (item) => item, elements.aiExerciseSkill.value || 'mixed');
  fillSelect(elements.aiVoiceName, voices(), (item) => item, (item) => item, elements.aiVoiceName.value || 'alloy');
}

function renderManualLevelInfo() {
  const profile = getLevelProfile(elements.levelSelect.value);
  if (!profile) {
    elements.manualLevelInfo.textContent = '';
    return;
  }

  const focus = LEVEL_FOCUS_PT[profile.id] || 'comunicacao pratica do dia a dia';
  elements.manualLevelInfo.textContent = `${profile.id} (${levelNamePt(profile.id, profile.label)}): foco em ${focus}.`;
}

function aiPanelForTopic(topic) {
  if (topic === 'exercise') return 'exercise';
  if (topic === 'voice') return 'voice';
  return 'chat';
}

function aiTopicFromChatMode(mode) {
  if (mode === 'grammar') return 'grammar';
  if (mode === 'voice') return 'voice';
  return 'conversation';
}

function setAiTopic(topic, options = {}) {
  const allowed = new Set(['conversation', 'grammar', 'exercise', 'voice']);
  const nextTopic = allowed.has(topic) ? topic : 'conversation';
  const shouldFocus = options.focus !== false;

  state.aiTopic = nextTopic;
  const activePanel = aiPanelForTopic(nextTopic);

  elements.aiChatPanel.classList.toggle('hidden', activePanel !== 'chat');
  elements.aiExercisePanel.classList.toggle('hidden', activePanel !== 'exercise');
  elements.aiVoicePanel.classList.toggle('hidden', activePanel !== 'voice');

  elements.aiTopicConversation.classList.toggle('active', nextTopic === 'conversation');
  elements.aiTopicGrammar.classList.toggle('active', nextTopic === 'grammar');
  elements.aiTopicExercise.classList.toggle('active', nextTopic === 'exercise');
  elements.aiTopicVoice.classList.toggle('active', nextTopic === 'voice');

  if (nextTopic === 'grammar') {
    elements.aiChatMode.value = 'grammar';
  } else if (nextTopic === 'conversation') {
    if (elements.aiChatMode.value === 'grammar' || elements.aiChatMode.value === 'voice') {
      elements.aiChatMode.value = 'conversation';
    }
  } else if (nextTopic === 'voice') {
    const supportsVoiceMode = Array.from(elements.aiChatMode.options).some((option) => option.value === 'voice');
    if (supportsVoiceMode) {
      elements.aiChatMode.value = 'voice';
    }
  }

  if (activePanel === 'chat' && shouldFocus) {
    elements.aiChatInput.focus();
  }
}

function renderQuiz() {
  elements.quizList.innerHTML = QUIZ_QUESTIONS.map((item, index) => `
    <article class="quiz-item">
      <strong>${index + 1}. ${escapeHtml(item.question)}</strong>
      ${item.options
        .map(
          (option) => `
            <label class="quiz-option">
              <input type="radio" name="${escapeHtml(item.id)}" value="${option.score}" />
              <span>${escapeHtml(option.label)}</span>
            </label>
          `,
        )
        .join('')}
    </article>
  `).join('');

  setMessage(elements.quizRecommendationBox, 'O nivel recomendado vai aparecer aqui.');
}

function quizLevelByAverage(average) {
  if (average <= 1.5) return 'A1';
  if (average <= 2.5) return 'A2';
  if (average <= 3.5) return 'B1';
  if (average <= 4.5) return 'B2';
  if (average <= 5.2) return 'C1';
  return 'C2';
}

function checkQuiz() {
  const scores = [];

  for (const item of QUIZ_QUESTIONS) {
    const checked = elements.quizList.querySelector(`input[name="${item.id}"]:checked`);
    if (!checked) {
      setMessage(elements.quizRecommendationBox, 'Responda todas as perguntas do teste rapido.', 'error');
      return;
    }
    scores.push(Number(checked.value));
  }

  const average = scores.reduce((sum, value) => sum + value, 0) / scores.length;
  const recommended = quizLevelByAverage(average);
  state.quizRecommendation = recommended;
  elements.levelSelect.value = recommended;
  renderManualLevelInfo();

  setMessage(
    elements.quizRecommendationBox,
    `Nivel recomendado: ${levelLabel(recommended)}.`,
    'success',
  );
  setMessage(elements.levelMessage, 'Se quiser, clique em "Aplicar recomendacao" para salvar o nivel.', 'success');
}

function activitiesForLevel(levelId) {
  return ACTIVITY_BY_LEVEL[levelId] || [];
}

function completedForLevel(levelId) {
  return Array.isArray(state.completed[levelId]) ? state.completed[levelId] : [];
}

function questionBankForLevel(levelId) {
  const order = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  const index = Math.max(0, order.indexOf(levelId));
  const nearbyLevels = [order[index - 1], order[index], order[index + 1]].filter(Boolean);

  const merged = nearbyLevels.flatMap((id) => OBJECTIVE_BANK_BY_LEVEL[id] || []);
  const byId = new Map(merged.map((question) => [question.id, question]));
  return Array.from(byId.values());
}

function shuffleArray(values) {
  const cloned = [...values];
  for (let i = cloned.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [cloned[i], cloned[j]] = [cloned[j], cloned[i]];
  }
  return cloned;
}

function normalizeCompare(value) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ');
}

function currentLevelId() {
  return state.selectedLevel || (state.user && state.user.level) || 'A2';
}

function activitySessionKey(activityId, levelId = currentLevelId()) {
  return `${levelId}:${activityId}`;
}

function buildObjectiveSet(levelId, count = 6) {
  const bank = questionBankForLevel(levelId);
  const selected = shuffleArray(bank).slice(0, Math.min(count, bank.length));
  return selected.map((question) => ({
    ...question,
    options: Array.isArray(question.options) ? [...question.options] : question.options,
    answer: Array.isArray(question.answer) ? [...question.answer] : question.answer,
  }));
}

function objectiveTypeLabel(type) {
  const labels = {
    mc: 'Multipla escolha',
    tf: 'Verdadeiro/Falso',
    fill: 'Completar',
    check: 'Certo/Errado',
  };
  return labels[type] || 'Questao';
}

function expectedAnswerLabel(question) {
  if (!question) {
    return '-';
  }

  if (question.type === 'tf') {
    return question.answer ? 'Verdadeiro' : 'Falso';
  }
  if (question.type === 'check') {
    return question.answer === 'correct' ? 'Esta correta' : 'Precisa de correcao';
  }
  if (Array.isArray(question.answer)) {
    return question.answer.join(' / ');
  }
  return String(question.answer || '-');
}

function setActivityAutosaveHint(text) {
  if (!elements.activityAutosaveHint) {
    return;
  }
  elements.activityAutosaveHint.textContent = text || '';
}

function ensureActivitySet(item, forceNew = false) {
  const key = activitySessionKey(item.id);
  const currentSet = state.activitySets[key];

  if (!forceNew && Array.isArray(currentSet) && currentSet.length) {
    return { key, questions: currentSet };
  }

  const nextSet = buildObjectiveSet(currentLevelId(), 6);
  state.activitySets[key] = nextSet;
  state.drafts[key] = {};
  delete state.activityResults[key];
  writeStoredJson(STORAGE_KEYS.activitySets, state.activitySets);
  writeStoredJson(STORAGE_KEYS.drafts, state.drafts);
  writeStoredJson(STORAGE_KEYS.activityResults, state.activityResults);

  return { key, questions: nextSet };
}

function renderObjectiveInput(question, questionId, answerValue) {
  if (question.type === 'mc') {
    return (question.options || [])
      .map(
        (option) => `
          <label class="quiz-option">
            <input type="radio" data-question-id="${escapeHtml(questionId)}" name="activity-${escapeHtml(questionId)}" value="${escapeHtml(option)}" ${answerValue === option ? 'checked' : ''} />
            <span>${escapeHtml(option)}</span>
          </label>
        `,
      )
      .join('');
  }

  if (question.type === 'tf') {
    return `
      <label class="quiz-option">
        <input type="radio" data-question-id="${escapeHtml(questionId)}" name="activity-${escapeHtml(questionId)}" value="true" ${String(answerValue) === 'true' ? 'checked' : ''} />
        <span>Verdadeiro</span>
      </label>
      <label class="quiz-option">
        <input type="radio" data-question-id="${escapeHtml(questionId)}" name="activity-${escapeHtml(questionId)}" value="false" ${String(answerValue) === 'false' ? 'checked' : ''} />
        <span>Falso</span>
      </label>
    `;
  }

  if (question.type === 'check') {
    return `
      <label class="quiz-option">
        <input type="radio" data-question-id="${escapeHtml(questionId)}" name="activity-${escapeHtml(questionId)}" value="correct" ${String(answerValue) === 'correct' ? 'checked' : ''} />
        <span>Esta correta</span>
      </label>
      <label class="quiz-option">
        <input type="radio" data-question-id="${escapeHtml(questionId)}" name="activity-${escapeHtml(questionId)}" value="wrong" ${String(answerValue) === 'wrong' ? 'checked' : ''} />
        <span>Precisa de correcao</span>
      </label>
    `;
  }

  return `<input class="answer-input" data-question-id="${escapeHtml(questionId)}" type="text" value="${escapeHtml(answerValue || '')}" placeholder="Digite uma palavra/expressao" />`;
}

function renderHome() {
  if (!state.user) {
    return;
  }

  const name = state.user.name || 'Aluno';
  const levelId = currentLevelId();
  const items = activitiesForLevel(levelId);
  const done = completedForLevel(levelId).length;
  const stats = state.stats || {};
  const streak = Number(stats.currentStreakDays) || 0;
  const bestStreak = Number(stats.bestStreakDays) || 0;
  const completedActivities = Math.max(Number(stats.completedActivities) || 0, done);
  const averageScore =
    typeof stats.averageScore === 'number' ? `${Math.max(0, Math.min(100, stats.averageScore))}%` : '-';
  const activeDays = Number(stats.activeDays) || 0;

  elements.homeGreeting.textContent = `Ola, ${name}.`;
  elements.homeSubtitle.textContent = `Streak atual: ${streak} dia(s) | Dias ativos: ${activeDays}`;
  elements.homeLevelPill.textContent = levelLabel(levelId);
  elements.homeProgressText.textContent = `${done} de ${items.length} atividades concluidas neste nivel.`;
  if (elements.homeStreakValue) {
    elements.homeStreakValue.textContent = String(streak);
  }
  if (elements.homeBestStreakValue) {
    elements.homeBestStreakValue.textContent = String(bestStreak);
  }
  if (elements.homeDoneValue) {
    elements.homeDoneValue.textContent = String(completedActivities);
  }
  if (elements.homeAverageValue) {
    elements.homeAverageValue.textContent = averageScore;
  }
  if (elements.homeLastActiveText) {
    elements.homeLastActiveText.textContent = formatLastActiveText(stats.lastActiveAt);
  }
  syncInstallButton();
}

function renderActivities() {
  if (!state.user) {
    return;
  }

  const levelId = currentLevelId();
  const items = activitiesForLevel(levelId);
  const doneList = new Set(completedForLevel(levelId));
  const total = items.length;
  const doneCount = doneList.size;
  const progressPercent = total ? Math.round((doneCount / total) * 100) : 0;

  elements.activitiesTitle.textContent = `Trilha ${levelLabel(levelId)}`;
  if (elements.activitiesProgressText) {
    elements.activitiesProgressText.textContent = `${progressPercent}% concluido`;
  }
  if (elements.activitiesProgressCount) {
    elements.activitiesProgressCount.textContent = `${doneCount}/${total}`;
  }
  if (elements.activitiesProgressFill) {
    elements.activitiesProgressFill.style.width = `${Math.max(0, Math.min(100, progressPercent))}%`;
  }

  if (!items.length) {
    elements.activitiesList.innerHTML = '<div class="message">Sem atividades para este nivel.</div>';
    return;
  }

  elements.activitiesList.innerHTML = items
    .map((item, index) => {
      const done = doneList.has(item.id);
      return `
        <article class="activity-card ${done ? 'done' : ''}">
          <div class="activity-top">
            <strong>${index + 1}. ${escapeHtml(item.title)}</strong>
            <span class="pill ${done ? 'ok' : ''}">${done ? 'concluida' : 'pendente'}</span>
          </div>
          <p class="line" style="margin-top: 8px">${escapeHtml(item.objective)}</p>
          <p class="line" style="margin-top: 6px">Formato objetivo: multipla escolha, V/F, completar e certo/errado.</p>
          <div class="row" style="margin-top: 10px">
            <button class="btn" data-open-activity="${escapeHtml(item.id)}">Abrir</button>
          </div>
        </article>
      `;
    })
    .join('');
}

function selectedActivity() {
  const levelId = currentLevelId();
  return activitiesForLevel(levelId).find((item) => item.id === state.selectedActivityId) || null;
}

function renderActivity() {
  const item = selectedActivity();
  if (!item) {
    elements.activityTitle.textContent = 'Atividade';
    elements.activityObjective.textContent = 'Escolha uma atividade da trilha.';
    elements.activityTips.innerHTML = '';
    elements.activityTasks.innerHTML = '';
    elements.completeActivityButton.disabled = true;
    setActivityAutosaveHint('');
    return;
  }

  elements.activityTitle.textContent = item.title;
  elements.activityObjective.textContent = item.objective;
  elements.activityTips.innerHTML = item.tips.map((tip) => `<li>${escapeHtml(tip)}</li>`).join('');

  const session = ensureActivitySet(item, false);
  if (!session.questions.length) {
    elements.activityTasks.innerHTML = '<div class="message">Sem questoes disponiveis para este nivel.</div>';
    setMessage(elements.activityMessage, 'Sem questoes para este nivel no momento.', 'error');
    elements.completeActivityButton.disabled = true;
    setActivityAutosaveHint('');
    return;
  }

  const draft = state.drafts[session.key] || {};
  const previousResult = state.activityResults[session.key];
  const detailsById = new Map(
    (previousResult && Array.isArray(previousResult.details) ? previousResult.details : []).map((entry) => [
      entry.id,
      entry,
    ]),
  );

  elements.activityTasks.innerHTML = session.questions
    .map((question, index) => {
      const questionId = question.id || `q-${index + 1}`;
      const answerValue = draft[questionId] || '';
      const detail = detailsById.get(questionId);
      const cardStatus = detail ? (detail.ok ? 'correct' : 'wrong') : '';
      const feedbackHtml = detail
        ? detail.ok
          ? '<div class="question-feedback ok">Boa! Esta questao esta correta.</div>'
          : `
              <div class="question-feedback error">
                Sua resposta: <strong>${escapeHtml(detail.userAnswer || '-')}</strong><br />
                Esperado: <strong>${escapeHtml(expectedAnswerLabel(question))}</strong>
                ${detail.correction ? `<br />Dica: ${escapeHtml(detail.correction)}` : ''}
              </div>
            `
        : '';
      return `
        <article class="question-card ${cardStatus}">
          <div class="question-top">
            <strong>${index + 1}. Questao</strong>
            <span class="question-type">${escapeHtml(objectiveTypeLabel(question.type))}</span>
          </div>
          <div class="question-prompt">${escapeHtml(question.prompt)}</div>
          ${renderObjectiveInput(question, questionId, answerValue)}
          ${feedbackHtml}
        </article>
      `;
    })
    .join('');

  if (previousResult && typeof previousResult.score === 'number') {
    setMessage(elements.activityMessage, `Ultima tentativa: ${previousResult.score}% (${previousResult.correct}/${previousResult.total}).`, previousResult.score >= 70 ? 'success' : 'error');
  } else {
    setMessage(elements.activityMessage, 'Responda as questoes objetivas e clique em "Corrigir agora".');
  }

  elements.completeActivityButton.disabled = !(
    previousResult &&
    typeof previousResult.score === 'number' &&
    previousResult.score >= 70
  );
  setActivityAutosaveHint('As respostas sao salvas automaticamente.');
}

function collectTaskAnswers() {
  const answers = {};
  elements.activityTasks.querySelectorAll('input[type="radio"][data-question-id]:checked').forEach((field) => {
    answers[field.dataset.questionId] = field.value;
  });
  elements.activityTasks.querySelectorAll('input[type="text"][data-question-id]').forEach((field) => {
    const value = field.value.trim();
    if (value) {
      answers[field.dataset.questionId] = value;
    }
  });
  return answers;
}

function queueActivityAutoSave() {
  if (state.activityAutoSaveTimer) {
    clearTimeout(state.activityAutoSaveTimer);
  }

  state.activityAutoSaveTimer = setTimeout(() => {
    saveDraft({ silent: true });
    state.activityAutoSaveTimer = null;
  }, 550);
}

function saveDraft(options = {}) {
  const silent = Boolean(options.silent);
  const item = selectedActivity();
  if (!item) {
    if (!silent) {
      setMessage(elements.activityMessage, 'Abra uma atividade para salvar.', 'error');
    }
    return;
  }
  const session = ensureActivitySet(item, false);
  state.drafts[session.key] = collectTaskAnswers();
  writeStoredJson(STORAGE_KEYS.drafts, state.drafts);

  const timeText = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  if (silent) {
    setActivityAutosaveHint(`Rascunho salvo automaticamente as ${timeText}.`);
    return;
  }

  setMessage(elements.activityMessage, 'Respostas salvas com sucesso.', 'success');
  setActivityAutosaveHint(`Rascunho salvo as ${timeText}.`);
}

function evaluateObjectiveAnswers(questions, answers) {
  let correct = 0;
  const details = [];

  for (let index = 0; index < questions.length; index += 1) {
    const question = questions[index];
    const questionId = question.id || `q-${index + 1}`;
    const userAnswer = answers[questionId];
    let ok = false;

    if (question.type === 'mc') {
      ok = normalizeCompare(userAnswer) === normalizeCompare(question.answer);
    } else if (question.type === 'tf') {
      ok = normalizeCompare(userAnswer) === (question.answer ? 'true' : 'false');
    } else if (question.type === 'check') {
      ok = normalizeCompare(userAnswer) === normalizeCompare(question.answer);
    } else if (question.type === 'fill') {
      const expected = Array.isArray(question.answer) ? question.answer : [question.answer];
      ok = expected.some((value) => normalizeCompare(value) === normalizeCompare(userAnswer));
    }

    if (ok) {
      correct += 1;
    }

    details.push({
      id: questionId,
      ok,
      userAnswer: userAnswer || '',
      correction: question.correction || question.explanation || '',
    });
  }

  const total = questions.length || 1;
  const score = Math.round((correct / total) * 100);
  return { score, correct, total, details };
}

function requestFeedback() {
  const item = selectedActivity();
  if (!item) {
    setMessage(elements.activityFeedback, 'Abra uma atividade para corrigir.', 'error');
    return;
  }

  const session = ensureActivitySet(item, false);
  const answers = collectTaskAnswers();
  const answeredCount = Object.keys(answers).length;
  if (answeredCount < session.questions.length) {
    const missing = session.questions.length - answeredCount;
    setMessage(
      elements.activityFeedback,
      `Faltam ${missing} questao(oes). Responda tudo antes de corrigir.`,
      'error',
    );
    return;
  }

  const result = evaluateObjectiveAnswers(session.questions, answers);
  state.activityResults[session.key] = result;
  writeStoredJson(STORAGE_KEYS.activityResults, state.activityResults);
  saveDraft({ silent: true });
  renderActivity();

  const wrongHints = result.details
    .filter((entry) => !entry.ok && entry.correction)
    .slice(0, 3)
    .map((entry, index) => `${index + 1}) ${escapeHtml(entry.correction)}`)
    .join('<br />');

  const body = `
    <strong>Resultado: ${result.score}%</strong><br />
    Acertos: ${result.correct}/${result.total}<br />
    ${wrongHints ? `Ajustes rapidos:<br />${wrongHints}` : 'Excelente! Continue para concluir.'}
  `;

  setMessage(elements.activityFeedback, body, result.score >= 70 ? 'success' : 'error', true);
  setMessage(elements.activityMessage, `Resultado registrado: ${result.score}%.`, result.score >= 70 ? 'success' : 'error');
}

async function completeActivity() {
  const item = selectedActivity();
  if (!item) {
    setMessage(elements.activityMessage, 'Abra uma atividade para concluir.', 'error');
    return;
  }

  const session = ensureActivitySet(item, false);
  const result = state.activityResults[session.key];
  if (!result || typeof result.score !== 'number') {
    setMessage(elements.activityMessage, 'Clique em "Corrigir agora" antes de concluir.', 'error');
    return;
  }
  if (result.score < 70) {
    setMessage(elements.activityMessage, 'Para concluir, alcance pelo menos 70%. Clique em "Novo lote" e tente novamente.', 'error');
    return;
  }

  const levelId = currentLevelId();
  if (!Array.isArray(state.completed[levelId])) {
    state.completed[levelId] = [];
  }
  if (!state.completed[levelId].includes(item.id)) {
    state.completed[levelId].push(item.id);
  }
  writeStoredJson(STORAGE_KEYS.completed, state.completed);

  if (state.user && state.token) {
    try {
      const syncResult = await api('/progress/activity', {
        method: 'POST',
        body: JSON.stringify({
          activityId: item.id,
          level: levelId,
          score: result.score,
        }),
      });
      if (syncResult && syncResult.stats) {
        state.stats = syncResult.stats;
      }
    } catch (_error) {
      // Keep local progress even if sync fails temporarily.
    }
  }

  setMessage(elements.activityMessage, 'Atividade concluida. Excelente trabalho.', 'success');
  renderHome();
  renderActivities();
}

function regenerateActivitySet() {
  const item = selectedActivity();
  if (!item) {
    setMessage(elements.activityMessage, 'Abra uma atividade para gerar um novo lote.', 'error');
    return;
  }

  ensureActivitySet(item, true);
  renderActivity();
  setMessage(elements.activityFeedback, 'Novo lote gerado com questoes objetivas variadas.');
}

function renderAiChatLog() {
  const history = Array.isArray(state.aiChatHistory) ? state.aiChatHistory : [];

  if (!history.length && !state.aiChatLoading) {
    elements.aiChatLog.innerHTML =
      '<div class="chat-empty">Comece a conversa. Eu respondo como seu tutor em estilo WhatsApp.</div>';
    return;
  }

  const lines = history.map((message) => {
    const role = message.role === 'user' ? 'user' : 'assistant';
    const label = role === 'user' ? 'Voce' : 'Tutor IA';
    return `
      <div class="bubble ${role}">
        <span class="bubble-label">${escapeHtml(label)}</span>
        <div class="bubble-text">${escapeHtml(message.content || '')}</div>
      </div>
    `;
  });

  if (state.aiChatLoading) {
    lines.push(`
      <div class="bubble assistant typing">
        <span class="bubble-label">Tutor IA</span>
        <div class="bubble-text">Digitando...</div>
      </div>
    `);
  }

  elements.aiChatLog.innerHTML = lines.join('');

  elements.aiChatLog.scrollTop = elements.aiChatLog.scrollHeight;
}

function nextAiTopicSuggestions(limit = 4) {
  const normalizedUsed = new Set(
    (state.aiChatHistory || [])
      .filter((message) => message.role === 'user')
      .map((message) => String(message.content || '').trim().toLowerCase())
      .filter(Boolean),
  );

  const filteredPool = CHAT_TOPIC_SUGGESTIONS.filter(
    (item) => !normalizedUsed.has(String(item.prompt || '').trim().toLowerCase()),
  );
  const source = filteredPool.length >= limit ? filteredPool : CHAT_TOPIC_SUGGESTIONS;
  return shuffleArray(source).slice(0, Math.max(1, limit));
}

function renderAiChatSuggestions() {
  if (!elements.aiChatSuggestions) {
    return;
  }
  const suggestions = Array.isArray(state.aiTopicSuggestions) ? state.aiTopicSuggestions : [];
  if (!suggestions.length) {
    elements.aiChatSuggestions.innerHTML = '';
    return;
  }

  elements.aiChatSuggestions.innerHTML = suggestions
    .map(
      (item, index) => `
        <button type="button" class="suggestion-chip" data-ai-suggestion-index="${index}">
          ${escapeHtml(item.label || item.prompt || '')}
        </button>
      `,
    )
    .join('');

  elements.aiChatSuggestions.insertAdjacentHTML(
    'beforeend',
    '<button type="button" class="suggestion-chip" data-ai-suggestion-refresh="1">Mais ideias</button>',
  );
}

function refreshAiChatSuggestions() {
  state.aiTopicSuggestions = nextAiTopicSuggestions(4);
  renderAiChatSuggestions();
}

function resizeChatInput() {
  elements.aiChatInput.style.height = 'auto';
  const maxHeight = 120;
  const nextHeight = Math.min(elements.aiChatInput.scrollHeight, maxHeight);
  elements.aiChatInput.style.height = `${nextHeight}px`;
}

async function sendAiChat() {
  if (state.aiChatLoading) {
    return;
  }

  const userText = elements.aiChatInput.value.trim();
  if (!userText) {
    return;
  }

  state.aiChatHistory.push({ role: 'user', content: userText });
  elements.aiChatInput.value = '';
  resizeChatInput();
  state.aiChatLoading = true;
  renderAiChatLog();
  elements.aiChatSendButton.disabled = true;

  try {
    const result = await api('/chat', {
      method: 'POST',
      body: JSON.stringify({
        level: elements.aiChatLevel.value || state.selectedLevel,
        mode: 'conversation',
        topic: '',
        correctionMode: 'balanced',
        messages: state.aiChatHistory,
      }),
    });

    state.aiChatHistory.push({ role: 'assistant', content: result.reply || 'Sem resposta.' });
    if (state.aiChatHistory.length > 20) {
      state.aiChatHistory = state.aiChatHistory.slice(-20);
    }
  } catch (error) {
    state.aiChatHistory.push({ role: 'assistant', content: `Erro: ${error.message}` });
  } finally {
    state.aiChatLoading = false;
    elements.aiChatSendButton.disabled = false;
    renderAiChatLog();
    refreshAiChatSuggestions();
    elements.aiChatInput.focus();
  }
}

function clearAiChat() {
  state.aiChatHistory = [];
  state.aiChatLoading = false;
  renderAiChatLog();
  refreshAiChatSuggestions();
  elements.aiChatInput.focus();
}

function renderAiExercises() {
  const exercises = state.aiExercises;

  if (!exercises.length) {
    elements.aiExerciseList.innerHTML = '<div class="message">Gere exercicios para aparecerem aqui.</div>';
    elements.aiExercisePick.innerHTML = '<option value="">Sem exercicios</option>';
    return;
  }

  elements.aiExerciseList.innerHTML = exercises
    .map(
      (item, index) => `
        <article class="exercise-card-mini">
          <strong>${index + 1}. ${escapeHtml(item.prompt || 'Exercicio')}</strong>
          ${Array.isArray(item.choices) && item.choices.length
            ? `<ul class="list">${item.choices.map((choice) => `<li>${escapeHtml(choice)}</li>`).join('')}</ul>`
            : ''}
          <div class="row" style="margin-top: 8px">
            <button class="btn secondary" data-ai-ex-index="${index}">Selecionar</button>
          </div>
        </article>
      `,
    )
    .join('');

  elements.aiExercisePick.innerHTML = exercises
    .map((item, index) => `<option value="${index}">${index + 1}. ${escapeHtml(item.prompt || 'Exercicio')}</option>`)
    .join('');
}

async function generateAiExercises() {
  elements.aiExerciseGenerateButton.disabled = true;
  setMessage(elements.aiExerciseResult, 'Gerando exercicios...');

  try {
    const result = await api('/exercises/generate', {
      method: 'POST',
      body: JSON.stringify({
        level: elements.aiExerciseLevel.value || state.selectedLevel,
        skill: elements.aiExerciseSkill.value || 'mixed',
        topic: elements.aiExerciseTopic.value || 'general english',
        count: 4,
      }),
    });

    state.aiExerciseBatch = result;
    state.aiExercises = Array.isArray(result.exercises) ? result.exercises : [];
    renderAiExercises();
    setMessage(elements.aiExerciseResult, 'Exercicios gerados com sucesso.', 'success');
  } catch (error) {
    state.aiExerciseBatch = null;
    state.aiExercises = [];
    renderAiExercises();
    setMessage(elements.aiExerciseResult, error.message, 'error');
  } finally {
    elements.aiExerciseGenerateButton.disabled = false;
  }
}

function pickAiExercise(index) {
  const value = String(index);
  const exists = Array.from(elements.aiExercisePick.options).some((option) => option.value === value);
  if (exists) {
    elements.aiExercisePick.value = value;
  }
}
async function checkAiExercise() {
  const index = Number(elements.aiExercisePick.value);
  const item = Number.isInteger(index) ? state.aiExercises[index] : null;

  if (!item) {
    setMessage(elements.aiExerciseResult, 'Selecione um exercicio para corrigir.', 'error');
    return;
  }

  const answer = elements.aiExerciseAnswer.value.trim();
  if (!answer) {
    setMessage(elements.aiExerciseResult, 'Digite sua resposta antes de corrigir.', 'error');
    return;
  }

  elements.aiExerciseCheckButton.disabled = true;
  setMessage(elements.aiExerciseResult, 'Corrigindo resposta...');

  try {
    const result = await api('/exercises/check', {
      method: 'POST',
      body: JSON.stringify({
        level: elements.aiExerciseLevel.value || state.selectedLevel,
        topic: elements.aiExerciseTopic.value || 'general english',
        exerciseType: item.type || 'general',
        prompt: item.prompt || '',
        expectedAnswer: item.answer || '',
        userAnswer: answer,
      }),
    });

    const score = typeof result.score === 'number' ? `${result.score}%` : '--';
    const status = result.correct ? 'Correta' : 'Melhorar';

    setMessage(
      elements.aiExerciseResult,
      `<strong>${status}</strong><br />Nota: ${escapeHtml(score)}<br />${escapeHtml(result.explanation || 'Sem explicacao.')}`,
      result.correct ? 'success' : 'neutral',
      true,
    );

    await refreshSession(true);
  } catch (error) {
    setMessage(elements.aiExerciseResult, error.message, 'error');
  } finally {
    elements.aiExerciseCheckButton.disabled = false;
  }
}

async function blobToBase64(blob) {
  const buffer = await blob.arrayBuffer();
  let binary = '';
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < bytes.length; i += 0x8000) {
    binary += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  }
  return btoa(binary);
}

function friendlyVoiceErrorMessage(errorMessage) {
  const raw = String(errorMessage || '');
  const lower = raw.toLowerCase();

  if (
    lower.includes('transcribe') ||
    lower.includes('tts') ||
    lower.includes('voice') ||
    lower.includes('audio') ||
    lower.includes('model') ||
    lower.includes('compatible')
  ) {
    return 'A chave OpenAI respondeu sem suporte completo de voz. Vou manter transcricao e resposta em texto, e usar voz do navegador quando possivel.';
  }

  return raw || 'Nao foi possivel processar o audio.';
}

function preferredRecorderMimeType() {
  if (!window.MediaRecorder || typeof window.MediaRecorder.isTypeSupported !== 'function') {
    return '';
  }

  const candidates = [
    'audio/webm;codecs=opus',
    'audio/webm',
    'audio/mp4',
    'audio/ogg;codecs=opus',
  ];

  return candidates.find((mimeType) => window.MediaRecorder.isTypeSupported(mimeType)) || '';
}

function selectedVoiceLanguage() {
  if (!elements.aiVoiceLanguage || !elements.aiVoiceLanguage.value) {
    return 'en-US';
  }
  return elements.aiVoiceLanguage.value === 'pt-BR' ? 'pt-BR' : 'en-US';
}

function transcriptionLanguageHint(locale) {
  return locale === 'pt-BR' ? 'pt' : 'en';
}

function chatSystemPromptForVoice(locale) {
  return locale === 'pt-BR'
    ? 'For this voice interaction, reply in clear Brazilian Portuguese and keep the answer practical.'
    : 'For this voice interaction, reply in clear American English and keep the answer practical.';
}

function speechInstructionsForLocale(locale) {
  return locale === 'pt-BR'
    ? 'Speak in natural Brazilian Portuguese with clear intonation and friendly pace.'
    : 'Speak in natural American English with clear intonation and friendly pace.';
}

async function hasAudioInputDevice() {
  if (!navigator.mediaDevices || typeof navigator.mediaDevices.enumerateDevices !== 'function') {
    return true;
  }

  const devices = await navigator.mediaDevices.enumerateDevices();
  return devices.some((device) => device.kind === 'audioinput');
}

function friendlyRecorderError(error) {
  const name = String(error && error.name ? error.name : '').toLowerCase();
  const message = String(error && error.message ? error.message : '').toLowerCase();

  if (name.includes('notfound') || message.includes('requested device not found')) {
    return 'Nenhum microfone foi encontrado. Conecte/ative um microfone no sistema e tente novamente.';
  }
  if (name.includes('notallowed') || name.includes('security')) {
    return 'Permissao de microfone bloqueada. Libere o microfone para este site no navegador.';
  }
  if (name.includes('notreadable') || message.includes('track start failed')) {
    return 'O microfone parece estar em uso por outro app. Feche outros apps de chamada e tente novamente.';
  }

  return error && error.message ? error.message : 'Nao foi possivel iniciar a gravacao de voz.';
}

function setVoiceRecordingUi(isRecording) {
  if (elements.aiVoiceRecordButton) {
    elements.aiVoiceRecordButton.disabled = Boolean(isRecording);
  }
  if (elements.aiVoiceStopButton) {
    elements.aiVoiceStopButton.disabled = !isRecording;
  }
  if (elements.aiChatVoiceButton) {
    elements.aiChatVoiceButton.classList.toggle('hidden', Boolean(isRecording));
    elements.aiChatVoiceButton.disabled = false;
  }
  if (elements.aiChatVoiceStopButton) {
    elements.aiChatVoiceStopButton.classList.toggle('hidden', !isRecording);
    elements.aiChatVoiceStopButton.disabled = !isRecording;
  }
}

async function processVoiceBlob(blob, mimeType) {
  try {
    const level = elements.aiVoiceLevel.value || state.selectedLevel;
    const voice = elements.aiVoiceName.value || 'alloy';
    const locale = selectedVoiceLanguage();
    const audioBase64 = await blobToBase64(blob);

    setMessage(elements.aiScreenMessage, 'Transcrevendo audio...');
    const transcription = await api('/voice/transcribe', {
      method: 'POST',
      body: JSON.stringify({
        level,
        language: transcriptionLanguageHint(locale),
        audioBase64,
        mimeType: mimeType || 'audio/webm',
      }),
    });
    const transcript = String(transcription.text || '').trim();
    if (!transcript) {
      throw new Error('Nao foi possivel transcrever o audio.');
    }
    setMessage(elements.aiVoiceTranscript, transcript, 'success');

    setMessage(elements.aiScreenMessage, 'Gerando resposta da IA...');
    const chatResult = await api('/chat', {
      method: 'POST',
      body: JSON.stringify({
        level,
        mode: 'conversation',
        topic: '',
        correctionMode: 'balanced',
        systemPrompt: chatSystemPromptForVoice(locale),
        messages: [{ role: 'user', content: transcript }],
      }),
    });
    const reply = String(chatResult.reply || '').trim() || 'Sem resposta.';
    setMessage(elements.aiVoiceReply, reply, 'success');

    state.aiChatHistory.push({ role: 'user', content: transcript });
    state.aiChatHistory.push({ role: 'assistant', content: reply });
    if (state.aiChatHistory.length > 20) {
      state.aiChatHistory = state.aiChatHistory.slice(-20);
    }
    renderAiChatLog();
    refreshAiChatSuggestions();

    let playedAudio = false;
    setMessage(elements.aiScreenMessage, 'Gerando audio da resposta...');
    try {
      const speakResult = await api('/voice/speak', {
        method: 'POST',
        body: JSON.stringify({
          level,
          voice,
          language: locale,
          instructions: speechInstructionsForLocale(locale),
          text: reply,
        }),
      });

      if (speakResult && speakResult.speech && speakResult.speech.audioBase64) {
        elements.aiVoicePlayer.src = `data:${speakResult.speech.mimeType};base64,${speakResult.speech.audioBase64}`;
        playedAudio = true;
      }
    } catch (_speechError) {
      // Fallback below.
    }

    if (!playedAudio && window.speechSynthesis && typeof window.SpeechSynthesisUtterance === 'function') {
      try {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(reply);
        utterance.lang = locale;
        utterance.rate = 1;
        const allVoices = window.speechSynthesis.getVoices();
        const preferred = String(voice).toLowerCase();
        const localeLower = locale.toLowerCase();
        const localePrefix = localeLower.slice(0, 2);
        const pickedVoice =
          allVoices.find((item) => String(item.lang || '').toLowerCase() === localeLower) ||
          allVoices.find((item) => String(item.lang || '').toLowerCase().startsWith(localePrefix)) ||
          allVoices.find((item) => String(item.name || '').toLowerCase().includes(preferred)) ||
          allVoices[0];
        if (pickedVoice) {
          utterance.voice = pickedVoice;
        }
        window.speechSynthesis.speak(utterance);
        playedAudio = true;
      } catch (_browserSpeechError) {
        // Keep text-only response.
      }
    }

    if (playedAudio) {
      setMessage(elements.aiScreenMessage, 'Audio processado com sucesso.', 'success');
    } else {
      setMessage(elements.aiScreenMessage, 'Transcricao e resposta prontas. Audio indisponivel nesta chave.', 'error');
    }

    await refreshSession(true);
  } catch (error) {
    const friendly = friendlyVoiceErrorMessage(error.message);
    setMessage(elements.aiScreenMessage, friendly, 'error');
    setMessage(elements.aiVoiceReply, friendly, 'error');
  } finally {
    setVoiceRecordingUi(false);
  }
}

async function startVoiceRecording() {
  if (state.mediaRecorder) {
    return;
  }

  if (!navigator.mediaDevices || !window.MediaRecorder) {
    setMessage(elements.aiScreenMessage, 'Seu navegador nao suporta gravacao neste dispositivo.', 'error');
    return;
  }

  try {
    const hasDevice = await hasAudioInputDevice();
    if (!hasDevice) {
      setVoiceRecordingUi(false);
      setMessage(
        elements.aiScreenMessage,
        'Nenhum microfone detectado no dispositivo. Conecte/ative um microfone e tente novamente.',
        'error',
      );
      return;
    }

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    state.recordedChunks = [];
    const preferredMimeType = preferredRecorderMimeType();
    const recorder = preferredMimeType
      ? new MediaRecorder(stream, { mimeType: preferredMimeType })
      : new MediaRecorder(stream);
    state.mediaRecorder = recorder;

    recorder.ondataavailable = (event) => {
      if (event.data && event.data.size > 0) {
        state.recordedChunks.push(event.data);
      }
    };

    recorder.onstop = async () => {
      const finalMimeType = recorder.mimeType || preferredMimeType || 'audio/webm';
      if (!state.recordedChunks.length) {
        setMessage(elements.aiScreenMessage, 'Nenhum audio capturado. Grave novamente.', 'error');
        setVoiceRecordingUi(false);
        return;
      }
      const blob = new Blob(state.recordedChunks, { type: finalMimeType });
      await processVoiceBlob(blob, finalMimeType);
    };

    recorder.start(250);
    setVoiceRecordingUi(true);
    setMessage(elements.aiScreenMessage, 'Gravando audio... fale e depois clique em "Parar e responder".', 'success');
  } catch (error) {
    setVoiceRecordingUi(false);
    setMessage(elements.aiScreenMessage, friendlyRecorderError(error), 'error');
  }
}

function stopVoiceRecording() {
  if (!state.mediaRecorder) {
    return;
  }

  const recorder = state.mediaRecorder;
  state.mediaRecorder = null;
  if (recorder.state !== 'inactive') {
    recorder.stop();
  }
  if (recorder.stream && typeof recorder.stream.getTracks === 'function') {
    recorder.stream.getTracks().forEach((track) => track.stop());
  }
  if (elements.aiVoiceRecordButton) {
    elements.aiVoiceRecordButton.disabled = true;
  }
  if (elements.aiChatVoiceButton) {
    elements.aiChatVoiceButton.classList.remove('hidden');
    elements.aiChatVoiceButton.disabled = true;
  }
  if (elements.aiChatVoiceStopButton) {
    elements.aiChatVoiceStopButton.classList.add('hidden');
    elements.aiChatVoiceStopButton.disabled = true;
  }
  setMessage(elements.aiScreenMessage, 'Processando audio...');
}

function renderAiScreen() {
  renderAiChatLog();
  renderAiExercises();
  refreshAiChatSuggestions();
  setVoiceRecordingUi(false);
  if (elements.aiVoiceLanguage) {
    const value = elements.aiVoiceLanguage.value;
    if (!['en-US', 'pt-BR'].includes(value)) {
      elements.aiVoiceLanguage.value = 'en-US';
    }
  }
  elements.aiChatMode.value = 'conversation';
  elements.aiChatTopic.value = '';
  setAiTopic('conversation', { focus: false });

  if (!state.openAiConfigured) {
    setMessage(
      elements.aiScreenMessage,
      'IA indisponivel: configure OPENAI_API_KEY no .env e reinicie o servidor.',
      'error',
    );
  } else {
    setMessage(elements.aiScreenMessage, 'Converse livremente. Sugestoes de assuntos aparecem abaixo do chat.');
  }
}

async function promptInstallApp() {
  if (!state.deferredInstallPrompt) {
    return;
  }

  try {
    await state.deferredInstallPrompt.prompt();
    await state.deferredInstallPrompt.userChoice;
  } catch (_error) {
    // Ignore cancellation errors.
  } finally {
    state.deferredInstallPrompt = null;
    state.isInstallAvailable = false;
    syncInstallButton();
  }
}

function setupPwaSupport() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/playground/sw.js').catch(() => {
        // Service worker is optional.
      });
    });
  }

  window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    state.deferredInstallPrompt = event;
    state.isInstallAvailable = true;
    syncInstallButton();
  });

  window.addEventListener('appinstalled', () => {
    state.deferredInstallPrompt = null;
    state.isInstallAvailable = false;
    syncInstallButton();
  });
}

async function saveLevel(levelId, source) {
  if (!state.user) {
    setMessage(elements.levelMessage, 'Voce precisa estar logado para salvar nivel.', 'error');
    return;
  }

  try {
    const result = await api('/auth/profile', {
      method: 'PATCH',
      body: JSON.stringify({ level: levelId }),
    });

    state.user = result.user;
    state.selectedLevel = result.user.level || levelId;
    populateCoreSelects();
    renderManualLevelInfo();
    syncUserBadge();
    renderHome();
    renderActivities();
    setMessage(elements.levelMessage, `${source} salvo: ${levelLabel(state.selectedLevel)}.`, 'success');
    setScreen('home');
  } catch (error) {
    setMessage(elements.levelMessage, error.message, 'error');
  }
}

async function applyQuizRecommendation() {
  if (!state.quizRecommendation) {
    setMessage(elements.quizRecommendationBox, 'Primeiro clique em "Ver recomendacao".', 'error');
    return;
  }
  await saveLevel(state.quizRecommendation, 'Nivel recomendado');
}

async function assessLevelWithAi() {
  const text = elements.levelSampleText.value.trim();
  if (!text) {
    setMessage(elements.levelAssessResult, 'Escreva um texto para avaliar.', 'error');
    return;
  }

  elements.levelAssessButton.disabled = true;
  setMessage(elements.levelAssessResult, 'Avaliando nivel...');

  try {
    const result = await api('/levels/assess', {
      method: 'POST',
      body: JSON.stringify({
        sampleText: text,
        currentLevel: elements.levelSelect.value || state.selectedLevel,
        applyRecommendation: elements.levelAssessApply.checked,
      }),
    });

    const confidence = typeof result.confidence === 'number' ? `${Math.round(result.confidence * 100)}%` : '--';
    const body = `
      <strong>Nivel recomendado: ${escapeHtml(result.recommendedLevel || '--')}</strong><br />
      Confianca: ${escapeHtml(confidence)}<br />
      ${escapeHtml(result.explanation || 'Sem explicacao.')}
    `;
    setMessage(elements.levelAssessResult, body, 'success', true);

    if (elements.levelAssessApply.checked) {
      await refreshSession(true);
      populateCoreSelects();
      renderManualLevelInfo();
      setMessage(elements.levelMessage, 'Nivel atualizado automaticamente com base na avaliacao.', 'success');
    }
  } catch (error) {
    setMessage(elements.levelAssessResult, error.message, 'error');
  } finally {
    elements.levelAssessButton.disabled = false;
  }
}

async function register() {
  const payload = {
    name: elements.registerName.value,
    email: elements.registerEmail.value,
    password: elements.registerPassword.value,
    level: elements.registerLevel.value || state.selectedLevel,
  };

  try {
    const result = await api('/auth/register', {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    setToken(result.token);
    elements.registerPassword.value = '';
    setMessage(elements.registerMessage, 'Conta criada com sucesso.', 'success');
    await refreshSession(true);
    setScreen('level');
  } catch (error) {
    setMessage(elements.registerMessage, error.message, 'error');
  }
}

async function login() {
  const payload = {
    email: elements.loginEmail.value,
    password: elements.loginPassword.value,
  };

  try {
    const result = await api('/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    setToken(result.token);
    elements.loginPassword.value = '';
    setMessage(elements.loginMessage, 'Login concluido.', 'success');
    await refreshSession(true);
    setScreen('home');
  } catch (error) {
    setMessage(elements.loginMessage, error.message, 'error');
  }
}

async function logout() {
  try {
    await api('/auth/logout', { method: 'POST' });
  } catch (_error) {
    // ignore
  }

  setToken('');
  state.user = null;
  state.stats = null;
  state.selectedActivityId = null;
  state.quizRecommendation = null;
  state.aiTopic = 'conversation';
  state.aiChatHistory = [];
  state.aiChatLoading = false;
  state.aiTopicSuggestions = [];
  state.aiExerciseBatch = null;
  state.aiExercises = [];
  syncUserBadge();
  setScreen('welcome');
}

async function refreshSession(preserveScreen = false) {
  if (!state.token) {
    state.user = null;
    state.stats = null;
    state.selectedActivityId = null;
    syncUserBadge();
    if (!preserveScreen) {
      setScreen('welcome');
    }
    return;
  }

  try {
    const data = await api('/auth/me');
    state.user = data.user;
    state.stats = data.stats || null;
    state.selectedLevel = state.user.level || state.selectedLevel;
    populateCoreSelects();
    renderManualLevelInfo();
    syncUserBadge();
    renderHome();
    renderActivities();
    if (!preserveScreen) {
      setScreen('home');
    }
  } catch (_error) {
    setToken('');
    state.user = null;
    state.stats = null;
    syncUserBadge();
    setScreen('welcome');
  }
}

async function handleGoogleCredentialResponse(response) {
  try {
    const result = await api('/auth/google', {
      method: 'POST',
      body: JSON.stringify({
        idToken: response.credential,
        level: state.selectedLevel,
      }),
    });

    setToken(result.token);
    setMessage(elements.loginMessage, 'Login com Google concluido.', 'success');
    await refreshSession(true);
    setScreen('home');
  } catch (error) {
    setMessage(elements.loginMessage, error.message, 'error');
  }
}
function setupGoogleLogin(retry = 0) {
  if (!state.options || !state.options.auth) {
    return;
  }

  if (!state.options.auth.googleConfigured || !state.options.auth.googleClientId) {
    elements.googleHint.textContent = 'Google indisponivel. Preencha GOOGLE_CLIENT_ID no .env e reinicie.';
    return;
  }

  if (!window.google || !window.google.accounts || !window.google.accounts.id) {
    if (retry < 10) {
      window.setTimeout(() => setupGoogleLogin(retry + 1), 500);
      return;
    }
    elements.googleHint.textContent = 'Nao foi possivel carregar login Google.';
    return;
  }

  window.google.accounts.id.initialize({
    client_id: state.options.auth.googleClientId,
    callback: handleGoogleCredentialResponse,
  });

  elements.googleSlot.innerHTML = '';
  window.google.accounts.id.renderButton(elements.googleSlot, {
    theme: 'outline',
    size: 'large',
    shape: 'pill',
    text: 'continue_with',
    width: 300,
  });
  elements.googleHint.textContent = 'Ou continue com sua conta Google.';
}

async function loadOptions() {
  try {
    const [meta, providers] = await Promise.all([
      api('/meta/options'),
      api('/auth/providers').catch(() => null),
    ]);

    state.options = meta;
    if (providers) {
      state.options.auth = {
        ...(state.options.auth || {}),
        googleConfigured: Boolean(providers.googleConfigured),
      };
    }
    state.openAiConfigured = Boolean(meta && meta.auth && meta.auth.openAiConfigured);
  } catch (_error) {
    state.options = null;
    state.openAiConfigured = false;
  }

  populateCoreSelects();
  renderManualLevelInfo();
  setupGoogleLogin();
}

function bindEvents() {
  elements.openRegisterButton.addEventListener('click', () => setScreen('register'));
  elements.openLoginButton.addEventListener('click', () => setScreen('login'));

  elements.registerSubmitButton.addEventListener('click', register);
  elements.registerBackButton.addEventListener('click', () => setScreen('welcome'));
  elements.registerToLoginButton.addEventListener('click', () => setScreen('login'));

  elements.loginSubmitButton.addEventListener('click', login);
  elements.loginBackButton.addEventListener('click', () => setScreen('welcome'));
  elements.loginToRegisterButton.addEventListener('click', () => setScreen('register'));

  elements.levelSelect.addEventListener('change', () => {
    state.selectedLevel = elements.levelSelect.value;
    populateCoreSelects();
    renderManualLevelInfo();
  });

  elements.saveLevelButton.addEventListener('click', () => saveLevel(elements.levelSelect.value, 'Nivel'));
  elements.checkQuizButton.addEventListener('click', checkQuiz);
  elements.applyQuizButton.addEventListener('click', applyQuizRecommendation);
  elements.levelAssessButton.addEventListener('click', assessLevelWithAi);

  elements.homeStartTrailButton.addEventListener('click', () => setScreen('activities'));
  elements.homeOpenAiButton.addEventListener('click', () => setScreen('ai'));
  if (elements.installAppButton) {
    elements.installAppButton.addEventListener('click', promptInstallApp);
  }
  elements.homeChangeLevelButton.addEventListener('click', () => setScreen('level'));

  elements.activitiesList.addEventListener('click', (event) => {
    const target = event.target.closest('[data-open-activity]');
    if (!target) {
      return;
    }
    state.selectedActivityId = target.dataset.openActivity;
    setScreen('activity');
  });

  elements.activityBackButton.addEventListener('click', () => setScreen('activities'));
  elements.regenerateActivityButton.addEventListener('click', regenerateActivitySet);
  elements.saveDraftButton.addEventListener('click', saveDraft);
  elements.requestFeedbackButton.addEventListener('click', requestFeedback);
  elements.completeActivityButton.addEventListener('click', completeActivity);
  elements.activityTasks.addEventListener('input', (event) => {
    const target = event.target.closest('[data-question-id]');
    if (!target) {
      return;
    }
    queueActivityAutoSave();
  });
  elements.activityTasks.addEventListener('change', (event) => {
    const target = event.target.closest('[data-question-id]');
    if (!target) {
      return;
    }
    queueActivityAutoSave();
  });

  elements.aiChatSendButton.addEventListener('click', sendAiChat);
  if (elements.aiChatVoiceButton) {
    elements.aiChatVoiceButton.addEventListener('click', startVoiceRecording);
  }
  if (elements.aiChatVoiceStopButton) {
    elements.aiChatVoiceStopButton.addEventListener('click', stopVoiceRecording);
  }
  elements.aiChatClearButton.addEventListener('click', clearAiChat);
  elements.aiChatInput.addEventListener('input', resizeChatInput);
  elements.aiChatInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendAiChat();
    }
  });
  if (elements.aiChatSuggestions) {
    elements.aiChatSuggestions.addEventListener('click', (event) => {
      const refreshButton = event.target.closest('[data-ai-suggestion-refresh]');
      if (refreshButton) {
        refreshAiChatSuggestions();
        return;
      }
      const target = event.target.closest('[data-ai-suggestion-index]');
      if (!target) {
        return;
      }
      const index = Number(target.dataset.aiSuggestionIndex);
      const item = Number.isInteger(index) ? state.aiTopicSuggestions[index] : null;
      if (!item || !item.prompt) {
        return;
      }
      elements.aiChatInput.value = item.prompt;
      resizeChatInput();
      sendAiChat();
    });
  }
  elements.aiChatMode.addEventListener('change', () => {
    setAiTopic(aiTopicFromChatMode(elements.aiChatMode.value), { focus: false });
  });
  elements.aiTopicConversation.addEventListener('click', () => setAiTopic('conversation'));
  elements.aiTopicGrammar.addEventListener('click', () => setAiTopic('grammar'));
  elements.aiTopicExercise.addEventListener('click', () => setAiTopic('exercise', { focus: false }));
  elements.aiTopicVoice.addEventListener('click', () => setAiTopic('voice', { focus: false }));

  elements.aiExerciseGenerateButton.addEventListener('click', generateAiExercises);
  elements.aiExerciseCheckButton.addEventListener('click', checkAiExercise);
  elements.aiExerciseList.addEventListener('click', (event) => {
    const target = event.target.closest('[data-ai-ex-index]');
    if (!target) {
      return;
    }
    pickAiExercise(Number(target.dataset.aiExIndex));
  });

  elements.aiVoiceRecordButton.addEventListener('click', startVoiceRecording);
  elements.aiVoiceStopButton.addEventListener('click', stopVoiceRecording);

  elements.logoutButton.addEventListener('click', logout);

  elements.navHome.addEventListener('click', () => setScreen('home'));
  elements.navActivities.addEventListener('click', () => setScreen('activities'));
  elements.navAi.addEventListener('click', () => setScreen('ai'));
  elements.navLevel.addEventListener('click', () => setScreen('level'));
}

async function bootstrap() {
  renderQuiz();
  setupPwaSupport();
  bindEvents();
  await loadOptions();
  await refreshSession();
  resizeChatInput();
  renderAiChatLog();
  refreshAiChatSuggestions();
  renderAiExercises();
  syncUserBadge();
  syncStatusBanner();
  syncJourney();
  syncBottomNav();
}

bootstrap().catch((error) => {
  elements.statusBanner.textContent = error.message;
});
