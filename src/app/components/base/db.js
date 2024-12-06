import { openDB } from 'idb';

const DB_NAME = 'IDBService';

export const initDB = async () => {
  const db = await openDB(DB_NAME, 1, {
    upgrade(db) {
      db.createObjectStore('articles', { keyPath: "PKcodigo" });
      db.createObjectStore('cartera', { keyPath: "Documento" });
      db.createObjectStore('customers', { keyPath: "ID" });
  
    },
  });
  return db;
};

export const setItem = async (storeName, key, value) => {
  const db = await initDB();
  await db.put(storeName, value, key);
};

export const getItem = async (storeName, key) => {
  const db = await initDB();
  return await db.get(storeName, key);
};

export const getAllItems = async (storeName) => {
  const db = await initDB();
  return await db.getAll(storeName);
};
