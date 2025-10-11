import InterimSpeechRecognizedTextBlock from "../../ToolBar/InterimSpeechRecognizedTextBlock";
import MediaBlock from "../../ToolBar/MediaBlock";

export default function customBlockRenderer(block, sharedState) {
  if (block.getType() === "custom-speech-to-text") {
    return {
      component: InterimSpeechRecognizedTextBlock,
      editable: true,
      props: sharedState,
    };
  } else if (block.getType() === "atomic") {
    return {
      component: MediaBlock,
      editable: false,
    }
  }
  return null;
}
