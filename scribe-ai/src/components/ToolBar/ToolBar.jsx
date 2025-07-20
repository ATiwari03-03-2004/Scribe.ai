import ToggleButton from "./ToggleButton";
import TogglePallate from "./TogglePallate";

function ToolBar(props) {
  return (
    <div className="tool-bar">
      <ToggleButton
        handleToggleInlineStyles={props.handleToggleInlineStyles}
        cmd={"BOLD"}
        title={"Bold"}
        icon={"format_bold"}
      />
      <ToggleButton
        handleToggleInlineStyles={props.handleToggleInlineStyles}
        cmd={"ITALIC"}
        title={"Italics"}
        icon={"format_italic"}
      />
      <ToggleButton
        handleToggleInlineStyles={props.handleToggleInlineStyles}
        cmd={"UNDERLINE"}
        title={"Underline"}
        icon={"format_underlined"}
      />
      <ToggleButton
        handleToggleInlineStyles={props.handleToggleInlineStyles}
        cmd={"STRIKETHROUGH"}
        title={"Strike-through"}
        icon={"format_strikethrough"}
      />
      <ToggleButton
        handleToggleInlineStyles={props.handleToggleInlineStyles}
        cmd={"HIGHLIGHT"}
        title={"Highlight"}
        icon={"format_ink_highlighter"}
      />
      <TogglePallate
        handleToggleInlineStyles={props.handleToggleInlineStyles}
      />
    </div>
  );
}

export default ToolBar;
