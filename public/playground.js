const state = {
  token: localStorage.getItem('profeng_token') || '',
  user: null,
  stats: null,
  options: null,
  screen: 'auth',
  authMode: 'register',
  chatHistory: [],
  exerciseBatch: null,
  latestExercises: [],
  revealedAnswers: {},
  mediaRecorder: null,
  recordedChunks: [],
};

const $ = (id) => document.getElementById(id);
const elements = {
  screens: Array.from(document.querySelectorAll('[data-screen]')),
  navButtons: Array.from(document.querySelectorAll('[data-open-screen]')),
  stepAuth: $('stepAuth'),
  stepHub: $('stepHub'),
  stepPractice: $('stepPractice'),
  globalStatus: $('globalStatus'),
  profileAvatar: $('profileAvatar'),
  profileName: $('profileName'),
  profileMeta: $('profileMeta'),
  profileBadges: $('profileBadges'),
  statLevel: $('statLevel'),
  statExercises: $('statExercises'),
  statAverage: $('statAverage'),
  statVoice: $('statVoice'),
  logoutSidebarButton: $('logoutSidebarButton'),
  hubHeadline: $('hubHeadline'),
  hubSubtitle: $('hubSubtitle'),
  modeRegister: $('modeRegister'),
  modeLogin: $('modeLogin'),
  authNameField: $('authNameField'),
  authName: $('authName'),
  authLevel: $('authLevel'),
  authEmail: $('authEmail'),
  authPassword: $('authPassword'),
  authHelper: $('authHelper'),
  authSubmitButton: $('authSubmitButton'),
  authGoHubButton: $('authGoHubButton'),
  googleSlot: $('googleSlot'),
  googleHint: $('googleHint'),
  authOutput: $('authOutput'),
  chatLevel: $('chatLevel'),
  chatMode: $('chatMode'),
  chatCorrectionMode: $('chatCorrectionMode'),
  chatTopic: $('chatTopic'),
  chatMessage: $('chatMessage'),
  chatLog: $('chatLog'),
  exerciseLevel: $('exerciseLevel'),
  exerciseSkill: $('exerciseSkill'),
  exerciseTopic: $('exerciseTopic'),
  exerciseMeta: $('exerciseMeta'),
  exerciseOutput: $('exerciseOutput'),
  exercisePicker: $('exercisePicker'),
  exercisePickedType: $('exercisePickedType'),
  exerciseAnswer: $('exerciseAnswer'),
  exerciseCheckButton: $('exerciseCheckButton'),
  exerciseCheckOutput: $('exerciseCheckOutput'),
  levelCurrentLevel: $('levelCurrentLevel'),
  levelSample: $('levelSample'),
  levelApplyRecommendation: $('levelApplyRecommendation'),
  levelOutput: $('levelOutput'),
  voiceLevel: $('voiceLevel'),
  voiceName: $('voiceName'),
  voiceHint: $('voiceHint'),
  voiceTranscript: $('voiceTranscript'),
  voiceReply: $('voiceReply'),
  voicePlayer: $('voicePlayer'),
  recordButton: $('recordButton'),
  stopButton: $('stopButton'),
};

function escapeHtml(value) {
  return String(value || '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function setToken(token) {
  state.token = token || '';
  if (state.token) localStorage.setItem('profeng_token', state.token);
  else localStorage.removeItem('profeng_token');
}

function headers(extra = {}) {
  return { 'Content-Type': 'application/json', ...(state.token ? { Authorization: `Bearer ${state.token}` } : {}), ...extra };
}

async function api(path, options = {}) {
  const response = await fetch(path, options);
  const text = await response.text();
  let data = null;
  if (text) {
    try { data = JSON.parse(text); } catch (_error) { data = { error: text }; }
  }
  if (!response.ok) throw new Error((data && data.error) || `Erro ${response.status}`);
  return data;
}

function fillSelect(select, values, labeler) {
  const currentValue = select.value;
  select.innerHTML = '';
  values.forEach((value) => {
    const option = document.createElement('option');
    option.value = typeof value === 'string' ? value : value.id;
    option.textContent = labeler ? labeler(value) : option.value;
    select.appendChild(option);
  });
  if (currentValue && Array.from(select.options).some((option) => option.value === currentValue)) select.value = currentValue;
}

function titleCase(value) {
  return String(value || '').replaceAll('_', ' ').replace(/\b\w/g, (match) => match.toUpperCase());
}

function initials(user) {
  const text = (user && (user.name || user.email)) || 'ProfEng';
  return text.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0].toUpperCase()).join('');
}

function listHtml(items) {
  return Array.isArray(items) && items.length
    ? `<ul class="bullets">${items.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`
    : '<div class="meta">Sem itens retornados.</div>';
}

function setMessage(element, value, tone = 'neutral', html = false) {
  element.className = tone === 'success' ? 'feedback success' : tone === 'error' ? 'feedback error' : 'feedback';
  if (html) element.innerHTML = value;
  else element.textContent = value;
}

function showScreen(screen) {
  state.screen = !state.user && screen !== 'auth' ? 'auth' : screen;
  elements.screens.forEach((section) => section.classList.toggle('is-active', section.dataset.screen === state.screen));
  elements.navButtons.forEach((button) => {
    button.disabled = button.dataset.requiresAuth === 'true' && !state.user;
    button.classList.toggle('is-active', button.dataset.openScreen === state.screen);
  });
  const isPractice = state.user && ['chat', 'exercises', 'level', 'voice'].includes(state.screen);
  elements.stepAuth.className = `step ${state.user ? 'done' : 'active'}`.trim();
  elements.stepHub.className = `step ${state.user ? (state.screen === 'hub' ? 'active' : 'done') : ''}`.trim();
  elements.stepPractice.className = `step ${isPractice ? 'active' : ''}`.trim();
}

function syncAuthMode() {
  const login = state.authMode === 'login';
  elements.modeRegister.classList.toggle('is-active', !login);
  elements.modeLogin.classList.toggle('is-active', login);
  elements.authNameField.classList.toggle('hidden', login);
  elements.authSubmitButton.textContent = login ? 'Entrar' : 'Criar conta';
  elements.authHelper.textContent = login
    ? 'Entre com email e senha ou use o Google logo abaixo.'
    : 'No primeiro acesso, o seu nivel inicial ajuda o tutor a responder melhor.';
}

function syncProfile() {
  if (!state.user) {
    elements.profileAvatar.textContent = 'P';
    elements.profileName.textContent = 'Sem sessao ativa';
    elements.profileMeta.textContent = 'Entre para liberar todas as funcoes.';
    elements.profileBadges.innerHTML = '<span class="badge">Email</span><span class="badge">Google</span>';
    elements.statLevel.textContent = '--';
    elements.statExercises.textContent = '0';
    elements.statAverage.textContent = '--';
    elements.statVoice.textContent = '0';
    elements.logoutSidebarButton.classList.add('hidden');
    elements.authGoHubButton.classList.add('hidden');
    return;
  }

  const stats = state.stats || {};
  const providers = Array.isArray(state.user.providers) ? state.user.providers : ['email'];
  elements.profileAvatar.textContent = initials(state.user);
  elements.profileName.textContent = state.user.name || state.user.email;
  elements.profileMeta.textContent = `${state.user.email} | nivel ${state.user.level}`;
  elements.profileBadges.innerHTML = providers.map((provider) => `<span class="badge">${escapeHtml(titleCase(provider))}</span>`).join('');
  elements.statLevel.textContent = state.user.level || '--';
  elements.statExercises.textContent = String(stats.exerciseAttempts || 0);
  elements.statAverage.textContent = typeof stats.averageScore === 'number' ? `${stats.averageScore}%` : '--';
  elements.statVoice.textContent = String(stats.voiceSessions || 0);
  elements.logoutSidebarButton.classList.remove('hidden');
  elements.authGoHubButton.classList.remove('hidden');
  elements.hubHeadline.textContent = `Tudo pronto, ${state.user.name || 'aluno'}.`;
  elements.hubSubtitle.textContent = 'Escolha um treino por vez e avance com mais foco, sem telas lotadas.';
}

function syncStatus() {
  const openAiReady = state.options && state.options.auth && state.options.auth.openAiConfigured;
  if (!state.user) {
    elements.globalStatus.textContent = openAiReady
      ? 'Entre por email ou Google para desbloquear o fluxo completo.'
      : 'Entre por email ou Google. A parte de IA ainda depende da chave OpenAI no servidor.';
    return;
  }
  elements.globalStatus.textContent = openAiReady
    ? `Conta pronta. ${state.user.name || 'Aluno'}, agora voce pode conversar, treinar e gravar audio.`
    : 'Conta pronta, mas chat, voz e exercicios ainda precisam da OpenAI ativa no servidor.';
}

function syncUi() {
  syncAuthMode();
  syncProfile();
  syncStatus();
  showScreen(state.screen);
}

function renderChat() {
  if (!state.chatHistory.length) {
    elements.chatLog.innerHTML = '<div class="empty">A conversa vai aparecer aqui quando voce mandar a primeira mensagem.</div>';
    return;
  }
  elements.chatLog.innerHTML = state.chatHistory.map((message) => `
    <div class="bubble ${message.role === 'user' ? 'me' : ''}">
      <span class="bubble-role">${message.role === 'user' ? 'Voce' : 'Tutor'}</span>
      ${escapeHtml(message.content)}
    </div>
  `).join('');
  elements.chatLog.scrollTop = elements.chatLog.scrollHeight;
}

function renderExercises() {
  const batch = state.exerciseBatch || {};
  const exercises = Array.isArray(state.latestExercises) ? state.latestExercises : [];
  setMessage(elements.exerciseMeta, `
    <strong>${escapeHtml(batch.title || 'Lista pronta')}</strong>
    <div>${escapeHtml(batch.instructions || 'Use os cards ao lado para praticar.')}</div>
    ${batch.warmup ? `<div style="margin-top:10px"><strong>Warm-up</strong><div>${escapeHtml(batch.warmup)}</div></div>` : ''}
    ${Array.isArray(batch.reviewChecklist) && batch.reviewChecklist.length ? `<div style="margin-top:10px"><strong>Checklist</strong>${listHtml(batch.reviewChecklist)}</div>` : ''}
  `, 'success', true);

  if (!exercises.length) {
    elements.exerciseOutput.className = 'empty';
    elements.exerciseOutput.textContent = 'A API nao retornou exercicios nessa tentativa.';
    return;
  }

  elements.exerciseOutput.className = 'exercise-list';
  elements.exerciseOutput.innerHTML = exercises.map((exercise, index) => `
    <article class="exercise-card">
      <div class="panel-head">
        <div>
          <span class="exercise-type">${escapeHtml(exercise.type || 'exercise')}</span>
          <h3 style="margin-top:12px; font-size:1.2rem">${index + 1}. ${escapeHtml(exercise.prompt || 'Sem prompt')}</h3>
        </div>
        <button class="ghost" data-action="pick-exercise" data-index="${index}">Responder</button>
      </div>
      ${Array.isArray(exercise.choices) && exercise.choices.length ? `<ul class="choices">${exercise.choices.map((choice) => `<li>${escapeHtml(choice)}</li>`).join('')}</ul>` : ''}
      <div class="meta-row" style="margin-top:14px">
        <span class="metric">Skill: ${escapeHtml(exercise.skillFocus || 'mixed')}</span>
        <span class="metric">Nivel: ${escapeHtml(exercise.level || batch.level || '--')}</span>
      </div>
      ${exercise.hint ? `<div class="exercise-extra"><strong>Dica</strong><div>${escapeHtml(exercise.hint)}</div></div>` : ''}
      <div class="button-row" style="margin-top:14px"><button class="ghost" data-action="toggle-answer" data-index="${index}">${state.revealedAnswers[index] ? 'Esconder resposta' : 'Mostrar resposta'}</button></div>
      ${state.revealedAnswers[index] ? `
        <div class="exercise-extra"><strong>Resposta esperada</strong><div>${escapeHtml(exercise.answer || 'Nao informada')}</div></div>
        ${exercise.explanation ? `<div class="exercise-extra"><strong>Explicacao</strong><div>${escapeHtml(exercise.explanation)}</div></div>` : ''}
      ` : ''}
    </article>
  `).join('');

  fillSelect(elements.exercisePicker, exercises.map((exercise, index) => ({ id: String(index), label: `${index + 1}. ${exercise.prompt || 'Exercicio'}` })), (item) => item.label);
  elements.exercisePicker.disabled = false;
  elements.exerciseCheckButton.disabled = false;
  if (!elements.exercisePicker.value) elements.exercisePicker.value = '0';
  syncExerciseSelection();
}

function syncExerciseSelection() {
  const index = Number(elements.exercisePicker.value);
  const exercise = Number.isInteger(index) && index >= 0 ? state.latestExercises[index] : null;
  elements.exercisePickedType.value = exercise ? titleCase(exercise.type || 'general') : 'Sem item selecionado';
  elements.exerciseCheckButton.disabled = !exercise;
}

function renderLevel(result) {
  elements.levelOutput.className = 'feedback success';
  elements.levelOutput.innerHTML = `
    <div class="meta-row">
      <span class="metric">Nivel sugerido: ${escapeHtml(result.recommendedLevel || '--')}</span>
      <span class="metric">Confianca: ${Math.round((result.confidence || 0) * 100)}%</span>
    </div>
    <div style="margin-top:12px"><strong>Resumo</strong><div>${escapeHtml(result.explanation || 'Sem explicacao retornada.')}</div></div>
    <div style="margin-top:12px"><strong>Pontos fortes</strong>${listHtml(result.strengths)}</div>
    <div style="margin-top:12px"><strong>Lacunas</strong>${listHtml(result.gaps)}</div>
    <div style="margin-top:12px"><strong>Proximos marcos</strong>${listHtml(result.nextMilestones)}</div>
    ${result.sampleRewrite ? `<div style="margin-top:12px"><strong>Versao melhorada</strong><div>${escapeHtml(result.sampleRewrite)}</div></div>` : ''}
  `;
}

function renderVoice(result) {
  setMessage(elements.voiceTranscript, result.transcript || 'Sem transcricao retornada.', 'success');
  setMessage(elements.voiceReply, result.reply || 'Sem resposta retornada.', 'success');
  if (result.speech && result.speech.audioBase64) elements.voicePlayer.src = `data:${result.speech.mimeType};base64,${result.speech.audioBase64}`;
}

async function refreshSession({ preserveScreen = false, silent = false } = {}) {
  if (!state.token) {
    state.user = null;
    state.stats = null;
    if (!silent) setMessage(elements.authOutput, 'Entre para liberar o painel e as funcoes do ProfEng.');
    state.screen = 'auth';
    syncUi();
    return;
  }

  try {
    const data = await api('/auth/me', { headers: headers() });
    state.user = data.user;
    state.stats = data.stats || null;
    elements.levelCurrentLevel.value = state.user.level;
    state.screen = preserveScreen && state.screen !== 'auth' ? state.screen : 'hub';
    syncUi();
  } catch (error) {
    setToken('');
    state.user = null;
    state.stats = null;
    state.screen = 'auth';
    setMessage(elements.authOutput, error.message, 'error');
    syncUi();
  }
}

async function onAuthSuccess(data, message) {
  setToken(data.token);
  state.user = data.user;
  elements.authPassword.value = '';
  setMessage(elements.authOutput, message, 'success');
  await refreshSession();
}

async function handleGoogleCredentialResponse(response) {
  try {
    await onAuthSuccess(await api('/auth/google', {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({ idToken: response.credential, level: elements.authLevel.value, name: elements.authName.value }),
    }), 'Login com Google concluido. Abrindo seu painel...');
  } catch (error) {
    setMessage(elements.authOutput, error.message, 'error');
  }
}

function setupGoogleLogin(retryCount = 0) {
  if (!state.options || !state.options.auth) return;
  if (!state.options.auth.googleConfigured || !state.options.auth.googleClientId) {
    elements.googleHint.textContent = 'Login Google ainda nao esta configurado no servidor.';
    return;
  }
  if (!window.google || !window.google.accounts || !window.google.accounts.id) {
    if (retryCount < 12) {
      elements.googleHint.textContent = 'Preparando login Google...';
      window.setTimeout(() => setupGoogleLogin(retryCount + 1), 500);
      return;
    }
    elements.googleHint.textContent = 'O script do Google nao carregou. Recarregue a pagina.';
    return;
  }
  window.google.accounts.id.initialize({ client_id: state.options.auth.googleClientId, callback: handleGoogleCredentialResponse });
  elements.googleSlot.innerHTML = '';
  window.google.accounts.id.renderButton(elements.googleSlot, { theme: 'outline', size: 'large', shape: 'pill', width: Math.min(elements.googleSlot.offsetWidth || 320, 360), text: 'continue_with' });
  elements.googleHint.textContent = 'Voce tambem pode entrar com Google.';
}

async function loadOptions() {
  state.options = await api('/meta/options');
  fillSelect(elements.authLevel, state.options.levels, (item) => `${item.id} - ${item.label}`);
  fillSelect(elements.chatLevel, state.options.levels, (item) => `${item.id} - ${item.label}`);
  fillSelect(elements.exerciseLevel, state.options.levels, (item) => `${item.id} - ${item.label}`);
  fillSelect(elements.levelCurrentLevel, state.options.levels, (item) => `${item.id} - ${item.label}`);
  fillSelect(elements.voiceLevel, state.options.levels, (item) => `${item.id} - ${item.label}`);
  fillSelect(elements.chatMode, state.options.chatModes, titleCase);
  fillSelect(elements.chatCorrectionMode, state.options.correctionModes, titleCase);
  fillSelect(elements.exerciseSkill, state.options.exerciseSkills, titleCase);
  fillSelect(elements.voiceName, state.options.voices, (value) => value);
  elements.authLevel.value = 'A2';
  elements.chatLevel.value = 'B1';
  elements.exerciseLevel.value = 'B1';
  elements.levelCurrentLevel.value = 'B1';
  elements.voiceLevel.value = 'A2';
  elements.chatCorrectionMode.value = 'balanced';
  setupGoogleLogin();
  syncUi();
}

async function submitAuth() {
  try {
    const path = state.authMode === 'login' ? '/auth/login' : '/auth/register';
    const body = state.authMode === 'login'
      ? { email: elements.authEmail.value, password: elements.authPassword.value }
      : { name: elements.authName.value, email: elements.authEmail.value, password: elements.authPassword.value, level: elements.authLevel.value };
    await onAuthSuccess(await api(path, { method: 'POST', headers: headers(), body: JSON.stringify(body) }), state.authMode === 'login' ? 'Login concluido. Abrindo seu painel...' : 'Conta criada com sucesso. Abrindo seu painel...');
  } catch (error) {
    setMessage(elements.authOutput, error.message, 'error');
  }
}

async function logout() {
  try { await api('/auth/logout', { method: 'POST', headers: headers() }); } catch (_error) {}
  setToken('');
  state.user = null;
  state.stats = null;
  state.chatHistory = [];
  state.exerciseBatch = null;
  state.latestExercises = [];
  state.revealedAnswers = {};
  elements.voicePlayer.removeAttribute('src');
  renderChat();
  elements.exerciseOutput.className = 'empty';
  elements.exerciseOutput.textContent = 'Nenhum exercicio foi gerado ainda.';
  setMessage(elements.exerciseMeta, 'Gere uma lista para ver instrucoes, aquecimento e atividades na coluna ao lado.');
  elements.exercisePicker.innerHTML = '<option value="">Gere exercicios primeiro</option>';
  elements.exercisePicker.disabled = true;
  elements.exerciseCheckButton.disabled = true;
  elements.exercisePickedType.value = 'Sem item selecionado';
  setMessage(elements.exerciseCheckOutput, 'A correcao aparece aqui com nota, pontos fortes e proximo passo.');
  elements.levelOutput.className = 'empty';
  elements.levelOutput.textContent = 'Envie um texto para receber a avaliacao.';
  setMessage(elements.voiceTranscript, 'Grave algo para ver a transcricao aqui.');
  setMessage(elements.voiceReply, 'A resposta em texto aparece aqui depois da gravacao.');
  setMessage(elements.authOutput, 'Sessao encerrada. Entre novamente para continuar.');
  state.screen = 'auth';
  syncUi();
}

async function sendChat() {
  const userMessage = elements.chatMessage.value.trim();
  if (!userMessage) return;
  state.chatHistory.push({ role: 'user', content: userMessage });
  elements.chatMessage.value = '';
  renderChat();
  try {
    const data = await api('/chat', {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({ level: elements.chatLevel.value, mode: elements.chatMode.value, topic: elements.chatTopic.value, correctionMode: elements.chatCorrectionMode.value, learnerName: state.user ? state.user.name : '', messages: state.chatHistory }),
    });
    state.chatHistory.push({ role: 'assistant', content: data.reply });
  } catch (error) {
    state.chatHistory.push({ role: 'assistant', content: `Erro: ${error.message}` });
  }
  renderChat();
}

async function generateExercises() {
  try {
    const data = await api('/exercises/generate', {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({ level: elements.exerciseLevel.value, skill: elements.exerciseSkill.value, topic: elements.exerciseTopic.value || 'general daily English', count: 4 }),
    });
    state.exerciseBatch = data;
    state.latestExercises = Array.isArray(data.exercises) ? data.exercises : [];
    state.revealedAnswers = {};
    renderExercises();
  } catch (error) {
    setMessage(elements.exerciseMeta, error.message, 'error');
    elements.exerciseOutput.className = 'empty';
    elements.exerciseOutput.textContent = 'Nao foi possivel gerar os exercicios.';
  }
}

async function checkExercise() {
  const index = Number(elements.exercisePicker.value);
  const exercise = Number.isInteger(index) && index >= 0 ? state.latestExercises[index] : null;
  if (!exercise) return;
  try {
    const data = await api('/exercises/check', {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({ level: elements.exerciseLevel.value, topic: elements.exerciseTopic.value || 'general daily English', exerciseType: exercise.type, prompt: exercise.prompt, expectedAnswer: exercise.answer, userAnswer: elements.exerciseAnswer.value }),
    });
    setMessage(elements.exerciseCheckOutput, `
      <div class="meta-row">
        <span class="metric">Nota: ${escapeHtml(data.score ?? '--')}</span>
        <span class="metric">${data.correct ? 'Resposta considerada correta' : 'Ainda da para melhorar'}</span>
      </div>
      <div style="margin-top:12px"><strong>Explicacao</strong><div>${escapeHtml(data.explanation || 'Sem explicacao retornada.')}</div></div>
      <div style="margin-top:12px"><strong>Pontos fortes</strong>${listHtml(data.strengths)}</div>
      <div style="margin-top:12px"><strong>Erros</strong>${listHtml(data.mistakes)}</div>
      ${data.improvedAnswer ? `<div style="margin-top:12px"><strong>Versao melhorada</strong><div>${escapeHtml(data.improvedAnswer)}</div></div>` : ''}
      ${data.nextStep ? `<div style="margin-top:12px"><strong>Proximo passo</strong><div>${escapeHtml(data.nextStep)}</div></div>` : ''}
    `, data.correct ? 'success' : 'neutral', true);
    await refreshSession({ preserveScreen: true, silent: true });
  } catch (error) {
    setMessage(elements.exerciseCheckOutput, error.message, 'error');
  }
}

async function assessLevel() {
  try {
    const data = await api('/levels/assess', {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({ sampleText: elements.levelSample.value, currentLevel: elements.levelCurrentLevel.value, applyRecommendation: elements.levelApplyRecommendation.checked }),
    });
    renderLevel(data);
    await refreshSession({ preserveScreen: true, silent: true });
  } catch (error) {
    elements.levelOutput.className = 'feedback error';
    elements.levelOutput.textContent = error.message;
  }
}

async function blobToBase64(blob) {
  const arrayBuffer = await blob.arrayBuffer();
  let binary = '';
  const bytes = new Uint8Array(arrayBuffer);
  for (let index = 0; index < bytes.length; index += 0x8000) binary += String.fromCharCode(...bytes.subarray(index, index + 0x8000));
  return btoa(binary);
}

async function startRecording() {
  if (!navigator.mediaDevices || !window.MediaRecorder) {
    setMessage(elements.voiceHint, 'Seu navegador nao suporta gravacao de audio aqui.', 'error');
    return;
  }
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    state.recordedChunks = [];
    state.mediaRecorder = new MediaRecorder(stream);
    state.mediaRecorder.ondataavailable = (event) => { if (event.data && event.data.size > 0) state.recordedChunks.push(event.data); };
    state.mediaRecorder.start();
    elements.recordButton.disabled = true;
    elements.stopButton.disabled = false;
    setMessage(elements.voiceHint, 'Gravando... fale em ingles e clique em parar quando terminar.', 'success');
  } catch (error) {
    setMessage(elements.voiceHint, error.message, 'error');
  }
}

async function stopRecording() {
  if (!state.mediaRecorder) return;
  const recorder = state.mediaRecorder;
  state.mediaRecorder = null;
  recorder.onstop = async () => {
    try {
      const blob = new Blob(state.recordedChunks, { type: recorder.mimeType || 'audio/webm' });
      const data = await api('/voice/respond', {
        method: 'POST',
        headers: headers(),
        body: JSON.stringify({ level: elements.voiceLevel.value, voice: elements.voiceName.value, audioBase64: await blobToBase64(blob), mimeType: blob.type || 'audio/webm', speakResponse: true }),
      });
      renderVoice(data);
      setMessage(elements.voiceHint, 'Audio processado com sucesso.', 'success');
      await refreshSession({ preserveScreen: true, silent: true });
    } catch (error) {
      setMessage(elements.voiceHint, error.message, 'error');
      setMessage(elements.voiceReply, error.message, 'error');
    } finally {
      elements.recordButton.disabled = false;
      elements.stopButton.disabled = true;
    }
  };
  recorder.stop();
  recorder.stream.getTracks().forEach((track) => track.stop());
  setMessage(elements.voiceHint, 'Processando audio...');
}

renderChat();
syncUi();

[elements.modeRegister, elements.modeLogin].forEach((button) => {
  button.addEventListener('click', () => {
    state.authMode = button.dataset.authMode;
    syncAuthMode();
  });
});

elements.navButtons.forEach((button) => button.addEventListener('click', () => showScreen(button.dataset.openScreen)));
elements.authSubmitButton.addEventListener('click', submitAuth);
elements.authGoHubButton.addEventListener('click', () => showScreen('hub'));
elements.logoutSidebarButton.addEventListener('click', logout);
$('chatButton').addEventListener('click', sendChat);
$('clearChatButton').addEventListener('click', () => { state.chatHistory = []; renderChat(); });
$('exerciseButton').addEventListener('click', generateExercises);
elements.exercisePicker.addEventListener('change', syncExerciseSelection);
$('exerciseCheckButton').addEventListener('click', checkExercise);
$('assessButton').addEventListener('click', assessLevel);
elements.recordButton.addEventListener('click', startRecording);
elements.stopButton.addEventListener('click', stopRecording);
elements.exerciseOutput.addEventListener('click', (event) => {
  const button = event.target.closest('[data-action]');
  if (!button) return;
  const index = Number(button.dataset.index);
  if (!Number.isInteger(index)) return;
  if (button.dataset.action === 'toggle-answer') {
    state.revealedAnswers[index] = !state.revealedAnswers[index];
    renderExercises();
    elements.exercisePicker.value = String(index);
    syncExerciseSelection();
  }
  if (button.dataset.action === 'pick-exercise') {
    elements.exercisePicker.value = String(index);
    syncExerciseSelection();
    showScreen('exercises');
    elements.exerciseAnswer.focus();
  }
});

loadOptions()
  .then(() => refreshSession())
  .catch((error) => {
    elements.globalStatus.textContent = error.message;
    setMessage(elements.authOutput, error.message, 'error');
  });
