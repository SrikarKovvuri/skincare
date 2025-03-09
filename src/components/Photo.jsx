import React, { useState, useRef } from "react";

export default function Photo() {
    const [useCamera, setCamera] = useState(false);
    const videoRef = useRef(null);
    const canvasRef = useRef(null); // Corrected to use the same ref name
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
        const ctx = canvas.getContext("2d"); // Corrected method usage
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        // convert the canvas image to a data URL and store it
        const imageUrl = canvas.toDataURL("image/png");
        setPhoto(imageUrl);
    };

    return (
        <div>
            <button onClick={handleCamera}>Take a photo</button>

            {/* only show if the camera is on */}
            {useCamera && (
                <div>
                    <video ref={videoRef} autoPlay playsInline style={{ width: "300px", borderRadius: "10px" }}></video>
                    <button onClick={snapPhoto}>Snap Photo</button> {/* Fixed missing onClick */}
                </div>
            )}

            {/* hidden canvas for capturing frames */}
            <canvas ref={canvasRef} style={{ display: "none" }}></canvas>

            {photo && (
                <div>
                    <h2>Captured Photo:</h2>
                    <img src={photo} alt="Captured" style={{ width: "300px", borderRadius: "10px" }} />
                </div>
            )}
        </div>
    );
}
