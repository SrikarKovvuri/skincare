import React, { useState, useRef } from "react";

export default function Photo() {
    const [useCamera, setCamera] = useState(false);
    const videoRef = useRef(null);
    const [stream, setStream] = useState(null);

    const handleCamera = async() => {
        setCamera(true);
        try {
            const videoStream = await navigator.mediaDevices.getUserMedia({video: true});
            setStream(videoStream);

            if(videoRef.current) {
                videoRef.current.srcObject = videoStream;
            }
        }
        catch (err) {
            console.error("Error accessing camera: ", err);
            alert("Camera access denied or unavailable");
        }

    }
    return (
        <div>
            <button onClick = {handleCamera}>Take a photo</button>
           
            {/*only show if the camera is on */}
            {useCamera && (
                <div>
                    <video ref = {videoRef} autoPlay style={{ width: "300px", borderRadius: "10px" }}></video>
                    <button>Snap Photo</button>
                </div>
            )}
        </div>
    );
}