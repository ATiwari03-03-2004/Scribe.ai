import ToolBar from "../ToolBar/ToolBar";
import "../Navbar/Navbar.css";

export default function Navbar(props) {
  return (
    <div className="navbar">
      <div className="logo" title="Home">
        <img src="/Scribe_Black.png" alt="Scribe_logo" />
      </div>
      <ToolBar
        handleToggleInlineStyles={props.handleToggleInlineStyles}
        currentInlineStyle={props.currentInlineStyle}
        handleToggleBlockTypes={props.handleToggleBlockTypes}
        currentBlockStyle={props.currentBlockStyle}
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
      <div className="profile"></div>
    </div>
  );
}
