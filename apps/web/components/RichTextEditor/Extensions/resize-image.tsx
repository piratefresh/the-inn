import { Node, mergeAttributes } from "@tiptap/core";
import {
  NodeViewContent,
  NodeViewWrapper,
  ReactNodeViewRenderer,
} from "@tiptap/react";
import React from "react";

interface IComponentProps {
  imgUrl: string;
}

const Component = (props: any) => {
  const imgRef = React.useRef<any>(null);
  const imgUrl = props.node.attrs.imgUrl;

  return (
    <NodeViewWrapper
      as="span"
      className="react-component-with-content"
      data-drag-handle
    >
      <NodeViewContent className="content">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img ref={imgRef} src={imgUrl} alt="resized imag" />
      </NodeViewContent>
    </NodeViewWrapper>
  );
};

export default Node.create({
  name: "reactComponent",

  group: "block",

  atom: true,

  draggable: true,

  addAttributes() {
    return {
      imgUrl: {
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
    return ["react-component", mergeAttributes(HTMLAttributes)];
  },

  addNodeView() {
    return ReactNodeViewRenderer(Component);
  },
});

//https://glitch.com/edit/#!/toothsome-shoemaker?path=index.js%3A10%3A6
//https://tiptap.dev/api/nodes/image
//https://github.com/dhythm/react-cra-playground/blob/4a2212a447fc9e321085af1191462cadb464e1d5/src/components/Tiptap/NodeView.tsx
//https://gist.github.com/slava-vishnyakov/16076dff1a77ddaca93c4bccd4ec4521
//https://github.com/ueberdosis/tiptap/discussions/1811
