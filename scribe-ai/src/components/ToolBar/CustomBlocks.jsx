import LinkBlock from "./LinkBlock";
import SpeechToText from "./SpeechToText";
import TextToSpeech from "./TextToSpeech";

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
      <TextToSpeech />
    </div>
  );
}
