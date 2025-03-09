import React, { useState, useRef } from "react";
import "./Photo.css"; // Make sure to create this CSS file

export default function Photo() {
    const [useCamera, setCamera] = useState(false);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [photo, setPhoto] = useState(null);

    const handleCamera = async () => {
        setCamera(true);
        try {
            const videoStream = await navigator.mediaDevices.getUserMedia({ video: true });

            if (videoRef.current) {
                videoRef.current.srcObject = videoStream;
            }
        } catch (err) {
            console.error("Error accessing camera: ", err);
            alert("Camera access denied or unavailable");
        }
    };

    const snapPhoto = () => {
        const canvas = canvasRef.current;
        const video = videoRef.current;

        if (!canvas || !video) return;

        // set canvas size to match the video feed
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        // draw the video frame onto the canvas
        const ctx = canvas.getContext("2d");
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        // convert the canvas image to a data URL and store it
        const imageUrl = canvas.toDataURL("image/png");
        setPhoto(imageUrl);
        setCamera(false); // Close camera after taking photo
    };

    const retakePhoto = () => {
        setPhoto(null);
        handleCamera();
    };

    return (
        <div className="photo-container">
            {!useCamera && !photo && (
                <div className="camera-prompt">
                    <div className="camera-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                            <circle cx="12" cy="13" r="4"></circle>
                        </svg>
                    </div>
                    <h2 className="prompt-title">Capture Your Best Selfie</h2>
                    <p className="prompt-text">Let's take a clear photo for analysis</p>
                    <button className="camera-button pulse-animation" onClick={handleCamera}>
                        <span className="button-icon">📸</span>
                        <span className="button-text">Open Camera</span>
                    </button>
                </div>
            )}

            {useCamera && (
                <div className="camera-view">
                    <video ref={videoRef} autoPlay playsInline muted></video>
                    <div className="camera-controls">
                        <button className="camera-btn cancel" onClick={() => setCamera(false)}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                        <button className="camera-btn capture" onClick={snapPhoto}>
                            <div className="capture-btn-inner"></div>
                        </button>
                        <div className="camera-btn-placeholder"></div>
                    </div>
                </div>
            )}

            {photo && (
                <div className="photo-result">
                    <div className="photo-preview">
                        <img src={photo} alt="Captured" />
                        <div className="photo-badge">
                            <span>Ready for Analysis</span>
                        </div>
                    </div>
                    <div className="photo-controls">
                        <button className="control-btn secondary" onClick={retakePhoto}>
                            <span className="btn-icon">↺</span>
                            <span className="btn-text">Retake</span>
                        </button>
                        <button className="control-btn primary">
                            <span className="btn-icon">✨</span>
                            <span className="btn-text">Analyze My Skin</span>
                        </button>
                    </div>
                </div>
            )}

            <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
        </div>
    );
}