import React, { useState, useRef, useCallback } from "react";
import Photo from "./Photo";

export default function Upload() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const fileInput = useRef(null);
  const [isDragging, setDragging] = useState(false);

  const openFile = () => {
    fileInput.current.click(); // Opens the hidden file input
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Get first selected file
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    const maxSize = 5 * 1024 * 1024;
    let check = false;
    if (file) {
        if (!allowedTypes.includes(file.type)) { 
            alert("Invalid file type. Please upload a JPEG or PNG image.");
            return; 
        }
    
        if (file.size > maxSize) {
            alert("File is too large! Maximum size is 5MB.");
            return; 
        }
    
        
        setImage(file); 
        check = true;
    } 
    if(check) {
        // Create an image preview using FileReader
        const reader = new FileReader();
        reader.onloadend = () => {
        setPreview(reader.result);
        };
        reader.readAsDataURL(file);
    }
    
  };

  const removeImage = () => {
    setPreview(null);
    setImage(null);
    fileInput.current.value = null;
  }

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  }

  const handleDragLeave = () => {
    setDragging(false);
  }

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];

    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    const maxSize = 5 * 1024 * 1024;
    let check = false;
    if (file) {
        if (!allowedTypes.includes(file.type)) { 
            alert("Invalid file type. Please upload a JPEG or PNG image.");
            return; 
        }
    
        if (file.size > maxSize) {
            alert("File is too large! Maximum size is 5MB.");
            return; 
        }
    
        
        setImage(file); 
        check = true;
    } 
    if(check) {
        // Create an image preview using FileReader
        const reader = new FileReader();
        reader.onloadend = () => {
        setPreview(reader.result);
        };
        reader.readAsDataURL(file);
    }
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

      <div onDragOver = {handleDragOver} onDragLeave = {handleDragLeave} onDrop = {handleDrop}  style={{
          border: "2px dashed gray",
          padding: "20px",
          textAlign: "center",
          cursor: "pointer",
          backgroundColor: isDragging ? "#e0f2ff" : "white", // Highlight when dragging
          transition: "background-color 0.2s",
          marginBottom: "10px",
        }}>
      <p>{isDragging ? "Drop the file here" : "Drag * Drop an image here"}</p>
      </div>
        <Photo />
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
