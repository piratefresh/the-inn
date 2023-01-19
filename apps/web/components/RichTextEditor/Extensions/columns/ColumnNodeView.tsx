import { NodeViewWrapper, NodeViewProps } from "@tiptap/react";

export const ColumnNodeView = ({
  node,
  updateAttributes,
  deleteNode,
}: NodeViewProps) => {
  console.log("node: ", node);

  return (
    <NodeViewWrapper>
      <div>Columns</div>
    </NodeViewWrapper>
  );
};
