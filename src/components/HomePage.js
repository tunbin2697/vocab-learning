import { useState, useEffect } from "react";
import WordInput from "./WordInput";
import WordList from "./WordList";
import { saveWord, getAllWord } from "./db";

function HomePage() {
  const [words, setWords] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const storedFlashcards = await getAllWord("flashcards");
    storedFlashcards.forEach(async (word) => {
      await saveWord(word, "words");
    });
    const storedWords = await getAllWord("words");

    setWords(storedWords);
  };

  return (
    <>
      <WordInput onSubmit={loadData} />
      <WordList wordParam={words} />
    </>
  );
}

export default HomePage;
