import { useEffect, useRef, useState } from "react";
import DropDown from "../../DropDown/DropDown";

export default function Font(props) {
  let [font, setFont] = useState("Arial");
  let buttonref = useRef(null);

  const fontStyles = [
    { key: "FONT-ARIAL", name: "Arial" },
    { key: "FONT-HELVETICA", name: "Helvetica" },
    { key: "FONT-VERDANA", name: "Verdana" },
    { key: "FONT-TAHOMA", name: "Tahoma" },
    { key: "FONT-TREBUCHET_MS", name: "Trebuchet MS" },
    { key: "FONT-SEGOE_UI", name: "Segoe UI" },
    { key: "FONT-GENEVA", name: "Geneva" },
    { key: "FONT-TIMES_NEW_ROMAN", name: "Times New Roman" },
    { key: "FONT-GEORGIA", name: "Georgia" },
    { key: "FONT-PALATINO_LINOTYPE", name: "Palatino Linotype" },
    { key: "FONT-BOOK_ANTIQUA", name: "Book Antiqua" },
    { key: "FONT-GARAMOND", name: "Garamond" },
    { key: "FONT-COURIER_NEW", name: "Courier New" },
    { key: "FONT-LUCIDA_CONSOLE", name: "Lucida Console" },
    { key: "FONT-MONACO", name: "Monaco" },
    { key: "FONT-CONSOLAS", name: "Consolas" },
    { key: "FONT-COMIC_SANS_MS", name: "Comic Sans MS" },
    { key: "FONT-BRUSH_SCRIPT_MT", name: "Brush Script MT" },
    { key: "FONT-IMPACT", name: "Impact" },
    { key: "FONT-FANTASY", name: "Fantasy" },
  ];

  const fontStylesMap = {
    "FONT-ARIAL": "Arial",
    "FONT-HELVETICA": "Helvetica",
    "FONT-VERDANA": "Verdana",
    "FONT-TAHOMA": "Tahoma",
    "FONT-TREBUCHET_MS": "Trebuchet MS",
    "FONT-SEGOE_UI": "Segoe UI",
    "FONT-GENEVA": "Geneva",
    "FONT-TIMES_NEW_ROMAN": "Times New Roman",
    "FONT-GEORGIA": "Georgia",
    "FONT-PALATINO_LINOTYPE": "Palatino Linotype",
    "FONT-BOOK_ANTIQUA": "Book Antiqua",
    "FONT-GARAMOND": "Garamond",
    "FONT-COURIER_NEW": "Courier New",
    "FONT-LUCIDA_CONSOLE": "Lucida Console",
    "FONT-MONACO": "Monaco",
    "FONT-CONSOLAS": "Consolas",
    "FONT-COMIC_SANS_MS": "Comic Sans MS",
    "FONT-BRUSH_SCRIPT_MT": "Brush Script MT",
    "FONT-IMPACT": "Impact",
    "FONT-FANTASY": "Fantasy",
  };

  useEffect(() => {
    let key = "ARIAL";
    let activeFont = fontStyles.find((fontStyle) =>
      props.activeStatus.has(fontStyle.key)
    );
    if (!activeFont) {
      setFont("Arial");
      return;
    }
    props.activeStatus._map._list._tail.array.forEach((arr) => {
      if (arr?.[0] && fontStylesMap[arr[0]]) {
        key = arr[0];
      }
    });
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
          width: "12.3rem",
          height: "2rem",
        }}
        ref={buttonref}
      >
        <span>{font}</span>
        {props.isClose.open && props.isClose.dropdown === "font" ? (
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
      {props.isClose.open && props.isClose.dropdown === "font" ? (
        <DropDown
          isClose={props.isClose}
          handleDropDown={props.handleDropDown}
          handler={props.handler}
          setFont={setFont}
          activeStatus={props.activeStatus}
          editorState={props.editorState}
          onChange={props.onChange}
          buttonref={buttonref}
        />
      ) : null}
    </>
  );
}
