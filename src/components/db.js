import { openDB } from "idb";

const DB_NAME = "vocabDB";
const WORDS_STORE = "words";
const FLASHCARDS_STORE = "flashcards";

// Initialize Database
export const initDB = async () => {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(WORDS_STORE)) {
        db.createObjectStore(WORDS_STORE, { keyPath: "word" });
      }
      if (!db.objectStoreNames.contains(FLASHCARDS_STORE)) {
        db.createObjectStore(FLASHCARDS_STORE, { keyPath: "word" });
      }
    },
  });
};

/**
 * Save a word to either 'words' or 'flashcards' store.
 * @param {string} storeName - The store to save to ('words' or 'flashcards').
 * @param {object} wordData - The word object { word, meaning }.
 */
export const saveWord = async (wordData, storeName) => {
  if (![WORDS_STORE, FLASHCARDS_STORE].includes(storeName)) {
    console.error("Invalid store name:", storeName);
    return;
  }
  const db = await initDB();
  const tx = db.transaction(storeName, "readwrite");
  const store = tx.objectStore(storeName);

  await store.put(wordData);
  await tx.done;
};

/**
 * Retrieve all words from either 'words' or 'flashcards' store.
 * @param {string} storeName - The store to fetch from ('words' or 'flashcards').
 * @returns {Promise<Array>} - A promise resolving to an array of words.
 */
export const getAllWord = async (storeName) => {
  if (![WORDS_STORE, FLASHCARDS_STORE].includes(storeName)) {
    console.error("Invalid store name:", storeName);
    return [];
  }
  const db = await initDB();
  return await db.getAll(storeName);
};

/**
 * Remove a word from either 'words' or 'flashcards' store.
 * @param {string} storeName - The store to remove from ('words' or 'flashcards').
 * @param {string} word - The word to remove.
 */
export const removeData = async (storeName, word) => {
  if (![WORDS_STORE, FLASHCARDS_STORE].includes(storeName)) {
    console.error("Invalid store name:", storeName);
    return;
  }
  const db = await initDB();
  await db.delete(storeName, word);
};
