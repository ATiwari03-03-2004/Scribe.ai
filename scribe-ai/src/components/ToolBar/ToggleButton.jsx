export default function ToggleButton(props) {
  return (
    <button
      onMouseDown={(e) => e.preventDefault()}
      onClick={() => props.handler(props.cmd)}
      title={props.title}
      style={
        props.active
          ? {
              cursor: "pointer",
              border: "1px solid black",
              backgroundColor: "#ddd",
            }
          : { cursor: "pointer" }
      }
    >
      <span className="material-symbols-outlined">{props.icon}</span>
    </button>
  );
}
