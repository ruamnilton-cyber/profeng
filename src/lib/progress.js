const { readStore, updateStore } = require('./data-store');

async function recordExerciseAttempt(entry) {
  if (!entry || !entry.userId) {
    return;
  }

  await updateStore((store) => {
    store.exerciseAttempts.push({
      id: `${entry.userId}-${Date.now()}`,
      userId: entry.userId,
      exerciseType: entry.exerciseType || 'general',
      level: entry.level || 'B1',
      score: entry.score ?? null,
      correct: Boolean(entry.correct),
      topic: entry.topic || null,
      createdAt: new Date().toISOString(),
    });
  });
}

async function recordLevelAssessment(entry) {
  if (!entry || !entry.userId) {
    return;
  }

  await updateStore((store) => {
    store.levelAssessments.push({
      id: `${entry.userId}-${Date.now()}`,
      userId: entry.userId,
      currentLevel: entry.currentLevel || null,
      recommendedLevel: entry.recommendedLevel || null,
      confidence: entry.confidence ?? null,
      createdAt: new Date().toISOString(),
    });
  });
}

async function recordVoiceSession(entry) {
  if (!entry || !entry.userId) {
    return;
  }

  await updateStore((store) => {
    store.voiceSessions.push({
      id: `${entry.userId}-${Date.now()}`,
      userId: entry.userId,
      level: entry.level || 'B1',
      transcriptLength: entry.transcriptLength ?? 0,
      createdAt: new Date().toISOString(),
    });
  });
}

async function getUserStats(userId) {
  if (!userId) {
    return {
      exerciseAttempts: 0,
      averageScore: null,
      lastRecommendedLevel: null,
      voiceSessions: 0,
    };
  }

  const store = await readStore();
  const exerciseAttempts = store.exerciseAttempts.filter((item) => item.userId === userId);
  const scored = exerciseAttempts.filter((item) => typeof item.score === 'number');
  const lastAssessment = [...store.levelAssessments]
    .reverse()
    .find((item) => item.userId === userId);
  const voiceSessions = store.voiceSessions.filter((item) => item.userId === userId);

  return {
    exerciseAttempts: exerciseAttempts.length,
    averageScore: scored.length
      ? Math.round(scored.reduce((sum, item) => sum + item.score, 0) / scored.length)
      : null,
    lastRecommendedLevel: lastAssessment ? lastAssessment.recommendedLevel : null,
    voiceSessions: voiceSessions.length,
  };
}

module.exports = {
  getUserStats,
  recordExerciseAttempt,
  recordLevelAssessment,
  recordVoiceSession,
};
