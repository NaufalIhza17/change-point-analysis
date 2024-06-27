import React, { useState } from "react";
import "./App.css";
import FileInput from "./components/FileInput";

function App() {
  const [recSeq, setRecSeq] = useState("");
  const [metaData, setMetaData] = useState({});
  const [loading, setLoading] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(false);
  return (
    <section className="app">
      <div className="box-placement">
        <h1 className="label-form">Upload FASTA File</h1>
        <div className="box-main">
          <FileInput
            setRecSeq={setRecSeq}
            setMetaData={setMetaData}
            setLoading={setLoading}
            setFileUploaded={setFileUploaded}
          />
        </div>

          <div className="box-main">
          {loading && (
              <div className="loading">
                <div className="spinner"></div>
              </div>
            )}
            {!loading && fileUploaded && (
              <>
                <h2>Metadata</h2>
                <p>ID: {metaData.id}</p>
                <p>Name: {metaData.name}</p>
                <p>Organism: {metaData.organism}</p>
              </>
            )}
          </div>
      </div>
    </section>
  );
}

export default App;
