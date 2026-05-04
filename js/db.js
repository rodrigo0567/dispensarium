let db = null;

function initDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('dispensariumDB', 1);

    request.onupgradeneeded = function (e) {
      db = e.target.result;

      if (!db.objectStoreNames.contains('items')) {
        db.createObjectStore('items', { keyPath: 'id' });
      }
    };

    request.onsuccess = function (e) {
      db = e.target.result;
      resolve(db);
    };

    request.onerror = function () {
      reject("Erro ao abrir banco");
    };
  });
}


function dbGetAll(store) {
  return new Promise((resolve, reject) => {
    if (!db) {
      reject("DB não inicializado");
      return;
    }

    const tx = db.transaction(store, 'readonly');
    const st = tx.objectStore(store);
    const req = st.getAll();

    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}


function dbPut(store, value) {
  return new Promise((resolve, reject) => {
    if (!db) {
      reject("DB não inicializado");
      return;
    }

    const tx = db.transaction(store, 'readwrite');
    const st = tx.objectStore(store);
    const req = st.put(value);

    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}


function dbDelete(store, id) {
  return new Promise((resolve, reject) => {
    if (!db) {
      reject("DB não inicializado");
      return;
    }

    const tx = db.transaction(store, 'readwrite');
    const st = tx.objectStore(store);
    const req = st.delete(id);

    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}