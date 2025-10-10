import { EditorBlock } from "draft-js";

export default function InterimSpeechRecognizedTextBlock(props) {
  console.log(props);
  return <EditorBlock {...props} />;
}
