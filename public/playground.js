
const STORAGE_KEYS = {
  token: 'profeng_token',
  syncedUserId: 'profeng_synced_user_id',
  completed: 'profeng_completed',
  drafts: 'profeng_drafts',
  activitySets: 'profeng_activity_sets',
  activityResults: 'profeng_activity_results',
};

const LEVELS_FALLBACK = [
  { id: 'A0', label: 'Starter (Pre-A1)' },
  { id: 'A1', label: 'Iniciante' },
  { id: 'A2', label: 'Básico' },
  { id: 'B1', label: 'Intermediário' },
  { id: 'B2', label: 'Intermediário Avançado' },
  { id: 'C1', label: 'Avançado' },
  { id: 'C2', label: 'Proficiente' },
];

const LEVEL_LABELS_PT = {
  A0: 'Pré-A1 (Primeiras Palavras)',
  A1: 'Iniciante',
  A2: 'Básico',
  B1: 'Intermediário',
  B2: 'Intermediário Avançado',
  C1: 'Avançado',
  C2: 'Proficiente',
};

const LEVEL_FOCUS_PT = {
  A0: 'vocabulário essencial, reconhecimento de palavras e frases curtíssimas',
  A1: 'frases curtas, vocabulário do dia a dia e perguntas simples',
  A2: 'situacoes comuns, passado basico e planos futuros',
  B1: 'conversa com opinião, justificativas e leitura prática',
  B2: 'fluidez, argumentacao e contexto profissional',
  C1: 'precisão, nuance e comunicação formal avançada',
  C2: 'naturalidade de alto nível, estilo e controle total do idioma',
};

const CHAT_MODES_FALLBACK = ['conversation', 'explain', 'correction', 'roleplay'];
const EXERCISE_SKILLS_FALLBACK = ['mixed', 'grammar', 'vocabulary', 'reading', 'writing'];
const VOICES_FALLBACK = ['alloy', 'verse', 'sage', 'ash', 'coral'];
const CHAT_TOPIC_SUGGESTIONS = [
  { label: 'viagem internacional', prompt: 'Vamos conversar sobre uma viagem internacional que você quer fazer.' },
  { label: 'entrevista de emprego', prompt: 'Simule uma entrevista de emprego em inglês comigo.' },
  { label: 'inglês no trabalho', prompt: 'Pratique uma conversa de trabalho com reunião e e-mails.' },
  { label: 'restaurante e pedidos', prompt: 'Pratique inglês para pedir comida em um restaurante.' },
  { label: 'apresentação pessoal', prompt: 'Me ajude a fazer uma apresentação pessoal natural em inglês.' },
  { label: 'conversa no aeroporto', prompt: 'Treine dialogos comuns de aeroporto e voo internacional.' },
  { label: 'small talk no dia a dia', prompt: 'Pratique small talk curto para situacoes do dia a dia.' },
  { label: 'planejamento de estudos', prompt: 'Monte comigo um plano de estudos de inglês para 30 dias.' },
  { label: 'inglês para viagem de negócios', prompt: 'Simule situacoes de viagem de negócios em inglês.' },
  { label: 'corrigir frases comuns', prompt: 'Quero praticar frases comuns e você corrige de forma simples.' },
];

const ACTIVITY_STREAM_VERSION = 'stream-v1';
const ACTIVITY_PASS_SCORE = 70;
const ACTIVITY_MIN_QUESTIONS_TO_COMPLETE = 6;

const ACTIVITY_BY_LEVEL = {
  A0: [
    {
      id: 'a0-greetings',
      title: 'Primeiras palavras: cumprimentos',
      objective: 'Aprender palavras básicas de saudação e cortesia.',
      tips: [
        'Sequência didática usada em cursos introdutórios: cumprimentos -> números/cores -> família -> comida -> casa -> rotina.',
        'Palavras foco: hello, hi, bye, good morning, please, thank you.',
        'Leia em voz alta e associe palavra + significado.',
      ],
      tasks: [
        { id: 'flash', title: 'Mini flashcards', placeholder: 'hello = oi, thank you = obrigado(a)' },
      ],
    },
    {
      id: 'a0-numbers-colors',
      title: 'Números e cores essenciais',
      objective: 'Reconhecer números 0-20 e cores mais usadas.',
      tips: [
        'Palavras foco: one to twenty, red, blue, green, black, white.',
        'Treine apontando objetos reais na sua casa.',
        'Repita em blocos curtos (5 palavras por vez).',
      ],
      tasks: [
        { id: 'flash', title: 'Lista rápida', placeholder: 'one, two, three... red, blue, green...' },
      ],
    },
    {
      id: 'a0-family',
      title: 'Família e pessoas',
      objective: 'Aprender palavras do núcleo familiar e apresentações simples.',
      tips: [
        'Palavras foco: mother, father, brother, sister, friend, teacher.',
        'Monte frases curtíssimas: This is my mother.',
        'Conecte com sua vida para memorizar mais rápido.',
      ],
      tasks: [
        { id: 'flash', title: 'Mapa de família', placeholder: 'mother, father, brother...' },
      ],
    },
    {
      id: 'a0-food-daily',
      title: 'Comida e dia a dia',
      objective: 'Fixar vocabulário básico de alimentos e rotina.',
      tips: [
        'Palavras foco: water, bread, rice, beans, coffee, breakfast, lunch, dinner.',
        'Use frases simples: I like coffee. I eat bread.',
        'Treine sempre no mesmo horário para criar hábito.',
      ],
      tasks: [
        { id: 'flash', title: 'Vocabulário do dia', placeholder: 'water, bread, coffee...' },
      ],
    },
    {
      id: 'a0-home-objects',
      title: 'Objetos da casa',
      objective: 'Aprender palavras essenciais de casa e quarto.',
      tips: [
        'Palavras foco: house, room, bed, table, door, window, chair.',
        'Aponte para o objeto e fale em inglês.',
        'Use frases curtas: This is a table.',
      ],
      tasks: [
        { id: 'flash', title: 'Objetos essenciais', placeholder: 'bed, table, chair, window...' },
      ],
    },
    {
      id: 'a0-actions-routine',
      title: 'Ações do dia a dia',
      objective: 'Memorizar verbos básicos de rotina.',
      tips: [
        'Palavras foco: wake up, eat, drink, go, study, work, sleep.',
        'Treine com frases simples em primeira pessoa.',
        'Repita os verbos em voz alta com ritmo lento.',
      ],
      tasks: [
        { id: 'flash', title: 'Verbos básicos', placeholder: 'wake up, eat, drink, go...' },
      ],
    },
    {
      id: 'a0-places-transport',
      title: 'Lugares e transporte',
      objective: 'Reconhecer palavras básicas de locais e deslocamento.',
      tips: [
        'Palavras foco: school, work, market, bus, car, street, station.',
        'Faça associação com lugares da sua cidade.',
        'Use perguntas simples: Where is the market?',
      ],
      tasks: [
        { id: 'flash', title: 'Mapa do bairro', placeholder: 'school, bus, market, street...' },
      ],
    },
    {
      id: 'a0-mini-conversation',
      title: 'Mini conversas guiadas',
      objective: 'Montar diálogos curtíssimos com vocabulário inicial.',
      tips: [
        'Junte cumprimentos + nome + pergunta simples.',
        'Use blocos prontos: Hello, my name is... / How are you?',
        'Foque em clareza, não em velocidade.',
      ],
      tasks: [
        { id: 'flash', title: 'Roteiro de diálogo', placeholder: 'Hello! My name is... I am fine.' },
      ],
    },
  ],
  A1: [
    {
      id: 'a1-self',
      title: 'Apresentacao pessoal simples',
      objective: 'Falar sobre você com frases curtas e claras.',
      tips: ['Use simple present.', 'Fale nome, cidade e rotina.', 'Feche com uma pergunta simples.'],
      tasks: [
        { id: 'words', title: '10 palavras-chave', placeholder: 'name, city, work, family...' },
        { id: 'text', title: 'Mini texto (6 frases)', placeholder: 'My name is... I live in...' },
      ],
    },
    {
      id: 'a1-shopping',
      title: 'Dialogo no mercado',
      objective: 'Pedir informações basicas em inglês.',
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
      objective: 'Praticar simple past com comparação.',
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
      title: 'Defendendo uma opinião',
      objective: 'Argumentar com clareza e exemplos.',
      tips: ['Use conectores: because, however, therefore.', 'Diga um exemplo real.', 'Responda um contra-argumento.'],
      tasks: [
        { id: 'view', title: 'Sua opinião', placeholder: 'I believe remote work...' },
        { id: 'arguments', title: 'Dois argumentos', placeholder: 'First... Second...' },
      ],
    },
    {
      id: 'b1-summary',
      title: 'Resumo de noticia',
      objective: 'Ler e resumir com opinião pessoal.',
      tips: ['Separe fato de opinião.', 'Mantenha estrutura clara.', 'Feche com sua leitura critica.'],
      tasks: [
        { id: 'summary', title: 'Resumo (8 frases)', placeholder: 'The article explains...' },
        { id: 'opinion', title: 'Sua opinião (4 frases)', placeholder: 'In my view...' },
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
      title: 'Fala de reunião internacional',
      objective: 'Conduzir uma reunião em inglês.',
      tips: ['Abra com agenda objetiva.', 'Interaja com educação.', 'Feche com próximos passos.'],
      tasks: [
        { id: 'agenda', title: 'Abertura da reunião', placeholder: 'Today we will cover...' },
        { id: 'closing', title: 'Fechamento', placeholder: 'By next week we will...' },
      ],
    },
  ],
  C1: [
    {
      id: 'c1-presentation',
      title: 'Apresentacao executiva',
      objective: 'Apresentar dados com narrativa forte.',
      tips: ['Use linguagem precisa.', 'Evite frases vagas.', 'Feche com recomendação clara.'],
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
      tips: ['Trabalhe ritmo e ênfase.', 'Mantenha consistência de voz.', 'Revise para precisão máxima.'],
      tasks: [
        { id: 'thesis', title: 'Tese central', placeholder: 'Education systems must...' },
        { id: 'editorial', title: 'Texto editorial', placeholder: 'In contemporary debates...' },
      ],
    },
    {
      id: 'c2-register',
      title: 'Mudanca de registro',
      objective: 'Adaptar mensagem para contextos distintos.',
      tips: ['Mantenha a ideia central.', 'Ajuste tom e vocabulário.', 'Evite mistura de estilos.'],
      tasks: [
        { id: 'formal', title: 'Versão formal', placeholder: 'Due to unforeseen constraints...' },
        { id: 'technical', title: 'Versão técnica', placeholder: 'The deployment timeline has...' },
      ],
    },
  ],
};

const STARTER_WORD_LESSONS = {
  'a0-greetings': {
    title: 'Cumprimentos e Cortesia',
    note: 'Repita cada palavra 3x e use em mini diálogos.',
    words: [
      { en: 'hello', pt: 'olá', example: 'Hello, teacher.' },
      { en: 'hi', pt: 'oi', example: 'Hi, Maria.' },
      { en: 'good morning', pt: 'bom dia', example: 'Good morning, class.' },
      { en: 'good night', pt: 'boa noite', example: 'Good night, mom.' },
      { en: 'bye', pt: 'tchau', example: 'Bye, see you.' },
      { en: 'please', pt: 'por favor', example: 'Please, help me.' },
      { en: 'thank you', pt: 'obrigado(a)', example: 'Thank you, Ana.' },
      { en: 'sorry', pt: 'desculpe', example: 'Sorry, I am late.' },
      { en: 'yes', pt: 'sim', example: 'Yes, I do.' },
      { en: 'no', pt: 'não', example: 'No, thanks.' },
    ],
  },
  'a0-numbers-colors': {
    title: 'Números e Cores',
    note: 'Comece com números 0-10, depois avance para 20.',
    words: [
      { en: 'one', pt: 'um', example: 'One apple.' },
      { en: 'two', pt: 'dois', example: 'Two books.' },
      { en: 'three', pt: 'três', example: 'Three pens.' },
      { en: 'ten', pt: 'dez', example: 'Ten minutes.' },
      { en: 'twenty', pt: 'vinte', example: 'Twenty students.' },
      { en: 'red', pt: 'vermelho', example: 'A red car.' },
      { en: 'blue', pt: 'azul', example: 'A blue bag.' },
      { en: 'green', pt: 'verde', example: 'Green trees.' },
      { en: 'black', pt: 'preto', example: 'A black phone.' },
      { en: 'white', pt: 'branco', example: 'A white paper.' },
    ],
  },
  'a0-family': {
    title: 'Família e Pessoas',
    note: 'Associe cada palavra a alguém real da sua vida.',
    words: [
      { en: 'mother', pt: 'mãe', example: 'My mother is kind.' },
      { en: 'father', pt: 'pai', example: 'My father is here.' },
      { en: 'brother', pt: 'irmão', example: 'My brother is tall.' },
      { en: 'sister', pt: 'irmã', example: 'My sister studies.' },
      { en: 'grandmother', pt: 'avó', example: 'My grandmother cooks.' },
      { en: 'grandfather', pt: 'avô', example: 'My grandfather reads.' },
      { en: 'friend', pt: 'amigo(a)', example: 'My friend is funny.' },
      { en: 'teacher', pt: 'professor(a)', example: 'My teacher helps me.' },
      { en: 'boy', pt: 'menino', example: 'The boy is happy.' },
      { en: 'girl', pt: 'menina', example: 'The girl is smart.' },
    ],
  },
  'a0-food-daily': {
    title: 'Comida e Rotina',
    note: 'Treine na hora das refeições para fixar mais rápido.',
    words: [
      { en: 'water', pt: 'água', example: 'I drink water.' },
      { en: 'bread', pt: 'pão', example: 'I eat bread.' },
      { en: 'rice', pt: 'arroz', example: 'I like rice.' },
      { en: 'beans', pt: 'feijão', example: 'Beans are healthy.' },
      { en: 'milk', pt: 'leite', example: 'I drink milk.' },
      { en: 'coffee', pt: 'café', example: 'Coffee is hot.' },
      { en: 'breakfast', pt: 'café da manhã', example: 'Breakfast at 7.' },
      { en: 'lunch', pt: 'almoço', example: 'Lunch at noon.' },
      { en: 'dinner', pt: 'jantar', example: 'Dinner with family.' },
      { en: 'fruit', pt: 'fruta', example: 'I eat fruit daily.' },
    ],
  },
  'a0-home-objects': {
    title: 'Casa e Objetos',
    note: 'Aponte para o objeto real enquanto fala a palavra.',
    words: [
      { en: 'house', pt: 'casa', example: 'My house is small.' },
      { en: 'room', pt: 'quarto', example: 'This is my room.' },
      { en: 'bed', pt: 'cama', example: 'The bed is soft.' },
      { en: 'table', pt: 'mesa', example: 'The book is on the table.' },
      { en: 'chair', pt: 'cadeira', example: 'Sit on the chair.' },
      { en: 'door', pt: 'porta', example: 'Close the door.' },
      { en: 'window', pt: 'janela', example: 'Open the window.' },
      { en: 'kitchen', pt: 'cozinha', example: 'Mom is in the kitchen.' },
      { en: 'bathroom', pt: 'banheiro', example: 'The bathroom is clean.' },
      { en: 'key', pt: 'chave', example: 'Where is my key?' },
    ],
  },
  'a0-actions-routine': {
    title: 'Verbos de Rotina',
    note: 'Monte frases em sequência: I wake up, I eat, I work...',
    words: [
      { en: 'wake up', pt: 'acordar', example: 'I wake up at 6.' },
      { en: 'eat', pt: 'comer', example: 'I eat breakfast.' },
      { en: 'drink', pt: 'beber', example: 'I drink water.' },
      { en: 'go', pt: 'ir', example: 'I go to school.' },
      { en: 'study', pt: 'estudar', example: 'I study English.' },
      { en: 'work', pt: 'trabalhar', example: 'I work in the morning.' },
      { en: 'read', pt: 'ler', example: 'I read at night.' },
      { en: 'write', pt: 'escrever', example: 'I write notes.' },
      { en: 'sleep', pt: 'dormir', example: 'I sleep at 10.' },
      { en: 'listen', pt: 'ouvir', example: 'I listen to music.' },
    ],
  },
  'a0-places-transport': {
    title: 'Lugares e Transporte',
    note: 'Use perguntas simples: Where is... ? How do I go... ?',
    words: [
      { en: 'school', pt: 'escola', example: 'My school is near.' },
      { en: 'work', pt: 'trabalho', example: 'I am at work.' },
      { en: 'market', pt: 'mercado', example: 'Go to the market.' },
      { en: 'hospital', pt: 'hospital', example: 'The hospital is far.' },
      { en: 'bus', pt: 'ônibus', example: 'I take the bus.' },
      { en: 'car', pt: 'carro', example: 'My car is blue.' },
      { en: 'street', pt: 'rua', example: 'This street is busy.' },
      { en: 'station', pt: 'estação', example: 'The station is here.' },
      { en: 'left', pt: 'esquerda', example: 'Turn left.' },
      { en: 'right', pt: 'direita', example: 'Turn right.' },
    ],
  },
  'a0-mini-conversation': {
    title: 'Mini Conversas',
    note: 'Leia os blocos, depois faça pequenas trocas de falas.',
    words: [
      { en: 'my name is', pt: 'meu nome é', example: 'My name is João.' },
      { en: 'how are you', pt: 'como você está', example: 'How are you today?' },
      { en: 'I am fine', pt: 'eu estou bem', example: 'I am fine, thanks.' },
      { en: 'nice to meet you', pt: 'prazer em conhecer você', example: 'Nice to meet you, Ana.' },
      { en: 'where are you from', pt: 'de onde você é', example: 'Where are you from?' },
      { en: 'I am from Brazil', pt: 'eu sou do Brasil', example: 'I am from Brazil.' },
      { en: 'what is this', pt: 'o que é isto', example: 'What is this?' },
      { en: 'this is', pt: 'isto é', example: 'This is my phone.' },
      { en: 'can you help me', pt: 'você pode me ajudar', example: 'Can you help me, please?' },
      { en: 'thank you very much', pt: 'muito obrigado(a)', example: 'Thank you very much.' },
    ],
  },
};

const QUIZ_QUESTIONS = [
  {
    id: 'q1',
    stage: 'Base A0-A1',
    question: 'Você encontra alguém pela primeira vez. Qual resposta é mais natural para o seu nível atual?',
    options: [
      { label: 'Hi.', score: 0 },
      { label: 'Hi, I am Ana.', score: 1 },
      { label: 'Hi! Nice to meet you. I am Ana.', score: 2 },
      { label: 'Hi! Nice to meet you. I am Ana from Brazil.', score: 3 },
      { label: 'Hi, great to meet you. I am Ana and I work in marketing.', score: 4 },
      { label: 'Hi, pleasure to meet you. I am Ana, and I would love to hear about your background too.', score: 5 },
      { label: 'A pleasure meeting you. I am Ana, and I look forward to exploring how our experiences intersect.', score: 6 },
    ],
  },
  {
    id: 'q2',
    stage: 'Base A0-A1',
    question: 'Qual opção mostra vocabulário básico de comida corretamente?',
    options: [
      { label: 'bread = pão', score: 0 },
      { label: 'bread = pão, rice = arroz', score: 1 },
      { label: 'I like bread and rice.', score: 2 },
      { label: 'I usually eat rice and beans for lunch.', score: 3 },
      { label: 'I usually have a light lunch with rice, beans and salad.', score: 4 },
      { label: 'I generally prefer a balanced lunch, typically rice, beans and vegetables.', score: 5 },
      { label: 'My lunch tends to be nutritionally balanced, often centered on rice, beans and fresh produce.', score: 6 },
    ],
  },
  {
    id: 'q3',
    stage: 'A1-A2',
    question: 'Você quer pedir algo no restaurante. Qual frase representa melhor seu nível?',
    options: [
      { label: 'Water, please.', score: 0 },
      { label: 'Can I have water, please?', score: 1 },
      { label: 'Can I have water and bread, please?', score: 2 },
      { label: 'Could I have water, bread and a small salad, please?', score: 3 },
      { label: 'Could I have water, whole-grain bread and a small salad, please?', score: 4 },
      { label: 'Could I have sparkling water and a light starter, please? Thank you.', score: 5 },
      { label: 'Could I please have sparkling water and a light starter while I review the main options?', score: 6 },
    ],
  },
  {
    id: 'q4',
    stage: 'A2',
    question: 'Você precisa pedir informação de direção. Qual opção é mais adequada ao seu nível?',
    options: [
      { label: 'Where station?', score: 0 },
      { label: 'Where is the station?', score: 1 },
      { label: 'Excuse me, where is the bus station?', score: 2 },
      { label: 'Excuse me, how can I get to the bus station?', score: 3 },
      { label: 'Excuse me, could you tell me the best way to get to the station?', score: 4 },
      { label: 'Could you please point me toward the nearest station and suggest the quickest route?', score: 5 },
      { label: 'Would you mind indicating the most efficient route to the station at this time of day?', score: 6 },
    ],
  },
  {
    id: 'q5',
    stage: 'A2-B1',
    question: 'Como você descreve um dia de ontem?',
    options: [
      { label: 'Yesterday good.', score: 0 },
      { label: 'Yesterday I go to work.', score: 1 },
      { label: 'Yesterday I went to work and I was tired.', score: 2 },
      { label: 'Yesterday I went to work, solved some tasks and got home late.', score: 3 },
      { label: 'Yesterday I handled a busy day at work and still completed my main priorities.', score: 4 },
      { label: 'Yesterday was demanding, but I managed to prioritize well and close key deliverables.', score: 5 },
      { label: 'Yesterday was particularly demanding; however, through clear prioritization I delivered every critical task.', score: 6 },
    ],
  },
  {
    id: 'q6',
    stage: 'B1',
    question: 'Você quer dar sua opinião com argumento. Qual opção encaixa melhor?',
    options: [
      { label: 'I like this.', score: 0 },
      { label: 'I like this because is good.', score: 1 },
      { label: 'I like this idea because it is practical.', score: 2 },
      { label: 'I agree with this idea because it saves time and reduces confusion.', score: 3 },
      { label: 'I support this idea because it streamlines execution and improves team alignment.', score: 4 },
      { label: 'I support this approach, as it improves coordination while keeping implementation realistic.', score: 5 },
      { label: 'I endorse this approach, given its operational efficiency and its capacity to sustain cross-team alignment.', score: 6 },
    ],
  },
  {
    id: 'q7',
    stage: 'B1-B2',
    question: 'Houve um problema no trabalho. Como explicar de forma clara?',
    options: [
      { label: 'Big problem. We fix.', score: 0 },
      { label: 'There was a problem and we fixed fast.', score: 1 },
      { label: 'There was a problem, but my team fixed it quickly.', score: 2 },
      { label: 'There was a technical issue, so we reorganized tasks and solved it on time.', score: 3 },
      { label: 'We faced a technical issue, reprioritized tasks and restored delivery within the same day.', score: 4 },
      { label: 'We encountered a critical issue, reassigned ownership and recovered delivery without impacting milestones.', score: 5 },
      { label: 'We encountered a critical incident, recalibrated ownership and recovered delivery while protecting strategic milestones.', score: 6 },
    ],
  },
  {
    id: 'q8',
    stage: 'B2',
    question: 'Qual frase tem tom mais profissional para e-mail?',
    options: [
      { label: 'Send me the file now.', score: 0 },
      { label: 'Can you send me the file today?', score: 1 },
      { label: 'Could you send me the updated file today, please?', score: 2 },
      { label: 'Could you share the updated file by the end of the day?', score: 3 },
      { label: 'Would you mind sharing the revised file by EOD so we can finalize the deliverable?', score: 4 },
      { label: 'Could you please share the revised version by EOD so we can complete final validation?', score: 5 },
      { label: 'Would you be able to share the revised version by EOD to support final validation and sign-off?', score: 6 },
    ],
  },
  {
    id: 'q9',
    stage: 'B2-C1',
    question: 'Você precisa discordar com educação. Qual opção é mais madura linguisticamente?',
    options: [
      { label: 'No, you are wrong.', score: 0 },
      { label: 'I do not agree.', score: 1 },
      { label: 'I see your point, but I do not agree.', score: 2 },
      { label: 'I understand your view; however, I believe we should test another approach.', score: 3 },
      { label: 'I appreciate your perspective; nonetheless, I recommend we validate an alternative before deciding.', score: 4 },
      { label: 'Your perspective is valid; still, I would advocate an additional validation cycle before commitment.', score: 5 },
      { label: 'While your argument is well-founded, I would still prioritize a secondary validation stream before commitment.', score: 6 },
    ],
  },
  {
    id: 'q10',
    stage: 'C1',
    question: 'Como você resumiria um resultado de projeto com precisão?',
    options: [
      { label: 'Project was good.', score: 0 },
      { label: 'Project was good and finished.', score: 1 },
      { label: 'The project finished on time and had good results.', score: 2 },
      { label: 'The project met the deadline, improved quality and reduced rework.', score: 3 },
      { label: 'The project met the deadline, improved quality indicators and reduced rework by 18%.', score: 4 },
      { label: 'The project met schedule targets, improved quality metrics and lowered rework by 18% across two cycles.', score: 5 },
      { label: 'The project met schedule targets, improved quality metrics and sustainably reduced rework by 18% across two cycles.', score: 6 },
    ],
  },
  {
    id: 'q11',
    stage: 'C1-C2',
    question: 'Em negociação, qual resposta mostra maior controle de nuance?',
    options: [
      { label: 'No discount.', score: 0 },
      { label: 'We cannot give discount.', score: 1 },
      { label: 'We cannot offer a discount right now.', score: 2 },
      { label: 'At this stage, we cannot reduce pricing, but we can review delivery scope.', score: 3 },
      { label: 'At this stage, pricing is fixed; however, we can optimize implementation scope to increase value.', score: 4 },
      { label: 'While pricing remains fixed, we can reframe scope and milestones to maximize commercial value for both sides.', score: 5 },
      { label: 'Although pricing remains fixed, we can recalibrate scope and milestones to optimize value capture for both parties.', score: 6 },
    ],
  },
  {
    id: 'q12',
    stage: 'Conversação Avançada',
    question: 'Qual resposta demonstra fluência em conversação complexa sob pressão?',
    options: [
      { label: 'I am nervous.', score: 0 },
      { label: 'I am nervous but I can do it.', score: 1 },
      { label: 'I am nervous, but I will do my best to explain clearly.', score: 2 },
      { label: 'Although I feel pressure, I can structure my points and respond objectively.', score: 3 },
      { label: 'Even under pressure, I can prioritize key arguments and respond with clarity and evidence.', score: 4 },
      { label: 'Despite the pressure, I can synthesize complex inputs and respond with strategic clarity and composure.', score: 5 },
      { label: 'Even in high-stakes contexts, I can integrate competing inputs and deliver a coherent, evidence-based response with composure.', score: 6 },
    ],
  },
];

const OBJECTIVE_BANK_BY_ACTIVITY = {
  'a0-greetings': [
    {
      id: 'a0g-mc-1',
      type: 'mc',
      prompt: 'Qual palavra significa "oi" em inglês?',
      options: ['goodbye', 'hello', 'night'],
      answer: 'hello',
      explanation: 'Hello = oi/olá.',
    },
    {
      id: 'a0g-mc-2',
      type: 'mc',
      prompt: 'Complete: ___ morning!',
      options: ['Good', 'Please', 'Thanks'],
      answer: 'Good',
      explanation: 'A expressão correta é "Good morning".',
    },
    {
      id: 'a0g-fill-1',
      type: 'fill',
      prompt: 'Escreva em inglês: "obrigado(a)".',
      answer: ['thank you', 'thanks'],
      explanation: 'Thank you e Thanks são formas corretas.',
    },
    {
      id: 'a0g-tf-1',
      type: 'tf',
      prompt: '"Bye" é usado para se despedir.',
      answer: true,
      correction: 'Correto: Bye = tchau.',
    },
    {
      id: 'a0g-check-1',
      type: 'check',
      prompt: 'Sentence: "Please" é usado para pedir algo com educação. This is...',
      answer: 'correct',
      correction: 'Correta. "Please" deixa o pedido educado.',
    },
    {
      id: 'a0g-fill-2',
      type: 'fill',
      prompt: 'Complete: Hi, ___ are you?',
      answer: ['how'],
      explanation: 'A pergunta básica é "How are you?".',
    },
  ],
  'a0-numbers-colors': [
    {
      id: 'a0n-mc-1',
      type: 'mc',
      prompt: 'Qual é o número "3" em inglês?',
      options: ['two', 'three', 'thirteen'],
      answer: 'three',
      explanation: '3 = three.',
    },
    {
      id: 'a0n-mc-2',
      type: 'mc',
      prompt: 'Qual cor significa "azul"?',
      options: ['green', 'blue', 'black'],
      answer: 'blue',
      explanation: 'Blue = azul.',
    },
    {
      id: 'a0n-fill-1',
      type: 'fill',
      prompt: 'Escreva em inglês: "vermelho".',
      answer: ['red'],
      explanation: 'Red = vermelho.',
    },
    {
      id: 'a0n-tf-1',
      type: 'tf',
      prompt: '"Ten" significa 10.',
      answer: true,
      correction: 'Correto: ten = 10.',
    },
    {
      id: 'a0n-check-1',
      type: 'check',
      prompt: 'Sentence: "White" significa branco. This is...',
      answer: 'correct',
      correction: 'Correta. White = branco.',
    },
    {
      id: 'a0n-fill-2',
      type: 'fill',
      prompt: 'Complete: One, two, ___.',
      answer: ['three'],
      explanation: 'A sequência é one, two, three.',
    },
  ],
  'a0-family': [
    {
      id: 'a0f-mc-1',
      type: 'mc',
      prompt: 'Qual palavra significa "mãe"?',
      options: ['mother', 'brother', 'teacher'],
      answer: 'mother',
      explanation: 'Mother = mãe.',
    },
    {
      id: 'a0f-mc-2',
      type: 'mc',
      prompt: 'Complete: This is my ___. (irmão)',
      options: ['sister', 'brother', 'friend'],
      answer: 'brother',
      explanation: 'Brother = irmão.',
    },
    {
      id: 'a0f-fill-1',
      type: 'fill',
      prompt: 'Escreva em inglês: "amiga(o)".',
      answer: ['friend'],
      explanation: 'Friend = amiga(o).',
    },
    {
      id: 'a0f-tf-1',
      type: 'tf',
      prompt: '"Father" significa pai.',
      answer: true,
      correction: 'Correto: father = pai.',
    },
    {
      id: 'a0f-check-1',
      type: 'check',
      prompt: 'Sentence: "Sister" significa irmã. This is...',
      answer: 'correct',
      correction: 'Correta. Sister = irmã.',
    },
    {
      id: 'a0f-fill-2',
      type: 'fill',
      prompt: 'Complete: This is my ___. (professora/professor)',
      answer: ['teacher'],
      explanation: 'Teacher = professora/professor.',
    },
  ],
  'a0-food-daily': [
    {
      id: 'a0d-mc-1',
      type: 'mc',
      prompt: 'Qual palavra significa "água"?',
      options: ['water', 'coffee', 'bread'],
      answer: 'water',
      explanation: 'Water = água.',
    },
    {
      id: 'a0d-mc-2',
      type: 'mc',
      prompt: 'Qual refeição significa "café da manhã"?',
      options: ['dinner', 'breakfast', 'lunch'],
      answer: 'breakfast',
      explanation: 'Breakfast = café da manhã.',
    },
    {
      id: 'a0d-fill-1',
      type: 'fill',
      prompt: 'Escreva em inglês: "pão".',
      answer: ['bread'],
      explanation: 'Bread = pão.',
    },
    {
      id: 'a0d-tf-1',
      type: 'tf',
      prompt: '"Dinner" pode significar jantar.',
      answer: true,
      correction: 'Correto: dinner = jantar.',
    },
    {
      id: 'a0d-check-1',
      type: 'check',
      prompt: 'Sentence: "I like coffee." This is...',
      answer: 'correct',
      correction: 'Correta. Frase simples e natural.',
    },
    {
      id: 'a0d-fill-2',
      type: 'fill',
      prompt: 'Complete: I drink ___.',
      answer: ['water', 'coffee'],
      explanation: 'As duas opções são válidas para o treino.',
    },
  ],
  'a0-home-objects': [
    {
      id: 'a0h-mc-1',
      type: 'mc',
      prompt: 'Qual palavra significa "janela"?',
      options: ['window', 'door', 'table'],
      answer: 'window',
      explanation: 'Window = janela.',
    },
    {
      id: 'a0h-mc-2',
      type: 'mc',
      prompt: 'Complete: This is a ___. (cadeira)',
      options: ['chair', 'bed', 'kitchen'],
      answer: 'chair',
      explanation: 'Chair = cadeira.',
    },
    {
      id: 'a0h-fill-1',
      type: 'fill',
      prompt: 'Escreva em inglês: "porta".',
      answer: ['door'],
      explanation: 'Door = porta.',
    },
    {
      id: 'a0h-tf-1',
      type: 'tf',
      prompt: '"Table" significa mesa.',
      answer: true,
      correction: 'Correto: table = mesa.',
    },
    {
      id: 'a0h-check-1',
      type: 'check',
      prompt: 'Sentence: "Bed" significa cama. This is...',
      answer: 'correct',
      correction: 'Correta. Bed = cama.',
    },
    {
      id: 'a0h-fill-2',
      type: 'fill',
      prompt: 'Complete: Open the ___.',
      answer: ['window', 'door'],
      explanation: 'As duas palavras são válidas no contexto.',
    },
  ],
  'a0-actions-routine': [
    {
      id: 'a0r-mc-1',
      type: 'mc',
      prompt: 'Qual verbo significa "acordar"?',
      options: ['wake up', 'sleep', 'read'],
      answer: 'wake up',
      explanation: 'Wake up = acordar.',
    },
    {
      id: 'a0r-mc-2',
      type: 'mc',
      prompt: 'Complete: I ___ water.',
      options: ['drink', 'sleep', 'write'],
      answer: 'drink',
      explanation: 'A frase correta é I drink water.',
    },
    {
      id: 'a0r-fill-1',
      type: 'fill',
      prompt: 'Escreva em inglês: "estudar".',
      answer: ['study'],
      explanation: 'Study = estudar.',
    },
    {
      id: 'a0r-tf-1',
      type: 'tf',
      prompt: '"Sleep" significa dormir.',
      answer: true,
      correction: 'Correto: sleep = dormir.',
    },
    {
      id: 'a0r-check-1',
      type: 'check',
      prompt: 'Sentence: "I work in the morning." This is...',
      answer: 'correct',
      correction: 'Correta e natural para rotina.',
    },
    {
      id: 'a0r-fill-2',
      type: 'fill',
      prompt: 'Complete: I ___ English every day.',
      answer: ['study'],
      explanation: 'Use study para "estudo".',
    },
  ],
  'a0-places-transport': [
    {
      id: 'a0p-mc-1',
      type: 'mc',
      prompt: 'Qual palavra significa "ônibus"?',
      options: ['bus', 'car', 'station'],
      answer: 'bus',
      explanation: 'Bus = ônibus.',
    },
    {
      id: 'a0p-mc-2',
      type: 'mc',
      prompt: 'Complete: I go to ___. (escola)',
      options: ['school', 'street', 'left'],
      answer: 'school',
      explanation: 'School = escola.',
    },
    {
      id: 'a0p-fill-1',
      type: 'fill',
      prompt: 'Escreva em inglês: "mercado".',
      answer: ['market'],
      explanation: 'Market = mercado.',
    },
    {
      id: 'a0p-tf-1',
      type: 'tf',
      prompt: '"Right" pode significar direita.',
      answer: true,
      correction: 'Correto: right = direita.',
    },
    {
      id: 'a0p-check-1',
      type: 'check',
      prompt: 'Sentence: "Turn left." This is...',
      answer: 'correct',
      correction: 'Correta para instrução de direção.',
    },
    {
      id: 'a0p-fill-2',
      type: 'fill',
      prompt: 'Complete: The ___ is near my house. (estação)',
      answer: ['station'],
      explanation: 'Station = estação.',
    },
  ],
  'a0-mini-conversation': [
    {
      id: 'a0c-mc-1',
      type: 'mc',
      prompt: 'Qual é a melhor abertura de mini conversa?',
      options: ['Hello, my name is Ana.', 'Rice and bread.', 'Blue bus.'],
      answer: 'Hello, my name is Ana.',
      explanation: 'Ótima abertura simples e útil.',
    },
    {
      id: 'a0c-mc-2',
      type: 'mc',
      prompt: 'Complete: Nice to ___ you.',
      options: ['meet', 'eat', 'sleep'],
      answer: 'meet',
      explanation: 'A expressão correta é Nice to meet you.',
    },
    {
      id: 'a0c-fill-1',
      type: 'fill',
      prompt: 'Escreva em inglês: "Como você está?"',
      answer: ['how are you'],
      explanation: 'How are you? é a forma comum.',
    },
    {
      id: 'a0c-tf-1',
      type: 'tf',
      prompt: '"I am fine" significa "eu estou bem".',
      answer: true,
      correction: 'Correto.',
    },
    {
      id: 'a0c-check-1',
      type: 'check',
      prompt: 'Sentence: "Where are you from?" This is...',
      answer: 'correct',
      correction: 'Correta para perguntar origem.',
    },
    {
      id: 'a0c-fill-2',
      type: 'fill',
      prompt: 'Complete: I am ___ Brazil.',
      answer: ['from'],
      explanation: 'A frase correta é I am from Brazil.',
    },
  ],
};

const OBJECTIVE_BANK_BY_LEVEL = {
  A0: [
    { id: 'a0-mc-1', type: 'mc', prompt: 'Qual palavra significa "tchau"?', options: ['bye', 'thanks', 'hello'], answer: 'bye', explanation: 'Bye = tchau.' },
    { id: 'a0-mc-2', type: 'mc', prompt: 'Qual palavra significa "verde"?', options: ['green', 'black', 'blue'], answer: 'green', explanation: 'Green = verde.' },
    { id: 'a0-fill-1', type: 'fill', prompt: 'Complete: Good ___ (manhã).', answer: ['morning'], explanation: 'Good morning = bom dia.' },
    { id: 'a0-fill-2', type: 'fill', prompt: 'Escreva em inglês: "irmã".', answer: ['sister'], explanation: 'Sister = irmã.' },
    { id: 'a0-tf-1', type: 'tf', prompt: '"Please" é usado para pedir algo com educação.', answer: true, correction: 'Correto.' },
    { id: 'a0-check-1', type: 'check', prompt: 'Sentence: "Water" significa água. This is...', answer: 'correct', correction: 'Correta.' },
  ],
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
    { id: 'b2-fill-2', type: 'fill', prompt: 'By this time next year, we ___ the new platform.', answer: ['will have launched'], explanation: 'Future perfect para algo concluído até um momento futuro.' },
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
    { id: 'c2-mc-1', type: 'mc', prompt: 'Choose the most idiomatic option:', options: ['The plan failed in the last hour.', 'The plan fell through at the eleventh hour.', 'The plan was bad in the final moment.'], answer: 'The plan fell through at the eleventh hour.', explanation: 'Expressão idiomática com naturalidade de alto nível.' },
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
  progressSyncTimer: null,
  deferredInstallPrompt: null,
  isInstallAvailable: false,
};

const $ = (id) => document.getElementById(id);

const elements = {
  appShell: document.querySelector('.app-shell'),
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
  quizHelperText: $('quizHelperText'),
  quizAnsweredCount: $('quizAnsweredCount'),
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
  homeStarterModeButton: $('homeStarterModeButton'),
  installAppButton: $('installAppButton'),
  homeChangeLevelButton: $('homeChangeLevelButton'),

  activitiesTitle: $('activitiesTitle'),
  activitiesProgressText: $('activitiesProgressText'),
  activitiesProgressCount: $('activitiesProgressCount'),
  activitiesProgressFill: $('activitiesProgressFill'),
  activitiesList: $('activitiesList'),
  activitiesMessage: $('activitiesMessage'),
  activitiesOpenAiButton: $('activitiesOpenAiButton'),

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
  aiOpenTrailButton: $('aiOpenTrailButton'),

  activityBackButton: $('activityBackButton'),
  activityTitle: $('activityTitle'),
  activityObjective: $('activityObjective'),
  activityTips: $('activityTips'),
  activityWordLesson: $('activityWordLesson'),
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

function ensurePlainObject(value) {
  return value && typeof value === 'object' && !Array.isArray(value) ? value : {};
}

function sanitizeCompletedState(completed) {
  const source = ensurePlainObject(completed);
  const output = {};

  Object.entries(source).forEach(([levelId, items]) => {
    if (!Array.isArray(items)) {
      return;
    }

    const unique = Array.from(
      new Set(
        items
          .map((item) => String(item || '').trim())
          .filter(Boolean),
      ),
    );
    if (unique.length) {
      output[levelId] = unique;
    }
  });

  return output;
}

function sanitizeKeyedState(value) {
  const source = ensurePlainObject(value);
  const output = {};

  Object.entries(source).forEach(([key, item]) => {
    if (!key || item === undefined || item === null) {
      return;
    }
    output[String(key)] = item;
  });

  return output;
}

function sanitizeProgressStateSnapshot(snapshot) {
  const source = ensurePlainObject(snapshot);
  return {
    completed: sanitizeCompletedState(source.completed),
    drafts: sanitizeKeyedState(source.drafts),
    activitySets: sanitizeKeyedState(source.activitySets),
    activityResults: sanitizeKeyedState(source.activityResults),
  };
}

function readLocalProgressStateSnapshot() {
  return sanitizeProgressStateSnapshot({
    completed: readStoredJson(STORAGE_KEYS.completed, {}),
    drafts: readStoredJson(STORAGE_KEYS.drafts, {}),
    activitySets: readStoredJson(STORAGE_KEYS.activitySets, {}),
    activityResults: readStoredJson(STORAGE_KEYS.activityResults, {}),
  });
}

function currentProgressStateSnapshot() {
  return sanitizeProgressStateSnapshot({
    completed: state.completed,
    drafts: state.drafts,
    activitySets: state.activitySets,
    activityResults: state.activityResults,
  });
}

function applyProgressStateSnapshot(snapshot) {
  const next = sanitizeProgressStateSnapshot(snapshot);
  state.completed = next.completed;
  state.drafts = next.drafts;
  state.activitySets = next.activitySets;
  state.activityResults = next.activityResults;

  writeStoredJson(STORAGE_KEYS.completed, state.completed);
  writeStoredJson(STORAGE_KEYS.drafts, state.drafts);
  writeStoredJson(STORAGE_KEYS.activitySets, state.activitySets);
  writeStoredJson(STORAGE_KEYS.activityResults, state.activityResults);
}

function mergeCompletedState(remoteCompleted, localCompleted) {
  const merged = { ...sanitizeCompletedState(remoteCompleted) };
  const local = sanitizeCompletedState(localCompleted);

  Object.entries(local).forEach(([levelId, items]) => {
    const existing = Array.isArray(merged[levelId]) ? merged[levelId] : [];
    merged[levelId] = Array.from(new Set([...existing, ...items]));
  });

  return merged;
}

function mergeProgressStateSnapshots(remoteSnapshot, localSnapshot) {
  const remote = sanitizeProgressStateSnapshot(remoteSnapshot);
  const local = sanitizeProgressStateSnapshot(localSnapshot);

  return {
    completed: mergeCompletedState(remote.completed, local.completed),
    drafts: { ...remote.drafts, ...Object.fromEntries(Object.entries(local.drafts).filter(([key]) => !(key in remote.drafts))) },
    activitySets: { ...remote.activitySets, ...Object.fromEntries(Object.entries(local.activitySets).filter(([key]) => !(key in remote.activitySets))) },
    activityResults: { ...remote.activityResults, ...Object.fromEntries(Object.entries(local.activityResults).filter(([key]) => !(key in remote.activityResults))) },
  };
}

function progressSnapshotsEqual(a, b) {
  return JSON.stringify(sanitizeProgressStateSnapshot(a)) === JSON.stringify(sanitizeProgressStateSnapshot(b));
}

async function pushProgressStateToServer(snapshotOverride = null) {
  if (!state.user || !state.token) {
    return false;
  }

  const payload = sanitizeProgressStateSnapshot(snapshotOverride || currentProgressStateSnapshot());
  try {
    await api('/progress/state', {
      method: 'PUT',
      body: JSON.stringify({ state: payload }),
    });
    return true;
  } catch (_error) {
    return false;
  }
}

function queueProgressStateSync(delayMs = 650) {
  if (!state.user || !state.token) {
    return;
  }

  if (state.progressSyncTimer) {
    clearTimeout(state.progressSyncTimer);
  }

  state.progressSyncTimer = setTimeout(async () => {
    state.progressSyncTimer = null;
    await pushProgressStateToServer();
  }, Math.max(150, Number(delayMs) || 650));
}

async function hydrateUserProgressState() {
  if (!state.user || !state.token) {
    return;
  }

  const localSnapshot = readLocalProgressStateSnapshot();
  const previousUserId = localStorage.getItem(STORAGE_KEYS.syncedUserId) || '';
  const sameUser = previousUserId === state.user.id;

  let remoteSnapshot = sanitizeProgressStateSnapshot({});
  try {
    const result = await api('/progress/state');
    remoteSnapshot = sanitizeProgressStateSnapshot(result && result.state);
  } catch (_error) {
    // If endpoint is temporarily unavailable, keep local state.
    applyProgressStateSnapshot(localSnapshot);
    return;
  }

  const nextSnapshot = sameUser
    ? mergeProgressStateSnapshots(remoteSnapshot, localSnapshot)
    : remoteSnapshot;

  applyProgressStateSnapshot(nextSnapshot);
  localStorage.setItem(STORAGE_KEYS.syncedUserId, state.user.id);

  if (!progressSnapshotsEqual(nextSnapshot, remoteSnapshot)) {
    await pushProgressStateToServer(nextSnapshot);
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
  syncAppTheme();
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

function syncAppTheme() {
  if (!elements.appShell) {
    return;
  }

  const nextTheme =
    state.screen === 'ai'
      ? 'theme-ai'
      : state.screen === 'activities' || state.screen === 'activity'
        ? 'theme-trail'
        : state.screen === 'level'
          ? 'theme-level'
          : 'theme-home';

  elements.appShell.classList.remove('theme-home', 'theme-level', 'theme-trail', 'theme-ai');
  elements.appShell.classList.add(nextTheme);
}

function syncStatusBanner() {
  if (!state.user) {
    elements.statusBanner.textContent = 'Crie sua conta para receber uma trilha pronta no seu nível.';
    return;
  }

  if (!state.openAiConfigured) {
    elements.statusBanner.textContent = 'Modo Trilha ativo. Para liberar Modo IA, configure OPENAI_API_KEY no servidor.';
    return;
  }

  elements.statusBanner.textContent =
    state.screen === 'ai'
      ? 'Você está no Modo IA: chat, exercícios e voz inteligente.'
      : 'Você está no Modo Trilha: atividades por nível com progresso guiado.';
}

function formatLastActiveText(isoDate) {
  if (!isoDate) {
    return 'Conclua uma atividade para iniciar seu histórico de evolução.';
  }

  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) {
    return 'Seu progresso aparece em tempo real.';
  }

  const dateText = date.toLocaleDateString('pt-BR');
  const timeText = date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  return `Última atividade registrada em ${dateText} às ${timeText}.`;
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

  if (profile.id === 'A0') {
    elements.manualLevelInfo.textContent =
      'A0 (Pré-A1): sequência didática de primeiras palavras (cumprimentos, números, cores, família, comida, casa, rotina e mini conversas).';
    return;
  }

  const focus = LEVEL_FOCUS_PT[profile.id] || 'comunicação prática do dia a dia';
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
  state.quizRecommendation = null;
  if (elements.applyQuizButton) {
    elements.applyQuizButton.disabled = true;
  }

  elements.quizList.innerHTML = QUIZ_QUESTIONS.map((item, index) => `
    <article class="quiz-item" data-quiz-id="${escapeHtml(item.id)}">
      <div class="quiz-item-head">
        <strong>${index + 1}. ${escapeHtml(item.question)}</strong>
        ${item.stage ? `<span class="quiz-stage">${escapeHtml(item.stage)}</span>` : ''}
      </div>
      ${item.options
        .map(
          (option, optionIndex) => `
            <label class="quiz-option">
              <input type="radio" name="${escapeHtml(item.id)}" value="${option.score}" />
              <span class="quiz-option-copy">
                <span class="quiz-option-letter">${String.fromCharCode(65 + optionIndex)}</span>
                <span>${escapeHtml(option.label)}</span>
              </span>
            </label>
          `,
        )
        .join('')}
    </article>
  `).join('');

  setMessage(elements.quizRecommendationBox, 'O nível recomendado vai aparecer aqui.');
  syncQuizSelectionUi();
}

function syncQuizSelectionUi() {
  if (!elements.quizList) {
    return;
  }

  let answered = 0;

  elements.quizList.querySelectorAll('.quiz-item').forEach((item) => {
    const selected = item.querySelector('input[type="radio"]:checked');
    if (selected) {
      answered += 1;
    }
    item.querySelectorAll('.quiz-option').forEach((optionNode) => {
      const input = optionNode.querySelector('input[type="radio"]');
      optionNode.classList.toggle('selected', Boolean(input && input.checked));
    });
  });

  const total = QUIZ_QUESTIONS.length;
  if (elements.quizAnsweredCount) {
    elements.quizAnsweredCount.textContent = `${answered}/${total} respondidas`;
  }
  if (elements.quizHelperText) {
    if (answered === total) {
      elements.quizHelperText.textContent = 'Tudo pronto. Clique em "Ver recomendação".';
    } else if (answered === 0) {
      elements.quizHelperText.textContent =
        'Teste progressivo: do básico de palavras até conversação avançada.';
    } else {
      elements.quizHelperText.textContent = `Faltam ${total - answered} pergunta(s) para completar.`;
    }
  }
}

function quizLevelByAverage(average) {
  if (average <= 0.9) return 'A0';
  if (average <= 1.7) return 'A1';
  if (average <= 2.6) return 'A2';
  if (average <= 3.6) return 'B1';
  if (average <= 4.5) return 'B2';
  if (average <= 5.3) return 'C1';
  return 'C2';
}

function checkQuiz() {
  const scores = [];

  for (const item of QUIZ_QUESTIONS) {
    const checked = elements.quizList.querySelector(`input[name="${item.id}"]:checked`);
    if (!checked) {
      state.quizRecommendation = null;
      if (elements.applyQuizButton) {
        elements.applyQuizButton.disabled = true;
      }
      setMessage(elements.quizRecommendationBox, 'Responda todas as perguntas do teste rápido.', 'error');
      syncQuizSelectionUi();
      return;
    }
    scores.push(Number(checked.value));
  }

  const average = scores.reduce((sum, value) => sum + value, 0) / scores.length;
  const recommended = quizLevelByAverage(average);
  state.quizRecommendation = recommended;
  elements.levelSelect.value = recommended;
  renderManualLevelInfo();
  if (elements.applyQuizButton) {
    elements.applyQuizButton.disabled = false;
  }

  setMessage(
    elements.quizRecommendationBox,
    `<strong>Nível recomendado: ${escapeHtml(levelLabel(recommended))}</strong><br />Pontuacao média: ${escapeHtml(average.toFixed(1))} de 6.0<br />Se fizer sentido para você, clique em "Aplicar recomendação".`,
    'success',
    true,
  );
  setMessage(elements.levelMessage, 'Se quiser, clique em "Aplicar recomendação" para salvar o nível.', 'success');
}

function activitiesForLevel(levelId) {
  return ACTIVITY_BY_LEVEL[levelId] || [];
}

function completedForLevel(levelId) {
  return Array.isArray(state.completed[levelId]) ? state.completed[levelId] : [];
}

function questionBankForLevel(levelId) {
  const order = ['A0', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  const index = Math.max(0, order.indexOf(levelId));
  const nearbyLevels = [order[index - 1], order[index], order[index + 1]].filter(Boolean);

  const merged = nearbyLevels.flatMap((id) => OBJECTIVE_BANK_BY_LEVEL[id] || []);
  const byId = new Map(merged.map((question) => [question.id, question]));
  return Array.from(byId.values());
}

function questionBankForActivity(activityId, levelId) {
  const activityKey = String(activityId || '').trim();
  const scoped = OBJECTIVE_BANK_BY_ACTIVITY[activityKey];
  if (Array.isArray(scoped) && scoped.length) {
    return scoped;
  }
  return questionBankForLevel(levelId);
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

function cloneObjectiveQuestion(question) {
  if (!question || typeof question !== 'object') {
    return null;
  }
  return {
    ...question,
    options: Array.isArray(question.options) ? [...question.options] : question.options,
    answer: Array.isArray(question.answer) ? [...question.answer] : question.answer,
  };
}

function buildObjectiveSet(levelId, count = 6, activityId = '') {
  const bank = questionBankForActivity(activityId, levelId);
  const orderedPool = levelId === 'A0' ? [...bank] : shuffleArray(bank);
  const selected = orderedPool.slice(0, Math.min(count, orderedPool.length));
  return selected.map(cloneObjectiveQuestion).filter(Boolean);
}

function buildActivityQuestionCycle(levelId, activityId = '') {
  const bank = questionBankForActivity(activityId, levelId);
  if (!Array.isArray(bank) || !bank.length) {
    return [];
  }
  const orderedPool = levelId === 'A0' ? [...bank] : shuffleArray(bank);
  return orderedPool.map(cloneObjectiveQuestion).filter(Boolean);
}

function activityStreamScore(correct, answered) {
  const safeAnswered = Math.max(0, Number(answered) || 0);
  if (!safeAnswered) {
    return 0;
  }
  const safeCorrect = Math.max(0, Number(correct) || 0);
  return Math.round((Math.min(safeCorrect, safeAnswered) / safeAnswered) * 100);
}

function createActivityStreamSession(item, levelId = currentLevelId()) {
  return {
    mode: ACTIVITY_STREAM_VERSION,
    activityId: item.id,
    levelId,
    cycle: buildActivityQuestionCycle(levelId, item.id),
    cursor: 0,
    answered: 0,
    correct: 0,
    rounds: 1,
    lastResult: null,
    updatedAt: Date.now(),
  };
}

function normalizeActivityStreamSession(rawSession, item, levelId = currentLevelId()) {
  if (!rawSession) {
    return createActivityStreamSession(item, levelId);
  }

  if (Array.isArray(rawSession)) {
    return {
      mode: ACTIVITY_STREAM_VERSION,
      activityId: item.id,
      levelId,
      cycle: rawSession.length
        ? rawSession.map(cloneObjectiveQuestion).filter(Boolean)
        : buildActivityQuestionCycle(levelId, item.id),
      cursor: 0,
      answered: 0,
      correct: 0,
      rounds: 1,
      lastResult: null,
      updatedAt: Date.now(),
    };
  }

  const fallbackCycle = buildActivityQuestionCycle(levelId, item.id);
  const cycle =
    Array.isArray(rawSession.cycle) && rawSession.cycle.length
      ? rawSession.cycle.map(cloneObjectiveQuestion).filter(Boolean)
      : Array.isArray(rawSession.questions) && rawSession.questions.length
        ? rawSession.questions.map(cloneObjectiveQuestion).filter(Boolean)
        : fallbackCycle;

  const answered = Math.max(0, Number(rawSession.answered) || 0);
  const correct = Math.max(0, Math.min(answered, Number(rawSession.correct) || 0));
  const cursorBase = Math.max(0, Number(rawSession.cursor) || 0);
  const cursor = cycle.length ? cursorBase % cycle.length : 0;
  const lastResult =
    rawSession.lastResult && typeof rawSession.lastResult === 'object'
      ? {
          ok: Boolean(rawSession.lastResult.ok),
          userAnswer: String(rawSession.lastResult.userAnswer || ''),
          correction: String(rawSession.lastResult.correction || ''),
          expected: String(rawSession.lastResult.expected || ''),
          prompt: String(rawSession.lastResult.prompt || ''),
        }
      : null;

  return {
    mode: ACTIVITY_STREAM_VERSION,
    activityId: item.id,
    levelId,
    cycle,
    cursor,
    answered,
    correct,
    rounds: Math.max(1, Number(rawSession.rounds) || 1),
    lastResult,
    updatedAt: Date.now(),
  };
}

function currentQuestionFromSession(session, item) {
  if (!Array.isArray(session.cycle) || !session.cycle.length) {
    session.cycle = buildActivityQuestionCycle(session.levelId || currentLevelId(), item.id);
    session.cursor = 0;
  }

  if (!session.cycle.length) {
    return null;
  }

  const cursor = Math.max(0, Number(session.cursor) || 0) % session.cycle.length;
  session.cursor = cursor;
  return session.cycle[cursor] || null;
}

function advanceSessionQuestion(session, item) {
  if (!Array.isArray(session.cycle) || !session.cycle.length) {
    session.cycle = buildActivityQuestionCycle(session.levelId || currentLevelId(), item.id);
    session.cursor = 0;
    return;
  }

  session.cursor = (Number(session.cursor) || 0) + 1;
  if (session.cursor >= session.cycle.length) {
    session.rounds = Math.max(1, Number(session.rounds) || 1) + 1;
    session.cycle = buildActivityQuestionCycle(session.levelId || currentLevelId(), item.id);
    session.cursor = 0;
  }
}

function persistActivitySession(key, session) {
  session.updatedAt = Date.now();
  state.activitySets[key] = session;
  writeStoredJson(STORAGE_KEYS.activitySets, state.activitySets);
}

function ensureActivitySet(item, forceNew = false) {
  const key = activitySessionKey(item.id);
  const levelId = currentLevelId();
  const existingSession = state.activitySets[key];
  const session = forceNew
    ? createActivityStreamSession(item, levelId)
    : normalizeActivityStreamSession(existingSession, item, levelId);

  const question = currentQuestionFromSession(session, item);

  state.activitySets[key] = session;
  if (!forceNew && !(key in state.drafts)) {
    state.drafts[key] = {};
  }
  if (forceNew) {
    state.drafts[key] = {};
    delete state.activityResults[key];
  }
  writeStoredJson(STORAGE_KEYS.activitySets, state.activitySets);
  writeStoredJson(STORAGE_KEYS.drafts, state.drafts);
  if (forceNew) {
    writeStoredJson(STORAGE_KEYS.activityResults, state.activityResults);
    queueProgressStateSync(500);
  }

  return { key, session, question };
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
    return question.answer === 'correct' ? 'Está correta' : 'Precisa de correção';
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

function starterWordLessonByActivity(activityId) {
  return STARTER_WORD_LESSONS[String(activityId || '').trim()] || null;
}

function renderActivityWordLesson(item) {
  if (!elements.activityWordLesson) {
    return;
  }

  const levelId = currentLevelId();
  const lesson = item && levelId === 'A0' ? starterWordLessonByActivity(item.id) : null;
  if (!lesson || !Array.isArray(lesson.words) || !lesson.words.length) {
    elements.activityWordLesson.classList.add('hidden');
    elements.activityWordLesson.innerHTML = '';
    return;
  }

  const a0Activities = ACTIVITY_BY_LEVEL.A0 || [];
  const stepIndex = Math.max(0, a0Activities.findIndex((activity) => activity.id === item.id));
  const stepText = `Etapa ${stepIndex + 1} de ${Math.max(1, a0Activities.length)}`;
  const wordsHtml = lesson.words
    .map(
      (word) => `
        <article class="word-card">
          <strong class="word-en">${escapeHtml(word.en)}</strong>
          <span class="word-pt">${escapeHtml(word.pt)}</span>
          <span class="word-example">${escapeHtml(word.example || '')}</span>
        </article>
      `,
    )
    .join('');

  elements.activityWordLesson.classList.remove('hidden');
  elements.activityWordLesson.innerHTML = `
    <div class="word-lesson-head">
      <strong class="word-lesson-title">${escapeHtml(lesson.title || 'Palavrinhas do dia')}</strong>
      <span class="pill">${escapeHtml(stepText)}</span>
    </div>
    <p class="line">${escapeHtml(lesson.note || 'Treino guiado palavra por palavra.')}</p>
    <div class="word-lesson-grid">${wordsHtml}</div>
  `;
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
        <span>Está correta</span>
      </label>
      <label class="quiz-option">
        <input type="radio" data-question-id="${escapeHtml(questionId)}" name="activity-${escapeHtml(questionId)}" value="wrong" ${String(answerValue) === 'wrong' ? 'checked' : ''} />
        <span>Precisa de correção</span>
      </label>
    `;
  }

  return `<input class="answer-input" data-question-id="${escapeHtml(questionId)}" type="text" value="${escapeHtml(answerValue || '')}" placeholder="Digite uma palavra/expressão" />`;
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
  const isStarterLevel = levelId === 'A0';

  elements.homeGreeting.textContent = `Ola, ${name}.`;
  elements.homeSubtitle.textContent = isStarterLevel
    ? `Rota didática inicial ativa (cumprimentos -> comida -> rotina) | Streak: ${streak} dia(s)`
    : `Streak atual: ${streak} dia(s) | Dias ativos: ${activeDays}`;
  elements.homeLevelPill.textContent = levelLabel(levelId);
  elements.homeProgressText.textContent = `${done} de ${items.length} atividades concluídas neste nível.`;
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
  if (elements.homeStarterModeButton) {
    const isStarter = levelId === 'A0';
    elements.homeStarterModeButton.textContent = isStarter
      ? 'Modo Primeiras Palavras ativo'
      : 'Ativar Modo Primeiras Palavras';
    elements.homeStarterModeButton.disabled = isStarter;
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
  const isStarterLevel = levelId === 'A0';
  const activityFormatDescription = isStarterLevel
    ? 'Modo primeiras palavras: vocabulário palavra por palavra + exercícios simples de fixação.'
    : 'Formato objetivo: multipla escolha, V/F, completar e certo/errado.';

  elements.activitiesTitle.textContent = `Trilha ${levelLabel(levelId)}`;
  if (elements.activitiesProgressText) {
    elements.activitiesProgressText.textContent = `${progressPercent}% concluído`;
  }
  if (elements.activitiesProgressCount) {
    elements.activitiesProgressCount.textContent = `${doneCount}/${total}`;
  }
  if (elements.activitiesProgressFill) {
    elements.activitiesProgressFill.style.width = `${Math.max(0, Math.min(100, progressPercent))}%`;
  }

  if (!items.length) {
    elements.activitiesList.innerHTML = '<div class="message">Sem atividades para este nível.</div>';
    return;
  }

  elements.activitiesList.innerHTML = items
    .map((item, index) => {
      const done = doneList.has(item.id);
      return `
        <article class="activity-card ${done ? 'done' : ''}">
          <div class="activity-top">
            <strong>${index + 1}. ${escapeHtml(item.title)}</strong>
            <span class="pill ${done ? 'ok' : ''}">${done ? 'concluída' : 'pendente'}</span>
          </div>
          <p class="line" style="margin-top: 8px">${escapeHtml(item.objective)}</p>
          <p class="line" style="margin-top: 6px">${escapeHtml(activityFormatDescription)}</p>
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
    renderActivityWordLesson(null);
    elements.activityTasks.innerHTML = '';
    elements.completeActivityButton.disabled = true;
    setActivityAutosaveHint('');
    return;
  }

  elements.activityTitle.textContent = item.title;
  elements.activityObjective.textContent = item.objective;
  elements.activityTips.innerHTML = item.tips.map((tip) => `<li>${escapeHtml(tip)}</li>`).join('');
  renderActivityWordLesson(item);

  const sessionRef = ensureActivitySet(item, false);
  const session = sessionRef.session;
  const question = sessionRef.question;
  if (!question) {
    elements.activityTasks.innerHTML = '<div class="message">Sem questões disponíveis para este nível.</div>';
    setMessage(elements.activityMessage, 'Sem questões para este nível no momento.', 'error');
    elements.completeActivityButton.disabled = true;
    setActivityAutosaveHint('');
    return;
  }

  const questionId = question.id || `q-${(Number(session.cursor) || 0) + 1}`;
  const draft = state.drafts[sessionRef.key] || {};
  const answerValue = draft[questionId] || '';
  const answered = Math.max(0, Number(session.answered) || 0);
  const correct = Math.max(0, Number(session.correct) || 0);
  const score = activityStreamScore(correct, answered);
  const canComplete = answered >= ACTIVITY_MIN_QUESTIONS_TO_COMPLETE && score >= ACTIVITY_PASS_SCORE;

  elements.activityTasks.innerHTML = `
    <article class="question-card">
      <div class="question-top">
        <strong>Questao ${answered + 1}</strong>
        <span class="question-type">${escapeHtml(objectiveTypeLabel(question.type))}</span>
      </div>
      <div class="question-prompt">${escapeHtml(question.prompt)}</div>
      ${renderObjectiveInput(question, questionId, answerValue)}
    </article>
  `;

  if (answered > 0) {
    const guidance = canComplete
      ? 'Você já pode concluir a atividade ou continuar praticando sem limites.'
      : `Continue até pelo menos ${ACTIVITY_MIN_QUESTIONS_TO_COMPLETE} questões com ${ACTIVITY_PASS_SCORE}% de acerto.`;
    setMessage(
      elements.activityMessage,
      `Sessão contínua: ${correct}/${answered} (${score}%). ${guidance}`,
      canComplete ? 'success' : '',
    );
  } else {
    setMessage(elements.activityMessage, 'Modo infinito ativo: responda e avance questão por questão.');
  }

  if (elements.requestFeedbackButton) {
    elements.requestFeedbackButton.textContent = 'Responder e próxima';
  }
  if (elements.regenerateActivityButton) {
    elements.regenerateActivityButton.textContent = 'Reiniciar sessão';
  }
  if (elements.saveDraftButton) {
    elements.saveDraftButton.textContent = 'Salvar resposta';
  }

  elements.completeActivityButton.disabled = !canComplete;
  setActivityAutosaveHint('Sua resposta atual é salva automaticamente.');
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
  queueProgressStateSync(silent ? 900 : 400);

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

  const sessionRef = ensureActivitySet(item, false);
  const session = sessionRef.session;
  const question = sessionRef.question;
  if (!question) {
    setMessage(elements.activityFeedback, 'Não encontrei questão ativa para corrigir.', 'error');
    return;
  }

  const questionId = question.id || `q-${(Number(session.cursor) || 0) + 1}`;
  const answers = collectTaskAnswers();
  const userAnswer = String(answers[questionId] || '').trim();
  if (!userAnswer) {
    setMessage(elements.activityFeedback, 'Responda a questão atual antes de avançar.', 'error');
    return;
  }

  const result = evaluateObjectiveAnswers([question], { [questionId]: userAnswer });
  const detail = result.details[0] || {
    ok: false,
    userAnswer,
    correction: question.correction || question.explanation || '',
  };

  session.answered = Math.max(0, Number(session.answered) || 0) + 1;
  if (detail.ok) {
    session.correct = Math.max(0, Number(session.correct) || 0) + 1;
  }
  session.lastResult = {
    ok: Boolean(detail.ok),
    userAnswer: detail.userAnswer || '',
    correction: detail.correction || '',
    expected: expectedAnswerLabel(question),
    prompt: question.prompt || '',
  };
  advanceSessionQuestion(session, item);

  const totalAnswered = Math.max(0, Number(session.answered) || 0);
  const totalCorrect = Math.max(0, Number(session.correct) || 0);
  const score = activityStreamScore(totalCorrect, totalAnswered);
  state.activityResults[sessionRef.key] = {
    score,
    correct: totalCorrect,
    total: totalAnswered,
    lastResult: session.lastResult,
    updatedAt: Date.now(),
  };
  state.drafts[sessionRef.key] = {};
  persistActivitySession(sessionRef.key, session);
  writeStoredJson(STORAGE_KEYS.drafts, state.drafts);
  writeStoredJson(STORAGE_KEYS.activityResults, state.activityResults);
  queueProgressStateSync(400);
  renderActivity();

  const body = detail.ok
    ? `
      <strong>Correta!</strong><br />
      Avançamos para a próxima questão.<br />
      Sessão: ${totalCorrect}/${totalAnswered} (${score}%).
    `
    : `
      <strong>Quase lá.</strong><br />
      Sua resposta: <strong>${escapeHtml(detail.userAnswer || '-')}</strong><br />
      Esperado: <strong>${escapeHtml(expectedAnswerLabel(question))}</strong>
      ${detail.correction ? `<br />Dica: ${escapeHtml(detail.correction)}` : ''}<br />
      Sessão: ${totalCorrect}/${totalAnswered} (${score}%).
    `;

  setMessage(elements.activityFeedback, body, detail.ok ? 'success' : 'error', true);
}

async function completeActivity() {
  const item = selectedActivity();
  if (!item) {
    setMessage(elements.activityMessage, 'Abra uma atividade para concluir.', 'error');
    return;
  }

  const sessionRef = ensureActivitySet(item, false);
  const result = state.activityResults[sessionRef.key];
  if (!result || typeof result.score !== 'number') {
    setMessage(elements.activityMessage, 'Responda e corrija algumas questões antes de concluir.', 'error');
    return;
  }
  if ((Number(result.total) || 0) < ACTIVITY_MIN_QUESTIONS_TO_COMPLETE) {
    setMessage(
      elements.activityMessage,
      `Faça pelo menos ${ACTIVITY_MIN_QUESTIONS_TO_COMPLETE} questões antes de concluir.`,
      'error',
    );
    return;
  }
  if (result.score < ACTIVITY_PASS_SCORE) {
    setMessage(
      elements.activityMessage,
      `Para concluir, mantenha pelo menos ${ACTIVITY_PASS_SCORE}% de acerto. Você pode continuar no modo infinito.`,
      'error',
    );
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
  queueProgressStateSync(300);

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

  setMessage(elements.activityMessage, 'Atividade concluída. Excelente trabalho.', 'success');
  renderHome();
  renderActivities();
}

function regenerateActivitySet() {
  const item = selectedActivity();
  if (!item) {
    setMessage(elements.activityMessage, 'Abra uma atividade para reiniciar a sessão.', 'error');
    return;
  }

  ensureActivitySet(item, true);
  renderActivity();
  setMessage(elements.activityFeedback, 'Sessão reiniciada. Questões infinitas prontas para continuar.');
}

function renderAiChatLog() {
  const history = Array.isArray(state.aiChatHistory) ? state.aiChatHistory : [];

  if (!history.length && !state.aiChatLoading) {
    elements.aiChatLog.innerHTML =
      '<div class="chat-empty">Comece a conversa. Eu respondo como seu tutor em estilo WhatsApp.</div>';
    return;
  }

  const lines = history.map((message, index) => {
    const role = message.role === 'user' ? 'user' : 'assistant';
    const label = role === 'user' ? 'Você' : 'Tutor IA';
    const audioUrl = typeof message.audioDataUrl === 'string' ? message.audioDataUrl : '';
    const audioHtml =
      role === 'assistant'
        ? audioUrl
          ? `<audio class="bubble-audio" controls src="${escapeHtml(audioUrl)}"></audio>`
          : `<button type="button" class="btn secondary bubble-listen-btn" data-chat-speak-index="${index}">Ouvir audio</button>`
        : '';
    return `
      <div class="bubble ${role}">
        <span class="bubble-label">${escapeHtml(label)}</span>
        <div class="bubble-text">${escapeHtml(message.content || '')}</div>
        ${audioHtml}
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

function trimAiChatHistory() {
  if (state.aiChatHistory.length > 20) {
    state.aiChatHistory = state.aiChatHistory.slice(-20);
  }
}

function speakWithBrowserTts(text, locale, preferredVoiceName) {
  if (!window.speechSynthesis || typeof window.SpeechSynthesisUtterance !== 'function') {
    return false;
  }

  try {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = locale;
    utterance.rate = 1;
    const allVoices = window.speechSynthesis.getVoices();
    const preferred = String(preferredVoiceName || '').toLowerCase();
    const localeLower = String(locale || '').toLowerCase();
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
    return true;
  } catch (_error) {
    return false;
  }
}

async function playAudioDataUrl(dataUrl) {
  if (!dataUrl) {
    return false;
  }

  try {
    const audio = new Audio(dataUrl);
    await audio.play();
    return true;
  } catch (_error) {
    return false;
  }
}

async function ensureAssistantMessageAudio(message, options = {}) {
  if (!message || message.role !== 'assistant' || !String(message.content || '').trim()) {
    return false;
  }

  const autoPlay = options.autoPlay !== false;
  const locale = message.locale || selectedVoiceLanguage();
  const level = elements.aiVoiceLevel.value || state.selectedLevel;
  const voice = elements.aiVoiceName.value || 'alloy';

  if (message.audioDataUrl) {
    if (autoPlay) {
      const played = await playAudioDataUrl(message.audioDataUrl);
      if (played) {
        return true;
      }
    }
    return true;
  }

  try {
    const speakResult = await api('/voice/speak', {
      method: 'POST',
      body: JSON.stringify({
        level,
        voice,
        language: locale,
        instructions: speechInstructionsForLocale(locale),
        text: message.content,
      }),
    });

    if (speakResult && speakResult.speech && speakResult.speech.audioBase64) {
      message.audioDataUrl = `data:${speakResult.speech.mimeType};base64,${speakResult.speech.audioBase64}`;
      if (elements.aiVoicePlayer) {
        elements.aiVoicePlayer.src = message.audioDataUrl;
      }
      renderAiChatLog();
      if (autoPlay) {
        const played = await playAudioDataUrl(message.audioDataUrl);
        if (played) {
          return true;
        }
      }
      return true;
    }
  } catch (_speechError) {
    // Browser fallback below.
  }

  if (autoPlay) {
    return speakWithBrowserTts(message.content, locale, voice);
  }
  return false;
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

    const reply = String(result.reply || 'Sem resposta.').trim() || 'Sem resposta.';
    const assistantMessage = {
      role: 'assistant',
      content: reply,
      locale: selectedVoiceLanguage(),
    };
    state.aiChatHistory.push(assistantMessage);
    trimAiChatHistory();
    renderAiChatLog();
    ensureAssistantMessageAudio(assistantMessage, { autoPlay: true }).catch(() => {});
  } catch (error) {
    state.aiChatHistory.push({ role: 'assistant', content: `Erro: ${error.message}` });
    trimAiChatHistory();
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
    elements.aiExerciseList.innerHTML = '<div class="message">Gere exercícios para aparecerem aqui.</div>';
    elements.aiExercisePick.innerHTML = '<option value="">Sem exercícios</option>';
    return;
  }

  elements.aiExerciseList.innerHTML = exercises
    .map(
      (item, index) => `
        <article class="exercise-card-mini">
          <strong>${index + 1}. ${escapeHtml(item.prompt || 'Exercício')}</strong>
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
    .map((item, index) => `<option value="${index}">${index + 1}. ${escapeHtml(item.prompt || 'Exercício')}</option>`)
    .join('');
}

async function generateAiExercises() {
  elements.aiExerciseGenerateButton.disabled = true;
  setMessage(elements.aiExerciseResult, 'Gerando exercícios...');

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
    setMessage(elements.aiExerciseResult, 'Exercícios gerados com sucesso.', 'success');
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
    setMessage(elements.aiExerciseResult, 'Selecione um exercício para corrigir.', 'error');
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
    return 'A chave OpenAI respondeu sem suporte completo de voz. Vou manter transcrição e resposta em texto, e usar voz do navegador quando possível.';
  }

  return raw || 'Não foi possível processar o audio.';
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
    return 'Permissão de microfone bloqueada. Libere o microfone para este site no navegador.';
  }
  if (name.includes('notreadable') || message.includes('track start failed')) {
    return 'O microfone parece estar em uso por outro app. Feche outros apps de chamada e tente novamente.';
  }

  return error && error.message ? error.message : 'Não foi possível iniciar a gravação de voz.';
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
      throw new Error('Não foi possível transcrever o audio.');
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
    const assistantMessage = { role: 'assistant', content: reply, locale };
    state.aiChatHistory.push(assistantMessage);
    trimAiChatHistory();
    renderAiChatLog();
    refreshAiChatSuggestions();

    setMessage(elements.aiScreenMessage, 'Gerando audio da resposta...');
    const playedAudio = await ensureAssistantMessageAudio(assistantMessage, { autoPlay: true });

    if (playedAudio) {
      setMessage(elements.aiScreenMessage, 'Audio processado com sucesso.', 'success');
    } else {
      setMessage(elements.aiScreenMessage, 'Transcrição e resposta prontas. Audio indisponível nesta chave.', 'error');
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
    setMessage(elements.aiScreenMessage, 'Seu navegador não suporta gravação neste dispositivo.', 'error');
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
      'IA indisponível: configure OPENAI_API_KEY no .env e reinicie o servidor.',
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
    setMessage(elements.levelMessage, 'Você precisa estar logado para salvar nível.', 'error');
    return false;
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
    return true;
  } catch (error) {
    setMessage(elements.levelMessage, error.message, 'error');
    return false;
  }
}

async function applyQuizRecommendation() {
  if (!state.quizRecommendation) {
    setMessage(elements.quizRecommendationBox, 'Primeiro clique em "Ver recomendação".', 'error');
    return;
  }
  await saveLevel(state.quizRecommendation, 'Nível recomendado');
}

async function assessLevelWithAi() {
  const text = elements.levelSampleText.value.trim();
  if (!text) {
    setMessage(elements.levelAssessResult, 'Escreva um texto para avaliar.', 'error');
    return;
  }

  elements.levelAssessButton.disabled = true;
  setMessage(elements.levelAssessResult, 'Avaliando nível...');

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
      <strong>Nível recomendado: ${escapeHtml(result.recommendedLevel || '--')}</strong><br />
      Confiança: ${escapeHtml(confidence)}<br />
      ${escapeHtml(result.explanation || 'Sem explicacao.')}
    `;
    setMessage(elements.levelAssessResult, body, 'success', true);

    if (elements.levelAssessApply.checked) {
      await refreshSession(true);
      populateCoreSelects();
      renderManualLevelInfo();
      setMessage(elements.levelMessage, 'Nível atualizado automaticamente com base na avaliação.', 'success');
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
    setMessage(elements.loginMessage, 'Login concluído.', 'success');
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
  if (state.progressSyncTimer) {
    clearTimeout(state.progressSyncTimer);
    state.progressSyncTimer = null;
  }
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
    if (state.progressSyncTimer) {
      clearTimeout(state.progressSyncTimer);
      state.progressSyncTimer = null;
    }
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
    await hydrateUserProgressState();
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
    if (state.progressSyncTimer) {
      clearTimeout(state.progressSyncTimer);
      state.progressSyncTimer = null;
    }
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
    setMessage(elements.loginMessage, 'Login com Google concluído.', 'success');
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
    elements.googleHint.textContent = 'Google indisponível. Preencha GOOGLE_CLIENT_ID no .env e reinicie.';
    return;
  }

  if (!window.google || !window.google.accounts || !window.google.accounts.id) {
    if (retry < 10) {
      window.setTimeout(() => setupGoogleLogin(retry + 1), 500);
      return;
    }
    elements.googleHint.textContent = 'Não foi possível carregar o login com Google.';
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
  elements.googleHint.textContent = 'Ou continue com sua conta do Google.';
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

  elements.saveLevelButton.addEventListener('click', () => saveLevel(elements.levelSelect.value, 'Nível'));
  elements.checkQuizButton.addEventListener('click', checkQuiz);
  elements.applyQuizButton.addEventListener('click', applyQuizRecommendation);
  elements.quizList.addEventListener('change', () => {
    state.quizRecommendation = null;
    if (elements.applyQuizButton) {
      elements.applyQuizButton.disabled = true;
    }
    setMessage(elements.quizRecommendationBox, 'Clique em "Ver recomendação" para recalcular seu nível.');
    syncQuizSelectionUi();
  });
  elements.levelAssessButton.addEventListener('click', assessLevelWithAi);

  elements.homeStartTrailButton.addEventListener('click', () => setScreen('activities'));
  elements.homeOpenAiButton.addEventListener('click', () => setScreen('ai'));
  if (elements.homeStarterModeButton) {
    elements.homeStarterModeButton.addEventListener('click', async () => {
      const saved = await saveLevel('A0', 'Modo Primeiras Palavras');
      if (saved) {
        setScreen('activities');
      }
    });
  }
  if (elements.activitiesOpenAiButton) {
    elements.activitiesOpenAiButton.addEventListener('click', () => setScreen('ai'));
  }
  if (elements.aiOpenTrailButton) {
    elements.aiOpenTrailButton.addEventListener('click', () => setScreen('activities'));
  }
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
  elements.aiChatLog.addEventListener('click', (event) => {
    const target = event.target.closest('[data-chat-speak-index]');
    if (!target) {
      return;
    }
    const index = Number(target.dataset.chatSpeakIndex);
    const message = Number.isInteger(index) ? state.aiChatHistory[index] : null;
    if (!message || message.role !== 'assistant') {
      return;
    }
    ensureAssistantMessageAudio(message, { autoPlay: true }).catch(() => {});
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

