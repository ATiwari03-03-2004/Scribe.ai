import React from "react";
import { Editor, EditorState, CompositeDecorator } from "draft-js";

// Link DEcorator Strategy
function findLinkEntities(contentBlock, callback, contentState) {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity();
      return (
        entityKey !== null &&
        contentState.getEntity(entityKey).getType() === "LINK"
      );
    },
    callback
  );
}

const Link = (props) => {
  const { url } = props.contentState.getEntity(props.entityKey).getData();
  const handleClick = (e) => {
    e.preventDefault();
    window.open(url, "_blank", "noopener,noreferrer");
  };
  return (
    <a href={url} style={{ color: "#3b5998", textDecoration: "underline", cursor: "pointer" }} onClick={handleClick} >
      {props.children}
    </a>
  );
};


const decorator = new CompositeDecorator([
  {
    strategy: findLinkEntities,
    component: Link,
  },
]);

export {decorator};
