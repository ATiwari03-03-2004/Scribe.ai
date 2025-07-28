import ToggleBlockStyle from "./ToggleBlockStyle";
import ToggleInlineStyle from "./ToggleInlineStyle";
import TogglePallate from "./TogglePallate";
import CustomBlocks from "./CustomBlocks";

function ToolBar(props) {
  return (
    <div className="tool-bar" style={{zIndex: 2, position: "fixed", top: 0, width: "100%", height: "9rem", marginBottom: "1rem", backgroundColor: "#f5f5f5" }}>
      <ToggleInlineStyle
        handleToggleInlineStyles={props.handleToggleInlineStyles}
        activeStatus={props.currentInlineStyle}
      />
      <TogglePallate
        handleToggleInlineStyles={props.handleToggleInlineStyles}
        activeStatus={props.currentInlineStyle}
      />
      <ToggleBlockStyle handleToggleBlockTypes={props.handleToggleBlockTypes} />
      <CustomBlocks editorState={props.editorState} onChange={props.onChange} />
    </div>
  );
}

export default ToolBar;
