import { openDB } from '../db.js';

// Repositório genérico: só sabe ler/gravar. Nenhuma regra de negócio mora aqui.
export function createRepository(storeName) {
  const run = async (mode, fn) => {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(storeName, mode);
      const request = fn(tx.objectStore(storeName));
      tx.oncomplete = () => resolve(request?.result);
      tx.onerror = tx.onabort = () => reject(tx.error);
    });
  };
  return {
    getAll: () => run('readonly', (s) => s.getAll()),
    getById: (id) => run('readonly', (s) => s.get(id)),
    findBy: (index, value) => run('readonly', (s) => s.index(index).getAll(value)),
    save: (item) => run('readwrite', (s) => s.put(item)),
    remove: (id) => run('readwrite', (s) => s.delete(id)),
  };
}
