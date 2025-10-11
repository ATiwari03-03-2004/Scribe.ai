import ToggleBlockStyle from "./ToggleBlockStyle";
import ToggleInlineStyle from "./ToggleInlineStyle";
import TogglePallate from "./TogglePallate";
import CustomBlocks from "./CustomBlocks";
import "../ToolBar/ToolBar.css"

export default function ToolBar(props) {
  return (
    <div className="tool-bar">
      <ToggleInlineStyle
        handleToggleInlineStyles={props.handleToggleInlineStyles}
        activeStatus={props.currentInlineStyle}
      />
      <TogglePallate
        handleToggleInlineStyles={props.handleToggleInlineStyles}
        activeStatus={props.currentInlineStyle}
      />
      <ToggleBlockStyle handleToggleBlockTypes={props.handleToggleBlockTypes} activeStatus={props.currentBlockStyle} />
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
      />
    </div>
  );
}
