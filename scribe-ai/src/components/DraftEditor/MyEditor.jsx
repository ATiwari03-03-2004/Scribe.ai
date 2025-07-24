import { useCallback, useEffect, useRef, useState } from "react";
import { Editor, EditorState, RichUtils } from "draft-js";
import "draft-js/dist/Draft.css";
import ToolBar from "../ToolBar/ToolBar";
import "./MyEditor.css";

function MyEditor() {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const editorRef = useRef(null);
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (editorState.getCurrentContent().hasText() === false) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [editorState]);

  const onChange = useCallback((newEditorState) => {
    setEditorState(newEditorState);
  }, []);

  let customStyleMaps = {
    HIGHLIGHT: {
      backgroundColor: "yellow",
    },
    RED: {
      color: "red",
    },
    BLACK: {
      color: "black",
    },
    BLUE: {
      color: "blue",
    },
    GREEN: {
      color: "darkgreen",
    },
    PINK: {
      color: "deeppink",
    },
    YELLOW: {
      color: "yellow",
    },
    WHITE: {
      color: "white",
    },
    "DODGER-BLUE": {
      color: "dodgerblue",
    },
    ORANGE: {
      color: "orange",
    },
    "FOREST-GREEN": {
      color: "forestgreen",
    },
    GRAY: {
      color: "gray",
    },
  };

  let handleToggleInlineStyles = useCallback(
    (command) => {
      onChange(RichUtils.toggleInlineStyle(editorState, command));
    },
    [editorState, onChange]
  );

  let handleToggleBlockTypes = useCallback(
    (command) => {
      onChange(RichUtils.toggleBlockType(editorState, command));
    },
    [editorState, onChange]
  );

  const handleKeyCommand = useCallback(
    (command, editorState) => {
      console.log(command);
      let newState = RichUtils.handleKeyCommand(editorState, command);
      if (newState) {
        onChange(newState);
        return "handled";
      }
      return "not-handled";
    },
    [onchange]
  );

  function getPlaceholderForBlock(blockType) {
    switch (blockType) {
      case "header-one":
        return "Enter a heading...";
      case "blockquote":
        return "Quote something...";
      default:
        return "Type something...";
    }
  }

  return (
    <>
      <ToolBar
        handleToggleInlineStyles={handleToggleInlineStyles}
        currentInlineStyle={editorState.getCurrentInlineStyle()}
        handleToggleBlockTypes={handleToggleBlockTypes}
        currentBlockStyle={editorState
          .getCurrentContent()
          .getBlockForKey(editorState.getSelection().getStartKey())
          .getType()}
      />
      <div className="text-editor">
        <Editor
          customStyleMap={customStyleMaps}
          editorState={editorState}
          onChange={onChange}
          handleKeyCommand={handleKeyCommand}
          ref={editorRef}
          style={{ width: "100vw", height: "100%" }}
          placeholder="Type Something..."
        />
      </div>
    </>
  );
}

export default MyEditor;
