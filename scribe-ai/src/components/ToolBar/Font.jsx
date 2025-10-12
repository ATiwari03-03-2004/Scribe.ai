import { useEffect, useRef, useState } from "react";
import DropDown from "../DropDown/DropDown";

export default function Font(props) {
  let [font, setFont] = useState("Arial");
  let buttonref = useRef(null);

  const fontStyles = [
    { key: "ARIAL", name: "Arial" },
    { key: "HELVETICA", name: "Helvetica" },
    { key: "VERDANA", name: "Verdana" },
    { key: "TAHOMA", name: "Tahoma" },
    { key: "TREBUCHET_MS", name: "Trebuchet MS" },
    { key: "SEGOE_UI", name: "Segoe UI" },
    { key: "GENEVA", name: "Geneva" },
    { key: "TIMES_NEW_ROMAN", name: "Times New Roman" },
    { key: "GEORGIA", name: "Georgia" },
    { key: "PALATINO_LINOTYPE", name: "Palatino Linotype" },
    { key: "BOOK_ANTIQUA", name: "Book Antiqua" },
    { key: "GARAMOND", name: "Garamond" },
    { key: "COURIER_NEW", name: "Courier New" },
    { key: "LUCIDA_CONSOLE", name: "Lucida Console" },
    { key: "MONACO", name: "Monaco" },
    { key: "CONSOLAS", name: "Consolas" },
    { key: "COMIC_SANS_MS", name: "Comic Sans MS" },
    { key: "BRUSH_SCRIPT_MT", name: "Brush Script MT" },
    { key: "IMPACT", name: "Impact" },
    { key: "FANTASY", name: "Fantasy" },
  ];

  useEffect(() => {
    let activeFont = fontStyles.find((fontStyle) =>
      props.activeStatus.has(fontStyle.key)
    );
    if (activeFont)
      setFont(
        props.activeStatus._map._list._tail.array[props.activeStatus.size - 1]
      );
    else setFont("Arial");
  }, [props.activeStatus]);

  return (
    <>
      <button
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => props.handleDropDown("font")}
        title={props.title}
        style={{ cursor: "pointer", paddingRight: "0px" }}
        ref={buttonref}
      >
        <span
          className="current-font"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "10rem",
          }}
        >
          <span>{font}</span>
          {props.isClose.open && props.isClose.dropdown === "font" ? (
            <span className="material-symbols-outlined">arrow_drop_up</span>
          ) : (
            <span className="material-symbols-outlined">arrow_drop_down</span>
          )}
        </span>
      </button>
      {props.isClose.open && props.isClose.dropdown === "font" ? (
        <DropDown
          isClose={props.isClose}
          handleDropDown={props.handleDropDown}
          handler={props.handler}
          setFont={setFont}
          editorState={props.editorState}
          buttonref={buttonref}
        />
      ) : null}
    </>
  );
}
