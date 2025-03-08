import React, { useState, useRef, useCallback } from "react";

export default function Upload() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const fileInput = useRef(null);

  const openFile = () => {
    fileInput.current.click(); // Opens the hidden file input
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Get first selected file
    if (file) {
        setImage(file); 
    } 

    // Create an image preview using FileReader
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setPreview(null);
    setImage(null);
    fileInput.current.value = null;
  }
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Upload Your Picture Here!</h1>

      {/* Hidden File Input */}
      <input
        ref={fileInput}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      {/* Button to trigger file picker */}
      <button
        onClick={openFile}
        style={{
          padding: "10px",
          backgroundColor: "blue",
          color: "white",
          borderRadius: "5px",
          cursor: "pointer",
          marginBottom: "10px",
        }}
      >
        Choose File
      </button>

      {/* Show Preview */}
      {preview && (
        <div>
          <h2>Preview of Your Image:</h2>
          <img
            src={preview}
            alt="user's pic"
            style={{
              width: "200px",
              height: "auto",
              marginTop: "10px",
              borderRadius: "8px",
            }}
          />
          <br />
          <button onClick = {removeImage} style={{ padding: "8px", marginTop: "10px", backgroundColor: "red", color: "white", borderRadius: "5px", cursor: "pointer" }}>Remove Image</button>
        </div>
      )}
    </div>
  );
}
