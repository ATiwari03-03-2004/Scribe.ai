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

  return (
    <>
      <ToolBar
        handleToggleInlineStyles={handleToggleInlineStyles}
        handleToggleBlockTypes={handleToggleBlockTypes}
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
