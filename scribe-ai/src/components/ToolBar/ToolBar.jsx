import ToggleBlockStyle from "./ToggleBlockStyle";
import ToggleInlineStyle from "./ToggleInlineStyle";
import TogglePallate from "./TogglePallate";

function ToolBar(props) {
  return (
    <div className="tool-bar" style={{zIndex: 2, position: "fixed", top: 0, width: "100%", height: "7rem", marginBottom: "1rem", backgroundColor: "#f5f5f5" }}>
      <ToggleInlineStyle
        handleToggleInlineStyles={props.handleToggleInlineStyles}
      />
      <TogglePallate
        handleToggleInlineStyles={props.handleToggleInlineStyles}
      />
      <ToggleBlockStyle handleToggleBlockTypes={props.handleToggleBlockTypes} />
    </div>
  );
}

export default ToolBar;
