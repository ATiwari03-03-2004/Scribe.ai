import ToggleBlockStyle from "./ToggleBlockStyle";
import ToggleInlineStyle from "./ToggleInlineStyle";
import TogglePallate from "./TogglePallate";
import CustomBlocks from "./CustomBlocks";
import Highlighter from "./Highlighter";
import "../ToolBar/ToolBar.css";

export default function ToolBar(props) {
  return (
    <div
      className="tool-bar"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <ToggleInlineStyle
        handleToggleInlineStyles={props.handleToggleInlineStyles}
        handleToggleBlockTypes={props.handleToggleBlockTypes}
        activeStatus={props.currentInlineStyle}
        editorState={props.editorState}
        isClose={props.isClose}
        handleDropDown={props.handleDropDown}
      />
      <Highlighter
        handleToggleInlineStyles={props.handleToggleInlineStyles}
        activeStatus={props.currentInlineStyle}
        editorState={props.editorState}
        isClose={props.isClose}
        handleDropDown={props.handleDropDown}
      />
      <TogglePallate
        handleToggleInlineStyles={props.handleToggleInlineStyles}
        activeStatus={props.currentInlineStyle}
        editorState={props.editorState}
        isClose={props.isClose}
        handleDropDown={props.handleDropDown}
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
        isClose={props.isClose}
        handleDropDown={props.handleDropDown}
      />
    </div>
  );
}
