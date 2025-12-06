import ToggleButton from "./ToggleButton";
import Alignment from "./Alignment";
import "./ToggleBlockStyle.css";
import Header from "./Header";

export default function ToggleBlockStyle(props) {
  return (
    <div className="block">
      <div>
        <Header
          handler={props.handleToggleBlockTypes}
          isClose={props.isClose}
          handleDropDown={props.handleDropDown}
          editorRef={props.editorRef}
          onChange={props.onChange}
          editorState={props.editorState}
          active={props.activeStatus}
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
          editorRef={props.editorRef}
          onChange={props.onChange}
          currentBlockData={props.currentBlockData}
        />
      </div>
    </div>
  );
}
