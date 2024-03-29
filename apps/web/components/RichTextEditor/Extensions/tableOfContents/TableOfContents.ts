import { mergeAttributes, Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";

import Component from "./Component";

export const TableOfContents = Node.create({
  name: "tableOfContents",

  group: "block",

  atom: true,

  parseHTML() {
    return [
      {
        tag: "toc",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["toc", mergeAttributes(HTMLAttributes)];
  },

  addNodeView() {
    return ReactNodeViewRenderer(Component);
  },

  addGlobalAttributes() {
    return [
      {
        types: ["heading"],
        attributes: {
          id: {
            default: null,
          },
        },
      },
    ];
  },
});
