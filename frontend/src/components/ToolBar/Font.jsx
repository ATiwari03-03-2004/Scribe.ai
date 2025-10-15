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

  const fontStylesMap = {
    ARIAL: "Arial",
    HELVETICA: "Helvetica",
    VERDANA: "Verdana",
    TAHOMA: "Tahoma",
    TREBUCHET_MS: "Trebuchet MS",
    SEGOE_UI: "Segoe UI",
    GENEVA: "Geneva",
    TIMES_NEW_ROMAN: "Times New Roman",
    GEORGIA: "Georgia",
    PALATINO_LINOTYPE: "Palatino Linotype",
    BOOK_ANTIQUA: "Book Antiqua",
    GARAMOND: "Garamond",
    COURIER_NEW: "Courier New",
    LUCIDA_CONSOLE: "Lucida Console",
    MONACO: "Monaco",
    CONSOLAS: "Consolas",
    COMIC_SANS_MS: "Comic Sans MS",
    BRUSH_SCRIPT_MT: "Brush Script MT",
    IMPACT: "Impact",
    FANTASY: "Fantasy",
  };

  useEffect(() => {
    let key = "ARIAL";
    let activeFont = fontStyles.find((fontStyle) =>
      props.activeStatus.has(fontStyle.key)
    );
    if (!activeFont) {
      setFont("Arial")
      return;
    }
    props.activeStatus._map._list._tail.array.forEach(arr => {
      if (arr?.[0] && fontStylesMap[arr[0]]) {
        key = arr[0];
      }
    })
    setFont(fontStylesMap[key]);
  }, [props.activeStatus]);

  return (
    <>
      <button
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => props.handleDropDown("font")}
        title={props.title}
        style={{
          cursor: "pointer",
          paddingRight: "0px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "10.5rem",
        }}
        ref={buttonref}
      >
        <span>{font}</span>
        {props.isClose.open && props.isClose.dropdown === "font" ? (
          <span className="material-symbols-outlined drop" style={{backgroundColor: "gray"}}>arrow_drop_up</span>
        ) : (
          <span className="material-symbols-outlined drop">arrow_drop_down</span>
        )}
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
