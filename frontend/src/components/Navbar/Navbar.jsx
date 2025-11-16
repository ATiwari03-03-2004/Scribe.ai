import ToolBar from "../ToolBar/ToolBar";
import "../Navbar/Navbar.css";
import { useState } from "react";

export default function Navbar(props) {
  let [docName, setDocName] = useState("Untitled");
  return (
    <div className="navbar">
      <div className="label">
        <div className="doc">
          <img src="/Scribe_Black.png" alt="Scribe_logo" title="Home" />
          <input
            type="text"
            placeholder={docName}
            value={docName}
            onChange={(e) => setDocName(e.target.value)}
            onKeyDown={(e) => (e.key === "Enter" ? setDocName(e.target.value) : null)}
            style={{ backgroundColor: "#f5f5f5", border: "1px solid black", fontSize: "1.2rem"}}
          ></input>
          <button
            style={{ marginLeft: "0.5rem", cursor: "pointer" }}
            title="Save"
          >
            <span className="material-symbols-outlined">save</span>
          </button>
          <button
            style={{ marginLeft: "0.5rem", cursor: "pointer" }}
            title="Share"
          >
            <span className="material-symbols-outlined">share</span>
          </button>
        </div>
        <div className="profile-info">
          <button
            className="GEMINI"
            style={{
              height: "2.35rem",
              width: "2.35rem",
              cursor: "pointer",
              borderRadius: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              className="GEMINI_IMG"
              src="GEMINI.svg"
              title="Try Gemini"
              style={{ height: "1.35rem", width: "1.35rem" }}
            />
          </button>
          <div
            className="profile-pic"
            title="Profile"
            style={{
              height: "2.35rem",
              width: "2.35rem",
              backgroundColor: "purple",
              color: "white",
              fontFamily: "monospace",
              fontWeight: "bold",
              fontSize: "1.45rem",
              borderRadius: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: "0.5rem",
              cursor: "pointer",
            }}
          >
            AT
          </div>
        </div>
      </div>
      <ToolBar
        handleToggleInlineStyles={props.handleToggleInlineStyles}
        currentInlineStyle={props.currentInlineStyle}
        handleToggleBlockTypes={props.handleToggleBlockTypes}
        currentBlockStyle={props.currentBlockStyle}
        editorState={props.editorState}
        onChange={props.onChange}
        isRecognizing={props.isRecognizing}
        setIsRecognizing={props.setIsRecognizing}
        interimRecognizedText={props.interimRecognizedText}
        setInterimRecognizedText={props.setInterimRecognizedText}
        finalRecognizedText={props.finalRecognizedText}
        setFinalRecognizedText={props.setFinalRecognizedText}
        isFinal={props.isFinal}
        setIsFinal={props.setIsFinal}
      />
    </div>
  );
}
