import { useState, useEffect } from "react";
import { SpeechRecognition, recognition } from "./language";
import LanguageSelector from "../../Modal/LanguageSelector";
import { EditorState, ContentBlock, genKey } from "draft-js";

export default function SpeechToText(props) {
  let [modalDisplay, setModalDisplay] = useState(false);
  let [language, setLanguage] = useState("English");
  let [languageCode, setLanguageCode] = useState("en-US");

  useEffect(() => {
    if (modalDisplay) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [modalDisplay]);

  let startRecognition = () => {
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event) => {
      let interimTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const result = event.results[i];
        interimTranscript += result[0].transcript;
        if (!result.isFinal) {
          props.setInterimRecognizedText(interimTranscript);
          props.setIsFinal(false);
        } else {
          props.setIsFinal(true);
          props.setFinalRecognizedText((prev) => prev + interimTranscript);
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
      console.log("Speech recognition error: ", event.error);
      props.setIsRecognizing(false);
      props.setIsRecognizing(false);
      props.setInterimRecognizedText("");
      props.setFinalRecognizedText("");
      props.setIsFinal(false);
      recognition.stop();
    };

    recognition.onend = (event) => {
      alert("Recognition finished!");
      props.setIsRecognizing(false);
      props.setInterimRecognizedText("");
      props.setFinalRecognizedText("");
      props.setIsFinal(false);
    };

    recognition.start();
  };

  let stopRecognition = () => {
    recognition.stop();
    props.setIsRecognizing(false);
    props.setIsRecognizing(false);
    props.setInterimRecognizedText("");
    props.setFinalRecognizedText("");
    props.setIsFinal(false);
  };

  let insertBlock = () => {
    const contentState = props.editorState.getCurrentContent();
    const selectionState = props.editorState.getSelection();
    const blockKey = genKey();
    const newBlock = new ContentBlock({
      key: blockKey,
      type: "custom-speech-to-text",
      text: "Listening...",
    });
    const blockMap = contentState.getBlockMap();
    const blocksBefore = blockMap
      .toSeq()
      .takeUntil((v) => v.getKey() === selectionState.getStartKey());
    const blocksAfter = blockMap
      .toSeq()
      .skipUntil((v) => v.getKey() === selectionState.getStartKey())
      .rest();
    const newBlocks = blocksBefore
      .concat(
        [
          [
            selectionState.getStartKey(),
            blockMap.get(selectionState.getStartKey()),
          ],
        ],
        [[newBlock.getKey(), newBlock]],
        blocksAfter
      )
      .toOrderedMap();
    const newContentState = contentState.merge({
      blockMap: newBlocks,
      selectionAfter: selectionState,
    });
    let newEditorState = EditorState.push(
      props.editorState,
      newContentState,
      "change-block-type"
    );
    props.onChange(newEditorState);
  };

  return (
    <>
      {modalDisplay ? (
        <LanguageSelector
          language={language}
          languageCode={languageCode}
          setLanguage={setLanguage}
          setLanguageCode={setLanguageCode}
          setIsRecognizing={props.setIsRecognizing}
          startRecognition={startRecognition}
          setModalDisplay={setModalDisplay}
          insertBlock={insertBlock}
        />
      ) : null}
      {SpeechRecognition ? (
        <>
          <button
            onMouseDown={(e) => e.preventDefault()}
            style={
              props.isRecognizing
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
            {props.isRecognizing ? (
              <>
                <span
                  title="Stop Recognition"
                  className="material-symbols-outlined"
                  onClick={() => stopRecognition(true)}
                >
                  mic_off
                </span>
              </>
            ) : (
              <span
                title="Speech To Text"
                className="material-symbols-outlined"
                onClick={() => setModalDisplay(true)}
              >
                speech_to_text
              </span>
            )}
          </button>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
