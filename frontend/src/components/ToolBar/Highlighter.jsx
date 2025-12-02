import { useRef } from "react";
import DropDown from "../DropDown/DropDown";

export default function Highlighter(props) {
  let buttonref = useRef(null);
  let filteredHighlightColors =
    props.editorState
      .getCurrentInlineStyle()
      ._map._map._root?.entries?.filter((inlineStyles) => {
        if (inlineStyles[0].startsWith("HIGHLIGHT-")) return inlineStyles;
      }) || [];
  let finalColor = filteredHighlightColors.length
    ? filteredHighlightColors.reduce((acc, curr) =>
        curr[1] > acc[1] ? curr : acc
      )
    : [];

  const colorOptions = {
    "HIGHLIGHT-BLACK": "#000000",
    "HIGHLIGHT-CHARCOAL": "#404040",
    "HIGHLIGHT-GRAY": "#808080",
    "HIGHLIGHT-SILVER-GRAY": "#999999",
    "HIGHLIGHT-LIGHT-GRAY": "#B3B3B3",
    "HIGHLIGHT-SILVER": "#CCCCCC",
    "HIGHLIGHT-GAINSBORO": "#D9D9D9",
    "HIGHLIGHT-PLATINUM": "#E6E6E6",
    "HIGHLIGHT-WHITE-SMOKE": "#F2F2F2",
    "HIGHLIGHT-WHITE": "#FFFFFF",
    "HIGHLIGHT-RED": "#CC0000",
    "HIGHLIGHT-BRIGHT-RED": "#FF0000",
    "HIGHLIGHT-ORANGE": "#FF9900",
    "HIGHLIGHT-YELLOW": "#FFFF00",
    "HIGHLIGHT-LIME": "#00FF00",
    "HIGHLIGHT-CYAN": "#00FFFF",
    "HIGHLIGHT-SKY-BLUE": "#0099FF",
    "HIGHLIGHT-BLUE": "#0000FF",
    "HIGHLIGHT-VIOLET": "#CC00FF",
    "HIGHLIGHT-MAGENTA": "#FF00FF",
    "HIGHLIGHT-PALE-PINK": "#FFCCCC",
    "HIGHLIGHT-LIGHT-PINK": "#FFB3CC",
    "HIGHLIGHT-PEACH": "#FFE6CC",
    "HIGHLIGHT-CREAM": "#FFFFCC",
    "HIGHLIGHT-MINT-CREAM": "#CCFFCC",
    "HIGHLIGHT-POWDER-BLUE": "#CCE6E6",
    "HIGHLIGHT-ALICE-BLUE": "#CCE6FF",
    "HIGHLIGHT-LAVENDER": "#CCCCFF",
    "HIGHLIGHT-THISTLE": "#E6CCFF",
    "HIGHLIGHT-PINK-LACE": "#FFCCFF",
    "HIGHLIGHT-ROSY-BROWN": "#CC9999",
    "HIGHLIGHT-MAUVE": "#CC6699",
    "HIGHLIGHT-APRICOT": "#FFCC99",
    "HIGHLIGHT-LIGHT-YELLOW": "#FFFF99",
    "HIGHLIGHT-DARK-SEA-GREEN": "#99CC99",
    "HIGHLIGHT-CADET-BLUE": "#99CCCC",
    "HIGHLIGHT-CORNFLOWER": "#99CCFF",
    "HIGHLIGHT-BLUE-BELL": "#9999CC",
    "HIGHLIGHT-PLUM": "#CC99CC",
    "HIGHLIGHT-KOBI": "#CC99BB",
    "HIGHLIGHT-COPPER-ROSE": "#996666",
    "HIGHLIGHT-CERISE": "#CC3366",
    "HIGHLIGHT-PERU": "#CC9933",
    "HIGHLIGHT-BRASS": "#CCCC33",
    "HIGHLIGHT-FERN-GREEN": "#669966",
    "HIGHLIGHT-TEAL": "#339999",
    "HIGHLIGHT-DENIM": "#3366CC",
    "HIGHLIGHT-SAPPHIRE": "#333399",
    "HIGHLIGHT-REBECCA-PURPLE": "#663399",
    "HIGHLIGHT-ROYAL-PURPLE": "#993399",
    "HIGHLIGHT-DARK-BROWN": "#663333",
    "HIGHLIGHT-BURGUNDY": "#990033",
    "HIGHLIGHT-BRONZE": "#996600",
    "HIGHLIGHT-OLIVE": "#999900",
    "HIGHLIGHT-HUNTER-GREEN": "#336633",
    "HIGHLIGHT-DARK-CYAN": "#006666",
    "HIGHLIGHT-PRUSSIAN-BLUE": "#003366",
    "HIGHLIGHT-NAVY": "#000066",
    "HIGHLIGHT-INDIGO": "#330066",
    "HIGHLIGHT-DARK-PURPLE": "#660066",
  };
  return (
    <div>
      <button
        onMouseDown={(e) => e.preventDefault()}
        title="Highlight Color"
        onClick={() => props.handleDropDown("highlighter_color")}
        style={{
          height: "2.1rem",
          cursor: "pointer",
          paddingRight: "0px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
        ref={buttonref}
      >
        <span
          className="material-symbols-outlined"
          style={{
            marginRight: "0.18rem",
            borderBottom: `3.5px solid ${
              finalColor.length ? colorOptions[finalColor[0]] : "black"
            }`,
            paddingBottom: "0.25rem",
            height: "1.15rem",
            width: "1.5rem",
          }}
        >
          ink_highlighter
        </span>
        {props.isClose.open &&
        props.isClose.dropdown === "highlighter_color" ? (
          <span
            className="material-symbols-outlined drop"
            style={{ backgroundColor: "gray" }}
          >
            arrow_drop_up
          </span>
        ) : (
          <span className="material-symbols-outlined drop">
            arrow_drop_down
          </span>
        )}
      </button>
      {props.isClose.open && props.isClose.dropdown === "highlighter_color" ? (
        <DropDown
          isClose={props.isClose}
          handleDropDown={props.handleDropDown}
          handleToggleInlineStyles={props.handleToggleInlineStyles}
          activeStatus={props.activeStatus}
          buttonref={buttonref}
          editorState={props.editorState}
          onChange={props.onChange}
          activeColor={
            props.editorState.getCurrentInlineStyle()._map._map._root?.entries[
              props.editorState.getCurrentInlineStyle()._map._map._root?.entries
                .length - 1
            ][0] || "BLACK"
          }
        />
      ) : null}
    </div>
  );
}
