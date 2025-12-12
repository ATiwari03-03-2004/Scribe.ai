import { useEffect, useState } from "react";
import ToggleColor from "../ToolBar/ToggleInlineStyle/ToggleColor";
import EditorState from "draft-js/lib/EditorState";
import { RichUtils, SelectionState, Modifier } from "draft-js";
import "./DropDown.css";
import { Rnd } from "react-rnd";
import { spellChecker } from "../ToolBar/CustomBlocks/en_US";

const fonts = [
  { key: "FONT-ARIAL", name: "Arial", style: "Arial, Helvetica, sans-serif" },
  {
    key: "FONT-HELVETICA",
    name: "Helvetica",
    style: "Helvetica, Arial, sans-serif",
  },
  {
    key: "FONT-VERDANA",
    name: "Verdana",
    style: "Verdana, Geneva, sans-serif",
  },
  { key: "FONT-TAHOMA", name: "Tahoma", style: "Tahoma, Geneva, sans-serif" },
  {
    key: "FONT-TREBUCHET_MS",
    name: "Trebuchet MS",
    style: "Trebuchet MS, Helvetica, sans-serif",
  },
  {
    key: "FONT-SEGOE_UI",
    name: "Segoe UI",
    style: "Segoe UI, Tahoma, Geneva, sans-serif",
  },
  {
    key: "FONT-GENEVA",
    name: "Geneva",
    style: "Geneva, Verdana, sans-serif",
  },
  {
    key: "FONT-TIMES_NEW_ROMAN",
    name: "Times New Roman",
    style: "Times New Roman, Times, serif",
  },
  {
    key: "FONT-GEORGIA",
    name: "Georgia",
    style: "Georgia, Times New Roman, serif",
  },
  {
    key: "FONT-PALATINO_LINOTYPE",
    name: "Palatino Linotype",
    style: "Palatino Linotype, Palatino, serif",
  },
  {
    key: "FONT-BOOK_ANTIQUA",
    name: "Book Antiqua",
    style: "Book Antiqua, Palatino, serif",
  },
  {
    key: "FONT-GARAMOND",
    name: "Garamond",
    style: "Garamond, Times New Roman, serif",
  },
  {
    key: "FONT-COURIER_NEW",
    name: "Courier New",
    style: "Courier New, Courier, monospace",
  },
  {
    key: "FONT-LUCIDA_CONSOLE",
    name: "Lucida Console",
    style: "Lucida Console, Monaco, monospace",
  },
  {
    key: "FONT-MONACO",
    name: "Monaco",
    style: "Monaco, Lucida Console, monospace",
  },
  {
    key: "FONT-CONSOLAS",
    name: "Consolas",
    style: "Consolas, Courier New, monospace",
  },
  {
    key: "FONT-COMIC_SANS_MS",
    name: "Comic Sans MS",
    style: "Comic Sans MS, cursive, sans-serif",
  },
  {
    key: "FONT-BRUSH_SCRIPT_MT",
    name: "Brush Script MT",
    style: "Brush Script MT, cursive, sans-serif",
  },
  {
    key: "FONT-IMPACT",
    name: "Impact",
    style: "Impact, Charcoal, sans-serif",
  },
  {
    key: "FONT-FANTASY",
    name: "Fantasy",
    style: "Fantasy, cursive, sans-serif",
  },
];

const colorOptions = [
  { cmd: "COLOR-BLACK", bgColor: "#000000" },
  { cmd: "COLOR-CHARCOAL", bgColor: "#404040" },
  { cmd: "COLOR-GRAY", bgColor: "#808080" },
  { cmd: "COLOR-SILVER-GRAY", bgColor: "#999999" },
  { cmd: "COLOR-LIGHT-GRAY", bgColor: "#B3B3B3" },
  { cmd: "COLOR-SILVER", bgColor: "#CCCCCC" },
  { cmd: "COLOR-GAINSBORO", bgColor: "#D9D9D9" },
  { cmd: "COLOR-PLATINUM", bgColor: "#E6E6E6" },
  { cmd: "COLOR-WHITE-SMOKE", bgColor: "#F2F2F2" },
  { cmd: "COLOR-WHITE", bgColor: "#FFFFFF" },
  { cmd: "COLOR-RED", bgColor: "#CC0000" },
  { cmd: "COLOR-BRIGHT-RED", bgColor: "#FF0000" },
  { cmd: "COLOR-ORANGE", bgColor: "#FF9900" },
  { cmd: "COLOR-YELLOW", bgColor: "#FFFF00" },
  { cmd: "COLOR-LIME", bgColor: "#00FF00" },
  { cmd: "COLOR-CYAN", bgColor: "#00FFFF" },
  { cmd: "COLOR-SKY-BLUE", bgColor: "#0099FF" },
  { cmd: "COLOR-BLUE", bgColor: "#0000FF" },
  { cmd: "COLOR-VIOLET", bgColor: "#CC00FF" },
  { cmd: "COLOR-MAGENTA", bgColor: "#FF00FF" },
  { cmd: "COLOR-PALE-PINK", bgColor: "#FFCCCC" },
  { cmd: "COLOR-LIGHT-PINK", bgColor: "#FFB3CC" },
  { cmd: "COLOR-PEACH", bgColor: "#FFE6CC" },
  { cmd: "COLOR-CREAM", bgColor: "#FFFFCC" },
  { cmd: "COLOR-MINT-CREAM", bgColor: "#CCFFCC" },
  { cmd: "COLOR-POWDER-BLUE", bgColor: "#CCE6E6" },
  { cmd: "COLOR-ALICE-BLUE", bgColor: "#CCE6FF" },
  { cmd: "COLOR-LAVENDER", bgColor: "#CCCCFF" },
  { cmd: "COLOR-THISTLE", bgColor: "#E6CCFF" },
  { cmd: "COLOR-PINK-LACE", bgColor: "#FFCCFF" },
  { cmd: "COLOR-ROSY-BROWN", bgColor: "#CC9999" },
  { cmd: "COLOR-MAUVE", bgColor: "#CC6699" },
  { cmd: "COLOR-APRICOT", bgColor: "#FFCC99" },
  { cmd: "COLOR-LIGHT-YELLOW", bgColor: "#FFFF99" },
  { cmd: "COLOR-DARK-SEA-GREEN", bgColor: "#99CC99" },
  { cmd: "COLOR-CADET-BLUE", bgColor: "#99CCCC" },
  { cmd: "COLOR-CORNFLOWER", bgColor: "#99CCFF" },
  { cmd: "COLOR-BLUE-BELL", bgColor: "#9999CC" },
  { cmd: "COLOR-PLUM", bgColor: "#CC99CC" },
  { cmd: "COLOR-KOBI", bgColor: "#CC99BB" },
  { cmd: "COLOR-COPPER-ROSE", bgColor: "#996666" },
  { cmd: "COLOR-CERISE", bgColor: "#CC3366" },
  { cmd: "COLOR-PERU", bgColor: "#CC9933" },
  { cmd: "COLOR-BRASS", bgColor: "#CCCC33" },
  { cmd: "COLOR-FERN-GREEN", bgColor: "#669966" },
  { cmd: "COLOR-TEAL", bgColor: "#339999" },
  { cmd: "COLOR-DENIM", bgColor: "#3366CC" },
  { cmd: "COLOR-SAPPHIRE", bgColor: "#333399" },
  { cmd: "COLOR-REBECCA-PURPLE", bgColor: "#663399" },
  { cmd: "COLOR-ROYAL-PURPLE", bgColor: "#993399" },
  { cmd: "COLOR-DARK-BROWN", bgColor: "#663333" },
  { cmd: "COLOR-BURGUNDY", bgColor: "#990033" },
  { cmd: "COLOR-BRONZE", bgColor: "#996600" },
  { cmd: "COLOR-OLIVE", bgColor: "#999900" },
  { cmd: "COLOR-HUNTER-GREEN", bgColor: "#336633" },
  { cmd: "COLOR-DARK-CYAN", bgColor: "#006666" },
  { cmd: "COLOR-PRUSSIAN-BLUE", bgColor: "#003366" },
  { cmd: "COLOR-NAVY", bgColor: "#000066" },
  { cmd: "COLOR-INDIGO", bgColor: "#330066" },
  { cmd: "COLOR-DARK-PURPLE", bgColor: "#660066" },
];

let highlightColorOptions = [
  { cmd: "HIGHLIGHT-BLACK", bgColor: "#000000" },
  { cmd: "HIGHLIGHT-CHARCOAL", bgColor: "#404040" },
  { cmd: "HIGHLIGHT-GRAY", bgColor: "#808080" },
  { cmd: "HIGHLIGHT-SILVER-GRAY", bgColor: "#999999" },
  { cmd: "HIGHLIGHT-LIGHT-GRAY", bgColor: "#B3B3B3" },
  { cmd: "HIGHLIGHT-SILVER", bgColor: "#CCCCCC" },
  { cmd: "HIGHLIGHT-GAINSBORO", bgColor: "#D9D9D9" },
  { cmd: "HIGHLIGHT-PLATINUM", bgColor: "#E6E6E6" },
  { cmd: "HIGHLIGHT-WHITE-SMOKE", bgColor: "#F2F2F2" },
  { cmd: "HIGHLIGHT-WHITE", bgColor: "#FFFFFF" },
  { cmd: "HIGHLIGHT-RED", bgColor: "#CC0000" },
  { cmd: "HIGHLIGHT-BRIGHT-RED", bgColor: "#FF0000" },
  { cmd: "HIGHLIGHT-ORANGE", bgColor: "#FF9900" },
  { cmd: "HIGHLIGHT-YELLOW", bgColor: "#FFFF00" },
  { cmd: "HIGHLIGHT-LIME", bgColor: "#00FF00" },
  { cmd: "HIGHLIGHT-CYAN", bgColor: "#00FFFF" },
  { cmd: "HIGHLIGHT-SKY-BLUE", bgColor: "#0099FF" },
  { cmd: "HIGHLIGHT-BLUE", bgColor: "#0000FF" },
  { cmd: "HIGHLIGHT-VIOLET", bgColor: "#CC00FF" },
  { cmd: "HIGHLIGHT-MAGENTA", bgColor: "#FF00FF" },
  { cmd: "HIGHLIGHT-PALE-PINK", bgColor: "#FFCCCC" },
  { cmd: "HIGHLIGHT-LIGHT-PINK", bgColor: "#FFB3CC" },
  { cmd: "HIGHLIGHT-PEACH", bgColor: "#FFE6CC" },
  { cmd: "HIGHLIGHT-CREAM", bgColor: "#FFFFCC" },
  { cmd: "HIGHLIGHT-MINT-CREAM", bgColor: "#CCFFCC" },
  { cmd: "HIGHLIGHT-POWDER-BLUE", bgColor: "#CCE6E6" },
  { cmd: "HIGHLIGHT-ALICE-BLUE", bgColor: "#CCE6FF" },
  { cmd: "HIGHLIGHT-LAVENDER", bgColor: "#CCCCFF" },
  { cmd: "HIGHLIGHT-THISTLE", bgColor: "#E6CCFF" },
  { cmd: "HIGHLIGHT-PINK-LACE", bgColor: "#FFCCFF" },
  { cmd: "HIGHLIGHT-ROSY-BROWN", bgColor: "#CC9999" },
  { cmd: "HIGHLIGHT-MAUVE", bgColor: "#CC6699" },
  { cmd: "HIGHLIGHT-APRICOT", bgColor: "#FFCC99" },
  { cmd: "HIGHLIGHT-LIGHT-YELLOW", bgColor: "#FFFF99" },
  { cmd: "HIGHLIGHT-DARK-SEA-GREEN", bgColor: "#99CC99" },
  { cmd: "HIGHLIGHT-CADET-BLUE", bgColor: "#99CCCC" },
  { cmd: "HIGHLIGHT-CORNFLOWER", bgColor: "#99CCFF" },
  { cmd: "HIGHLIGHT-BLUE-BELL", bgColor: "#9999CC" },
  { cmd: "HIGHLIGHT-PLUM", bgColor: "#CC99CC" },
  { cmd: "HIGHLIGHT-KOBI", bgColor: "#CC99BB" },
  { cmd: "HIGHLIGHT-COPPER-ROSE", bgColor: "#996666" },
  { cmd: "HIGHLIGHT-CERISE", bgColor: "#CC3366" },
  { cmd: "HIGHLIGHT-PERU", bgColor: "#CC9933" },
  { cmd: "HIGHLIGHT-BRASS", bgColor: "#CCCC33" },
  { cmd: "HIGHLIGHT-FERN-GREEN", bgColor: "#669966" },
  { cmd: "HIGHLIGHT-TEAL", bgColor: "#339999" },
  { cmd: "HIGHLIGHT-DENIM", bgColor: "#3366CC" },
  { cmd: "HIGHLIGHT-SAPPHIRE", bgColor: "#333399" },
  { cmd: "HIGHLIGHT-REBECCA-PURPLE", bgColor: "#663399" },
  { cmd: "HIGHLIGHT-ROYAL-PURPLE", bgColor: "#993399" },
  { cmd: "HIGHLIGHT-DARK-BROWN", bgColor: "#663333" },
  { cmd: "HIGHLIGHT-BURGUNDY", bgColor: "#990033" },
  { cmd: "HIGHLIGHT-BRONZE", bgColor: "#996600" },
  { cmd: "HIGHLIGHT-OLIVE", bgColor: "#999900" },
  { cmd: "HIGHLIGHT-HUNTER-GREEN", bgColor: "#336633" },
  { cmd: "HIGHLIGHT-DARK-CYAN", bgColor: "#006666" },
  { cmd: "HIGHLIGHT-PRUSSIAN-BLUE", bgColor: "#003366" },
  { cmd: "HIGHLIGHT-NAVY", bgColor: "#000066" },
  { cmd: "HIGHLIGHT-INDIGO", bgColor: "#330066" },
  { cmd: "HIGHLIGHT-DARK-PURPLE", bgColor: "#660066" },
];

export default function DropDown(props) {
  let [positions, setPositions] = useState({ left: "", top: "" });
  let [errorIdx, setErrorIdx] = useState({ idx: 0 });
  let [matchIdx, setMatchIdx] = useState({ idx: 0 });
  let [addWord, setAddWord] = useState("");
  const [state, setState] = useState({
    width: 200,
    height: 200,
    x: 0,
    y: 0,
  });
  const [state1, setState1] = useState({
    width: 500,
    height: 200,
    x: 0,
    y: 0,
  });

  let highlightText = (blockKey, start, end) => {
    const selection = SelectionState.createEmpty(blockKey).merge({
      anchorOffset: start,
      focusOffset: end,
    });
    const newEditorState = EditorState.forceSelection(
      props.editorState,
      selection
    );
    props.onChange(newEditorState);
    const blockElement = document.querySelector(
      `[data-offset-key="${blockKey}-0-0"]`
    );
    const blockParent = blockElement.closest('[data-block="true"]');
    blockParent.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  let replaceText = (start, end, blockKey, newWord, oldWord) => {
    const contentState = props.editorState.getCurrentContent();
    const selection = SelectionState.createEmpty(blockKey).merge({
      anchorOffset: start,
      focusOffset: end,
    });
    const newContent = Modifier.replaceText(contentState, selection, newWord);
    const newState = EditorState.push(
      props.editorState,
      newContent,
      "replacing-word(s)"
    );
    props.onChange(newState);
    let err = [...props.error];
    if (newWord.length !== oldWord.length) {
      let diff = newWord.length - oldWord.length;
      for (
        let i = errorIdx.idx + 1;
        i < err.length && err[i].blockKey === blockKey;
        i++
      ) {
        err[i].start += diff;
        err[i].end += diff;
      }
    }
    err.splice(errorIdx.idx, 1);
    if (err.length === 0) {
      setErrorIdx({ idx: 0 });
    } else if (errorIdx.idx === err.length) {
      setErrorIdx((prev) => {
        return { idx: prev.idx - 1 };
      });
    } else {
      setErrorIdx((prev) => {
        return { idx: prev.idx };
      });
    }
  };

  useEffect(() => {
    if (props.error && props.error.length > 0) {
      highlightText(
        props.error[errorIdx.idx].blockKey,
        props.error[errorIdx.idx].start,
        props.error[errorIdx.idx].end
      );
    }
  }, [errorIdx]);

  useEffect(() => {
    if (props.state) {
      if (props.state.matches && props.state.matches.length > 0) {
        highlightText(
          props.state.matches[matchIdx.idx].blockKey,
          props.state.matches[matchIdx.idx].start,
          props.state.matches[matchIdx.idx].end
        );
      }
    }
  }, [props.state, matchIdx]);

  let handleFont = (key, name) => {
    let newState = props.editorState;
    props.activeStatus._map._map._root?.entries.forEach((entry) => {
      if (entry[0].startsWith("FONT-")) {
        newState = RichUtils.toggleInlineStyle(newState, entry[0]);
      }
    });
    newState = RichUtils.toggleInlineStyle(newState, key);
    props.onChange(newState);
    props.setFont(name);
    props.handleDropDown("");
  };

  let handleFontSize = (key, name) => {
    let newState = props.editorState;
    props.activeStatus._map._map._root?.entries.forEach((entry) => {
      if (entry[0].startsWith("FONTSIZE-")) {
        newState = RichUtils.toggleInlineStyle(newState, entry[0]);
      }
    });
    newState = RichUtils.toggleInlineStyle(newState, key);
    props.onChange(newState);
    props.setFontSize(name);
    props.handleDropDown("");
  };

  let handleAlignment = (alignment) => {
    const selection = props.editorState.getSelection();
    const contentState = props.editorState.getCurrentContent();
    const blockKey = selection.getStartKey();
    const block = contentState.getBlockForKey(blockKey);
    if (!block.getType().startsWith("header-")) {
      props.handleToggleBlockTypes(alignment);
    } else {
      const newData = block.getData().merge({ textAlign: alignment });
      const newBlock = block.merge({ data: newData });
      const newContentState = contentState.merge({
        blockMap: contentState.getBlockMap().set(blockKey, newBlock),
      });
      props.onChange(
        EditorState.push(
          props.editorState,
          newContentState,
          "changed-block-data"
        )
      );
    }
    if (alignment === "Left") {
      props.setAlignmentType("format_align_left");
    } else if (alignment === "Right") {
      props.setAlignmentType("format_align_right");
    } else if (alignment === "Center") {
      props.setAlignmentType("format_align_center");
    } else {
      props.setAlignmentType("format_align_justify");
    }
    props.handleDropDown("alignment");
  };

  useEffect(() => {
    if (props.isClose.open && props.buttonref) {
      setPositions((prev) => {
        return {
          left:
            props.buttonref.current.getBoundingClientRect().left +
            window.scrollX,
          top:
            props.buttonref.current.getBoundingClientRect().bottom +
            window.scrollY,
        };
      });
    }
  }, [props.isClose, props.buttonref]);

  return (
    <>
      {!props.isClose.open ? null : props.isClose.dropdown === "image" ? (
        <div
          className="DD"
          style={{
            position: "absolute",
            left: `${positions.left}px`,
            top: `${positions.top}px`,
            width: "5.5rem",
            boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.5)",
            borderRadius: "0.25rem",
          }}
        >
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => props.handleImageURL()}
            style={{
              cursor: "pointer",
              width: "5.6rem",
              border: "1px solid gray",
            }}
          >
            Embed URL
          </button>
          <br />
          <label
            htmlFor="img"
            className="DDItem"
            style={{
              cursor: "pointer",
              width: "5.5rem",
              backgroundColor: "rgb(240, 240, 240)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              border: "1px solid gray",
            }}
          >
            Choose File
          </label>
          <input
            type="file"
            name="img"
            id="img"
            accept="image/*"
            onChange={props.handleImageFile}
            style={{ display: "none" }}
          />
        </div>
      ) : props.isClose.dropdown === "font" ? (
        <div
          style={{
            position: "absolute",
            left: `${positions.left}px`,
            top: `${positions.top}px`,
            display: "flex",
            flexDirection: "column",
            width: "12.3rem",
            boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.5)",
            borderRadius: "0.25rem",
          }}
          className="DD"
        >
          {fonts.map((font) => (
            <button
              key={font.key}
              className="font"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                handleFont(font.key, font.name);
              }}
              style={{
                cursor: "pointer",
                fontFamily: font.style,
              }}
            >
              {font.name}
            </button>
          ))}
        </div>
      ) : props.isClose.dropdown === "font-size" ? (
        <div
          style={{
            position: "absolute",
            left: `${positions.left}px`,
            top: `${positions.top}px`,
            display: "flex",
            flexDirection: "column",
            width: "4.8rem",
            boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.5)",
            borderRadius: "0.25rem",
          }}
          className="DD"
        >
          {props.fontSizes.map((fontSize) => (
            <button
              key={fontSize.key}
              className="font-size"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                handleFontSize(fontSize.key, fontSize.name);
              }}
              style={{
                cursor: "pointer",
              }}
            >
              {fontSize.name}
            </button>
          ))}
        </div>
      ) : props.isClose.dropdown === "text_color" ? (
        <div
          className="pallete_dd"
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "baseline",
            width: "14rem",
            position: "absolute",
            left: `${positions.left}px`,
            top: `${positions.top}px`,
            backgroundColor: "white",
            padding: "0.75rem",
            boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.5)",
            borderRadius: "0.25rem",
          }}
        >
          {colorOptions.map((colorOption, key) => (
            <ToggleColor
              handleToggleInlineStyles={props.handleToggleInlineStyles}
              handleDropDown={props.handleDropDown}
              key={key}
              cmd={colorOption.cmd}
              bgColor={colorOption.bgColor}
              activeColor={props.activeColor}
              activeStatus={props.activeStatus}
              editorState={props.editorState}
              onChange={props.onChange}
              close={"text_color"}
            />
          ))}
        </div>
      ) : props.isClose.dropdown === "highlighter_color" ? (
        <div
          className="pallete_dd"
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "baseline",
            width: "14rem",
            position: "absolute",
            left: `${positions.left}px`,
            top: `${positions.top}px`,
            backgroundColor: "white",
            padding: "0.75rem",
            boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.5)",
            borderRadius: "0.25rem",
          }}
        >
          {highlightColorOptions.map((highlightColorOption, key) => (
            <ToggleColor
              handleToggleInlineStyles={props.handleToggleInlineStyles}
              handleDropDown={props.handleDropDown}
              key={key}
              cmd={highlightColorOption.cmd}
              bgColor={highlightColorOption.bgColor}
              activeColor={props.activeColor}
              editorState={props.editorState}
              onChange={props.onChange}
              activeStatus={props.activeStatus}
              close={"highlighter_color"}
            />
          ))}
        </div>
      ) : props.isClose.dropdown === "alignment" ? (
        <div
          className="DD"
          style={{
            display: "flex",
            width: "3.75rem",
            position: "absolute",
            left: `${positions.left}px`,
            top: `${positions.top}px`,
            boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.5)",
            borderRadius: "0.25rem",
          }}
        >
          <button
            title={"Left Align"}
            style={{ cursor: "pointer" }}
            onClick={() => handleAlignment("Left")}
          >
            <span className="material-symbols-outlined">format_align_left</span>
          </button>
          <button
            title={"Center Align"}
            style={{ cursor: "pointer" }}
            onClick={() => handleAlignment("Center")}
          >
            <span className="material-symbols-outlined">
              format_align_center
            </span>
          </button>
          <button
            title={"Right Align"}
            style={{ cursor: "pointer" }}
            onClick={() => handleAlignment("Right")}
          >
            <span className="material-symbols-outlined">
              format_align_right
            </span>
          </button>
          <button
            title={"Justify"}
            style={{ cursor: "pointer" }}
            onClick={() => handleAlignment("Justify")}
          >
            <span className="material-symbols-outlined">
              format_align_justify
            </span>
          </button>
        </div>
      ) : props.isClose.dropdown === "text_type" ? (
        <div
          className="DD"
          style={{
            display: "flex",
            flexDirection: "column",
            position: "absolute",
            left: `${positions.left}px`,
            top: `${positions.top}px`,
            boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.5)",
            borderRadius: "0.25rem",
            width: "9.75rem",
          }}
        >
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              props.handler("unstyled");
              props.handleDropDown("");
            }}
            style={{ cursor: "pointer" }}
          >
            <p>Normal Text</p>
          </button>
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              props.active !== "header-one"
                ? props.handler("header-one")
                : null;
              props.handleDropDown("");
            }}
            style={{ cursor: "pointer" }}
          >
            <h1>Title</h1>
          </button>
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              props.active !== "header-two"
                ? props.handler("header-two")
                : null;
              props.handleDropDown("");
            }}
            style={{ cursor: "pointer" }}
          >
            <h2>Subtitle</h2>
          </button>
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              props.active !== "header-three"
                ? props.handler("header-three")
                : null;
              props.handleDropDown("");
            }}
            style={{ cursor: "pointer" }}
          >
            <h3>Heading 1</h3>
          </button>
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              props.active !== "header-four"
                ? props.handler("header-four")
                : null;
              props.handleDropDown("");
            }}
            style={{ cursor: "pointer" }}
          >
            <h4>Heading 2</h4>
          </button>
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              props.active !== "header-five"
                ? props.handler("header-five")
                : null;
              props.handleDropDown("");
            }}
            style={{ cursor: "pointer" }}
          >
            <h5>Heading 3</h5>
          </button>
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              props.active !== "header-six"
                ? props.handler("header-six")
                : null;
              props.handleDropDown("");
            }}
            style={{ cursor: "pointer" }}
          >
            <h6>Heading 4</h6>
          </button>
        </div>
      ) : props.isClose.dropdown === "error-suggestions" ? (
        <div
          style={{
            position: "fixed",
            top: "5px",
            left: "5px",
          }}
        >
          <Rnd
            size={{ width: state.width, height: state.height }}
            position={{ x: state.x, y: state.y }}
            onDragStop={(e, d) => {
              setState((prev) => ({ ...prev, x: d.x, y: d.y }));
            }}
            onResize={(e, direction, ref, delta, position) => {
              setState((prev) => ({
                ...prev,
                width: ref.offsetWidth,
                height: ref.offsetHeight,
                ...position,
              }));
            }}
            bounds="window"
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                position: "absolute",
                boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.5)",
                backgroundColor: "white",
                borderRadius: "0.25rem",
                width: "20rem",
                zIndex: "10",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "0rem 0.75rem 0rem 0.75rem",
                }}
              >
                <h3>Spelling Suggestions</h3>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <span
                    className="material-symbols-outlined prev"
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      setErrorIdx((prev) => {
                        return {
                          idx:
                            (props.error.length + prev.idx - 1) %
                            props.error.length,
                        };
                      })
                    }
                    title="Previous Suggestion"
                  >
                    chevron_backward
                  </span>
                  <span
                    className="material-symbols-outlined next"
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      setErrorIdx((prev) => {
                        return { idx: (prev.idx + 1) % props.error.length };
                      })
                    }
                    title="Next Suggestion"
                  >
                    chevron_forward
                  </span>
                  <span
                    className="material-symbols-outlined close"
                    style={{ cursor: "pointer" }}
                    onClick={() => props.handleDropDown("")}
                  >
                    close_small
                  </span>
                </div>
              </div>
              {props.error && props.error.length > 0 ? (
                <div
                  style={{
                    borderTop: "1px solid gray",
                    padding: "0.75rem",
                  }}
                >
                  <p>
                    Change <b>{props.error[errorIdx.idx].word}</b> to:
                  </p>
                  {props.error[errorIdx.idx].suggestion &&
                  props.error[errorIdx.idx].suggestion.length > 0 ? (
                    props.error[errorIdx.idx].suggestion.map(
                      (suggestion, key) => (
                        <button
                          className="Suggestion"
                          style={{
                            backgroundColor: "rgba(0, 0, 0, 0.7)",
                            color: "white",
                            border: "2px solid black",
                            borderRadius: "1rem",
                            cursor: "pointer",
                            margin: "0.15rem",
                          }}
                          key={key}
                          onClick={() =>
                            replaceText(
                              props.error[errorIdx.idx].start,
                              props.error[errorIdx.idx].end,
                              props.error[errorIdx.idx].blockKey,
                              suggestion,
                              props.error[errorIdx.idx].word
                            )
                          }
                        >
                          {suggestion}
                        </button>
                      )
                    )
                  ) : (
                    <div>
                      <i style={{ color: "gray" }}>No suggestions</i>
                    </div>
                  )}
                  <div style={{ marginTop: "0.75rem" }}>
                    <button
                      className="suggest-add"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => {
                        spellChecker.add(props.error[errorIdx.idx].word);
                        replaceText(
                          props.error[errorIdx.idx].start,
                          props.error[errorIdx.idx].end,
                          props.error[errorIdx.idx].blockKey,
                          props.error[errorIdx.idx].word,
                          props.error[errorIdx.idx].word
                        );
                      }}
                      title="Add to Dictionary"
                      style={{
                        cursor: "pointer",
                        marginRight: "0.75rem",
                        fontSize: "0.9rem",
                        height: "2rem",
                        width: "4.5rem",
                        backgroundColor: "white",
                        borderRadius: "1.2rem",
                        border: "1px solid rgba(138, 137, 137, 1)",
                      }}
                    >
                      Add
                    </button>
                    <button
                      className="suggest-add"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => {
                        spellChecker.add(props.error[errorIdx.idx].word);
                        replaceText(
                          props.error[errorIdx.idx].start,
                          props.error[errorIdx.idx].end,
                          props.error[errorIdx.idx].blockKey,
                          props.error[errorIdx.idx].word,
                          props.error[errorIdx.idx].word
                        );
                      }}
                      title="Ignore All"
                      style={{
                        cursor: "pointer",
                        fontSize: "0.9rem",
                        height: "2rem",
                        width: "4.5rem",
                        backgroundColor: "white",
                        borderRadius: "1.2rem",
                        border: "1px solid rgba(138, 137, 137, 1)",
                      }}
                    >
                      Ignore
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  style={{
                    borderTop: "1px solid gray",
                    padding: "0.75rem",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <i style={{ color: "gray" }}>
                    No available suggestions to review.
                  </i>
                </div>
              )}
            </div>
          </Rnd>
        </div>
      ) : props.isClose.dropdown === "personal_dictionary" ? (
        <div
          style={{
            position: "absolute",
            top: "5px",
            left: "50%",
            transform: "translate(-50%, 0)",
            backgroundColor: "white",
            padding: "0.55rem",
            borderRadius: "5px",
            boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.5)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            className="top-bar"
            style={{ display: "flex", justifyContent: "end" }}
          >
            <span
              className="material-symbols-outlined"
              onClick={() => props.handleDropDown("")}
              style={{ cursor: "pointer", borderRadius: "100%" }}
            >
              close_small
            </span>
          </div>
          <div
            className="added-words"
            style={{
              // height: "8rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              // justifyContent: "start", for case when adding words
              justifyContent: "center",
              overflowY: "auto",
              padding: "0.5rem",
            }}
          >
            <p>
              <i style={{ color: "gray" }}>Personal Dictionary is Empty!</i>
            </p>
          </div>
          <div
            className="add"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0.5rem",
            }}
          >
            <input
              type="text"
              id="add_word_in_pd"
              placeholder="Add word"
              style={{
                border: "1px solid black",
                borderRadius: "2.5px",
                marginRight: "0.5rem",
                height: "1.6rem",
                paddingLeft: "5px",
              }}
              onChange={(e) => setAddWord(e.target.value)}
              value={addWord}
            />
            <span
              className="material-symbols-outlined suggest-add"
              title="Add word to Personal Dictionary"
              style={{
                cursor: "pointer",
                fontSize: "1rem",
                borderRadius: "100%",
                backgroundColor: "black",
                color: "white",
                padding: "0.25rem",
              }}
            >
              add
            </span>
          </div>
        </div>
      ) : props.isClose.dropdown === "find" ? (
        <div
          className="DD"
          style={{
            position: "absolute",
            left: `${positions.left}px`,
            top: `${positions.top}px`,
            width: "9rem",
            boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.5)",
            borderRadius: "0.25rem",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => props.handleDropDown("find-word")}
            style={{
              cursor: "pointer",
              border: "1px solid gray",
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
            }}
          >
            <span
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <span className="material-symbols-outlined">search</span> Find
            </span>
          </button>
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => props.handleDropDown("find-replace-word")}
            style={{
              cursor: "pointer",
              border: "1px solid gray",
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
            }}
          >
            {" "}
            <span
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <span className="material-symbols-outlined">find_replace</span>{" "}
              Find and Replace
            </span>
          </button>
        </div>
      ) : props.isClose.dropdown === "find-word" ? (
        <div
          style={{
            position: "absolute",
            top: "5px",
            left: "50%",
            transform: "translate(-50%, 0)",
            backgroundColor: "white",
            boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.5)",
            borderRadius: "0.25rem",
            display: "flex",
            flexDirection: "column",
            padding: "0.75rem",
            zIndex: "2",
          }}
        >
          <div
            className="find"
            style={{
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
              marginTop: "0.5rem",
              marginBottom: "0.5rem",
            }}
          >
            <input
              type="text"
              id="find"
              placeholder="Find word"
              style={{
                border: "1px solid black",
                borderRadius: "2.5px",
                marginRight: "0.5rem",
                height: "1.6rem",
                paddingLeft: "5px",
                width: "24rem",
              }}
              value={props.state.find}
              onChange={(e) =>
                props.setState((prev) => {
                  return {
                    find: e.target.value,
                    replaceWith: prev.replaceWith,
                    matchCase: prev.matchCase,
                    matches: prev.matches,
                  };
                })
              }
            />
            <span
              className={
                props.state.find.length > 0
                  ? "material-symbols-outlined suggest-add"
                  : "material-symbols-outlined disabled"
              }
              title="Find"
              style={
                props.state.find.length > 0
                  ? {
                      cursor: "pointer",
                      fontSize: "1rem",
                      borderRadius: "100%",
                      backgroundColor: "black",
                      color: "white",
                      padding: "0.38rem",
                    }
                  : {
                      cursor: "pointer",
                      fontSize: "1rem",
                      borderRadius: "100%",
                      backgroundColor: "black",
                      color: "white",
                      padding: "0.38rem",
                      opacity: "0.65",
                    }
              }
              onClick={props.state.find.length > 0 ? props.findfn : null}
            >
              search
            </span>
            <div
              className="top-bar"
              style={{
                display: "flex",
                justifyContent: "end",
                marginLeft: "1rem",
              }}
            >
              <span
                className="material-symbols-outlined"
                onClick={() => props.handleDropDown("")}
                style={{ cursor: "pointer", borderRadius: "100%" }}
              >
                close
              </span>
            </div>
          </div>
          <div
            className="case"
            style={{
              marginTop: "0.5rem",
              marginBottom: "0.55rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "start",
              }}
            >
              <input
                type="checkbox"
                name="case"
                id="case"
                style={{
                  accentColor: "black",
                  cursor: "pointer",
                }}
                onChange={() =>
                  props.setState((prev) => {
                    return {
                      find: prev.find,
                      replaceWith: prev.replaceWith,
                      matchCase: !prev.matchCase,
                      matches: prev.matches,
                    };
                  })
                }
              />
              <label htmlFor="case" style={{ cursor: "pointer" }}>
                Match Case
              </label>
            </div>
            <div
              className="options"
              style={{ display: "flex", marginTop: "0.25rem" }}
            >
              <div
                className="found"
                style={{
                  marginTop: "0.5rem",
                  marginBottom: "0.5rem",
                  marginRight: "1rem",
                }}
              >
                {props.state.matches && props.state.matches.length > 0 ? (
                  <span>
                    <i style={{ color: "gray" }}>
                      {matchIdx.idx + 1} of {props.state.matches.length}
                    </i>
                  </span>
                ) : props.state.matches ? (
                  <span>
                    <i style={{ color: "gray" }}>0 of 0</i>
                  </span>
                ) : null}
              </div>
              <button
                className={
                  props.state.matches && props.state.matches.length > 0
                    ? "suggest-add"
                    : "disabled"
                }
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  setMatchIdx((prev) => {
                    return {
                      idx:
                        (props.state.matches.length + prev.idx - 1) %
                        props.state.matches.length,
                    };
                  });
                }}
                style={{
                  cursor: "pointer",
                  marginRight: "0.75rem",
                  height: "2rem",
                  width: "2rem",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "black",
                  color: "white",
                  borderRadius: "1.2rem",
                  border: "1px solid rgba(138, 137, 137, 1)",
                }}
                title="Previous"
                disabled={
                  props.state.matches && props.state.matches.length > 0
                    ? false
                    : true
                }
              >
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button
                className={
                  props.state.matches && props.state.matches.length > 0
                    ? "suggest-add"
                    : "disabled"
                }
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  setMatchIdx((prev) => {
                    return {
                      idx: (prev.idx + 1) % props.state.matches.length,
                    };
                  });
                }}
                title="Next"
                style={{
                  cursor: "pointer",
                  height: "2rem",
                  width: "2rem",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "black",
                  color: "white",
                  borderRadius: "1.2rem",
                  border: "1px solid rgba(138, 137, 137, 1)",
                }}
                disabled={
                  props.state.matches && props.state.matches.length > 0
                    ? false
                    : true
                }
              >
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      ) : props.isClose.dropdown === "find-replace-word" ? (
        <div
          style={{
            position: "fixed",
            top: "5px",
            left: "5px",
          }}
        >
          <Rnd
            size={{ width: state1.width, height: state1.height }}
            position={{ x: state1.x, y: state1.y }}
            onDragStop={(e, d) => {
              setState1((prev) => ({ ...prev, x: d.x, y: d.y }));
            }}
            onResize={(e, direction, ref, delta, position) => {
              setState1((prev) => ({
                ...prev,
                width: ref.offsetWidth,
                height: ref.offsetHeight,
                ...position,
              }));
            }}
            bounds="window"
          >
            <div
              style={{
                position: "absolute",
                zIndex: "2",
                backgroundColor: "white",
                boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.5)",
                borderRadius: "0.25rem",
                display: "flex",
                flexDirection: "column",
                padding: "0.75rem",
              }}
            >
              <div
                className="top-bar"
                style={{ display: "flex", justifyContent: "end" }}
              >
                <span
                  className="material-symbols-outlined"
                  onClick={() => props.handleDropDown("")}
                  style={{ cursor: "pointer", borderRadius: "100%" }}
                >
                  close_small
                </span>
              </div>
              <div
                className="find"
                style={{
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "center",
                  marginTop: "0.5rem",
                  marginBottom: "0.5rem",
                }}
              >
                <input
                  type="text"
                  id="find"
                  placeholder="Find word"
                  style={{
                    border: "1px solid black",
                    borderRadius: "2.5px",
                    marginRight: "0.5rem",
                    height: "1.6rem",
                    paddingLeft: "5px",
                    width: "24rem",
                  }}
                  value={props.state.find}
                  onChange={(e) =>
                    props.setState((prev) => {
                      return {
                        find: e.target.value,
                        replaceWith: prev.replaceWith,
                        matchCase: prev.matchCase,
                        matches: prev.matches,
                      };
                    })
                  }
                />
                <span
                  className={
                    props.state.find.length > 0
                      ? "material-symbols-outlined suggest-add"
                      : "material-symbols-outlined disabled"
                  }
                  title="Find"
                  style={
                    props.state.find.length > 0
                      ? {
                          cursor: "pointer",
                          fontSize: "1rem",
                          borderRadius: "100%",
                          backgroundColor: "black",
                          color: "white",
                          padding: "0.38rem",
                        }
                      : {
                          cursor: "pointer",
                          fontSize: "1rem",
                          borderRadius: "100%",
                          backgroundColor: "black",
                          color: "white",
                          padding: "0.38rem",
                          opacity: "0.65",
                        }
                  }
                  onClick={props.state.find.length > 0 ? props.findfn : null}
                >
                  search
                </span>
              </div>
              <div
                className="replace"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "0.5rem",
                  marginBottom: "0.5rem",
                }}
              >
                <input
                  type="text"
                  id="replace"
                  placeholder="Replace with"
                  style={{
                    border: "1px solid black",
                    borderRadius: "2.5px",
                    marginRight: "0.5rem",
                    height: "1.6rem",
                    paddingLeft: "5px",
                    width: "26rem",
                  }}
                  value={props.state.replaceWith}
                  onChange={(e) =>
                    props.setState((prev) => {
                      return {
                        find: prev.find,
                        replaceWith: e.target.value,
                        matchCase: prev.matchCase,
                        matches: prev.matches,
                      };
                    })
                  }
                />
              </div>
              <div
                className="case"
                style={{
                  marginTop: "0.5rem",
                  marginBottom: "0.55rem",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <input
                  type="checkbox"
                  name="case"
                  id="case"
                  style={{
                    accentColor: "black",
                    cursor: "pointer",
                  }}
                  onChange={() =>
                    props.setState((prev) => {
                      return {
                        find: prev.find,
                        replaceWith: prev.replaceWith,
                        matchCase: !prev.matchCase,
                        matches: prev.matches,
                      };
                    })
                  }
                />
                <label htmlFor="case" style={{ cursor: "pointer" }}>
                  Match Case
                </label>
              </div>
              <div
                className="found"
                style={{ marginTop: "0.5rem", marginBottom: "0.5rem" }}
              >
                {props.state.matches && props.state.matches.length > 0 ? (
                  <span>
                    <i style={{ color: "gray" }}>
                      {matchIdx.idx + 1} of {props.state.matches.length}
                    </i>
                  </span>
                ) : props.state.matches ? (
                  <span>
                    <i style={{ color: "gray" }}>0 of 0</i>
                  </span>
                ) : null}
              </div>
              <div
                className="options"
                style={{ display: "flex", marginTop: "0.25rem" }}
              >
                <button
                  className={
                    props.state.matches && props.state.matches.length > 0
                      ? "suggest-add"
                      : "disabled"
                  }
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    props.replaceFn(
                      props.state.matches[matchIdx.idx],
                      matchIdx.idx
                    );
                    if (props.state.matches.length === 0) {
                      setMatchIdx({ idx: 0 });
                    } else if (errorIdx.idx === props.state.matches.length) {
                      setMatchIdx((prev) => {
                        return { idx: prev.idx - 1 };
                      });
                    } else {
                      setMatchIdx((prev) => {
                        return { idx: prev.idx };
                      });
                    }
                  }}
                  style={{
                    cursor: "pointer",
                    marginRight: "0.75rem",
                    fontSize: "0.9rem",
                    height: "2rem",
                    width: "6.25rem",
                    backgroundColor: "white",
                    borderRadius: "1.2rem",
                    border: "1px solid rgba(138, 137, 137, 1)",
                  }}
                  disabled={
                    props.state.matches && props.state.matches.length > 0
                      ? false
                      : true
                  }
                >
                  Replace
                </button>
                <button
                  className={
                    props.state.matches && props.state.matches.length > 0
                      ? "suggest-add"
                      : "disabled"
                  }
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => props.replaceAll()}
                  style={{
                    cursor: "pointer",
                    marginRight: "0.75rem",
                    fontSize: "0.9rem",
                    height: "2rem",
                    width: "6.25rem",
                    backgroundColor: "white",
                    borderRadius: "1.2rem",
                    border: "1px solid rgba(138, 137, 137, 1)",
                  }}
                  disabled={
                    props.state.matches && props.state.matches.length > 0
                      ? false
                      : true
                  }
                >
                  Replace All
                </button>
                <button
                  className={
                    props.state.matches && props.state.matches.length > 0
                      ? "suggest-add"
                      : "disabled"
                  }
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    setMatchIdx((prev) => {
                      return {
                        idx:
                          (props.state.matches.length + prev.idx - 1) %
                          props.state.matches.length,
                      };
                    });
                  }}
                  style={{
                    cursor: "pointer",
                    fontSize: "0.9rem",
                    marginRight: "0.75rem",
                    height: "2rem",
                    width: "6.25rem",
                    backgroundColor: "black",
                    color: "white",
                    borderRadius: "1.2rem",
                    border: "1px solid rgba(138, 137, 137, 1)",
                  }}
                  disabled={
                    props.state.matches && props.state.matches.length > 0
                      ? false
                      : true
                  }
                >
                  Previous
                </button>
                <button
                  className={
                    props.state.matches && props.state.matches.length > 0
                      ? "suggest-add"
                      : "disabled"
                  }
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    setMatchIdx((prev) => {
                      return {
                        idx: (prev.idx + 1) % props.state.matches.length,
                      };
                    });
                  }}
                  style={{
                    cursor: "pointer",
                    fontSize: "0.9rem",
                    height: "2rem",
                    width: "6.25rem",
                    backgroundColor: "black",
                    color: "white",
                    borderRadius: "1.2rem",
                    border: "1px solid rgba(138, 137, 137, 1)",
                  }}
                  disabled={
                    props.state.matches && props.state.matches.length > 0
                      ? false
                      : true
                  }
                >
                  Next
                </button>
              </div>
            </div>
          </Rnd>
        </div>
      ) : null}
    </>
  );
}
