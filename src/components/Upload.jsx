import React, { useState, useRef, useCallback } from "react";
import Photo from "./Photo";
import "./Upload.css"; // Import the CSS file

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
    validateAndProcessFile(file);
  };

  const validateAndProcessFile = (file) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    const maxSize = 5 * 1024 * 1024;
    
    if (!file) return;

    if (!allowedTypes.includes(file.type)) { 
      showNotification("Invalid file type. Please upload a JPEG or PNG image.", "error");
      return; 
    }

    if (file.size > maxSize) {
      showNotification("File is too large! Maximum size is 5MB.", "error");
      return; 
    }
    
    setImage(file); 
    
    // Create an image preview using FileReader
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
      showNotification("Image uploaded successfully!", "success");
    };
    reader.readAsDataURL(file);
  };

  const showNotification = (message, type) => {
    // You could implement a toast notification system here
    // For now, let's just use an alert
    if (type === "error") {
      alert(message);
    } else {
      console.log(message);
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

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragging(false);
  }

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    validateAndProcessFile(file);
  }

  const analyzeImage = () => {
    // This could connect to your skin analysis backend
    alert("Your uploaded image would now be sent for analysis!");
  };

  return (
    <div className="upload-container">
      <div className="upload-header">
        <h1>GlowUp</h1>
        <p>Upload your selfie to reveal your unique skin profile</p>
      </div>

      <div className="upload-content">
        <div className="upload-section">
          {/* Hidden File Input */}
          <input
            ref={fileInput}
            type="file"
            accept="image/*"
            className="hidden-input"
            onChange={handleFileChange}
          />

          {/* File Upload Area */}
          {!preview ? (
            <div 
              className={`drop-zone ${isDragging ? "active" : ""}`}
              onDragOver={handleDragOver} 
              onDragLeave={handleDragLeave} 
              onDrop={handleDrop}
              onClick={openFile}
            >
              <div className="upload-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="17 8 12 3 7 8"></polyline>
                  <line x1="12" y1="3" x2="12" y2="15"></line>
                </svg>
              </div>
              <h3>{isDragging ? "Drop it like it's hot! 🔥" : "Drag & Drop your image here"}</h3>
              <p>or</p>
              <button 
                className="browse-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  openFile();
                }}
              >
                Browse Files
              </button>
              <p className="file-hint">Supported formats: JPG, PNG (Max 5MB)</p>
            </div>
          ) : (
            <div className="preview-section">
              <h2>Ready for Analysis</h2>
              <div className="image-preview-container">
                <img
                  src={preview}
                  alt="Preview"
                  className="image-preview"
                />
                <button className="remove-btn" onClick={removeImage}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
              <div className="preview-actions">
                <button className="action-btn secondary" onClick={removeImage}>
                  Choose Another
                </button>
                <button className="action-btn primary" onClick={analyzeImage}>
                  Analyze Now
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="divider">
          <span>OR</span>
        </div>

        {/* Camera Component */}
        <div className="camera-component">
          <Photo />
        </div>
      </div>
    </div>
  );
}