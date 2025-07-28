import { Modifier, EditorState } from "draft-js";

export default function LinkBlock(props) {
  let handleClick = () => {
    const url = prompt("Enter URL/LINK to be added: ");
    let selectionState = props.editorState.getSelection();
    let contentState = props.editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      "LINK",
      "MUTABLE",
      {
        url: url,
      }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    let contentStateWithLink;
    if (selectionState.isCollapsed()) {
      contentStateWithLink = Modifier.insertText(
        contentState,
        selectionState,
        url,
        null,
        entityKey
      );
      const offset =
        selectionState.getAnchorOffset() + url.length;
      selectionState = selectionState.merge({
        anchorOffset: offset,
        focusOffset: offset,
        isBackward: false,
      });
    } else {
      contentStateWithLink = Modifier.applyEntity(
        contentStateWithEntity,
        selectionState,
        entityKey
      );
    }
    let newEditorState = EditorState.push(
      props.editorState,
      contentStateWithLink,
      "insert-characters"
    );
    props.onChange(newEditorState);
  };
  return (
    <button
      onMouseDown={(e) => e.preventDefault()}
      onClick={handleClick}
      title="Link"
    >
      <span className="material-symbols-outlined">link</span>
    </button>
  );
}
