import EditorState from "draft-js/lib/EditorState";

export default function IncreaseIndent(props) {
  let IncrementIndent = () => {
    const selection = props.editorState.getSelection();
    const contentState = props.editorState.getCurrentContent();
    const blockKey = selection.getStartKey();
    const block = contentState.getBlockForKey(blockKey);
    const oldIndent = block.getData().get("indent") || 0;
    let newIndent = oldIndent + 1;
    if (newIndent === 31) newIndent = 30;
    const newData = block.getData().merge({ indent: newIndent });
    const newBlock = block.merge({ data: newData });
    const newContentState = contentState.merge({
      blockMap: contentState.getBlockMap().set(blockKey, newBlock),
    });
    props.onChange(
      EditorState.push(props.editorState, newContentState, "changed-block-data")
    );
  };

  return (
    <div>
      <button
        title="Increase Indent"
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => {
          IncrementIndent();
        }}
        style={{ cursor: "pointer" }}
      >
        <span className="material-symbols-outlined">
          format_indent_increase
        </span>
      </button>
    </div>
  );
}
