import InterimSpeechRecognizedTextBlock from "../../ToolBar/CustomBlocks/InterimSpeechRecognizedTextBlock";
import MediaBlock from "../../ToolBar/CustomBlocks/MediaBlock";

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
      props: sharedState,
    }
  }
  return null;
}
