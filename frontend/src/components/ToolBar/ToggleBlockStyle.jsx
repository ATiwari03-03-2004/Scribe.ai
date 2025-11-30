import ToggleButton from "./ToggleButton";
import Alignment from "./Alignment";
import "./ToggleBlockStyle.css";

export default function ToggleBlockStyle(props) {
  return (
    <div className="block">
      <div>
        <ToggleButton
          handler={props.handleToggleBlockTypes}
          cmd={"header-one"}
          title={"Header one"}
          icon={"format_h1"}
          active={props.activeStatus === "header-one"}
        />
        <ToggleButton
          handler={props.handleToggleBlockTypes}
          cmd={"header-two"}
          title={"Header two"}
          icon={"format_h2"}
          active={props.activeStatus === "header-two"}
        />
        <ToggleButton
          handler={props.handleToggleBlockTypes}
          cmd={"header-three"}
          title={"Header three"}
          icon={"format_h3"}
          active={props.activeStatus === "header-three"}
        />
        <ToggleButton
          handler={props.handleToggleBlockTypes}
          cmd={"header-four"}
          title={"Header four"}
          icon={"format_h4"}
          active={props.activeStatus === "header-four"}
        />
        <ToggleButton
          handler={props.handleToggleBlockTypes}
          cmd={"header-five"}
          title={"Header five"}
          icon={"format_h5"}
          active={props.activeStatus === "header-five"}
        />
        <ToggleButton
          handler={props.handleToggleBlockTypes}
          cmd={"header-six"}
          title={"Header six"}
          icon={"format_h6"}
          active={props.activeStatus === "header-six"}
        />
        <ToggleButton
          handler={props.handleToggleBlockTypes}
          cmd={"code-block"}
          title={"Code"}
          icon={"code"}
          active={props.activeStatus === "code-block"}
        />
        <ToggleButton
          handler={props.handleToggleBlockTypes}
          cmd={"blockquote"}
          title={"Quote"}
          icon={"format_quote"}
          active={props.activeStatus === "blockquote"}
        />
        <ToggleButton
          handler={props.handleToggleBlockTypes}
          cmd={"unordered-list-item"}
          title={"Bullets"}
          icon={"format_list_bulleted"}
          active={props.activeStatus === "unordered-list-item"}
        />
        <ToggleButton
          handler={props.handleToggleBlockTypes}
          cmd={"ordered-list-item"}
          title={"Numbering"}
          icon={"format_list_numbered"}
          active={props.activeStatus === "ordered-list-item"}
        />
        <Alignment
          activeStatus={props.activeStatus}
          handleToggleBlockTypes={props.handleToggleBlockTypes}
          editorState={props.editorState}
          isClose={props.isClose}
          handleDropDown={props.handleDropDown}
          onChange={props.onChange}
        />
      </div>
    </div>
  );
}
