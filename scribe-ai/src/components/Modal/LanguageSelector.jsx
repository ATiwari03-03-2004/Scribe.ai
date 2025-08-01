import { useState, useEffect } from "react";
import { langs, langsObj, recognition } from "../ToolBar/language";
import '../Modal/Modal.css';

export default function LanguageSelector(props) {
  let [accent, setAccent] = useState("United States");

  useEffect(() => {
    if (langsObj[props.language].length == 1) {
      props.setLanguageCode(langsObj[props.language][0]);
      setAccent("");
    } else {
      props.setLanguageCode(langsObj[props.language][0][0]);
      setAccent(langsObj[props.language][0][1]);
    }
  }, [props.language]);

  let startRecognition = () => {
    recognition.lang = props.languageCode;
    props.setIsRecognizing(true);
    props.startRecognition();
    props.setModalDisplay(false);
    props.insertBlock();
  };

  let close = () => {
    props.setModalDisplay(false);
  };

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        height: "100vh",
        width: "100vw",
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <div className="close-btn" onClick={close} title="Close">
        <span className="material-symbols-outlined">close</span>
      </div>
      <h2>
        Language: {props.language}{" "}
        {accent.length ? <>| Accent: {accent}</> : null}
      </h2>
      <div>
        <select
          name="language"
          value={props.language}
          onChange={(e) => {
            props.setLanguage(e.target.value);
          }}
          id="recognitionLanguage"
          title="Select language"
          style={{
            padding: "0.25rem",
            borderRadius: "8px",
            border: "1px solid #ccc",
            backgroundColor: "#f9f9f9",
            color: "#333",
            fontSize: "1rem",
            outline: "none",
            cursor: "pointer",
            height: "3rem",
          }}
        >
          {langs.map((element, i) => {
            return (
              <option key={i} value={element}>
                {element}
              </option>
            );
          })}
        </select>
        {langsObj[props.language].length != 1 ? (
          <select
            name="language_accent"
            onChange={(e) => {
              let value = e.target.value;
              let spaceIdx = value.indexOf(" ");
              props.setLanguageCode(value.substring(0, spaceIdx));
              setAccent(value.substring(spaceIdx + 1));
            }}
            style={{
              borderRadius: "8px",
              border: "1px solid #ccc",
              backgroundColor: "#f9f9f9",
              color: "#333",
              fontSize: "1rem",
              outline: "none",
              cursor: "pointer",
              height: "3rem",
              marginLeft: "0.5rem",
            }}
            id="recognitionLanguageAccent"
            title="Select language accent"
          >
            {langsObj[props.language].map((element, i) => {
              if (i == 0)
                return (
                  <option
                    key={i}
                    value={element[0] + " " + element[1]}
                    defaultChecked
                  >
                    {element[1]}
                  </option>
                );
              else
                return (
                  <option key={i} value={element[0] + " " + element[1]}>
                    {element[1]}
                  </option>
                );
            })}
          </select>
        ) : null}
      </div>
      <button
        style={{
          backgroundColor: "#4a90e2",
          color: "white",
          border: "none",
          padding: "10px 16px",
          borderRadius: "6px",
          cursor: "pointer",
          fontSize: "16px",
          marginTop: "1rem",
        }}
        onClick={startRecognition}
      >
        Start Recognition
      </button>
    </div>
  );
}
