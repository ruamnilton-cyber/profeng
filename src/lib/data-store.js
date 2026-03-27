const fs = require('fs/promises');
const path = require('path');

function getDataFile() {
  if (process.env.APP_DATA_FILE && process.env.APP_DATA_FILE.trim()) {
    return path.resolve(process.env.APP_DATA_FILE.trim());
  }

  return path.join(process.cwd(), 'data', 'app-data.json');
}

function createDefaultStore() {
  return {
    version: 1,
    createdAt: new Date().toISOString(),
    users: [],
    sessions: [],
    exerciseAttempts: [],
    levelAssessments: [],
    voiceSessions: [],
    activityCompletions: [],
    userProgressStates: [],
  };
}

function normalizeStore(store) {
  const base = createDefaultStore();
  return {
    ...base,
    ...store,
    users: Array.isArray(store && store.users) ? store.users : [],
    sessions: Array.isArray(store && store.sessions) ? store.sessions : [],
    exerciseAttempts: Array.isArray(store && store.exerciseAttempts)
      ? store.exerciseAttempts
      : [],
    levelAssessments: Array.isArray(store && store.levelAssessments)
      ? store.levelAssessments
      : [],
    voiceSessions: Array.isArray(store && store.voiceSessions) ? store.voiceSessions : [],
    activityCompletions: Array.isArray(store && store.activityCompletions)
      ? store.activityCompletions
      : [],
    userProgressStates: Array.isArray(store && store.userProgressStates)
      ? store.userProgressStates
      : [],
  };
}

async function ensureStoreFile() {
  const dataFile = getDataFile();
  await fs.mkdir(path.dirname(dataFile), { recursive: true });

  try {
    await fs.access(dataFile);
  } catch (_error) {
    await fs.writeFile(dataFile, JSON.stringify(createDefaultStore(), null, 2), 'utf8');
  }
}

async function readStore() {
  await ensureStoreFile();
  const dataFile = getDataFile();
  const raw = await fs.readFile(dataFile, 'utf8');

  try {
    return normalizeStore(JSON.parse(raw));
  } catch (_error) {
    const freshStore = createDefaultStore();
    await fs.writeFile(dataFile, JSON.stringify(freshStore, null, 2), 'utf8');
    return freshStore;
  }
}

async function writeStore(store) {
  await fs.writeFile(getDataFile(), JSON.stringify(normalizeStore(store), null, 2), 'utf8');
}

let storeQueue = Promise.resolve();

function updateStore(mutator) {
  const run = async () => {
    const store = await readStore();
    const result = await mutator(store);
    await writeStore(store);
    return result;
  };

  const pending = storeQueue.then(run, run);
  storeQueue = pending.then(
    () => undefined,
    () => undefined,
  );
  return pending;
}

module.exports = {
  getDataFile,
  readStore,
  updateStore,
};
