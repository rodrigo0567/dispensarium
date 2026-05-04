const DB_NAME = 'dispensarium_db';
const DB_VERSION = 1;
let db = null;

function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);

    req.onupgradeneeded = e => {
      const d = e.target.result;

      if (!d.objectStoreNames.contains('items')) {
        const s = d.createObjectStore('items', { keyPath: 'id' });
        s.createIndex('cat', 'cat', { unique: false });
      }

      if (!d.objectStoreNames.contains('movements')) {
        const m = d.createObjectStore('movements', { keyPath: 'id' });
        m.createIndex('date', 'date');
      }
    };

    req.onsuccess = e => {
      db = e.target.result;
      resolve(db);
    };

    req.onerror = e => reject(e.target.error);
  });
}

function dbGetAll(store) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(store, 'readonly');
    const req = tx.objectStore(store).getAll();

    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

function dbPut(store, obj) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(store, 'readwrite');
    const req = tx.objectStore(store).put(obj);

    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

function dbDelete(store, key) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(store, 'readwrite');
    const req = tx.objectStore(store).delete(key);

    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}