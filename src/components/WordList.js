import React, { useState, useEffect } from "react";
import { getAllWord, removeData, saveWord } from "./db";

const WordList = () => {
  const [words, setWords] = useState([]);

  const handleAddToFlashcards = async (word) => {
    if (!word.addToFlashcard) {
      await saveWord(
        { ...word, addToFlashcard: !word.addToFlashcard },
        "words"
      );
      await saveWord(
        { ...word, addToFlashcard: !word.addToFlashcard },
        "flashcards"
      );
    } else {
      await removeData("flashcards", word.word);
      await saveWord(
        { ...word, addToFlashcard: !word.addToFlashcard },
        "words"
      );
    }
    setWords(await getAllWord("words"));
  };

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    console.log("load Database");
    const storedWords = await getAllWord("words");
    setWords(storedWords);
    const storedFlashcards = await getAllWord("flashcards");
    storedFlashcards.forEach(async (word) => {
      await saveWord(word, "words");
    });
  };

  return (
    <>
      {console.log("re render wordList")}
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">All Words</h2>
        {words.length === 0 ? (
          <p>No words available. Add words using Input field.</p>
        ) : (
          <ul className="list-disc pl-5">
            {words.map((word, index) => (
              <li key={index} className="mb-1">
                <span className="font-bold">{word.word}</span>: {word.meaning}
                <input
                  type="checkbox"
                  checked={word.addToFlashcard}
                  onChange={() => handleAddToFlashcards(word)}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default WordList;
