import React, { useState, useEffect, useRef } from "react";
import { getAllWord } from "./db";
import Flashcard from "./Flashcard";

const Flashcards = () => {
  const [words, setWords] = useState([]);
  const [currentWord, setCurrentWord] = useState(null);
  const wordList = useRef(words);

  useEffect(() => {
    loadWords();
    return;
  }, []);

  const loadWords = async () => {
    const storedWords = await getAllWord("flashcards");
    setWords(storedWords);
    if (storedWords.length > 0) {
      setCurrentWord(storedWords[0]); // Start with the first word
    }
  };

  useEffect(() => {
    getWord();
    wordList.current = words;
  }, [words]);

  // Fetch the next word
  const getWord = () => {
    if (words.length === 0) {
      setCurrentWord(null);
      return;
    }
    setCurrentWord(words[0]);
  };

  // Handle user recall response
  const handleRecall = async (recall) => {
    if (!currentWord) return;

    if (!recall) {
      // If not recalled, push it to the end for spaced repetition
      setWords([...words.slice(1), currentWord]); // Move to the end
    } else {
      // If recalled, remove it
      setWords(words.slice(1)); // Remove from the list
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center">
        <Flashcard word={currentWord} onRecall={handleRecall} />
      </div>
    </div>
  );
};

export default Flashcards;
