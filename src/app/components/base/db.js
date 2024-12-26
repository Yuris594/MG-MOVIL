import { openDB } from 'idb';

const DB_NAME = 'IDBService';

export const initDB = async () => {
  const db = await openDB(DB_NAME, 1, {
    upgrade(db) {
      db.createObjectStore('articles', { keyPath: "id", autoIncrement: true });
      db.createObjectStore('cartera', { keyPath: "id", autoIncrement: true });
      db.createObjectStore('customers', { keyPath: "id", autoIncrement: true });
    },
  });
  return db;
};

export const clearDatabase = async () => {
  const db = await initDB();
  const storeNames = ['articles', 'cartera', 'customers'];
  const tx = db.transaction(storeNames, 'readwrite');

  for (const storeName of storeNames) {
    await tx.objectStore(storeName).clear();
  }

  console.log('Base de datos limpiada');
};

export const isDatabaseEmpty = async () => {
  const db = await initDB();
  const storeNames = ['articles', 'cartera', 'customers'];

  for (const storeName of storeNames) {
    const count = await db.count(storeName);
    if (count > 0) {
      return false; 
    }
  }

  return true; 
};