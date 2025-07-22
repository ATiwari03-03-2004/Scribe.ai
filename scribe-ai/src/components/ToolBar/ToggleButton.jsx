export default function ToggleButton(props) {
  return (
    <button
      onMouseDown={(e) => e.preventDefault()}
      onClick={() => props.handler(props.cmd)}
      style={{ cursor: "pointer" }}
      title={props.title}
    >
      <span className="material-symbols-outlined">{props.icon}</span>
    </button>
  );
}
