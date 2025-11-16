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
              height: "2rem",
              width: "2rem",
              opacity: "0.8",
              border: "1px solid black",
            }
          : {
              cursor: "pointer",
              backgroundColor: props.bgColor,
              height: "2rem",
              width: "2rem",
              border: `1px solid ${props.bgColor}`,
            }
      }
    ></button>
  );
}
