import { spellChecker } from "../../ToolBar/CustomBlocks/en_US";
import { useEffect, useRef } from "react";

let checkSpelling = (contentBlock, callback, contentState) => {
  const regex = /\b\w+\b/g;
  const text = contentBlock.getText();
  let match, start;
  while ((match = regex.exec(text)) !== null) {
    if (!spellChecker.correct(match[0])) {
      start = match.index;
      callback(start, start + match[0].length);
    }
  }
};

const SpellingError = (props) => {
  let spanRef = useRef(null);

  let handleClick = (e) => {
    if (
      props.menuRef.current?.blockKey === props.prop.blockKey &&
      props.menuRef.current?.start === props.prop.start &&
      props.menuRef.current?.end === props.prop.end
    ) {
      props.setMenu(null);
    } else {
      props.setMenu({
        blockKey: props.prop.blockKey,
        start: props.prop.start,
        end: props.prop.end,
        suggestion: spellChecker.suggest(props.prop.decoratedText),
        ref: spanRef,
        incorrectWord: props.prop.decoratedText,
      });
    }
  };

  return (
    <span
      style={{ textDecoration: "1px wavy red underline" }}
      onClick={(e) => handleClick(e)}
      ref={spanRef}
    >
      {props.prop.children}
    </span>
  );
};

export { checkSpelling, SpellingError };
