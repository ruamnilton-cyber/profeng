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
  authName: document.getElementById('authName'),
  authLevel: document.getElementById('authLevel'),
  authEmail: document.getElementById('authEmail'),
  authPassword: document.getElementById('authPassword'),
  authOutput: document.getElementById('authOutput'),
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

  elements.globalStatus.textContent = 'Playground pronto. Se a chave OpenAI estiver configurada no servidor, chat, voz e exercicios vao funcionar.';
}

async function refreshSession() {
  if (!state.token) {
    elements.authOutput.textContent = 'Sem sessao salva ainda.';
    return;
  }

  try {
    const data = await api('/auth/me', {
      headers: headers(),
    });
    state.user = data.user;
    showOutput(elements.authOutput, data);
  } catch (error) {
    setToken('');
    elements.authOutput.textContent = error.message;
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
  } catch (error) {
    elements.authOutput.textContent = error.message;
  }
});

document.getElementById('meButton').addEventListener('click', refreshSession);

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
