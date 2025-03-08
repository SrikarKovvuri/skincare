import React, { useState, useRef } from "react"

export default function Upload() {
  const [image, setImage]  = useState(null);
  const fileInput = useRef(null);

const openFile = () => {
  fileInput.current.click();
}

const handleFileChange = (e) => {
  const file = e.target.files[0]; //pick the first file that the user selects
  if(file) {
    setImage(file);
  }
}
  return(
    <div>
        <h1>Upload your picture here!!</h1>
        <input onChange = {handleFileChange} ref = {fileInput} id="fileInput" type="file" accept="image/*" style={{ display: "none" }} />
        <button onClick = {openFile} style = {{padding: "10px", backgroundColor: "blue", color: "white", borderRadius: "5px", cursor: "pointer" }}>
            ChooseFile
        </button>

    {image && <p>Selected file: {image.name}</p>}
    </div>
  )
}