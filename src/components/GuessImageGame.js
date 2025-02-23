import { useState } from "react";
import ImageSelector from "./ImageSelector";

function GuessImageGame() {
  const [img, setImageURL] = useState();
  const onImageSelect = (imgURL) => {
    setImageURL(imgURL);
  };
  return (
    <div>
      <ImageSelector word={"plane"} onImageSelect={onImageSelect} />
      <img src={img} alt="Description of the image"></img>
    </div>
  );
}

export default GuessImageGame;
