import ToggleButton from "../ToggleButton";
import Font from "./Font";
import "./ToggleInlineStyle.css";
import FontSize from "./FontSize";
import ClearFormatting from "./ClearFormatting";

export default function ToggleInlineStyle(props) {
  return (
    <div className="inline-style" style={{ paddingLeft: "0.35rem" }}>
      <div className="font-style-size">
        <Font
          handler={props.handleToggleInlineStyles}
          title={"Font"}
          isClose={props.isClose}
          handleDropDown={props.handleDropDown}
          activeStatus={props.activeStatus}
          editorState={props.editorState}
          onChange={props.onChange}
        />
        <FontSize
          handler={props.handleToggleInlineStyles}
          title={"Font Size"}
          isClose={props.isClose}
          handleDropDown={props.handleDropDown}
          activeStatus={props.activeStatus}
          editorState={props.editorState}
          onChange={props.onChange}
        />
      </div>
      <div className="container" style={{ width: "17.22rem" }}>
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
          active={props.activeStatus.has("SUPERSCRIPT")}
        />
        <ClearFormatting
          activeStatus={props.activeStatus}
          editorState={props.editorState}
          onChange={props.onChange}
        />
      </div>
    </div>
  );
}
