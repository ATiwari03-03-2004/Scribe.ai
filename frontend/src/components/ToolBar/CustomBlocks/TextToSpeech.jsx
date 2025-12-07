import { useEffect, useState } from "react";

export default function TextToSpeech(props) {
  let [ttsSynth, setttsSynth] = useState(false);

  let handleSpeech = (text) => {
    if (!ttsSynth) {
      setttsSynth(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-IN";
      utterance.pitch = 1.5;
      utterance.rate = 0.8;
      utterance.volume = 1;
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        utterance.voice = voices[0];
      }
      window.speechSynthesis.speak(utterance);
      utterance.onend = () => {
        alert("Synthesis finished!");
        setttsSynth(false);
      };
      utterance.onerror = (event) => {
        if (event.error === "not-allowed") {
          alert("Permission to synthesis is not allowed.");
        } else if (event.error === "interrupted") {
          alert("Synthesis cancelled!");
        } else {
          alert("Speech recognition error " + event.error);
        }
        console.log("Text Synthesis error: ", event.error);
        setttsSynth(false);
      };
    } else {
      setttsSynth(false);
      window.speechSynthesis.cancel();
    }
  };
  return (
    <button
      onMouseDown={(e) => e.preventDefault()}
      onClick={() => {
        handleSpeech(props.editorState.getCurrentContent().getPlainText());
      }}
      title="Text To Speech"
      style={
        ttsSynth
          ? {
              backgroundColor: "#ef2f32ff",
              color: "black",
              border: "1px solid gray",
              transition: "background-color 0.5s ease-in-out 0.1s",
              cursor: "pointer",
            }
          : { cursor: "pointer" }
      }
    >
      <span className="material-symbols-outlined">text_to_speech</span>
    </button>
  );
}
