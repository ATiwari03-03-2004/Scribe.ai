import { useEffect, useRef, useState } from "react";
import DropDown from "../../DropDown/DropDown";

export default function Header(props) {
  let [textType, setTextType] = useState("Normal Text");
  let buttonref = useRef(null);
  useEffect(() => {
    if (props.active === "header-one") {
      setTextType("Title");
    } else if (props.active === "header-two") {
      setTextType("Subtitle");
    } else if (props.active === "header-three") {
      setTextType("Heading 1");
    } else if (props.active === "header-four") {
      setTextType("Heading 2");
    } else if (props.active === "header-five") {
      setTextType("Heading 3");
    } else if (props.active === "header-six") {
      setTextType("Heading 4");
    } else {
      setTextType("Normal Text");
    }
  }, [props.active]);
  return (
    <div
      className="text-type"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <button
        onMouseDown={(e) => e.preventDefault()}
        title="Text Type"
        onClick={() => props.handleDropDown("text_type")}
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
        <span>{textType}</span>
        {props.isClose.open && props.isClose.dropdown === "text_type" ? (
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
      {props.isClose.open && props.isClose.dropdown === "text_type" ? (
        <DropDown
          isClose={props.isClose}
          handleDropDown={props.handleDropDown}
          handler={props.handler}
          active={props.active}
          buttonref={buttonref}
          editorState={props.editorState}
          editorRef={props.editorRef}
          onChange={props.onChange}
          textType={textType}
          setTextType={setTextType}
        />
      ) : null}
    </div>
  );
}
