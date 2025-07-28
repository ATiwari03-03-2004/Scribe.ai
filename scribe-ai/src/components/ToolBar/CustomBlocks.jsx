import LinkBlock from "./LinkBlock";
import SpeechToText from "./SpeechToText";

export default function CustomBlocks(props) {
  return (
    <div>
      <LinkBlock editorState={props.editorState} onChange={props.onChange} />
    </div>
  );
}
