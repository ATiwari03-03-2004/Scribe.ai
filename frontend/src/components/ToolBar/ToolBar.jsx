import ToggleBlockStyle from "./ToggleBlockStyle";
import ToggleInlineStyle from "./ToggleInlineStyle";
import TogglePallate from "./TogglePallate";
import CustomBlocks from "./CustomBlocks";
import Highlighter from "./Highlighter";
import "../ToolBar/ToolBar.css";
import IncreaseIndent from "./IncreaseIndent";
import DecreaseIndent from "./DecreaseIndent";

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
        onChange={props.onChange}
        isClose={props.isClose}
        handleDropDown={props.handleDropDown}
      />
      <Highlighter
        handleToggleInlineStyles={props.handleToggleInlineStyles}
        activeStatus={props.currentInlineStyle}
        editorState={props.editorState}
        isClose={props.isClose}
        handleDropDown={props.handleDropDown}
        onChange={props.onChange}
      />
      <TogglePallate
        handleToggleInlineStyles={props.handleToggleInlineStyles}
        activeStatus={props.currentInlineStyle}
        editorState={props.editorState}
        isClose={props.isClose}
        handleDropDown={props.handleDropDown}
        onChange={props.onChange}
      />
      <IncreaseIndent
        activeStatus={props.currentBlockStyle}
        editorState={props.editorState}
        onChange={props.onChange}
      />
      <DecreaseIndent
        activeStatus={props.currentBlockStyle}
        editorState={props.editorState}
        onChange={props.onChange}
      />
      <ToggleBlockStyle
        handleToggleBlockTypes={props.handleToggleBlockTypes}
        activeStatus={props.currentBlockStyle}
        editorState={props.editorState}
        isClose={props.isClose}
        handleDropDown={props.handleDropDown}
        editorRef={props.editorRef}
        onChange={props.onChange}
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
