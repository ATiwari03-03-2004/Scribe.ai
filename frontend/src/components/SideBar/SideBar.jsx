import { useState } from "react";
import { SpeechRecognition, recognition } from "../ToolBar/language.js";
import "./SideBar.css";

export default function SideBar(props) {
  let [generationPrompt, setGenerationPrompt] = useState("");
  let [isRecognizing, setIsRecognizing] = useState(false);
  let [isFinal, setIsFinal] = useState(true);
  let [interimRecognizedText, setInterimRecognizedText] = useState("");

  let generate = () => {

  }

  let startRecognition = () => {
    setIsRecognizing(true);
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event) => {
      let interimTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const result = event.results[i];
        interimTranscript += result[0].transcript;
        if (!result.isFinal) {
          setInterimRecognizedText(interimTranscript);
          setIsFinal(false);
        } else {
          setIsFinal(true);
          setGenerationPrompt((prev) => prev + interimTranscript);
        }
      }
    };

    recognition.onerror = (event) => {
      if (event.error === "not-allowed") {
        alert("Permission to record is not allowed.");
      } else if (event.error === "audio-capture") {
        alert("No microphone found. Please check your audio input device.");
      } else if (event.error === "no-speech") {
        alert("No speech was detected. Try again.");
      } else {
        alert("Speech recognition error " + event.error);
      }
      console.error("Speech recognition error: ", event.error);
      setIsRecognizing(false);
      setIsRecognizing(false);
      setInterimRecognizedText("");
      setIsFinal(false);
      recognition.stop();
    };

    recognition.onend = (event) => {
      setIsRecognizing(false);
      setInterimRecognizedText("");
      setIsFinal(false);
    };

    recognition.start();
  };

  let stopRecognition = () => {
    recognition.stop();
    setIsRecognizing(false);
    setInterimRecognizedText("");
    setIsFinal(false);
  };

  let handleClose = () => {
    props.displaySet((prev) => (prev === "none" ? "flex" : "none"));
  };

  return (
    <div
      className="SideBar"
      style={{
        display: props.display,
        flexDirection: "column",
        position: "fixed",
        top: "0.1rem",
        right: "0.1rem",
        zIndex: 2,
        backgroundColor: "rgb(245, 245, 245)",
        borderTopLeftRadius: "1rem",
        borderBottomRightRadius: "1rem",
      }}
    >
      <div
        className="top-bar"
        style={{ display: "flex", justifyContent: "end" }}
      >
        <span
          className="material-symbols-outlined"
          onClick={handleClose}
          style={{ cursor: "pointer", borderRadius: "100%" }}
        >
          close_small
        </span>
      </div>
      <div
        className="content"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h3 style={{ color: "rgba(0, 0, 0, 0.8)" }}>
          What's the plan for today?
        </h3>
      </div>
      <div
        className="search"
        style={{ paddingRight: "0.5rem", display: "flex" }}
      >
        <textarea
          placeholder="Let's go..."
          style={{
            height: "3.75rem",
            width: "96%",
            padding: "0.5rem 0rem 0rem 0.5rem",
            overflowY: "scroll",
          }}
          id="prompt"
          onChange={(e) => setGenerationPrompt(e.target.value)}
          value={
            isFinal
              ? generationPrompt
              : generationPrompt + interimRecognizedText
          }
        ></textarea>
        <div className="icons" style={{ marginLeft: "0.5rem" }}>
          <span
            className="material-symbols-outlined mic"
            style={
              isRecognizing
                ? {
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "100%",
                    height: "2rem",
                    width: "2rem",
                    marginBottom: "0.25rem",
                    backgroundColor: "#FF0033",
                    color: "white",
                  }
                : {
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "100%",
                    height: "2rem",
                    width: "2rem",
                    marginBottom: "0.25rem",
                  }
            }
            onClick={() =>
              isRecognizing ? stopRecognition() : startRecognition()
            }
            title="Dictate"
          >
            mic
          </span>
          <span
            className="material-symbols-outlined"
            style={( generationPrompt.length ? {
              cursor: "pointer",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "100%",
              height: "2rem",
              width: "2rem",
              color: "white",
              backgroundColor: "rgba(14, 137, 252, 1)",
            } : {
              cursor: "pointer",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "100%",
              height: "2rem",
              width: "2rem",
              color: "white",
              backgroundColor: "rgba(14, 137, 252, 1)",
              opacity: "0.5",
              cursor: "not-allowed"
            })}
            title="Generate"
            onClick={() => {
              (generationPrompt.length ? generate() : null)
            }}
          >
            arrow_upward
          </span>
        </div>
      </div>
    </div>
  );
}
