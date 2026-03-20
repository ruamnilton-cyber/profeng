const state = {
  token: localStorage.getItem('profeng_token') || '',
  user: null,
  chatHistory: [],
  mediaRecorder: null,
  recordedChunks: [],
  options: null,
};

const elements = {
  globalStatus: document.getElementById('globalStatus'),
  signedUser: document.getElementById('signedUser'),
  authName: document.getElementById('authName'),
  authLevel: document.getElementById('authLevel'),
  authEmail: document.getElementById('authEmail'),
  authPassword: document.getElementById('authPassword'),
  authOutput: document.getElementById('authOutput'),
  googleSlot: document.getElementById('googleSlot'),
  googleHint: document.getElementById('googleHint'),
  chatLevel: document.getElementById('chatLevel'),
  chatMode: document.getElementById('chatMode'),
  chatTopic: document.getElementById('chatTopic'),
  chatMessage: document.getElementById('chatMessage'),
  chatLog: document.getElementById('chatLog'),
  exerciseLevel: document.getElementById('exerciseLevel'),
  exerciseSkill: document.getElementById('exerciseSkill'),
  exerciseTopic: document.getElementById('exerciseTopic'),
  exerciseOutput: document.getElementById('exerciseOutput'),
  levelSample: document.getElementById('levelSample'),
  levelOutput: document.getElementById('levelOutput'),
  voiceLevel: document.getElementById('voiceLevel'),
  voiceName: document.getElementById('voiceName'),
  voiceOutput: document.getElementById('voiceOutput'),
  voicePlayer: document.getElementById('voicePlayer'),
  voiceHint: document.getElementById('voiceHint'),
  protectedCards: Array.from(document.querySelectorAll('.grid .card')),
};

function setToken(token) {
  state.token = token || '';
  if (state.token) {
    localStorage.setItem('profeng_token', state.token);
  } else {
    localStorage.removeItem('profeng_token');
  }
}

function headers(extra = {}) {
  return {
    'Content-Type': 'application/json',
    ...(state.token ? { Authorization: `Bearer ${state.token}` } : {}),
    ...extra,
  };
}

async function api(path, options = {}) {
  const response = await fetch(path, options);
  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) {
    throw new Error((data && data.error) || `Erro ${response.status}`);
  }

  return data;
}

function fillSelect(select, values, mapLabel) {
  select.innerHTML = '';
  values.forEach((value) => {
    const option = document.createElement('option');
    const optionValue = typeof value === 'string' ? value : value.id;
    option.value = optionValue;
    option.textContent = mapLabel ? mapLabel(value) : optionValue;
    select.appendChild(option);
  });
}

function showOutput(element, data) {
  element.textContent = typeof data === 'string' ? data : JSON.stringify(data, null, 2);
}

function syncProtectedCards() {
  elements.protectedCards.forEach((card) => {
    if (state.user) {
      card.classList.remove('locked');
    } else {
      card.classList.add('locked');
    }
  });
}

function syncSignedUser() {
  if (!state.user) {
    elements.signedUser.style.display = 'none';
    return;
  }

  elements.signedUser.style.display = 'block';
  elements.signedUser.textContent = `Sessao ativa: ${state.user.name || state.user.email} | nivel ${state.user.level}`;
}

function syncStatus() {
  const openAiReady = state.options && state.options.auth && state.options.auth.openAiConfigured;
  if (!state.user) {
    elements.globalStatus.textContent = openAiReady
      ? 'Entre com email/senha ou Google para começar.'
      : 'Entre com email/senha ou Google. A parte de IA ainda depende da chave OpenAI no servidor.';
    return;
  }

  elements.globalStatus.textContent = openAiReady
    ? `Tudo certo, ${state.user.name || state.user.email}. Sua conta está pronta para usar chat, voz e exercícios.`
    : `Sua conta entrou, ${state.user.name || state.user.email}. Agora falta ativar a OpenAI no servidor para chat, voz e exercícios funcionarem.`;
}

function renderChat() {
  elements.chatLog.innerHTML = '';
  if (state.chatHistory.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'muted';
    empty.textContent = 'A conversa vai aparecer aqui.';
    elements.chatLog.appendChild(empty);
    return;
  }

  state.chatHistory.forEach((message) => {
    const bubble = document.createElement('div');
    bubble.className = `bubble ${message.role === 'user' ? 'me' : ''}`;
    bubble.textContent = `${message.role === 'user' ? 'Voce' : 'Tutor'}: ${message.content}`;
    elements.chatLog.appendChild(bubble);
  });
}

function syncUi() {
  syncProtectedCards();
  syncSignedUser();
  syncStatus();
}

async function handleGoogleCredentialResponse(response) {
  try {
    const data = await api('/auth/google', {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({
        idToken: response.credential,
        level: elements.authLevel.value,
        name: elements.authName.value,
      }),
    });
    setToken(data.token);
    state.user = data.user;
    showOutput(elements.authOutput, data);
    syncUi();
  } catch (error) {
    elements.authOutput.textContent = error.message;
  }
}

function setupGoogleLogin(retryCount = 0) {
  if (!state.options || !state.options.auth) {
    return;
  }

  if (!state.options.auth.googleConfigured || !state.options.auth.googleClientId) {
    elements.googleHint.textContent = 'Login Google ainda não está configurado no servidor.';
    return;
  }

  if (!window.google || !window.google.accounts || !window.google.accounts.id) {
    if (retryCount < 12) {
      elements.googleHint.textContent = 'Preparando login Google...';
      window.setTimeout(() => setupGoogleLogin(retryCount + 1), 500);
      return;
    }

    elements.googleHint.textContent = 'O script do Google não carregou. Recarregue a página.';
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
    width: 320,
    text: 'continue_with',
  });
  elements.googleHint.textContent = 'Você também pode entrar com Google.';
}

async function loadOptions() {
  const options = await api('/meta/options');
  state.options = options;

  fillSelect(elements.authLevel, options.levels, (level) => `${level.id} - ${level.label}`);
  fillSelect(elements.chatLevel, options.levels, (level) => `${level.id} - ${level.label}`);
  fillSelect(elements.exerciseLevel, options.levels, (level) => `${level.id} - ${level.label}`);
  fillSelect(elements.voiceLevel, options.levels, (level) => `${level.id} - ${level.label}`);
  fillSelect(elements.chatMode, options.chatModes);
  fillSelect(elements.exerciseSkill, options.exerciseSkills);

  elements.authLevel.value = 'A2';
  elements.chatLevel.value = 'B1';
  elements.exerciseLevel.value = 'B1';
  elements.voiceLevel.value = 'A2';
  syncUi();
  setupGoogleLogin();
}

async function refreshSession() {
  if (!state.token) {
    elements.authOutput.textContent = 'Entre para começar.';
    state.user = null;
    syncUi();
    return;
  }

  try {
    const data = await api('/auth/me', {
      headers: headers(),
    });
    state.user = data.user;
    showOutput(elements.authOutput, data);
    syncUi();
  } catch (error) {
    setToken('');
    state.user = null;
    elements.authOutput.textContent = error.message;
    syncUi();
  }
}

document.getElementById('registerButton').addEventListener('click', async () => {
  try {
    const data = await api('/auth/register', {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({
        name: elements.authName.value,
        email: elements.authEmail.value,
        password: elements.authPassword.value,
        level: elements.authLevel.value,
      }),
    });
    setToken(data.token);
    state.user = data.user;
    showOutput(elements.authOutput, data);
    syncUi();
  } catch (error) {
    elements.authOutput.textContent = error.message;
  }
});

document.getElementById('loginButton').addEventListener('click', async () => {
  try {
    const data = await api('/auth/login', {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({
        email: elements.authEmail.value,
        password: elements.authPassword.value,
      }),
    });
    setToken(data.token);
    state.user = data.user;
    showOutput(elements.authOutput, data);
    syncUi();
  } catch (error) {
    elements.authOutput.textContent = error.message;
  }
});

document.getElementById('logoutButton').addEventListener('click', async () => {
  try {
    await api('/auth/logout', {
      method: 'POST',
      headers: headers(),
    });
  } catch (_error) {
    // Ignore logout failures and clear local state anyway.
  }

  setToken('');
  state.user = null;
  state.chatHistory = [];
  renderChat();
  elements.authOutput.textContent = 'Sessão encerrada.';
  syncUi();
});

document.getElementById('chatButton').addEventListener('click', async () => {
  const userMessage = elements.chatMessage.value.trim();
  if (!userMessage) {
    return;
  }

  state.chatHistory.push({ role: 'user', content: userMessage });
  renderChat();
  elements.chatMessage.value = '';

  try {
    const data = await api('/chat', {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({
        level: elements.chatLevel.value,
        mode: elements.chatMode.value,
        topic: elements.chatTopic.value,
        learnerName: state.user ? state.user.name : '',
        messages: state.chatHistory,
      }),
    });

    state.chatHistory.push({ role: 'assistant', content: data.reply });
    renderChat();
  } catch (error) {
    state.chatHistory.push({ role: 'assistant', content: `Erro: ${error.message}` });
    renderChat();
  }
});

document.getElementById('clearChatButton').addEventListener('click', () => {
  state.chatHistory = [];
  renderChat();
});

document.getElementById('exerciseButton').addEventListener('click', async () => {
  try {
    const data = await api('/exercises/generate', {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({
        level: elements.exerciseLevel.value,
        skill: elements.exerciseSkill.value,
        topic: elements.exerciseTopic.value || 'general daily English',
        count: 4,
      }),
    });
    showOutput(elements.exerciseOutput, data);
  } catch (error) {
    elements.exerciseOutput.textContent = error.message;
  }
});

document.getElementById('assessButton').addEventListener('click', async () => {
  try {
    const data = await api('/levels/assess', {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({
        sampleText: elements.levelSample.value,
        currentLevel: elements.chatLevel.value,
      }),
    });
    showOutput(elements.levelOutput, data);
  } catch (error) {
    elements.levelOutput.textContent = error.message;
  }
});

async function blobToBase64(blob) {
  const arrayBuffer = await blob.arrayBuffer();
  let binary = '';
  const bytes = new Uint8Array(arrayBuffer);
  const chunkSize = 0x8000;
  for (let index = 0; index < bytes.length; index += chunkSize) {
    const slice = bytes.subarray(index, index + chunkSize);
    binary += String.fromCharCode(...slice);
  }
  return btoa(binary);
}

document.getElementById('recordButton').addEventListener('click', async () => {
  if (!navigator.mediaDevices || !window.MediaRecorder) {
    elements.voiceHint.textContent = 'Seu navegador nao suporta gravacao de audio aqui.';
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
    state.mediaRecorder.start();
    elements.voiceHint.textContent = 'Gravando... fale em ingles e clique em Parar quando terminar.';
  } catch (error) {
    elements.voiceHint.textContent = error.message;
  }
});

document.getElementById('stopButton').addEventListener('click', async () => {
  if (!state.mediaRecorder) {
    return;
  }

  const recorder = state.mediaRecorder;
  state.mediaRecorder = null;

  recorder.onstop = async () => {
    try {
      const blob = new Blob(state.recordedChunks, { type: recorder.mimeType || 'audio/webm' });
      const audioBase64 = await blobToBase64(blob);
      const data = await api('/voice/respond', {
        method: 'POST',
        headers: headers(),
        body: JSON.stringify({
          level: elements.voiceLevel.value,
          voice: elements.voiceName.value,
          audioBase64,
          mimeType: blob.type || 'audio/webm',
          speakResponse: true,
        }),
      });

      showOutput(elements.voiceOutput, data);

      if (data.speech && data.speech.audioBase64) {
        elements.voicePlayer.src = `data:${data.speech.mimeType};base64,${data.speech.audioBase64}`;
      }
    } catch (error) {
      elements.voiceOutput.textContent = error.message;
    }
  };

  recorder.stop();
  recorder.stream.getTracks().forEach((track) => track.stop());
  elements.voiceHint.textContent = 'Processando audio...';
});

renderChat();
loadOptions().then(refreshSession).catch((error) => {
  elements.globalStatus.textContent = error.message;
});
