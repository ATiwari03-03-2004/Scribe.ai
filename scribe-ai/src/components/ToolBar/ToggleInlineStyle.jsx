import ToggleButton from "./ToggleButton";
import Font from "./Font";
import "../ToolBar/ToggleInlineStyle.css";

export default function ToggleInlineStyle(props) {
  return (
    <div className="inline-style">
      <Font
        handler={props.handleToggleInlineStyles}
        title={"Font"}
        isClose={props.isClose}
        handleDropDown={props.handleDropDown}
        activeStatus={props.activeStatus}
      />
      <ToggleButton
        handler={props.handleToggleInlineStyles}
        cmd={"BOLD"}
        title={"Bold"}
        icon={"format_bold"}
        active={props.activeStatus.has("BOLD")}
      />
      <ToggleButton
        handler={props.handleToggleInlineStyles}
        cmd={"ITALIC"}
        title={"Italics"}
        icon={"format_italic"}
        active={props.activeStatus.has("ITALIC")}
      />
      <ToggleButton
        handler={props.handleToggleInlineStyles}
        cmd={"UNDERLINE"}
        title={"Underline"}
        icon={"format_underlined"}
        active={props.activeStatus.has("UNDERLINE")}
      />
      <ToggleButton
        handler={props.handleToggleInlineStyles}
        cmd={"STRIKETHROUGH"}
        title={"Strike-through"}
        icon={"format_strikethrough"}
        active={props.activeStatus.has("STRIKETHROUGH")}
      />
      <ToggleButton
        handler={props.handleToggleInlineStyles}
        cmd={"HIGHLIGHT"}
        title={"Highlight"}
        icon={"format_ink_highlighter"}
        active={props.activeStatus.has("HIGHLIGHT")}
      />
      <ToggleButton
        handler={props.handleToggleInlineStyles}
        cmd={"SUBSCRIPT"}
        title={"Subscript"}
        icon={"subscript"}
        active={props.activeStatus.has("SUBSCRIPT")}
      />
      <ToggleButton
        handler={props.handleToggleInlineStyles}
        cmd={"SUPERSCRIPT"}
        title={"Superscript"}
        icon={"superscript"}
      />
    </div>
  );
}
