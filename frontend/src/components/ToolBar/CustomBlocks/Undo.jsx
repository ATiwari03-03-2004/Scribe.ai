import EditorState from "draft-js/lib/EditorState";

export default function Undo(props) {
  let handleUndo = () => {
    props.onChange(EditorState.undo(props.editorState));
  };
  return (
    <button
      onMouseDown={(e) => e.preventDefault()}
      onClick={handleUndo}
      title="UNDO"
      style={{ cursor: "pointer" }}
    >
      <span className="material-symbols-outlined">undo</span>
    </button>
  );
}
