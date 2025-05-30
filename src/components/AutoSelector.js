import React, { useEffect, useState } from "react";

function AutoSelector({ payload }) {
  const { word, onImageSelect } = payload;
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const API_KEY = process.env.REACT_APP_PIXABAY_API_KEY;

  useEffect(() => {
    fetchImages(word);
  }, [word]);

  const fetchImages = async (query) => {
    try {
      const response = await fetch(
        `https://pixabay.com/api/?key=${API_KEY}&q=${query}&image_type=vector&per_page=4`
      );
      const data = await response.json();
      setImages(data.hits.map((hit) => hit.largeImageURL));
      console.log("fetched");
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const handleImageSelect = (imageUrl) => {
    setSelectedImage(imageUrl);
    if (onImageSelect) onImageSelect(imageUrl);
  };

  return (
    <div className="grid grid-cols-2 gap-4 p-4 w-[600px] border rounded-sm">
      {images.map((img, index) => (
        <div className="flex justify-center items-center">
          <div className="w-[200px] ">
            <img
              key={index}
              src={img}
              alt={`Vector for ${word}`}
              className={`object-contain cursor-pointer rounded-md border-2 ${
                selectedImage === img ? "border-blue-500" : "border-transparent"
              }`}
              onClick={() => {
                handleImageSelect(img);
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default AutoSelector;
