const DB_NAME = 'dispensarium_db';
const DB_VERSION = 1;
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
      resolve();
    };

    request.onerror = function () {
      reject("Erro ao abrir DB");
    };
  });
}