import ToggleBlockStyle from "./ToggleBlockStyle";
import ToggleInlineStyle from "./ToggleInlineStyle";
import TogglePallate from "./TogglePallate";
import CustomBlocks from "./CustomBlocks";
import { useState } from "react";
import "../ToolBar/ToolBar.css";

export default function ToolBar(props) {
  let [isClose, setIsClose] = useState({ open: false, dropdown: "" });

  let handleDropDown = (dditem) => {
    setIsClose((prev) => {
      if (prev.open && prev.dropdown === dditem) {
        return { open: false, dropdown: "" };
      }
      if (prev.open && prev.dropdown !== dditem && dditem.length) {
        return { open: true, dropdown: dditem };
      }
      return { open: true, dropdown: dditem };
    });
  };
  return (
    <div className="tool-bar">
      <ToggleInlineStyle
        handleToggleInlineStyles={props.handleToggleInlineStyles}
        handleToggleBlockTypes={props.handleToggleBlockTypes}
        handleFontChange={props.handleFontChange}
        activeStatus={props.currentInlineStyle}
        editorState={props.editorState}
        isClose={isClose}
        handleDropDown={handleDropDown}
      />
      <TogglePallate
        handleToggleInlineStyles={props.handleToggleInlineStyles}
        activeStatus={props.currentInlineStyle}
      />
      <ToggleBlockStyle
        handleToggleBlockTypes={props.handleToggleBlockTypes}
        activeStatus={props.currentBlockStyle}
      />
      <CustomBlocks
        editorState={props.editorState}
        onChange={props.onChange}
        isRecognizing={props.isRecognizing}
        setIsRecognizing={props.setIsRecognizing}
        interimRecognizedText={props.interimRecognizedText}
        setInterimRecognizedText={props.setInterimRecognizedText}
        finalRecognizedText={props.finalRecognizedText}
        setFinalRecognizedText={props.setFinalRecognizedText}
        isFinal={props.isFinal}
        setIsFinal={props.setIsFinal}
        isClose={isClose}
        handleDropDown={handleDropDown}
      />
    </div>
  );
}
