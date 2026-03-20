# ProfEng Backend

Backend em Node.js e Express para um app de aprendizado de ingles com:

- chat com regulacao por nivel CEFR
- feedback de texto
- transcricao de audio
- resposta por voz
- geracao e correcao de exercicios
- avaliacao de nivel
- login por email/senha
- login por Google

## O que existe neste repositorio

Este repositorio contem apenas o backend. As telas do app/frontend nao vieram neste commit, entao as funcionalidades novas ficam disponiveis como API para a interface consumir.

## Requisitos

- Node 18+
- uma chave OpenAI valida para chat, voz, feedback e exercicios
- `GOOGLE_CLIENT_ID` configurado se quiser login com Google

## Instalacao

```bash
npm install
```

Depois, copie o `.env.example` para `.env` e preencha com suas credenciais.

## Variaveis de ambiente

Arquivo de exemplo: [.env.example](/C:/Users/AAAAA/Documents/New%20project/.env.example)

Principais campos:

- `OPENAI_API_KEY`
- `OPENAI_TEXT_MODEL`
- `OPENAI_TRANSCRIBE_MODEL`
- `OPENAI_TTS_MODEL`
- `OPENAI_TTS_VOICE`
- `GOOGLE_CLIENT_ID`
- `ALLOWED_ORIGIN`
- `SESSION_TTL_DAYS`
- `APP_DATA_FILE` para escolher onde salvar os dados locais

## Rodando

```bash
npm start
```

Servidor padrao: `http://localhost:3000`

Para rodar os testes automatizados:

```bash
npm test
```

## Deploy

Este repositorio ja inclui um [render.yaml](/C:/Users/AAAAA/Documents/New%20project/render.yaml) para subir a API no Render como Web Service.

Passo a passo:

1. Faça commit e push das mudancas para o GitHub.
2. Abra o Blueprint no Render:
   `https://dashboard.render.com/blueprint/new?repo=https://github.com/ruamnilton-cyber/profeng`
3. Preencha os secrets:
   - `OPENAI_API_KEY`
   - `GOOGLE_CLIENT_ID`
4. Clique em `Apply`.

Para teste rapido, voce pode deixar `APP_URL` e `ALLOWED_ORIGIN` sem configurar. Se depois conectar um frontend real, ai vale definir:

- `APP_URL` com a URL final do backend no Render
- `ALLOWED_ORIGIN` com o dominio do frontend que vai consumir a API

### Limitacao importante no plano gratis

Hoje este backend salva usuarios e sessoes em arquivo local. Em Render Free, o filesystem local e efemero, entao esses dados podem ser perdidos quando o servico reinicia, redeploya ou fica ocioso por tempo suficiente para spin down.

Para teste isso pode servir, mas para uso mais serio o ideal e migrar essa persistencia para banco externo.

## Endpoints

### Base

- `GET /`
- `GET /health`
- `GET /meta/options`
- `GET /playground/`

### Auth

- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/google`
- `GET /auth/me`
- `PATCH /auth/profile`
- `POST /auth/logout`
- `GET /auth/providers`

### IA e aprendizado

- `POST /chat`
- `POST /feedback`
- `POST /voice/transcribe`
- `POST /voice/respond`
- `POST /exercises/generate`
- `POST /exercises/check`
- `POST /levels/assess`

## Exemplos

### Cadastro por email

```json
POST /auth/register
{
  "email": "aluno@exemplo.com",
  "password": "Senha1234",
  "name": "Ruan",
  "level": "A2"
}
```

### Chat regulado por nivel

```json
POST /chat
{
  "level": "B1",
  "mode": "conversation",
  "topic": "job interviews",
  "messages": [
    { "role": "user", "content": "Can you help me practice interview answers?" }
  ]
}
```

### Resposta por voz

```json
POST /voice/respond
{
  "audioBase64": "BASE64_DO_AUDIO",
  "mimeType": "audio/webm",
  "level": "A2",
  "speakResponse": true
}
```

### Geracao de exercicios

```json
POST /exercises/generate
{
  "level": "B1",
  "skill": "grammar",
  "topic": "present perfect",
  "count": 5
}
```

### Avaliacao de nivel

```json
POST /levels/assess
{
  "currentLevel": "B1",
  "sampleText": "Last week I have go to the beach with my family and it was very fun.",
  "applyRecommendation": true
}
```

## Como os niveis funcionam

O backend usa perfis CEFR (`A1` ate `C2`) para regular:

- tamanho e complexidade das respostas
- vocabulario esperado
- foco gramatical
- tipos de exercicio sugeridos
- intensidade das correcoes

Os perfis ficam em [src/constants/levels.js](/C:/Users/AAAAA/Documents/New%20project/src/constants/levels.js).

## Persistencia

Sem banco externo, o backend salva dados localmente em `data/app-data.json`:

- usuarios
- sessoes
- tentativas de exercicio
- avaliacoes de nivel
- sessoes de voz

Esse arquivo esta ignorado no Git.

Se quiser salvar em outro lugar, configure `APP_DATA_FILE`.

## Observacoes importantes

- As rotas de IA respondem com erro `503` enquanto `OPENAI_API_KEY` nao estiver configurada.
- O login com Google exige que o frontend envie um `idToken` valido do Google Sign-In.
- Como o frontend nao esta neste repositorio, ainda sera preciso conectar as telas do app a essas rotas.
