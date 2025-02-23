import { useState } from "react";

const Flashcard = ({ word, onRecall }) => {
  const [show, setShow] = useState(false);
  if (!word) {
    return <p>No words available. Add more words to start!</p>;
  }

  return (
    <div className="border p-4 text-center rounded-sm shadow-sm">
      <h2 className="text-xl font-bold">{word.word}</h2>
      {show && <p className="text-gray-600">{word.meaning}</p>}
      <div className="mt-4 space-x-2">
        <button
          onClick={() => setShow(!show)}
          className="bg-green-500 text-white p-2 rounded-sm"
        >
          Show meaning
        </button>
        <button
          onClick={() => onRecall(true)}
          className="bg-green-500 text-white p-2 rounded-sm"
        >
          I Recall
        </button>
        <button
          onClick={() => onRecall(false)}
          className="bg-red-500 text-white p-2 rounded-sm"
        >
          I Don't Recall
        </button>
      </div>
    </div>
  );
};

export default Flashcard;
