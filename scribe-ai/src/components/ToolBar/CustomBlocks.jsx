import LinkBlock from "./LinkBlock";
import SpeechToText from "./SpeechToText";
import TextToSpeech from "./TextToSpeech";
import Undo from "./Undo";
import Redo from "./Redo";
import Image from "./Image";
import Video from "./Video";

export default function CustomBlocks(props) {
  return (
    <div>
      <LinkBlock editorState={props.editorState} onChange={props.onChange} />
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
      <Image editorState={props.editorState} onChange={props.onChange} />
      <Video editorState={props.editorState} onChange={props.onChange} />
    </div>
  );
}
