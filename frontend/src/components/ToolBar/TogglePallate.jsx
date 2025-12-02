import DropDown from "../DropDown/DropDown";
import "./TogglePallate.css";
import { useRef } from "react";

export default function TogglePallate(props) {
  let buttonref = useRef(null);
  let filteredTextColors =
    props.editorState
      .getCurrentInlineStyle()
      ._map._map._root?.entries?.filter((inlineStyles) => {
        if (inlineStyles[0].startsWith("COLOR-")) return inlineStyles;
      }) || [];
  let finalColor = filteredTextColors.length
    ? filteredTextColors.reduce((acc, curr) => (curr[1] > acc[1] ? curr : acc))
    : [];

  const colorOptions = {
    "COLOR-BLACK": "#000000",
    "COLOR-CHARCOAL": "#404040",
    "COLOR-GRAY": "#808080",
    "COLOR-SILVER-GRAY": "#999999",
    "COLOR-LIGHT-GRAY": "#B3B3B3",
    "COLOR-SILVER": "#CCCCCC",
    "COLOR-GAINSBORO": "#D9D9D9",
    "COLOR-PLATINUM": "#E6E6E6",
    "COLOR-WHITE-SMOKE": "#F2F2F2",
    "COLOR-WHITE": "#FFFFFF",
    "COLOR-RED": "#CC0000",
    "COLOR-BRIGHT-RED": "#FF0000",
    "COLOR-ORANGE": "#FF9900",
    "COLOR-YELLOW": "#FFFF00",
    "COLOR-LIME": "#00FF00",
    "COLOR-CYAN": "#00FFFF",
    "COLOR-SKY-BLUE": "#0099FF",
    "COLOR-BLUE": "#0000FF",
    "COLOR-VIOLET": "#CC00FF",
    "COLOR-MAGENTA": "#FF00FF",
    "COLOR-PALE-PINK": "#FFCCCC",
    "COLOR-LIGHT-PINK": "#FFB3CC",
    "COLOR-PEACH": "#FFE6CC",
    "COLOR-CREAM": "#FFFFCC",
    "COLOR-MINT-CREAM": "#CCFFCC",
    "COLOR-POWDER-BLUE": "#CCE6E6",
    "COLOR-ALICE-BLUE": "#CCE6FF",
    "COLOR-LAVENDER": "#CCCCFF",
    "COLOR-THISTLE": "#E6CCFF",
    "COLOR-PINK-LACE": "#FFCCFF",
    "COLOR-ROSY-BROWN": "#CC9999",
    "COLOR-MAUVE": "#CC6699",
    "COLOR-APRICOT": "#FFCC99",
    "COLOR-LIGHT-YELLOW": "#FFFF99",
    "COLOR-DARK-SEA-GREEN": "#99CC99",
    "COLOR-CADET-BLUE": "#99CCCC",
    "COLOR-CORNFLOWER": "#99CCFF",
    "COLOR-BLUE-BELL": "#9999CC",
    "COLOR-PLUM": "#CC99CC",
    "COLOR-KOBI": "#CC99BB",
    "COLOR-COPPER-ROSE": "#996666",
    "COLOR-CERISE": "#CC3366",
    "COLOR-PERU": "#CC9933",
    "COLOR-BRASS": "#CCCC33",
    "COLOR-FERN-GREEN": "#669966",
    "COLOR-TEAL": "#339999",
    "COLOR-DENIM": "#3366CC",
    "COLOR-SAPPHIRE": "#333399",
    "COLOR-REBECCA-PURPLE": "#663399",
    "COLOR-ROYAL-PURPLE": "#993399",
    "COLOR-DARK-BROWN": "#663333",
    "COLOR-BURGUNDY": "#990033",
    "COLOR-BRONZE": "#996600",
    "COLOR-OLIVE": "#999900",
    "COLOR-HUNTER-GREEN": "#336633",
    "COLOR-DARK-CYAN": "#006666",
    "COLOR-PRUSSIAN-BLUE": "#003366",
    "COLOR-NAVY": "#000066",
    "COLOR-INDIGO": "#330066",
    "COLOR-DARK-PURPLE": "#660066",
  };
  return (
    <div className="font-color">
      <button
        onMouseDown={(e) => e.preventDefault()}
        title="Text Color"
        onClick={() => props.handleDropDown("text_color")}
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
          style={{
            fontFamily: "Segoe UI, Tahoma, Geneva, sans-serif",
            fontWeight: "bolder",
            fontSize: "1.25rem",
            marginRight: "0.18rem",
            borderBottom: `3.5px solid ${
              finalColor.length ? colorOptions[finalColor[0]] : "black"
            }`,
            paddingBottom: "0.25rem",
            height: "1.25rem",
            width: "1.4rem",
          }}
        >
          A
        </span>
        {props.isClose.open && props.isClose.dropdown === "text_color" ? (
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
      {props.isClose.open && props.isClose.dropdown === "text_color" ? (
        <DropDown
          isClose={props.isClose}
          handleDropDown={props.handleDropDown}
          handleToggleInlineStyles={props.handleToggleInlineStyles}
          activeStatus={props.activeStatus}
          buttonref={buttonref}
          editorState={props.editorState}
          editorRef={props.editorRef}
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
