import React, { useState, useRef } from "react";
import "./FileInput.css";

const FileInput = ({ setRecSeq, setMetaData, setLoading, setFileUploaded }) => {
  const inputRef = useRef();
  const [selectedFile, setSelectedFile] = useState(null);

  const handleOnChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setSelectedFile(file);
      setLoading(true);

      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target.result;
        const lines = text.split("\n");
        if (lines[0].startsWith(">")) {
          const header = lines[0].substring(1).split("|");
          const metadata = {
            id: header[0] || "N/A",
            name: header[1] || "N/A",
            organism: header[2] || "N/A",
          };
          setMetaData(metadata);
        }
        const recSeq = lines.slice(1).join("").replace(/\s/g, "");
        setRecSeq(recSeq);

        setTimeout(() => {
          setLoading(false);
          setFileUploaded(true);
        }, 2000);
      };
      reader.readAsText(file);
    } else {
      setSelectedFile(null);
    }
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };
  
  const removeFile = () => {
    setSelectedFile(null);
    inputRef.current.value = "";
    setRecSeq("");
    setMetaData({});
    setFileUploaded(false);
  };
  
  return (
    <div>
      <input
        type="file"
        ref={inputRef}
        onChange={handleOnChange}
        style={{ display: "none" }}
        id="fastaInput"
        accept=".fa,.fasta"
      />
      {!selectedFile && (
        <button className="file-btn" onClick={onChooseFile}>
          <span className="material-symbols-rounded">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="current"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12 15.75C12.4142 15.75 12.75 15.4142 12.75 15V4.02744L14.4306 5.98809C14.7001 6.30259 15.1736 6.33901 15.4881 6.06944C15.8026 5.79988 15.839 5.3264 15.5694 5.01191L12.5694 1.51191C12.427 1.34567 12.2189 1.25 12 1.25C11.7811 1.25 11.573 1.34567 11.4306 1.51191L8.43056 5.01191C8.16099 5.3264 8.19741 5.79988 8.51191 6.06944C8.8264 6.33901 9.29988 6.30259 9.56944 5.98809L11.25 4.02744L11.25 15C11.25 15.4142 11.5858 15.75 12 15.75Z"
                  fill=""
                ></path>{" "}
                <path
                  d="M16 9C15.2978 9 14.9467 9 14.6945 9.16851C14.5853 9.24148 14.4915 9.33525 14.4186 9.44446C14.25 9.69667 14.25 10.0478 14.25 10.75L14.25 15C14.25 16.2426 13.2427 17.25 12 17.25C10.7574 17.25 9.75004 16.2426 9.75004 15L9.75004 10.75C9.75004 10.0478 9.75004 9.69664 9.58149 9.4444C9.50854 9.33523 9.41481 9.2415 9.30564 9.16855C9.05341 9 8.70227 9 8 9C5.17157 9 3.75736 9 2.87868 9.87868C2 10.7574 2 12.1714 2 14.9998V15.9998C2 18.8282 2 20.2424 2.87868 21.1211C3.75736 21.9998 5.17157 21.9998 8 21.9998H16C18.8284 21.9998 20.2426 21.9998 21.1213 21.1211C22 20.2424 22 18.8282 22 15.9998V14.9998C22 12.1714 22 10.7574 21.1213 9.87868C20.2426 9 18.8284 9 16 9Z"
                  fill=""
                ></path>{" "}
              </g>
            </svg>
          </span>{" "}
          Upload File
        </button>
      )}
      {selectedFile && (
        <div className="selected-file">
          <p>{selectedFile.name}</p>
          <button onClick={removeFile}>
            <span className="material-symbols-rounded">
              <svg
                fill="current"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path d="M5.755,20.283,4,8H20L18.245,20.283A2,2,0,0,1,16.265,22H7.735A2,2,0,0,1,5.755,20.283ZM21,4H16V3a1,1,0,0,0-1-1H9A1,1,0,0,0,8,3V4H3A1,1,0,0,0,3,6H21a1,1,0,0,0,0-2Z"></path>
                </g>
              </svg>
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

export default FileInput;
