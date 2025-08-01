import InterimSpeechRecognizedTextBlock from "../../ToolBar/InterimSpeechRecognizedTextBlock";

export default function customBlockRenderer(block, sharedState) {
  if (block.getType() === "custom-speech-to-text") {
    console.log(sharedState)
    return {
      component: InterimSpeechRecognizedTextBlock,
      editable: true,
      props: sharedState,
    };
  }
  return null;
}
