import { NodeViewWrapper } from "@tiptap/react";
import React from "react";

export default (props: any) => {
  const increase = () => {
    props.updateAttributes({
      url: props.node.attrs.url,
    });
  };

  return (
    <NodeViewWrapper className="react-component">
      <label>React Component</label>

      <div className="content">
        <img src="" alt="" />
      </div>
    </NodeViewWrapper>
  );
};
