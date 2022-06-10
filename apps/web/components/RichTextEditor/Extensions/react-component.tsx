import { Tooltip } from "@mantine/core";
import { mergeAttributes, Node } from "@tiptap/core";
import { NodeViewProps, ReactNodeViewRenderer } from "@tiptap/react";
import { NodeViewContent, NodeViewWrapper } from "@tiptap/react";
import React from "react";

export const Component = (props: NodeViewProps) => {
  const label = props.node.attrs.label;
  return (
    <NodeViewWrapper className="react-component-with-content">
      <Tooltip label={label}>
        <span className="label" contentEditable={false}>
          TEST COMPONEENT
        </span>
      </Tooltip>

      <NodeViewContent className="content" />
    </NodeViewWrapper>
  );
};

export default Node.create({
  name: "reactComponent",
  group: "block",
  content: "inline*",
  atom: true,

  addAttributes() {
    return {
      label: {
        default: "",
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "react-component",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["react-component", mergeAttributes(HTMLAttributes), 0];
  },

  addNodeView() {
    return ReactNodeViewRenderer(Component);
  },
});
