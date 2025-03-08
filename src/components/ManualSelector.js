import React, { useState } from "react";

function ManualSelector({ payload }) {
  const { word, onImageSelect } = payload;
  const [manualImageUrl, setManualImageUrl] = useState("");

  const handleGoogleSearch = () => {
    const googleSearchURL = `https://www.google.com/search?tbm=isch&tbs=ic:trans,ift:svg&q=${encodeURIComponent(
      word + " vector illustration"
    )}`;

    window.open(googleSearchURL, "_blank"); // Open Google Images in a new tab
  };

  const handlePaste = (e) => {
    const pastedUrl = e.clipboardData.getData("text");
    setManualImageUrl(pastedUrl);
    onImageSelect(pastedUrl); // Auto-select the pasted image
  };

  return (
    <div className="p-2 border rounded-md">
      <button
        className="bg-blue-500 text-white p-2 rounded-sm mt-2"
        onClick={handleGoogleSearch}
      >
        Click to search for {word} on Google Images
      </button>
      <input
        type="text"
        value={manualImageUrl}
        onChange={(e) => setManualImageUrl(e.target.value)}
        onPaste={handlePaste} // Auto-detect pasted URL
        className="border p-2 rounded-sm w-full"
        placeholder="Paste image link here..."
      />
    </div>
  );
}

export default ManualSelector;
