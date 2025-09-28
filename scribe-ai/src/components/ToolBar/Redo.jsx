import EditorState from "draft-js/lib/EditorState";

export default function Redo(props) {
  let handleRedo = () => {
    props.onChange(EditorState.redo(props.editorState));
  };
  return (
    <button
      onMouseDown={(e) => e.preventDefault()}
      onClick={handleRedo}
      title="REDO&#10;Ctrl + Y"
      style={{ cursor: "pointer" }}
    >
      <span class="material-symbols-outlined">redo</span>
    </button>
  );
}
