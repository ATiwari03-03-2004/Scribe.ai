import { useEffect, useRef, useState } from "react";
import DropDown from "../DropDown/DropDown";

export default function FontSize(props) {
  let [fontSize, setFontSize] = useState("8");
  let buttonref = useRef(null);

  const fontSizes = [
    { key: "EIGHT", name: "8" },
    { key: "NINE", name: "9" },
    { key: "TEN", name: "10" },
    { key: "ELEVEN", name: "11" },
    { key: "TWELVE", name: "12" },
    { key: "FOURTEEN", name: "14" },
    { key: "SIXTEEN", name: "16" },
    { key: "EIGHTEEN", name: "18" },
    { key: "TWENTY", name: "20" },
    { key: "TWENTYTWO", name: "22" },
    { key: "TWENTYFOUR", name: "24" },
    { key: "TWENTYEIGHT", name: "28" },
    { key: "THIRTYSIX", name: "36" },
    { key: "FORTYEIGHT", name: "48" },
    { key: "SEVENTYTWO", name: "72" },
  ];

  const fontSizesMap = {
    EIGHT: "8",
    NINE: "9",
    TEN: "10",
    ELEVEN: "11",
    TWELVE: "12",
    FOURTEEN: "14",
    SIXTEEN: "16",
    EIGHTEEN: "18",
    TWENTY: "20",
    TWENTYTWO: "22",
    TWENTYFOUR: "24",
    TWENTYEIGHT: "28",
    THIRTYSIX: "36",
    FORTYEIGHT: "48",
    SEVENTYTWO: "72",
  };

  useEffect(() => {
    let activeFont = fontSizes.find((fontSize) =>
      props.activeStatus.has(fontSize.key)
    );
    if (activeFont) {
      setFontSize(
        fontSizesMap[
          props.activeStatus._map._list._tail.array[props.activeStatus.size - 1][0]
        ]
      );
    } else setFontSize("8");
  }, [props.activeStatus]);

  return (
    <>
      <button
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => props.handleDropDown("font-size")}
        title={props.title}
        style={{
          cursor: "pointer",
          paddingRight: "0px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "3rem",
        }}
        ref={buttonref}
      >
        <span>{fontSize}</span>
        {props.isClose.open && props.isClose.dropdown === "font-size" ? (
          <span className="material-symbols-outlined drop" style={{backgroundColor: "gray"}}>arrow_drop_up</span>
        ) : (
          <span className="material-symbols-outlined drop">arrow_drop_down</span>
        )}
      </button>
      {props.isClose.open && props.isClose.dropdown === "font-size" ? (
        <DropDown
          isClose={props.isClose}
          handleDropDown={props.handleDropDown}
          handler={props.handler}
          setFontSize={setFontSize}
          editorState={props.editorState}
          buttonref={buttonref}
          fontSizes={fontSizes}
        />
      ) : null}
    </>
  );
}
