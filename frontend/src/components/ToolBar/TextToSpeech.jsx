import { useEffect, useState } from "react";

export default function TextToSpeech(props) {
  let [ttsSynth, setttsSynth] = useState(false);

  useEffect(() => {
    handleSpeech(props.editorState.getCurrentContent().getPlainText());
  }, [ttsSynth]);

  let handleSpeech = (text) => {
    if (ttsSynth) {
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
    } else {
      window.speechSynthesis.cancel();
    }
  };
  return (
    <button
      onMouseDown={(e) => e.preventDefault()}
      onClick={() => {
        setttsSynth((prev) => !prev);
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
