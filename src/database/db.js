import { DB_NAME, DB_VERSION, STORES } from './schema.js';

let dbPromise = null;

// Abre (ou cria) o banco uma única vez e reaproveita a conexão.
export function openDB() {
  if (!dbPromise) {
    dbPromise = new Promise((resolve, reject) => {
      const req = indexedDB.open(DB_NAME, DB_VERSION);
      req.onupgradeneeded = () => {
        const db = req.result;
        for (const [name, def] of Object.entries(STORES)) {
          if (db.objectStoreNames.contains(name)) continue;
          const store = db.createObjectStore(name, { keyPath: def.keyPath });
          def.indexes.forEach((i) => store.createIndex(i.name, i.keyPath, { unique: !!i.unique }));
        }
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => { dbPromise = null; reject(req.error); };
    });
  }
  return dbPromise;
}
