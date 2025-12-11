import DropDown from "../../DropDown/DropDown";

export default function PersonalDictionary(props) {
  return (
    <>
      <button
        onMouseDown={(e) => e.preventDefault()}
        title="View Personal Dictionary"
        onClick={() => props.handleDropDown("personal_dictionary")}
        style={{
          cursor: "pointer",
        }}
      >
        <span className="material-symbols-outlined">dictionary</span>
      </button>
      {props.isClose.open &&
      props.isClose.dropdown === "personal_dictionary" ? (
        <DropDown
          isClose={props.isClose}
          handleDropDown={props.handleDropDown}
        />
      ) : null}
    </>
  );
}
