const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Carrega .env manualmente se existir
const fs = require('fs');
const path = require('path');
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
  const lines = fs.readFileSync(envPath, 'utf8').split('\n');
  for (const line of lines) {
    const [key, ...rest] = line.split('=');
    if (key && rest.length) process.env[key.trim()] = rest.join('=').trim();
  }
}

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
  console.error('\n❌ ERRO: OPENAI_API_KEY não configurada!');
  console.error('📋 Passos:');
  console.error('   1. Crie o arquivo .env na pasta "server"');
  console.error('   2. Adicione a linha: OPENAI_API_KEY=sk-...');
  console.error('   3. Reinicie com: npm start\n');
  process.exit(1);
}
console.log('✅ Chave OpenAI configurada');

// GET /health
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// POST /chat — conversa principal
app.post('/chat', async (req, res) => {
  const { messages, systemPrompt, ping } = req.body;

  if (ping) return res.json({ ok: true });

  if (!messages || !Array.isArray(messages) || messages.length === 0)
    return res.status(400).json({ error: 'Campo "messages" obrigatório.' });
  if (!systemPrompt)
    return res.status(400).json({ error: 'Campo "systemPrompt" obrigatório.' });

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        max_tokens: 350,
        temperature: 0.7,
        messages: [{ role: 'system', content: systemPrompt }, ...messages],
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      console.error('❌ OpenAI error:', data.error?.message);
      return res.status(response.status).json({ error: data.error?.message || 'OpenAI error' });
    }

    const reply = data.choices?.[0]?.message?.content || '';
    console.log(`💬 Resposta (${reply.length} chars)`);
    res.json({ reply });
  } catch (err) {
    console.error('❌ Erro:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// POST /feedback — análise de texto
app.post('/feedback', async (req, res) => {
  const { text, level } = req.body;
  if (!text) return res.status(400).json({ error: '"text" obrigatório.' });

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        max_tokens: 150,
        messages: [
          {
            role: 'system',
            content: `You are an English teacher at level ${level || 'B1'}. Give brief, friendly feedback: 1 grammar tip, 1 vocabulary suggestion, 1 encouragement. Max 3 sentences.`,
          },
          { role: 'user', content: text },
        ],
      }),
    });

    const data = await response.json();
    if (!response.ok) return res.status(response.status).json({ error: data.error?.message });
    res.json({ feedback: data.choices?.[0]?.message?.content || '' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.use((req, res) => res.status(404).json({ error: `Rota não encontrada: ${req.method} ${req.path}` }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`\n🚀 Professor de Inglês Backend`);
  console.log(`   http://localhost:${PORT}`);
  console.log(`\n📡 Endpoints:`);
  console.log(`   GET  /health`);
  console.log(`   POST /chat`);
  console.log(`   POST /feedback\n`);
});
