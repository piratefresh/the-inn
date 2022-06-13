// import { Tooltip } from "@mantine/core";
import { TooltipHeader } from "@components/ui/Tooltip/TooltipHeader";
import { TooltipBody } from "@components/ui/Tooltip/TooltipBody";
import { Tooltip } from "@components/ui/Tooltip/Tooltip";
import { mergeAttributes, Node } from "@tiptap/core";
import { NodeViewProps, ReactNodeViewRenderer } from "@tiptap/react";
import { NodeViewContent, NodeViewWrapper } from "@tiptap/react";
import React from "react";

export const Component = (props: NodeViewProps) => {
  const label = props.node.attrs.label;
  const title = props.node.attrs.title;
  const description = props.node.attrs.description;
  console.log(props.node.attrs);

  const content = (
    <div>
      <TooltipHeader
        title={title}
        description={description}
        binds="Binds when picked up"
        quality="Epic"
        itemLvl="29"
        type="item"
      />
      <TooltipBody description={description} />
    </div>
  );
  return (
    <NodeViewWrapper className="react-component-with-content">
      <Tooltip content={content}>
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
      title: {
        default: "",
      },
      description: {
        default: "",
      },
      quality: {
        default: "normal",
      },
      itemLvl: {
        default: "",
      },
      type: {
        default: "item",
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
