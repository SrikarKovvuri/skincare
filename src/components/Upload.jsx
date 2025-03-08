import React, { useState, useRef } from "react"

export default function Upload() {
  const [image, setImage]  = useState(null);

const openFile = () => {


}
  return(
    <div>
        <h1>Upload your picture here!!</h1>
        <input id="fileInput" type="file" accept="image/*" style={{ display: "none" }} />
        <button onClick = {openFile} style = {{padding: "10px", backgroundColor: "blue", color: "white", borderRadius: "5px", cursor: "pointer" }}>
            ChooseFile
        </button>
    </div>
  )
}