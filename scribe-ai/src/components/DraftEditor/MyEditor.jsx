import { useCallback, useEffect, useRef, useState } from "react";
import {
  Editor,
  Modifier,
  EditorState,
  SelectionState,
  RichUtils,
} from "draft-js";
import "draft-js/dist/Draft.css";
import "./MyEditor.css";
import decorator from "./CustomDecorators/Decorator";
import customBlockRenderer from "./CustomBlockRenderer/customBlockRenderer";
import Navbar from "../Navbar/Navbar";

function MyEditor() {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty(decorator)
  );

  // Speech to text states
  let [isRecognizing, setIsRecognizing] = useState(false);
  let [interimRecognizedText, setInterimRecognizedText] = useState("");
  let [finalRecognizedText, setFinalRecognizedText] = useState("");
  let [isFinal, setIsFinal] = useState(false);

  const updateCustomSpeechBlockText = (
    editorState,
    interim,
    final,
    isFinal
  ) => {
    const contentState = editorState.getCurrentContent();
    const blockMap = contentState.getBlockMap();

    const targetBlock = [...blockMap.values()]
      .reverse()
      .find((block) => block.getType() === "custom-speech-to-text");

    if (!targetBlock) return;

    const blockKey = targetBlock.getKey();
    const blockText = targetBlock.getText();
    const insertionPoint = blockText.length;

    const selection = SelectionState.createEmpty(blockKey).merge({
      anchorOffset: 0,
      focusOffset: insertionPoint,
    });

    const newText = isFinal ? final : final + interim;
    if (!newText) return;

    const newContent = Modifier.replaceText(contentState, selection, newText);
    const newEditorState = EditorState.push(
      editorState,
      newContent,
      "insert-characters"
    );
    onChange(newEditorState);
  };
  
  useEffect(() => {
    if (interimRecognizedText) {
      updateCustomSpeechBlockText(
        editorState,
        interimRecognizedText,
        finalRecognizedText,
        isFinal
      );
    }
  }, [interimRecognizedText, finalRecognizedText, isFinal]);

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
      let newState = RichUtils.handleKeyCommand(editorState, command);
      if (newState) {
        onChange(newState);
        return "handled";
      }
      return "not-handled";
    },
    [onChange]
  );

  let contentState = editorState.getCurrentContent();
  let firstBlock = contentState.getFirstBlock();
  let blockType = firstBlock.getType();
  let isEditorEmpty = contentState.hasText();

  return (
    <>
      <Navbar
        handleToggleInlineStyles={handleToggleInlineStyles}
        currentInlineStyle={editorState.getCurrentInlineStyle()}
        handleToggleBlockTypes={handleToggleBlockTypes}
        currentBlockStyle={editorState
          .getCurrentContent()
          .getBlockForKey(editorState.getSelection().getStartKey())
          .getType()}
        editorState={editorState}
        onChange={onChange}
        isRecognizing={isRecognizing}
        setIsRecognizing={setIsRecognizing}
        interimRecognizedText={interimRecognizedText}
        setInterimRecognizedText={setInterimRecognizedText}
        finalRecognizedText={finalRecognizedText}
        setFinalRecognizedText={setFinalRecognizedText}
        isFinal={isFinal}
        setIsFinal={setIsFinal}
      />
      <div className="text-editor">
        <Editor
          customStyleMap={customStyleMaps}
          editorState={editorState}
          onChange={onChange}
          handleKeyCommand={handleKeyCommand}
          ref={editorRef}
          style={{ width: "100vw", height: "100%" }}
          placeholder={
            !isEditorEmpty && blockType == "unstyled" ? "Type Something..." : ""
          }
          blockRendererFn={(block) =>
            customBlockRenderer(block, {
              interimRecognizedText,
              finalRecognizedText,
              isFinal,
            })
          }
        />
      </div>
    </>
  );
}

export default MyEditor;
