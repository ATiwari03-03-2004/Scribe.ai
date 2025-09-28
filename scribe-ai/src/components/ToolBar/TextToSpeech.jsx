export default function TextToSpeech(props) {
    // Temporary TTS -> will replace with gemini tts in backend
  let handleSpeech = () => {
    let text = props.editorState.getCurrentContent().getPlainText();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-IN';
    utterance.pitch = 1.5;
    utterance.rate = 0.8;
    utterance.volume = 1;

    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
        utterance.voice = voices[0];
    }
    window.speechSynthesis.speak(utterance);
  };
  return (
    <button
      onMouseDown={(e) => e.preventDefault()}
      onClick={handleSpeech}
      title="Text To Speech"
      style={{ cursor: "pointer" }}
    >
      <span className="material-symbols-outlined">text_to_speech</span>
    </button>
  );
}
