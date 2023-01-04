// @ts-nocheck
import { Editor, NodeViewWrapper } from "@tiptap/react";
import React from "react";
import Resizer from "./Resizer";
import { Direction } from "./Resizer/resizer";
import resizeImageComponentStyles from "./component.module.scss";

interface IResizeImageComponent {
  isDraggable: boolean;
  height: number | string;
  width: number | string;
  src: string;
  editor: Editor;
  float: string;
  textAlign: string;
}

export const ResizeImageComponent = ({
  isDraggable,
  src,
  height,
  width,
  editor,
  float,
  textAlign,
  ...props
}: IResizeImageComponent) => {
  const imageRef = React.useRef<HTMLImageElement>(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const [aspectRatio, setAspectRatio] = React.useState(0);
  console.log("props: ", props);
  const { updateAttributes, getPos, selected, node } = props;

  let classes = [];
  let wrapperClases = [resizeImageComponentStyles["wrapper"]];

  if (selected) {
    classes.push(resizeImageComponentStyles["selected"]);
  }

  if (node?.attrs.textAlign) {
    wrapperClases.push(`float-${node?.attrs.textAlign}`);
  }

  const handleAspectRatio = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    const image = imageRef.current;
    if (!image) return;
    setAspectRatio(image.naturalWidth / image.naturalHeight);
  };

  const handleResize = (direction, movementX, movementY) => {
    const pos = getPos();
    editor.commands.setNodeSelection(pos);
    const panel = imageRef.current;

    if (!panel) return;

    const { width, height, x, y } = panel.getBoundingClientRect();
    const resizeTop = () => {
      const newHeight = height - movementY;
      updateAttributes({ height: newHeight });
    };

    const resizeLeft = () => {
      const newWidth = width - movementX;
      updateAttributes({ width: newWidth });
    };

    const resizeRight = () => {
      const newWidth = width + movementX;
      updateAttributes({ width: newWidth });
    };

    const resizeBottom = () => {
      const newHeight = height + movementY;
      updateAttributes({ height: newHeight });
    };

    switch (direction) {
      case Direction.TopLeft:
        resizeTop();
        resizeLeft();
        break;
      case Direction.TopRight:
        resizeTop();
        resizeRight();
        break;
      case Direction.BottomRight:
        resizeBottom();
        resizeRight();
        break;
      case Direction.BottomLeft:
        resizeBottom();
        resizeLeft();
        break;

      default:
        break;
    }
  };

  return (
    <NodeViewWrapper
      as="span"
      className={wrapperClases.join(" ")}
      style={{ float: node?.attrs.textAlign ?? "none" }}
      height={props.node?.attrs.height}
      width={props.node?.attrs.width}
    >
      {/* <span
        onMouseDown={handler}
        ref={resizerRef}
        className="absolute bottom-0 right-0 border border-black border-t-0 border-l-0 cursor-nwse-resize"
        style={{ width: "10px", height: "10px" }}
      /> */}
      <Resizer onResize={handleResize} selected={selected} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className={classes.join(" ")}
        ref={imageRef}
        src={props.node?.attrs.src}
        height={props.node?.attrs.height}
        width={props.node?.attrs.width}
        draggable={true}
        data-drag-handle
        onLoad={(e) => handleAspectRatio(e)}
        alt="uploaded image"
      />
    </NodeViewWrapper>
  );
};
