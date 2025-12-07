import { spellChecker } from "./en_US";
import { convertToRaw } from "draft-js";

export default function SpellChecker(props) {
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
  };

  return (
    <div>
      <button
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => checkSpelling()}
        title="Check Spelling"
        style={{ cursor: "pointer" }}
      >
        <span className="material-symbols-outlined">spellcheck</span>
      </button>
    </div>
  );
}
