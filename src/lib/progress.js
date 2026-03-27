const { readStore, updateStore } = require('./data-store');

function toDateKey(isoString) {
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) {
    return null;
  }
  return date.toISOString().slice(0, 10);
}

function toDayNumber(dateKey) {
  const date = new Date(`${dateKey}T00:00:00.000Z`);
  if (Number.isNaN(date.getTime())) {
    return null;
  }
  return Math.floor(date.getTime() / 86400000);
}

function maxIsoDate(values) {
  return values.reduce((latest, candidate) => {
    if (!candidate || Number.isNaN(new Date(candidate).getTime())) {
      return latest;
    }
    if (!latest) {
      return candidate;
    }
    return new Date(candidate).getTime() > new Date(latest).getTime() ? candidate : latest;
  }, null);
}

function calculateStreaks(dateKeys = []) {
  const uniqueDayNumbers = Array.from(
    new Set(
      dateKeys
        .map((key) => toDayNumber(key))
        .filter((value) => Number.isInteger(value)),
    ),
  ).sort((a, b) => a - b);

  if (!uniqueDayNumbers.length) {
    return { currentStreakDays: 0, bestStreakDays: 0 };
  }

  let best = 1;
  let run = 1;
  for (let index = 1; index < uniqueDayNumbers.length; index += 1) {
    if (uniqueDayNumbers[index] === uniqueDayNumbers[index - 1] + 1) {
      run += 1;
      best = Math.max(best, run);
    } else {
      run = 1;
    }
  }

  const todayKey = toDateKey(new Date().toISOString());
  const today = todayKey ? toDayNumber(todayKey) : null;
  const last = uniqueDayNumbers[uniqueDayNumbers.length - 1];
  let current = 0;

  if (Number.isInteger(today) && (last === today || last === today - 1)) {
    current = 1;
    for (let index = uniqueDayNumbers.length - 1; index > 0; index -= 1) {
      if (uniqueDayNumbers[index] === uniqueDayNumbers[index - 1] + 1) {
        current += 1;
      } else {
        break;
      }
    }
  }

  return {
    currentStreakDays: current,
    bestStreakDays: best,
  };
}

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

async function recordActivityCompletion(entry) {
  if (!entry || !entry.userId || !entry.activityId) {
    return;
  }

  await updateStore((store) => {
    const now = new Date().toISOString();
    const level = entry.level || 'A2';
    const activityId = String(entry.activityId).trim();
    const previous = store.activityCompletions.find(
      (item) =>
        item.userId === entry.userId &&
        item.level === level &&
        item.activityId === activityId,
    );

    if (previous) {
      previous.score = entry.score ?? previous.score ?? null;
      previous.updatedAt = now;
      return;
    }

    store.activityCompletions.push({
      id: `${entry.userId}-${Date.now()}`,
      userId: entry.userId,
      activityId,
      level,
      score: entry.score ?? null,
      createdAt: now,
      updatedAt: now,
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
      completedActivities: 0,
      activeDays: 0,
      currentStreakDays: 0,
      bestStreakDays: 0,
      lastActiveAt: null,
    };
  }

  const store = await readStore();
  const exerciseAttempts = store.exerciseAttempts.filter((item) => item.userId === userId);
  const scored = exerciseAttempts.filter((item) => typeof item.score === 'number');
  const lastAssessment = [...store.levelAssessments]
    .reverse()
    .find((item) => item.userId === userId);
  const voiceSessions = store.voiceSessions.filter((item) => item.userId === userId);
  const activityCompletions = store.activityCompletions.filter((item) => item.userId === userId);
  const uniqueCompletedActivities = new Set(
    activityCompletions.map(
      (item) => `${String(item.level || '').trim()}:${String(item.activityId || '').trim()}`,
    ),
  );
  const allEvents = [
    ...exerciseAttempts,
    ...voiceSessions,
    ...store.levelAssessments.filter((item) => item.userId === userId),
    ...activityCompletions,
  ];
  const activeDateKeys = allEvents
    .map((item) => toDateKey(item.createdAt))
    .filter(Boolean);
  const uniqueDateKeys = Array.from(new Set(activeDateKeys));
  const streaks = calculateStreaks(uniqueDateKeys);
  const lastActiveAt = maxIsoDate(allEvents.map((item) => item.createdAt));

  return {
    exerciseAttempts: exerciseAttempts.length,
    averageScore: scored.length
      ? Math.round(scored.reduce((sum, item) => sum + item.score, 0) / scored.length)
      : null,
    lastRecommendedLevel: lastAssessment ? lastAssessment.recommendedLevel : null,
    voiceSessions: voiceSessions.length,
    completedActivities: uniqueCompletedActivities.size,
    activeDays: uniqueDateKeys.length,
    currentStreakDays: streaks.currentStreakDays,
    bestStreakDays: streaks.bestStreakDays,
    lastActiveAt,
  };
}

module.exports = {
  getUserStats,
  recordActivityCompletion,
  recordExerciseAttempt,
  recordLevelAssessment,
  recordVoiceSession,
};
