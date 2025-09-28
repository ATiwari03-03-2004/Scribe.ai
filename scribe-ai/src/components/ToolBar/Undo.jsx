import EditorState from "draft-js/lib/EditorState";

export default function Undo(props) {
  let handleUndo = () => {
    props.onChange(EditorState.undo(props.editorState));
  };
  return (
    <button
      onMouseDown={(e) => e.preventDefault()}
      onClick={handleUndo}
      title="UNDO&#10;Ctrl + Z"
      style={{ cursor: "pointer" }}
    >
      <span class="material-symbols-outlined">undo</span>
    </button>
  );
}
