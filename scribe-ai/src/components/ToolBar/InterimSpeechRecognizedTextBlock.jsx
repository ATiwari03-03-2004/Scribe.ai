export default function InterimSpeechRecognizedTextBlock(props) {
  return (
    <div className="speech-box">
      {props.block.getText()}
    </div>
  );
}
