import { AtomicBlockUtils } from "draft-js";
import { useState } from "react";

export default function Image(props) {
  let [isClose, setIsClose] = useState(true);

  let handleDropDown = () => {
    setIsClose((prev) => !prev);
  };

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
    handleDropDown();
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
  }

  return (
    <>
      <button
        onMouseDown={(e) => e.preventDefault()}
        title="Embed Image"
        onClick={handleDropDown}
        style={{ cursor: "pointer" }}
      >
        <span className="material-symbols-outlined">image</span>
      </button>
      {isClose ? null : (
        <div style={{ position: "absolute", left: "19.25rem" }} className="DD">
          <button
            className="DDItem"
            onMouseDown={(e) => e.preventDefault()}
            onClick={handleImageURL}
            style={{ cursor: "pointer" }}
          >
            Embed URL
          </button>
          <br />
          <label htmlFor="img" className="DDItem" style={{ cursor: "pointer" }}>
            Choose file
          </label>
          <input
            type="file"
            name="img"
            id="img"
            accept="image/*"
            onChange={handleImageFile}
            style={{ display: "none" }}
          />
        </div>
      )}
    </>
  );
}
