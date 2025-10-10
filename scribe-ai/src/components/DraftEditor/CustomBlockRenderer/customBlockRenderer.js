import InterimSpeechRecognizedTextBlock from "../../ToolBar/InterimSpeechRecognizedTextBlock";
import ImageBlock from "../../ToolBar/ImageBlock";

export default function customBlockRenderer(block, sharedState) {
  if (block.getType() === "custom-speech-to-text") {
    return {
      component: InterimSpeechRecognizedTextBlock,
      editable: true,
      props: sharedState,
    };
  } else if (block.getType() === "atomic") {
    return {
      component: ImageBlock,
      editable: false,
    }
  }
  return null;
}
