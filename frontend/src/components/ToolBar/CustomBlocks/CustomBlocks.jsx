import LinkBlock from "./LinkBlock";
import SpeechToText from "./SpeechToText";
import TextToSpeech from "./TextToSpeech";
import Undo from "./Undo";
import Redo from "./Redo";
import Image from "./Image";
import Video from "./Video";
import "./CustomBlocks.css";
import SpellChecker from "./SpellChecker";
import PersonalDictionary from "./PersonalDictionary";
import FindNReplace from "./FindNReplace";

export default function CustomBlocks(props) {
  return (
    <div className="custom-block" style={{ paddingRight: "0.35rem" }}>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <SpellChecker
          editorState={props.editorState}
          onChange={props.onChange}
          isClose={props.isClose}
          handleDropDown={props.handleDropDown}
          setMenu={props.setMenu}
        />
        <PersonalDictionary
          isClose={props.isClose}
          handleDropDown={props.handleDropDown}
        />
        <FindNReplace
          isClose={props.isClose}
          handleDropDown={props.handleDropDown}
          editorState={props.editorState}
          onChange={props.onChange}
        />
        <LinkBlock editorState={props.editorState} onChange={props.onChange} />
        <Image
          editorState={props.editorState}
          onChange={props.onChange}
          isClose={props.isClose}
          handleDropDown={props.handleDropDown}
        />
        <Video editorState={props.editorState} onChange={props.onChange} />
        <SpeechToText
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
        <TextToSpeech editorState={props.editorState} />
        <Undo editorState={props.editorState} onChange={props.onChange} />
        <Redo editorState={props.editorState} onChange={props.onChange} />
      </div>
    </div>
  );
}
