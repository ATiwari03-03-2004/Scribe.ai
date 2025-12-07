import { useEffect, useRef, useState } from "react";
import DropDown from "../../DropDown/DropDown";

export default function FontSize(props) {
  let [fontSize, setFontSize] = useState("11");
  let buttonref = useRef(null);

  const fontSizes = [
    { key: "FONTSIZE-EIGHT", name: "8" },
    { key: "FONTSIZE-NINE", name: "9" },
    { key: "FONTSIZE-TEN", name: "10" },
    { key: "FONTSIZE-ELEVEN", name: "11" },
    { key: "FONTSIZE-TWELVE", name: "12" },
    { key: "FONTSIZE-THIRTEEN", name: "13" },
    { key: "FONTSIZE-FOURTEEN", name: "14" },
    { key: "FONTSIZE-FIFTEEN", name: "15" },
    { key: "FONTSIZE-SIXTEEN", name: "16" },
    { key: "FONTSIZE-SEVENTEEN", name: "17" },
    { key: "FONTSIZE-EIGHTEEN", name: "18" },
    { key: "FONTSIZE-TWENTY", name: "20" },
    { key: "FONTSIZE-TWENTYTWO", name: "22" },
    { key: "FONTSIZE-TWENTYFOUR", name: "24" },
    { key: "FONTSIZE-TWENTYSIX", name: "26" },
    { key: "FONTSIZE-TWENTYEIGHT", name: "28" },
    { key: "FONTSIZE-THIRTY", name: "30" },
    { key: "FONTSIZE-THIRTYTWO", name: "32" },
    { key: "FONTSIZE-THIRTYSIX", name: "36" },
    { key: "FONTSIZE-FORTY", name: "40" },
    { key: "FONTSIZE-FORTYEIGHT", name: "48" },
    { key: "FONTSIZE-FIFTYFOUR", name: "54" },
    { key: "FONTSIZE-SIXTY", name: "60" },
    { key: "FONTSIZE-SEVENTYTWO", name: "72" },
    { key: "FONTSIZE-EIGHTY", name: "80" },
    { key: "FONTSIZE-NINETY", name: "90" },
    { key: "FONTSIZE-HUNDRED", name: "100" },
  ];

  const fontSizesMap = {
    "FONTSIZE-EIGHT": "8",
    "FONTSIZE-NINE": "9",
    "FONTSIZE-TEN": "10",
    "FONTSIZE-ELEVEN": "11",
    "FONTSIZE-TWELVE": "12",
    "FONTSIZE-THIRTEEN": "13",
    "FONTSIZE-FOURTEEN": "14",
    "FONTSIZE-FIFTEEN": "15",
    "FONTSIZE-SIXTEEN": "16",
    "FONTSIZE-SEVENTEEN": "17",
    "FONTSIZE-EIGHTEEN": "18",
    "FONTSIZE-TWENTY": "20",
    "FONTSIZE-TWENTYTWO": "22",
    "FONTSIZE-TWENTYFOUR": "24",
    "FONTSIZE-TWENTYSIX": "26",
    "FONTSIZE-TWENTYEIGHT": "28",
    "FONTSIZE-THIRTY": "30",
    "FONTSIZE-THIRTYTWO": "32",
    "FONTSIZE-THIRTYSIX": "36",
    "FONTSIZE-FORTY": "40",
    "FONTSIZE-FORTYEIGHT": "48",
    "FONTSIZE-FIFTYFOUR": "54",
    "FONTSIZE-SIXTY": "60",
    "FONTSIZE-SEVENTYTWO": "72",
    "FONTSIZE-EIGHTY": "80",
    "FONTSIZE-NINETY": "90",
    "FONTSIZE-HUNDRED": "100",
  };

  useEffect(() => {
    let key = "FONTSIZE-ELEVEN";
    let activeFontSize = fontSizes.find((fontSize) =>
      props.activeStatus.has(fontSize.key)
    );
    if (!activeFontSize) {
      setFontSize("11");
      return;
    }
    props.activeStatus._map._list._tail.array.forEach((arr) => {
      if (arr?.[0] && fontSizesMap[arr[0]]) {
        key = arr[0];
      }
    });
    setFontSize(fontSizesMap[key]);
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
          width: "4.8rem",
          height: "2rem",
        }}
        ref={buttonref}
      >
        <span>{fontSize}</span>
        {props.isClose.open && props.isClose.dropdown === "font-size" ? (
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
      {props.isClose.open && props.isClose.dropdown === "font-size" ? (
        <DropDown
          isClose={props.isClose}
          handleDropDown={props.handleDropDown}
          handler={props.handler}
          setFontSize={setFontSize}
          activeStatus={props.activeStatus}
          buttonref={buttonref}
          fontSizes={fontSizes}
          editorState={props.editorState}
          onChange={props.onChange}
        />
      ) : null}
    </>
  );
}
