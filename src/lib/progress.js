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

function ensureObject(value) {
  return value && typeof value === 'object' && !Array.isArray(value) ? value : {};
}

function sanitizeCompleted(completed) {
  const input = ensureObject(completed);
  const output = {};

  for (const [levelId, items] of Object.entries(input)) {
    if (!Array.isArray(items)) {
      continue;
    }

    const uniqueIds = Array.from(
      new Set(
        items
          .map((item) => String(item || '').trim())
          .filter(Boolean),
      ),
    );
    if (uniqueIds.length) {
      output[levelId] = uniqueIds;
    }
  }

  return output;
}

function sanitizeKeyedObject(value) {
  const input = ensureObject(value);
  const output = {};

  for (const [key, entry] of Object.entries(input)) {
    if (!key || entry === undefined || entry === null) {
      continue;
    }
    output[String(key)] = entry;
  }

  return output;
}

function createEmptyUserProgressState() {
  return {
    completed: {},
    drafts: {},
    activitySets: {},
    activityResults: {},
  };
}

function sanitizeUserProgressState(state) {
  const base = createEmptyUserProgressState();
  const input = ensureObject(state);

  return {
    ...base,
    completed: sanitizeCompleted(input.completed),
    drafts: sanitizeKeyedObject(input.drafts),
    activitySets: sanitizeKeyedObject(input.activitySets),
    activityResults: sanitizeKeyedObject(input.activityResults),
  };
}

async function getUserProgressState(userId) {
  if (!userId) {
    return createEmptyUserProgressState();
  }

  const store = await readStore();
  const entry = store.userProgressStates.find((item) => item.userId === userId);
  return sanitizeUserProgressState(entry && entry.state);
}

async function saveUserProgressState(userId, state) {
  if (!userId) {
    return createEmptyUserProgressState();
  }

  const sanitizedState = sanitizeUserProgressState(state);

  await updateStore((store) => {
    const now = new Date().toISOString();
    const existing = store.userProgressStates.find((item) => item.userId === userId);
    if (existing) {
      existing.state = sanitizedState;
      existing.updatedAt = now;
      return;
    }

    store.userProgressStates.push({
      id: `${userId}-${Date.now()}`,
      userId,
      state: sanitizedState,
      createdAt: now,
      updatedAt: now,
    });
  });

  return sanitizedState;
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
  createEmptyUserProgressState,
  getUserStats,
  getUserProgressState,
  recordActivityCompletion,
  recordExerciseAttempt,
  recordLevelAssessment,
  recordVoiceSession,
  sanitizeUserProgressState,
  saveUserProgressState,
};
