export default function ToggleColor(props) {
  return (
    <button
      onMouseDown={(e) => e.preventDefault()}
      onClick={() => props.handleToggleInlineStyles(props.cmd)}
      style={{ cursor: "pointer", backgroundColor: props.bgColor, height: "2.45rem", width: "2.45rem", border: `1px solid ${props.bgColor}` }}
    ></button>
  );
}
