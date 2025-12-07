import { AtomicBlockUtils } from "draft-js";
import DropDown from "../../DropDown/DropDown";
import { useRef } from "react";

export default function Image(props) {
  let buttonref = useRef(null);

  let handleImageURLEmbed = (URL) => {
    const contentState = props.editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      "IMAGE",
      "IMMUTABLE",
      { src: URL }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = AtomicBlockUtils.insertAtomicBlock(
      props.editorState,
      entityKey,
      " "
    );
    props.onChange(newEditorState);
    props.handleDropDown("");
  };

  let handleImageFile = (e) => {
    let base64String = "";
    let reader = new FileReader();
    reader.onload = function () {
      base64String = reader.result;
      if (base64String) handleImageURLEmbed(base64String);
    };
    reader.onerror = function () {
      alert("Something went wrong with Image embeding!");
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  let handleImageURL = () => {
    const URL = prompt("Enter image URL to be embedded:");
    if (URL) handleImageURLEmbed(URL);
  };

  return (
    <>
      <button
        onMouseDown={(e) => e.preventDefault()}
        title="Embed Image"
        onClick={() => props.handleDropDown("image")}
        style={{ height: "2.1rem", cursor: "pointer", paddingRight: "0px", display: "flex", alignItems: "center", justifyContent: "space-between" }}
        ref={buttonref}
      >
        <span className="material-symbols-outlined">image</span>
        {props.isClose.open && props.isClose.dropdown === "image" ? (
          <span className="material-symbols-outlined drop" style={{backgroundColor: "gray"}}>arrow_drop_up</span>
        ) : (
          <span className="material-symbols-outlined drop">arrow_drop_down</span>
        )}
      </button>
      {props.isClose.open && props.isClose.dropdown === "image" ? (
        <DropDown
          isClose={props.isClose}
          handleImageURL={handleImageURL}
          handleImageFile={handleImageFile}
          buttonref={buttonref}
        />
      ) : null}
    </>
  );
}
