export default function ToggleColor(props) {
  return (
    <button
      onMouseDown={(e) => e.preventDefault()}
      onClick={() => props.handleToggleInlineStyles(props.cmd)}
      style={
        props.active
          ? {
              cursor: "pointer",
              backgroundColor: props.bgColor,
              height: "2.45rem",
              width: "2.45rem",
              opacity: "0.8",
              border: "1px solid black",
            }
          : {
              cursor: "pointer",
              backgroundColor: props.bgColor,
              height: "2.45rem",
              width: "2.45rem",
              border: `1px solid ${props.bgColor}`,
            }
      }
    ></button>
  );
}
