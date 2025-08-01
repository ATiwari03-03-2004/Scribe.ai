export default function InterimSpeechRecognizedTextBlock(props) {
  console.log(props.block);
  return (
    <div className="speech-box">
      {props.block.getText()}
    </div>
  );
}
