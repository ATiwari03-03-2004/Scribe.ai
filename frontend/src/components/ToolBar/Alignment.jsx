import { useRef, useState } from "react";
import DropDown from "../DropDown/DropDown";

export default function Alignment(props) {
  let [alignmentType, setAlignmentType] = useState("format_align_left");
  let buttonref = useRef(null);
  return (
    <div>
      <button
        onMouseDown={(e) => e.preventDefault()}
        title="Text Align"
        onClick={() => props.handleDropDown("alignment")}
        style={{
          height: "2.1rem",
          cursor: "pointer",
          paddingRight: "0px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
        ref={buttonref}
      >
        <span
          className="material-symbols-outlined"
          style={{ marginRight: "0.25rem" }}
        >
          {alignmentType}
        </span>
        {props.isClose.open && props.isClose.dropdown === "alignment" ? (
          <span
            className="material-symbols-outlined drop"
            style={{ backgroundColor: "gray" }}
          >
            arrow_drop_up
          </span>
        ) : (
          <span className="material-symbols-outlined drop">
            arrow_drop_down
          </span>
        )}
      </button>
      {props.isClose.open && props.isClose.dropdown === "alignment" ? (
        <DropDown
          handleToggleBlockTypes={props.handleToggleBlockTypes}
          editorState={props.editorState}
          editorRef={props.editorRef}
          isClose={props.isClose}
          handleDropDown={props.handleDropDown}
          activeStatus={props.activeStatus}
          buttonref={buttonref}
          setAlignmentType={setAlignmentType}
          onChange={props.onChange}
        />
      ) : null}
    </div>
  );
}
