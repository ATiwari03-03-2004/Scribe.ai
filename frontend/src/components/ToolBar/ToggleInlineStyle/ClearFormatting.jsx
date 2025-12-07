import { RichUtils } from "draft-js";

export default function ClearFormatting(props) {
  let clearFormatting = () => {
    let newState = props.editorState;
    props.activeStatus._map._map._root?.entries.forEach((entry) => {
      newState = RichUtils.toggleInlineStyle(newState, entry[0]);
    });
    props.onChange(newState);
  };
  return (
    <div>
      <button
        onMouseDown={(e) => e.preventDefault()}
        title="Clear Formatting"
        onClick={clearFormatting}
        style={{
          cursor: "pointer",
        }}
      >
        <span className="material-symbols-outlined">format_clear</span>
      </button>
    </div>
  );
}
