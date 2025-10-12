import { useEffect, useState } from "react";

export default function DropDown(props) {
  let [positions, setPositions] = useState({ left: "", top: "" });

  const fonts = [
    { key: "ARIAL", name: "Arial", style: "Arial, Helvetica, sans-serif" },
    {
      key: "HELVETICA",
      name: "Helvetica",
      style: "Helvetica, Arial, sans-serif",
    },
    { key: "VERDANA", name: "Verdana", style: "Verdana, Geneva, sans-serif" },
    { key: "TAHOMA", name: "Tahoma", style: "Tahoma, Geneva, sans-serif" },
    {
      key: "TREBUCHET_MS",
      name: "Trebuchet MS",
      style: "Trebuchet MS, Helvetica, sans-serif",
    },
    {
      key: "SEGOE_UI",
      name: "Segoe UI",
      style: "Segoe UI, Tahoma, Geneva, sans-serif",
    },
    { key: "GENEVA", name: "Geneva", style: "Geneva, Verdana, sans-serif" },
    {
      key: "TIMES_NEW_ROMAN",
      name: "Times New Roman",
      style: "Times New Roman, Times, serif",
    },
    {
      key: "GEORGIA",
      name: "Georgia",
      style: "Georgia, Times New Roman, serif",
    },
    {
      key: "PALATINO_LINOTYPE",
      name: "Palatino Linotype",
      style: "Palatino Linotype, Palatino, serif",
    },
    {
      key: "BOOK_ANTIQUA",
      name: "Book Antiqua",
      style: "Book Antiqua, Palatino, serif",
    },
    {
      key: "GARAMOND",
      name: "Garamond",
      style: "Garamond, Times New Roman, serif",
    },
    {
      key: "COURIER_NEW",
      name: "Courier New",
      style: "Courier New, Courier, monospace",
    },
    {
      key: "LUCIDA_CONSOLE",
      name: "Lucida Console",
      style: "Lucida Console, Monaco, monospace",
    },
    {
      key: "MONACO",
      name: "Monaco",
      style: "Monaco, Lucida Console, monospace",
    },
    {
      key: "CONSOLAS",
      name: "Consolas",
      style: "Consolas, Courier New, monospace",
    },
    {
      key: "COMIC_SANS_MS",
      name: "Comic Sans MS",
      style: "Comic Sans MS, cursive, sans-serif",
    },
    {
      key: "BRUSH_SCRIPT_MT",
      name: "Brush Script MT",
      style: "Brush Script MT, cursive, sans-serif",
    },
    { key: "IMPACT", name: "Impact", style: "Impact, Charcoal, sans-serif" },
    { key: "FANTASY", name: "Fantasy", style: "Fantasy, cursive, sans-serif" },
  ];

  useEffect(() => {
    if (props.isClose.open && props.buttonref) {
      setPositions((prev) => {
        return {
          left:
            props.buttonref.current.getBoundingClientRect().left +
            window.scrollX,
          top:
            props.buttonref.current.getBoundingClientRect().bottom +
            window.scrollY,
        };
      });
    }
  }, [props.isClose, props.buttonref]);

  return (
    <>
      {!props.isClose.open ? null : props.isClose.dropdown === "image" ? (
        <div
          style={{
            position: "absolute",
            left: `${positions.left}px`,
            top: `${positions.top}px`,
            width: "5.5rem",
          }}
          className="DD"
        >
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => props.handleImageURL()}
            style={{ cursor: "pointer", width: "5.6rem", border: "1px solid gray" }}
          >
            Embed URL
          </button>
          <br />
          <label
            htmlFor="img"
            className="DDItem"
            style={{
              cursor: "pointer",
              width: "5.5rem",
              backgroundColor: "rgb(240, 240, 240)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              border: "1px solid gray",
            }}
          >
            Choose File
          </label>
          <input
            type="file"
            name="img"
            id="img"
            accept="image/*"
            onChange={props.handleImageFile}
            style={{ display: "none" }}
          />
        </div>
      ) : props.isClose.dropdown === "font" ? (
        <div
          style={{
            position: "absolute",
            left: `${positions.left}px`,
            top: `${positions.top}px`,
            display: "flex",
            flexDirection: "column",
            width: "10.5rem",
          }}
          className="DD"
        >
          {fonts.map((font) => (
            <button
              key={font.key}
              className="font"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                props.handler(font.key);
                props.handleDropDown("");
                props.setFont(font.name);
              }}
              style={{
                cursor: "pointer",
                fontFamily: font.style,
              }}
            >
              {font.name}
            </button>
          ))}
        </div>
      ) : props.isClose.dropdown === "font-size" ? (
        <div
          style={{
            position: "absolute",
            left: `${positions.left}px`,
            top: `${positions.top}px`,
            display: "flex",
            flexDirection: "column",
            width: "3rem",
          }}
          className="DD"
        >
          {props.fontSizes.map((fontSize) => (
            <button
              key={fontSize.key}
              className="font-size"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                props.handler(fontSize.key);
                props.handleDropDown("");
                props.setFontSize(fontSize.name);
              }}
              style={{
                cursor: "pointer",
              }}
            >
              {fontSize.name}
            </button>
          ))}
        </div>
      ) : null}
    </>
  );
}
