import React, { useState, useEffect } from "react";
import { getAllWord } from "./db";

function MatchingGame() {
  const [words, setWords] = useState([]); //store {numberOfQuestion} words obj to be show on the game
  const [shuffledMeanings, setShuffledMeanings] = useState([]);
  const [selectedWord, setSelectedWord] = useState(null);
  const [selectedMeaning, setSelectedMeaning] = useState(null);
  const [matches, setMatches] = useState({}); // { word: meaning }
  const [correctMatches, setCorrectMatches] = useState(0);
  const [wordData, setWordData] = useState([]); // store all the data in the learning db for further use i guess =)))
  const [numberOfQuestion, setNumberOfQuestion] = useState(0);
  const [wordList, setWordList] = useState([]); //store all the words that have not been played yet.
  const [errorPair, setErrorPair] = useState({}); // { word: 'correct' | 'incorrect' }

  useEffect(() => {
    loadWords();
  }, []);

  const loadWords = async () => {
    const storedWords = await getAllWord("flashcards");
    setWordData(storedWords);
    setNumberOfQuestion(storedWords.length < 4 ? storedWords.length : 4);
    setWordList(storedWords);
  };

  useEffect(() => {
    startGame();
  }, [wordData]);

  const startGame = () => {
    const selectedWords = [];
    const selectedMeanings = [];
    let tempList = [...wordList]; //created to deal with the while loop because setState in a loop cost efficiency

    // Select 4 random words
    while (
      selectedWords.length <
      (wordList.length < numberOfQuestion ? wordList.length : numberOfQuestion)
    ) {
      const randomIndex = Math.floor(Math.random() * tempList.length);
      const randomRecord = tempList[randomIndex];
      tempList.splice(randomIndex, 1);
      selectedWords.push(randomRecord);
      selectedMeanings.push(randomRecord.meaning);
    }

    setNumberOfQuestion(
      wordList.length < numberOfQuestion ? wordList.length : numberOfQuestion
    );
    setWordList(tempList);
    setWords(selectedWords);
    setShuffledMeanings(shuffleArray(selectedMeanings));
    setSelectedWord(null);
    setSelectedMeaning(null);
    setMatches({});
    setCorrectMatches(0);
    setErrorPair({});
  };

  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }

    return newArray;
  };

  const handleClickWord = (word) => {
    setErrorPair({});
    if (matches[word.word]) return; // If already matched, do nothing
    if (selectedWord === word) {
      setSelectedWord(null);
    } else {
      setSelectedWord(word);
      if (selectedMeaning) {
        checkMatch(word, selectedMeaning);
      }
    }
  };

  const handleClickMeaning = (meaning) => {
    setErrorPair({});
    if (Object.values(matches).includes(meaning)) return; // If already matched, do nothing
    if (selectedMeaning === meaning) {
      setSelectedMeaning(null);
    } else {
      setSelectedMeaning(meaning);
      if (selectedWord) {
        checkMatch(selectedWord, meaning);
      }
    }
  };

  const checkMatch = (word, meaning) => {
    if (word.meaning === meaning) {
      setMatches({ ...matches, [word.word]: meaning });
      setCorrectMatches(correctMatches + 1);
    } else {
      setErrorPair({ word: word, meaning: meaning });
    }
    setSelectedWord(null);
    setSelectedMeaning(null);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-sm shadow-md w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Word - Meaning Matching Game
        </h1>

        <div className="flex space-x-8">
          <div className="w-1/2">
            <h2 className="text-lg font-semibold mb-2">Words</h2>
            <div className="space-y-4">
              {words.map((word) => (
                <div
                  key={word.word}
                  onClick={() => handleClickWord(word)}
                  className={`border p-2 rounded cursor-pointer select-none  ${
                    matches[word.word] ? " bg-green-100" : ""
                  }${
                    errorPair && errorPair.word === word ? " bg-red-500" : ""
                  } ${selectedWord === word ? " bg-green-100" : ""}`}
                >
                  {word.word}
                </div>
              ))}
            </div>
          </div>

          <div className="w-1/2">
            <h2 className="text-lg font-semibold mb-2">Meanings</h2>
            <div className="space-y-4">
              {shuffledMeanings.map((meaning) => (
                <div
                  key={meaning}
                  onClick={() => handleClickMeaning(meaning)}
                  className={`border p-2 rounded cursor-pointer select-none ${
                    Object.values(matches).includes(meaning)
                      ? " bg-green-100"
                      : ""
                  } ${selectedMeaning === meaning ? " bg-green-100" : ""} ${
                    errorPair && errorPair.meaning === meaning
                      ? " bg-red-500"
                      : ""
                  }`}
                >
                  {meaning}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          {correctMatches === numberOfQuestion && (
            <button
              onClick={startGame}
              className="bg-blue-500 text-white px-4 py-2 rounded-sm mt-4"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default MatchingGame;
