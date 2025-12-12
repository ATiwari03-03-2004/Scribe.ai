import DropDown from "../../DropDown/DropDown";
import { useRef, useState } from "react";
import escapeStringRegexp from "escape-string-regexp";
import { convertToRaw, EditorState, SelectionState, Modifier } from "draft-js";

export default function FindNReplace(props) {
  let buttonref = useRef(null);
  let [state, setState] = useState({
    find: "",
    replaceWith: "",
    matchCase: false,
    matches: null,
  });

  let findWord = () => {
    if (state.find.length === 0) return;
    let escapedString = escapeStringRegexp(state.find);
    let flags = state.matchCase ? "g" : "gi";
    const regex = new RegExp(escapedString, flags);
    let contentState = props.editorState.getCurrentContent();
    const raw = convertToRaw(contentState);
    const results = [];
    raw.blocks.forEach((block) => {
      const { key, text } = block;
      let match;
      while ((match = regex.exec(text)) !== null) {
        results.push({
          blockKey: key,
          word: match[0],
          start: match.index,
          end: match.index + match[0].length,
        });
      }
    });
    setState((prev) => {
      return {
        find: prev.find,
        replaceWith: prev.replaceWith,
        matchCase: prev.matchCase,
        matches: results,
      };
    });
  };

  let replace = (match, idx) => {
    let contentState = props.editorState.getCurrentContent();
    const selection = SelectionState.createEmpty(match.blockKey).merge({
      anchorOffset: match.start,
      focusOffset: match.end,
    });
    let arr = [...state.matches];
    contentState = Modifier.replaceText(
      contentState,
      selection,
      state.replaceWith
    );
    let newState = EditorState.push(
      props.editorState,
      contentState,
      "replacing-word"
    );
    if (state.find.length !== state.replaceWith.length) {
      let diff = state.replaceWith.length - state.find.length;
      for (
        let j = idx + 1;
        j < arr.length && match.blockKey === arr[j].blockKey;
        j++
      ) {
        arr[j].start += diff;
        arr[j].end += diff;
      }
    }
    arr.splice(idx, 1);
    if (arr.length === 0) {
      setState((prev) => {
        return {
          find: "",
          replaceWith: "",
          matchCase: false,
          matches: null,
        };
      });
    } else {
      setState((prev) => {
        return {
          find: prev.find,
          replaceWith: prev.replaceWith,
          matchCase: prev.matchCase,
          matches: arr,
        };
      });
    }
    props.onChange(newState);
  };

  let replaceAll = () => {
    if (state.matches.length === 0 || state.replaceWith.length === 0) return;
    let contentState = props.editorState.getCurrentContent();
    let newState = props.editorState;
    let arr = [...state.matches];
    for (let i = 0; i < arr.length; i++) {
      const selection = SelectionState.createEmpty(arr[i].blockKey).merge({
        anchorOffset: arr[i].start,
        focusOffset: arr[i].end,
      });
      contentState = Modifier.replaceText(
        contentState,
        selection,
        state.replaceWith
      );
      newState = EditorState.push(newState, contentState, "replacing-all");
      if (state.find.length !== state.replaceWith.length) {
        let diff = state.replaceWith.length - state.find.length;
        for (
          let j = i + 1;
          j < arr.length && arr[i].blockKey === arr[j].blockKey;
          j++
        ) {
          arr[j].start += diff;
          arr[j].end += diff;
        }
      }
    }
    setState({
      find: "",
      replaceWith: "",
      matchCase: false,
      matches: null,
    });
    props.onChange(newState);
  };

  return (
    <>
      <button
        onMouseDown={(e) => e.preventDefault()}
        title="Search"
        onClick={() => props.handleDropDown("find")}
        style={{
          height: "2.1rem",
          cursor: "pointer",
          paddingRight: "0px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
        ref={buttonref}
      >
        <span className="material-symbols-outlined">search</span>
        {props.isClose.open && props.isClose.dropdown === "find" ? (
          <span
            className="material-symbols-outlined drop"
            style={{ backgroundColor: "gray" }}
          >
            arrow_drop_up
          </span>
        ) : (
          <span className="material-symbols-outlined drop">
            arrow_drop_down
          </span>
        )}
      </button>
      {props.isClose.open && props.isClose.dropdown === "find" ? (
        <DropDown
          isClose={props.isClose}
          handleDropDown={props.handleDropDown}
          buttonref={buttonref}
        />
      ) : props.isClose.open && props.isClose.dropdown === "find-word" ? (
        <DropDown
          isClose={props.isClose}
          handleDropDown={props.handleDropDown}
          state={state}
          setState={setState}
          editorState={props.editorState}
          onChange={props.onChange}
          findfn={findWord}
        />
      ) : props.isClose.open &&
        props.isClose.dropdown === "find-replace-word" ? (
        <DropDown
          isClose={props.isClose}
          handleDropDown={props.handleDropDown}
          findfn={findWord}
          state={state}
          setState={setState}
          editorState={props.editorState}
          onChange={props.onChange}
          replaceAll={replaceAll}
          replaceFn={replace}
        />
      ) : null}
    </>
  );
}
