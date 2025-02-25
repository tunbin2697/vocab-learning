import React, { useRef, useState } from "react";
import { saveWord } from "./db";
import ImageSelector from "./ImageSelector";

const WordInput = ({ onSubmit }) => {
  const [word, setWord] = useState("");
  const [meaning, setMeaning] = useState("");
  const [imageSearch, setImageSearch] = useState("");
  const [imageUrl, setUrl] = useState("");
  const [showChooseImage, setShowChooseImage] = useState(false);
  const wordInputRef = useRef(null);

  const handleAddWord = async (newWord) => {
    await saveWord(newWord, "words");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (word && meaning) {
      const newWord = { word, meaning, imageUrl, addToFlashcard: false };
      onSubmit();
      await handleAddWord(newWord);
      setWord("");
      setMeaning("");
      setUrl("");
      setImageSearch("");
      setShowChooseImage(false);
      if (wordInputRef.current) {
        wordInputRef.current.focus();
      }
    }
  };

  const onImageSelect = (imgURL) => {
    setUrl(imgURL);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
        <input
          ref={wordInputRef}
          type="text"
          placeholder="Word"
          value={word}
          onChange={(e) => {
            setImageSearch(e.target.value);
            setWord(e.target.value);
          }}
          className="border p-2 rounded-sm w-full"
        />
        <input
          type="text"
          placeholder="Meaning"
          value={meaning}
          onChange={(e) => setMeaning(e.target.value)}
          className="border p-2 rounded-sm w-full"
        />
        <p>Search for image</p>
        <input
          type="text"
          placeholder="Search for image"
          value={imageSearch}
          onChange={(e) => {
            if (showChooseImage) setShowChooseImage(false);
            setImageSearch(e.target.value);
          }}
          className="border p-2 rounded-sm w-full"
        />
        <button
          className="bg-blue-500 text-white p-2 rounded-sm"
          onClick={(e) => {
            e.preventDefault();
            setShowChooseImage(!showChooseImage);
          }}
        >
          Get Image
        </button>
        {showChooseImage ? (
          <ImageSelector word={imageSearch} onImageSelect={onImageSelect} />
        ) : (
          ""
        )}
        {/* <img src={imageUrl} alt="image" className="width-[40px] height-auto" /> */}
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-sm">
          Add Word
        </button>
      </form>
    </>
  );
};

export default WordInput;
