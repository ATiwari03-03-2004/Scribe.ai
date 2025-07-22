import ToggleButton from "./ToggleButton";

export default function ToggleBlockStyle(props) {
  return (
    <>
      <ToggleButton
        handler={props.handleToggleBlockTypes}
        cmd={"header-one"}
        title={"Header one"}
        icon={"format_h1"}
      />
      <ToggleButton
        handler={props.handleToggleBlockTypes}
        cmd={"header-two"}
        title={"Header two"}
        icon={"format_h2"}
      />
      <ToggleButton
        handler={props.handleToggleBlockTypes}
        cmd={"header-three"}
        title={"Header three"}
        icon={"format_h3"}
      />
      <ToggleButton
        handler={props.handleToggleBlockTypes}
        cmd={"header-four"}
        title={"Header four"}
        icon={"format_h4"}
      />
      <ToggleButton
        handler={props.handleToggleBlockTypes}
        cmd={"header-five"}
        title={"Header five"}
        icon={"format_h5"}
      />
      <ToggleButton
        handler={props.handleToggleBlockTypes}
        cmd={"header-six"}
        title={"Header six"}
        icon={"format_h6"}
      />
      <ToggleButton
        handler={props.handleToggleBlockTypes}
        cmd={"code-block"}
        title={"Code"}
        icon={"code"}
      />
      <ToggleButton
        handler={props.handleToggleBlockTypes}
        cmd={"blockquote"}
        title={"Quote"}
        icon={"format_quote"}
      />
      <ToggleButton
        handler={props.handleToggleBlockTypes}
        cmd={"atomic"}
        title={"Media"}
        icon={"perm_media"}
      />
    </>
  );
}
