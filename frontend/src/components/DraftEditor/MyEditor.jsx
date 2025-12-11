import { useCallback, useEffect, useRef, useState } from "react";
import { findLinkEntities, Link } from "./CustomDecorators/LinkDecorator";
import { spellChecker } from "../ToolBar/CustomBlocks/en_US.js";
import {
  checkSpelling,
  SpellingError,
} from "./CustomDecorators/SpellingErrorDecorator";
import { CompositeDecorator } from "draft-js";
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
import customBlockRenderer from "./CustomBlockRenderer/customBlockRenderer";
import Navbar from "../Navbar/Navbar";
import SideBar from "../SideBar/SideBar";
import { customStyleMaps } from "./custom";

function MyEditor() {
  let [menu, setMenu] = useState(null);
  let [isClose, setIsClose] = useState({ open: false, dropdown: "" });

  let handleDropDown = (dditem) => {
    setIsClose((prev) => {
      if (prev.open && dditem === "") {
        return { open: false, dropdown: "" };
      }
      if (prev.open && prev.dropdown === dditem) {
        return { open: false, dropdown: "" };
      }
      if (prev.open && prev.dropdown !== dditem && dditem.length) {
        return { open: true, dropdown: dditem };
      }
      return { open: true, dropdown: dditem };
    });
  };

  const menuRef = useRef(menu);
  useEffect(() => {
    menuRef.current = menu;
  }, [menu]);

  let replaceText = (start, end, blockKey, word) => {
    const contentState = editorState.getCurrentContent();
    const selection = SelectionState.createEmpty(blockKey).merge({
      anchorOffset: start,
      focusOffset: end,
    });
    const newContent = Modifier.replaceText(contentState, selection, word);
    const newState = EditorState.push(
      editorState,
      newContent,
      "correcting-spelling"
    );
    setEditorState(newState);
    setMenu(null);
  };

  const decorator = new CompositeDecorator([
    {
      strategy: findLinkEntities,
      component: Link,
    },
    {
      strategy: checkSpelling,
      component: (props) => {
        return (
          <SpellingError prop={props} setMenu={setMenu} menuRef={menuRef} />
        );
      },
    },
  ]);

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

  let blockStyleFn = useCallback((contentBlock) => {
    let type = contentBlock.getType();
    if (type === "Left") return "LEFT_ALIGN";
    if (type === "Center") return "CENTER_ALIGN";
    if (type === "Right") return "RIGHT_ALIGN";
    if (type === "Justify") return "JUSTIFY";
    const data = contentBlock.getData();
    if (data.get("textAlign") === "Left") return "LEFT_ALIGN";
    if (data.get("textAlign") === "Right") return "RIGHT_ALIGN";
    if (data.get("textAlign") === "Center") return "CENTER_ALIGN";
    if (data.get("textAlign") === "Justify") return "JUSTIFY";
    if (data.has("indent")) {
      const indentLevel = data.get("indent") || 0;
      return `indent-${indentLevel}`;
    }
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

  const handleKeyCmd = useCallback(
    (command, editorState) => {
      const selectionState = editorState.getSelection();
      const contentState = editorState.getCurrentContent();
      const blockKey = selectionState.getStartKey();
      const contentBlock = contentState.getBlockForKey(blockKey);
      const blockType = contentBlock.getType();
      if (
        command === "tab" &&
        (blockType === "unordered-list-item" ||
          blockType === "ordered-list-item")
      ) {
        const newEditorState = RichUtils.onTab(event, editorState, 4);
        if (newEditorState !== editorState) {
          onChange(newEditorState);
          return "handled";
        }
        return "not-handled";
      } else if (command === "tab") {
        const newContent = Modifier.insertText(
          contentState,
          selectionState,
          "\t",
          editorState.getCurrentInlineStyle()
        );
        onChange(
          EditorState.push(editorState, newContent, "insert-characters")
        );
        return "handled";
      }
      if (command === "backspace" || command === "delete") {
        const blockText = contentBlock.getText();
        if (blockText === "" && contentBlock.getData().has("textAlign")) {
          const newData = contentBlock.getData().remove("textAlign");
          const newContent = Modifier.setBlockData(
            contentState,
            selectionState,
            newData
          );
          onChange(
            EditorState.push(editorState, newContent, "change-block-data")
          );
          return "handled";
        }
        if (blockText === "" && contentBlock.getData().has("indent")) {
          const newData = contentBlock.getData().remove("indent");
          const newContent = Modifier.setBlockData(
            contentState,
            selectionState,
            newData
          );
          onChange(
            EditorState.push(editorState, newContent, "change-block-data")
          );
          return "handled";
        }
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
        isClose={isClose}
        handleDropDown={handleDropDown}
        setMenu={setMenu}
        displayVal={sideBarDisplay}
        display={setSideBarDisplay}
        handleToggleInlineStyles={handleToggleInlineStyles}
        currentInlineStyle={editorState.getCurrentInlineStyle()}
        handleToggleBlockTypes={handleToggleBlockTypes}
        currentBlockStyle={editorState
          .getCurrentContent()
          .getBlockForKey(editorState.getSelection().getStartKey())
          .getType()}
        currentBlockData={editorState
          .getCurrentContent()
          .getBlockForKey(editorState.getSelection().getStartKey())
          .getData()}
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
        editorRef={editorRef}
      />
      <div
        className="text-editor"
        style={{ display: "flex" }}
        onPaste={handleOnPaste}
        onMouseDown={(e) => {
          if (!e.target.closest(".spelling-error-span")) {
            setMenu(null);
          }
        }}
      >
        <div
          style={
            sideBarDisplay === "flex"
              ? { width: "76%", height: "100%" }
              : { width: "100%", height: "100%" }
          }
        >
          <Editor
            customStyleMap={customStyleMaps}
            editorState={editorState}
            onChange={onChange}
            handleKeyCommand={handleKeyCmd}
            keyBindingFn={handleTab}
            ref={editorRef}
            style={{ width: "100vw", height: "100%" }}
            editorStyle={
              sideBarDisplay === "flex" ? { width: "76%" } : { width: "100%" }
            }
            placeholder={
              !isEditorEmpty && blockType == "unstyled"
                ? "Type Something..."
                : ""
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
        </div>
      </div>
      <SideBar
        display={sideBarDisplay}
        displaySet={setSideBarDisplay}
        handleDropDown={handleDropDown}
      />
      {menu && (
        <div
          style={{
            position: "absolute",
            top:
              menu.ref.current.getBoundingClientRect().bottom +
              5 +
              window.scrollY,
            left:
              menu.ref.current.getBoundingClientRect().left + window.scrollX,
            border: "1px solid gray",
            borderRadius: "6px",
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {menu.suggestion.map((word, key) => (
            <button
              onClick={() =>
                replaceText(menu.start, menu.end, menu.blockKey, word)
              }
              style={{ cursor: "pointer" }}
              key={key}
            >
              <b>{word}</b>
            </button>
          ))}
          <button
            onClick={() => {
              spellChecker.add(menu.incorrectWord);
              replaceText(
                menu.start,
                menu.end,
                menu.blockKey,
                menu.incorrectWord
              );
            }}
            style={{ cursor: "pointer" }}
          >
            Ignore All
          </button>
          <button
            onClick={() => {
              spellChecker.add(menu.incorrectWord);
              replaceText(
                menu.start,
                menu.end,
                menu.blockKey,
                menu.incorrectWord
              );
            }}
            style={{ cursor: "pointer" }}
          >
            Add to Dictionary
          </button>
        </div>
      )}
    </>
  );
}

export default MyEditor;
