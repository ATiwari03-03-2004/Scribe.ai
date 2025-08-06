export default function TextToSpeech() {
  return (
    <button
      onMouseDown={(e) => e.preventDefault()}
      title="Text To Speech"
      style={{ cursor: "pointer" }}
    >
      <span class="material-symbols-outlined">text_to_speech</span>
    </button>
  );
}
