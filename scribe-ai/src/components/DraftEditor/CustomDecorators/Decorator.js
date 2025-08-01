import { findLinkEntities, Link } from "./LinkDecorator";
import { CompositeDecorator } from "draft-js";

const decorator = new CompositeDecorator([
  {
    strategy: findLinkEntities,
    component: Link,
  },
]);

export default decorator;
