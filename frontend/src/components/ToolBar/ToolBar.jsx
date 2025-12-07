import ToggleBlockStyle from "./ToggleBlockStyle/ToggleBlockStyle";
import ToggleInlineStyle from "./ToggleInlineStyle/ToggleInlineStyle";
import TogglePallate from "./ToggleInlineStyle/TogglePallate";
import CustomBlocks from "./CustomBlocks/CustomBlocks";
import Highlighter from "./ToggleInlineStyle/Highlighter";
import "../ToolBar/ToolBar.css";
import IncreaseIndent from "./ToggleInlineStyle/IncreaseIndent";
import DecreaseIndent from "./ToggleInlineStyle/DecreaseIndent";

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
        currentBlockData={props.currentBlockData}
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
