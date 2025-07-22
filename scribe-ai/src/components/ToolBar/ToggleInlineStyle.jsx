import ToggleButton from "./ToggleButton";

export default function ToggleInlineStyle(props) {
  return (
    <>
      <ToggleButton
        handler={props.handleToggleInlineStyles}
        cmd={"BOLD"}
        title={"Bold"}
        icon={"format_bold"}
      />
      <ToggleButton
        handler={props.handleToggleInlineStyles}
        cmd={"ITALIC"}
        title={"Italics"}
        icon={"format_italic"}
      />
      <ToggleButton
        handler={props.handleToggleInlineStyles}
        cmd={"UNDERLINE"}
        title={"Underline"}
        icon={"format_underlined"}
      />
      <ToggleButton
        handler={props.handleToggleInlineStyles}
        cmd={"STRIKETHROUGH"}
        title={"Strike-through"}
        icon={"format_strikethrough"}
      />
      <ToggleButton
        handler={props.handleToggleInlineStyles}
        cmd={"HIGHLIGHT"}
        title={"Highlight"}
        icon={"format_ink_highlighter"}
      />
    </>
  );
}
