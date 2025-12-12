import { spellChecker } from "./en_US";
import { convertToRaw } from "draft-js";
import { useRef, useState } from "react";
import DropDown from "../../DropDown/DropDown";

export default function SpellChecker(props) {
  let [error, setError] = useState(null);
  let buttonref = useRef(null);

  let checkSpelling = () => {
    let contentState = props.editorState.getCurrentContent();
    const raw = convertToRaw(contentState);
    const results = [];
    raw.blocks.forEach((block) => {
      const { key, text } = block;
      const wordRegex = /\b\w+\b/g;
      let match;
      while ((match = wordRegex.exec(text)) !== null) {
        if (!spellChecker.correct(match[0])) {
          results.push({
            blockKey: key,
            word: match[0],
            suggestion: spellChecker.suggest(match[0]),
            start: match.index,
            end: match.index + match[0].length,
          });
        }
      }
    });
    setError(results);
  };

  return (
    <>
      <button
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => {
          if (
            props.isClose.open &&
            props.isClose.dropdown !== "error-suggestions"
          )
            props.handleDropDown("error-suggestions");
          else if (
            props.isClose.open &&
            props.isClose.dropdown === "error-suggestions"
          )
            checkSpelling();
          else {
            props.setMenu(null);
            props.handleDropDown("error-suggestions");
            checkSpelling();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
        }}
        title="Check Spelling"
        style={{ cursor: "pointer" }}
        ref={buttonref}
      >
        <span className="material-symbols-outlined">spellcheck</span>
      </button>
      {props.isClose.open && props.isClose.dropdown === "error-suggestions" ? (
        <DropDown
          isClose={props.isClose}
          handleDropDown={props.handleDropDown}
          error={error}
          setError={setError}
          buttonref={buttonref}
          editorState={props.editorState}
          onChange={props.onChange}
          setMenu={props.setMenu}
        />
      ) : null}
    </>
  );
}
