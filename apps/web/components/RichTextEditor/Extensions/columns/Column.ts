import { Node, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { ColumnNodeView } from "./ColumnNodeView";

export const Column = Node.create({
  name: "column",
  group: "column",
  content: "(paragraph|block)*",
  isolating: true,
  selectable: true,
  draggable: true,

  renderHTML({ HTMLAttributes }) {
    const attrs = mergeAttributes(HTMLAttributes, { class: "column" });
    return ["div", attrs, 0];
  },

  addNodeView() {
    return ReactNodeViewRenderer(ColumnNodeView);
  },
});
