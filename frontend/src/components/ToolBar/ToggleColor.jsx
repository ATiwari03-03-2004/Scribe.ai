export default function ToggleColor(props) {
  return (
    <button
      onMouseDown={(e) => e.preventDefault()}
      onClick={() => {
        props.handleToggleInlineStyles(props.cmd);
        props.handleDropDown(props.close);
      }}
      style={
        props.cmd === "COLOR-WHITE" || props.cmd === "COLOR-WHITE-SMOKE" || props.cmd === "HIGHLIGHT-WHITE" || props.cmd === "HIGHLIGHT-WHITE-SMOKE"
          ? {
              cursor: "pointer",
              backgroundColor: props.bgColor,
              height: "1.25rem",
              width: "1.25rem",
              borderRadius: "100%",
              margin: "0.05rem",
              border: "0.5px solid rgba(151, 150, 150, 0.25)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }
          : {
              cursor: "pointer",
              backgroundColor: props.bgColor,
              height: "1.25rem",
              width: "1.25rem",
              borderRadius: "100%",
              border: `1px solid ${props.bgColor}`,
              margin: "0.05rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }
      }
    >
      {props.activeColor === props.cmd ? (
        <span
          className="material-symbols-outlined"
          style={
            props.cmd === "COLOR-BLACK" ||
            props.cmd === "COLOR-CHARCOAL" ||
            props.cmd === "COLOR-RED" ||
            props.cmd === "COLOR-BRIGHT-RED" ||
            props.cmd === "COLOR-GRAY" ||
            props.cmd === "COLOR-DARK-PURPLE" ||
            props.cmd === "COLOR-BURGUNDY" ||
            props.cmd === "COLOR-BRONZE" ||
            props.cmd === "COLOR-OLIVE" ||
            props.cmd === "COLOR-HUNTER-GREEN" ||
            props.cmd === "COLOR-DARK-CYAN" ||
            props.cmd === "COLOR-PRUSSIAN-BLUE" ||
            props.cmd === "COLOR-NAVY" ||
            props.cmd === "COLOR-INDIGO" ||
            props.cmd === "COLOR-COPPER-ROSE" ||
            props.cmd === "COLOR-CERISE" ||
            props.cmd === "COLOR-PERU" ||
            props.cmd === "COLOR-BRASS" ||
            props.cmd === "COLOR-FERN-GREEN" ||
            props.cmd === "COLOR-TEAL" ||
            props.cmd === "COLOR-DENIM" ||
            props.cmd === "COLOR-SAPPHIRE" ||
            props.cmd === "COLOR-REBECCA-PURPLE" ||
            props.cmd === "COLOR-ROYAL-PURPLE" ||
            props.cmd === "COLOR-DARK-BROWN" ||
            props.cmd === "COLOR-BLUE" ||
            props.cmd === "HIGHLIGHT-BLACK" ||
            props.cmd === "HIGHLIGHT-CHARCOAL" ||
            props.cmd === "HIGHLIGHT-RED" ||
            props.cmd === "HIGHLIGHT-BRIGHT-RED" ||
            props.cmd === "HIGHLIGHT-GRAY" ||
            props.cmd === "HIGHLIGHT-DARK-PURPLE" ||
            props.cmd === "HIGHLIGHT-BURGUNDY" ||
            props.cmd === "HIGHLIGHT-BRONZE" ||
            props.cmd === "HIGHLIGHT-OLIVE" ||
            props.cmd === "HIGHLIGHT-HUNTER-GREEN" ||
            props.cmd === "HIGHLIGHT-DARK-CYAN" ||
            props.cmd === "HIGHLIGHT-PRUSSIAN-BLUE" ||
            props.cmd === "HIGHLIGHT-NAVY" ||
            props.cmd === "HIGHLIGHT-INDIGO" ||
            props.cmd === "HIGHLIGHT-COPPER-ROSE" ||
            props.cmd === "HIGHLIGHT-CERISE" ||
            props.cmd === "HIGHLIGHT-PERU" ||
            props.cmd === "HIGHLIGHT-BRASS" ||
            props.cmd === "HIGHLIGHT-FERN-GREEN" ||
            props.cmd === "HIGHLIGHT-TEAL" ||
            props.cmd === "HIGHLIGHT-DENIM" ||
            props.cmd === "HIGHLIGHT-SAPPHIRE" ||
            props.cmd === "HIGHLIGHT-REBECCA-PURPLE" ||
            props.cmd === "HIGHLIGHT-ROYAL-PURPLE" ||
            props.cmd === "HIGHLIGHT-DARK-BROWN" ||
            props.cmd === "HIGHLIGHT-BLUE"
              ? { color: "white" }
              : { color: "black" }
          }
        >
          check_small
        </span>
      ) : null}
    </button>
  );
}
