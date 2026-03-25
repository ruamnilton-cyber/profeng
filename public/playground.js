
const STORAGE_KEYS = {
  token: 'profeng_token',
  completed: 'profeng_completed',
  drafts: 'profeng_drafts',
};

const LEVELS_FALLBACK = [
  { id: 'A1', label: 'Beginner' },
  { id: 'A2', label: 'Elementary' },
  { id: 'B1', label: 'Intermediate' },
  { id: 'B2', label: 'Upper Intermediate' },
  { id: 'C1', label: 'Advanced' },
  { id: 'C2', label: 'Proficient' },
];

const CHAT_MODES_FALLBACK = ['conversation', 'explain', 'correction', 'roleplay'];
const EXERCISE_SKILLS_FALLBACK = ['mixed', 'grammar', 'vocabulary', 'reading', 'writing'];
const VOICES_FALLBACK = ['alloy', 'verse', 'sage', 'ash', 'coral'];

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
    question: 'Qual frase esta mais natural para rotina?',
    options: [
      { label: 'I goes to work at 8.', score: 1 },
      { label: 'I go to work at 8.', score: 2 },
      { label: 'I usually go to work at 8, unless I work remotely.', score: 4 },
      { label: 'I tend to start around 8, depending on project cycles.', score: 6 },
    ],
  },
  {
    id: 'q2',
    question: 'Qual resposta esta melhor estruturada?',
    options: [
      { label: 'It was hard and I fix.', score: 1 },
      { label: 'It was hard, but I solved it.', score: 2 },
      { label: 'I reorganized tasks and solved it with my team.', score: 4 },
      { label: 'I reframed the issue and coordinated a cross-team recovery.', score: 6 },
    ],
  },
  {
    id: 'q3',
    question: 'Escolha a opcao com melhor coesao:',
    options: [
      { label: 'I like it. Is good.', score: 1 },
      { label: 'I like it because it is practical.', score: 2 },
      { label: 'I like it; however, we should test it first.', score: 4 },
      { label: 'While promising, it requires stronger resource alignment.', score: 6 },
    ],
  },
  {
    id: 'q4',
    question: 'Qual frase tem registro profissional mais forte?',
    options: [
      { label: 'Send me that file now.', score: 1 },
      { label: 'Can you send me the file today?', score: 2 },
      { label: 'Could you share the updated file by end of day?', score: 4 },
      { label: 'Would you mind sharing the revised file by EOD so we can finalize?', score: 6 },
    ],
  },
];

const state = {
  token: localStorage.getItem(STORAGE_KEYS.token) || '',
  user: null,
  stats: null,
  options: null,
  openAiConfigured: false,
  selectedLevel: 'A2',
  screen: 'welcome',
  selectedActivityId: null,
  quizRecommendation: null,
  completed: readStoredJson(STORAGE_KEYS.completed, {}),
  drafts: readStoredJson(STORAGE_KEYS.drafts, {}),
  aiChatHistory: [],
  aiChatLoading: false,
  aiExerciseBatch: null,
  aiExercises: [],
  mediaRecorder: null,
  recordedChunks: [],
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
  levelSampleText: $('levelSampleText'),
  levelAssessApply: $('levelAssessApply'),
  levelAssessButton: $('levelAssessButton'),
  levelAssessResult: $('levelAssessResult'),
  levelMessage: $('levelMessage'),

  homeGreeting: $('homeGreeting'),
  homeSubtitle: $('homeSubtitle'),
  homeLevelPill: $('homeLevelPill'),
  homeProgressText: $('homeProgressText'),
  homeStartTrailButton: $('homeStartTrailButton'),
  homeOpenAiButton: $('homeOpenAiButton'),
  homeChangeLevelButton: $('homeChangeLevelButton'),

  activitiesTitle: $('activitiesTitle'),
  activitiesList: $('activitiesList'),
  activitiesMessage: $('activitiesMessage'),

  aiChatLevel: $('aiChatLevel'),
  aiChatMode: $('aiChatMode'),
  aiChatTopic: $('aiChatTopic'),
  aiChatLog: $('aiChatLog'),
  aiChatInput: $('aiChatInput'),
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
  saveDraftButton: $('saveDraftButton'),
  requestFeedbackButton: $('requestFeedbackButton'),
  completeActivityButton: $('completeActivityButton'),
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

function levelLabel(levelId) {
  const profile = getLevelProfile(levelId);
  return profile ? `${profile.id} - ${profile.label}` : levelId;
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

  elements.statusBanner.textContent = state.openAiConfigured
    ? 'Tudo certo: IA e trilha estao ativas.'
    : 'Trilha ativa. Para usar IA, preencha OPENAI_API_KEY no .env e reinicie o servidor.';
}

function syncUserBadge() {
  if (!state.user) {
    elements.userBadge.textContent = 'Visitante';
    elements.logoutButton.classList.add('hidden');
    return;
  }

  const name = state.user.name || state.user.email || 'Aluno';
  elements.userBadge.textContent = `${name} - ${state.user.level || state.selectedLevel}`;
  elements.logoutButton.classList.remove('hidden');
}

function populateCoreSelects() {
  const levelValues = levels();

  fillSelect(elements.registerLevel, levelValues, (item) => item.id, (item) => `${item.id} - ${item.label}`, state.selectedLevel);
  fillSelect(elements.levelSelect, levelValues, (item) => item.id, (item) => `${item.id} - ${item.label}`, state.selectedLevel);
  fillSelect(elements.aiChatLevel, levelValues, (item) => item.id, (item) => `${item.id} - ${item.label}`, state.selectedLevel);
  fillSelect(elements.aiExerciseLevel, levelValues, (item) => item.id, (item) => `${item.id} - ${item.label}`, state.selectedLevel);
  fillSelect(elements.aiVoiceLevel, levelValues, (item) => item.id, (item) => `${item.id} - ${item.label}`, state.selectedLevel);

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

  const focus = profile.vocabularyScope
    ? String(profile.vocabularyScope).split(',').slice(0, 3).join(', ')
    : 'comunicacao diaria';
  elements.manualLevelInfo.textContent = `${profile.id}: foco em ${focus}.`;
}

function renderQuiz() {
  elements.quizList.innerHTML = QUIZ_QUESTIONS.map((item, index) => `
    <article class="quiz-item">
      <strong>${index + 1}. ${escapeHtml(item.question)}</strong>
      ${item.options
        .map(
          (option) => `
            <label>
              <input type="radio" name="${escapeHtml(item.id)}" value="${option.score}" />
              <span>${escapeHtml(option.label)}</span>
            </label>
          `,
        )
        .join('')}
    </article>
  `).join('');
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
      setMessage(elements.levelMessage, 'Responda todas as perguntas do teste rapido.', 'error');
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
    elements.levelMessage,
    `Recomendacao: ${levelLabel(recommended)}. Clique em "Aplicar recomendacao" para salvar.`,
    'success',
  );
}

function activitiesForLevel(levelId) {
  return ACTIVITY_BY_LEVEL[levelId] || [];
}

function completedForLevel(levelId) {
  return Array.isArray(state.completed[levelId]) ? state.completed[levelId] : [];
}
function renderHome() {
  if (!state.user) {
    return;
  }

  const name = state.user.name || 'Aluno';
  const levelId = state.selectedLevel || state.user.level || 'A2';
  const items = activitiesForLevel(levelId);
  const done = completedForLevel(levelId).length;
  const stats = state.stats || {};

  elements.homeGreeting.textContent = `Ola, ${name}.`;
  elements.homeSubtitle.textContent = `Tentativas: ${stats.exerciseAttempts || 0} | Voz: ${stats.voiceSessions || 0}`;
  elements.homeLevelPill.textContent = levelLabel(levelId);
  elements.homeProgressText.textContent = `${done} de ${items.length} atividades concluidas neste nivel.`;
}

function renderActivities() {
  if (!state.user) {
    return;
  }

  const levelId = state.selectedLevel || state.user.level || 'A2';
  const items = activitiesForLevel(levelId);
  const doneList = new Set(completedForLevel(levelId));

  elements.activitiesTitle.textContent = `Trilha ${levelLabel(levelId)}`;

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
          <div class="row" style="margin-top: 10px">
            <button class="btn" data-open-activity="${escapeHtml(item.id)}">Abrir</button>
          </div>
        </article>
      `;
    })
    .join('');
}

function selectedActivity() {
  const levelId = state.selectedLevel || (state.user && state.user.level) || 'A2';
  return activitiesForLevel(levelId).find((item) => item.id === state.selectedActivityId) || null;
}

function renderActivity() {
  const item = selectedActivity();
  if (!item) {
    elements.activityTitle.textContent = 'Atividade';
    elements.activityObjective.textContent = 'Escolha uma atividade da trilha.';
    elements.activityTips.innerHTML = '';
    elements.activityTasks.innerHTML = '';
    return;
  }

  elements.activityTitle.textContent = item.title;
  elements.activityObjective.textContent = item.objective;
  elements.activityTips.innerHTML = item.tips.map((tip) => `<li>${escapeHtml(tip)}</li>`).join('');

  const draft = state.drafts[item.id] || {};
  elements.activityTasks.innerHTML = item.tasks
    .map(
      (task) => `
        <article class="task">
          <h4>${escapeHtml(task.title)}</h4>
          <textarea data-task-id="${escapeHtml(task.id)}" placeholder="${escapeHtml(task.placeholder)}">${escapeHtml(draft[task.id] || '')}</textarea>
        </article>
      `,
    )
    .join('');

  setMessage(elements.activityMessage, 'Preencha os campos e avance no seu ritmo.');
}

function collectTaskAnswers() {
  const answers = {};
  elements.activityTasks.querySelectorAll('textarea[data-task-id]').forEach((field) => {
    answers[field.dataset.taskId] = field.value.trim();
  });
  return answers;
}

function saveDraft() {
  const item = selectedActivity();
  if (!item) {
    setMessage(elements.activityMessage, 'Abra uma atividade para salvar.', 'error');
    return;
  }
  state.drafts[item.id] = collectTaskAnswers();
  writeStoredJson(STORAGE_KEYS.drafts, state.drafts);
  setMessage(elements.activityMessage, 'Rascunho salvo com sucesso.', 'success');
}

async function requestFeedback() {
  const item = selectedActivity();
  if (!item) {
    setMessage(elements.activityFeedback, 'Abra uma atividade para pedir feedback.', 'error');
    return;
  }

  if (!state.openAiConfigured) {
    setMessage(
      elements.activityFeedback,
      'Feedback com IA exige OPENAI_API_KEY no .env. Reinicie o servidor apos configurar.',
      'error',
    );
    return;
  }

  const answers = collectTaskAnswers();
  const merged = item.tasks
    .map((task) => {
      const answer = answers[task.id];
      return answer ? `${task.title}:\n${answer}` : null;
    })
    .filter(Boolean)
    .join('\n\n');

  if (!merged) {
    setMessage(elements.activityFeedback, 'Preencha pelo menos uma resposta para receber feedback.', 'error');
    return;
  }

  elements.requestFeedbackButton.disabled = true;
  setMessage(elements.activityFeedback, 'Analisando sua atividade...');

  try {
    const result = await api('/feedback', {
      method: 'POST',
      body: JSON.stringify({
        level: state.selectedLevel,
        text: `Atividade: ${item.title}\n\n${merged}`,
      }),
    });
    setMessage(elements.activityFeedback, result.feedback || 'Feedback recebido.', 'success');
  } catch (error) {
    setMessage(elements.activityFeedback, error.message, 'error');
  } finally {
    elements.requestFeedbackButton.disabled = false;
  }
}

function completeActivity() {
  const item = selectedActivity();
  if (!item) {
    setMessage(elements.activityMessage, 'Abra uma atividade para concluir.', 'error');
    return;
  }

  saveDraft();

  const levelId = state.selectedLevel || (state.user && state.user.level) || 'A2';
  if (!Array.isArray(state.completed[levelId])) {
    state.completed[levelId] = [];
  }
  if (!state.completed[levelId].includes(item.id)) {
    state.completed[levelId].push(item.id);
  }
  writeStoredJson(STORAGE_KEYS.completed, state.completed);

  setMessage(elements.activityMessage, 'Atividade concluida. Excelente trabalho.', 'success');
  renderHome();
  renderActivities();
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
        mode: elements.aiChatMode.value || 'conversation',
        topic: elements.aiChatTopic.value || '',
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
    elements.aiChatInput.focus();
  }
}

function clearAiChat() {
  state.aiChatHistory = [];
  state.aiChatLoading = false;
  renderAiChatLog();
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

async function processVoiceBlob(blob, mimeType) {
  try {
    const result = await api('/voice/respond', {
      method: 'POST',
      body: JSON.stringify({
        level: elements.aiVoiceLevel.value || state.selectedLevel,
        voice: elements.aiVoiceName.value || 'alloy',
        audioBase64: await blobToBase64(blob),
        mimeType: mimeType || 'audio/webm',
        speakResponse: true,
      }),
    });

    setMessage(elements.aiVoiceTranscript, result.transcript || 'Sem transcricao.', 'success');
    setMessage(elements.aiVoiceReply, result.reply || 'Sem resposta.', 'success');

    if (result.speech && result.speech.audioBase64) {
      elements.aiVoicePlayer.src = `data:${result.speech.mimeType};base64,${result.speech.audioBase64}`;
    }

    setMessage(elements.aiScreenMessage, 'Audio processado com sucesso.', 'success');
    await refreshSession(true);
  } catch (error) {
    setMessage(elements.aiScreenMessage, error.message, 'error');
    setMessage(elements.aiVoiceReply, error.message, 'error');
  } finally {
    elements.aiVoiceRecordButton.disabled = false;
    elements.aiVoiceStopButton.disabled = true;
  }
}

async function startVoiceRecording() {
  if (!navigator.mediaDevices || !window.MediaRecorder) {
    setMessage(elements.aiScreenMessage, 'Seu navegador nao suporta gravacao neste dispositivo.', 'error');
    return;
  }

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    state.recordedChunks = [];
    state.mediaRecorder = new MediaRecorder(stream);

    state.mediaRecorder.ondataavailable = (event) => {
      if (event.data && event.data.size > 0) {
        state.recordedChunks.push(event.data);
      }
    };

    state.mediaRecorder.onstop = async () => {
      const mimeType = state.mediaRecorder ? state.mediaRecorder.mimeType : 'audio/webm';
      const blob = new Blob(state.recordedChunks, { type: mimeType });
      await processVoiceBlob(blob, mimeType);
    };

    state.mediaRecorder.start();
    elements.aiVoiceRecordButton.disabled = true;
    elements.aiVoiceStopButton.disabled = false;
    setMessage(elements.aiScreenMessage, 'Gravando audio. Clique em "Parar e responder".', 'success');
  } catch (error) {
    setMessage(elements.aiScreenMessage, error.message, 'error');
  }
}

function stopVoiceRecording() {
  if (!state.mediaRecorder) {
    return;
  }

  const recorder = state.mediaRecorder;
  state.mediaRecorder = null;
  recorder.stop();
  recorder.stream.getTracks().forEach((track) => track.stop());
  setMessage(elements.aiScreenMessage, 'Processando audio...');
}

function renderAiScreen() {
  renderAiChatLog();
  renderAiExercises();

  if (!state.openAiConfigured) {
    setMessage(
      elements.aiScreenMessage,
      'IA indisponivel: configure OPENAI_API_KEY no .env e reinicie o servidor.',
      'error',
    );
  } else {
    setMessage(elements.aiScreenMessage, 'IA pronta para uso.', 'success');
  }
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
    setMessage(elements.levelMessage, 'Primeiro clique em "Ver recomendacao".', 'error');
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
  state.aiChatHistory = [];
  state.aiChatLoading = false;
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
  elements.saveDraftButton.addEventListener('click', saveDraft);
  elements.requestFeedbackButton.addEventListener('click', requestFeedback);
  elements.completeActivityButton.addEventListener('click', completeActivity);

  elements.aiChatSendButton.addEventListener('click', sendAiChat);
  elements.aiChatClearButton.addEventListener('click', clearAiChat);
  elements.aiChatInput.addEventListener('input', resizeChatInput);
  elements.aiChatInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendAiChat();
    }
  });

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
  bindEvents();
  await loadOptions();
  await refreshSession();
  resizeChatInput();
  renderAiChatLog();
  renderAiExercises();
  syncUserBadge();
  syncStatusBanner();
  syncJourney();
  syncBottomNav();
}

bootstrap().catch((error) => {
  elements.statusBanner.textContent = error.message;
});
