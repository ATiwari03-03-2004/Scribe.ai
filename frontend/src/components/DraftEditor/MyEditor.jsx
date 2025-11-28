import { useCallback, useEffect, useRef, useState } from "react";
import {
  Editor,
  Modifier,
  EditorState,
  SelectionState,
  AtomicBlockUtils,
  RichUtils,
  getDefaultKeyBinding,
} from "draft-js";
import "draft-js/dist/Draft.css";
import "./MyEditor.css";
import decorator from "./CustomDecorators/Decorator";
import customBlockRenderer from "./CustomBlockRenderer/customBlockRenderer";
import Navbar from "../Navbar/Navbar";
import SideBar from "../SideBar/SideBar";

function MyEditor() {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty(decorator)
  );

  let [sideBarDisplay, setSideBarDisplay] = useState("none");
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
    CRIMSON: {
      color: "#c90c52",
    },
    NEON: {
      color: "#07ede9",
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
    deepORANGE: {
      color: "#f2680c",
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
    PURPLE: {
      color: "#be04beff",
    },
    BROWN: {
      color: "#591713",
    },
    "LIGHT-GREEN": {
      color: "#19e679",
    },
    voilet: {
      color: "#680cad",
    },
    SUBSCRIPT: { verticalAlign: "sub", fontSize: "smaller" },
    SUPERSCRIPT: { verticalAlign: "super", fontSize: "smaller" },
    ARIAL: { fontFamily: "Arial, Helvetica, sans-serif" },
    HELVETICA: { fontFamily: "Helvetica, Arial, sans-serif" },
    VERDANA: { fontFamily: "Verdana, Geneva, sans-serif" },
    TAHOMA: { fontFamily: "Tahoma, Geneva, sans-serif" },
    TREBUCHET_MS: { fontFamily: "Trebuchet MS, Helvetica, sans-serif" },
    SEGOE_UI: { fontFamily: "Segoe UI, Tahoma, Geneva, sans-serif" },
    GENEVA: { fontFamily: "Geneva, Verdana, sans-serif" },
    TIMES_NEW_ROMAN: { fontFamily: "Times New Roman, Times, serif" },
    GEORGIA: { fontFamily: "Georgia, Times New Roman, serif" },
    PALATINO_LINOTYPE: { fontFamily: "Palatino Linotype, Palatino, serif" },
    BOOK_ANTIQUA: { fontFamily: "Book Antiqua, Palatino, serif" },
    GARAMOND: { fontFamily: "Garamond, Times New Roman, serif" },
    COURIER_NEW: { fontFamily: "Courier New, Courier, monospace" },
    LUCIDA_CONSOLE: { fontFamily: "Lucida Console, Monaco, monospace" },
    MONACO: { fontFamily: "Monaco, Lucida Console, monospace" },
    CONSOLAS: { fontFamily: "Consolas, Courier New, monospace" },
    COMIC_SANS_MS: { fontFamily: "Comic Sans MS, cursive, sans-serif" },
    BRUSH_SCRIPT_MT: { fontFamily: "Brush Script MT, cursive, sans-serif" },
    IMPACT: { fontFamily: "Impact, Charcoal, sans-serif" },
    FANTASY: { fontFamily: "Fantasy, Impact, Charcoal, sans-serif" },
    EIGHT: { fontSize: "8px", lineHeight: "12px" },
    NINE: { fontSize: "9px", lineHeight: "14px" },
    TEN: { fontSize: "10px", lineHeight: "15px" },
    ELEVEN: { fontSize: "11px", lineHeight: "16px" },
    TWELVE: { fontSize: "12px", lineHeight: "18px" },
    FOURTEEN: { fontSize: "14px", lineHeight: "21px" },
    SIXTEEN: { fontSize: "16px", lineHeight: "24px" },
    EIGHTEEN: { fontSize: "18px", lineHeight: "27px" },
    TWENTY: { fontSize: "20px", lineHeight: "30px" },
    TWENTYTWO: { fontSize: "22px", lineHeight: "33px" },
    TWENTYFOUR: { fontSize: "24px", lineHeight: "36px" },
    TWENTYEIGHT: { fontSize: "28px", lineHeight: "42px" },
    THIRTYSIX: { fontSize: "36px", lineHeight: "54px" },
    FORTYEIGHT: { fontSize: "48px", lineHeight: "72px" },
    SEVENTYTWO: { fontSize: "72px", lineHeight: "108px" },
  };

  let blockStyleFn = useCallback((contentBlock) => {
    let type = contentBlock.getType();
    if (type === "LEFT_ALIGN") return "LEFT_ALIGN";
    if (type === "CENTER_ALIGN") return "CENTER_ALIGN";
    if (type === "RIGHT_ALIGN") return "RIGHT_ALIGN";
    if (type === "JUSTIFY") return "JUSTIFY";
    return null;
  });

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
      if (command === "tab") {
        const newEditorState = RichUtils.onTab(event, editorState, 4);
        if (newEditorState !== editorState) {
          onChange(newEditorState);
          return "handled";
        }
        return "not-handled";
      }
      let newState = RichUtils.handleKeyCommand(editorState, command);
      if (newState) {
        onChange(newState);
        return "handled";
      }
      return "not-handled";
    },
    [onChange, editorState]
  );

  let contentState = editorState.getCurrentContent();
  let firstBlock = contentState.getFirstBlock();
  let blockType = firstBlock.getType();
  let isEditorEmpty = contentState.hasText();

  let handleImageURLEmbed = (URL) => {
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      "IMAGE",
      "IMMUTABLE",
      { src: URL }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = AtomicBlockUtils.insertAtomicBlock(
      editorState,
      entityKey,
      " "
    );
    onChange(newEditorState);
  };

  let handleOnPaste = (e) => {
    if (
      e.clipboardData.files.length &&
      e.clipboardData.files[0].type.startsWith("image/")
    ) {
      let base64String = "";
      let reader = new FileReader();
      reader.onload = function () {
        base64String = reader.result;
        if (base64String) handleImageURLEmbed(base64String);
      };
      reader.onerror = function () {
        alert("Something went wrong with Image embeding!");
      };
      reader.readAsDataURL(e.clipboardData.files[0]);
    }
  };

  let handleTab = useCallback((e) => {
    if (e.keyCode === 9) {
      return "tab";
    }
    return getDefaultKeyBinding(e);
  }, []);

  return (
    <>
      <Navbar
        display={setSideBarDisplay}
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
      <div
        className="text-editor"
        style={{ display: "flex" }}
        onPaste={handleOnPaste}
      >
        <Editor
          customStyleMap={customStyleMaps}
          editorState={editorState}
          onChange={onChange}
          handleKeyCommand={handleKeyCommand}
          keyBindingFn={handleTab}
          ref={editorRef}
          style={{ width: "100vw", height: "100%" }}
          placeholder={
            !isEditorEmpty && blockType == "unstyled" ? "Type Something..." : ""
          }
          blockStyleFn={blockStyleFn}
          blockRendererFn={(block) =>
            customBlockRenderer(block, {
              interimRecognizedText,
              finalRecognizedText,
              isFinal,
            })
          }
        />
        <SideBar display={sideBarDisplay} displaySet={setSideBarDisplay} />
      </div>
    </>
  );
}

export default MyEditor;
