import { Input } from "@components/ui/Input";
import { FilePlusIcon } from "@radix-ui/react-icons";
// @ts-ignore
import { useUploady } from "@rpldy/uploady";
import React from "react";
import { DropTargetMonitor, useDrop } from "react-dnd";
import { NativeTypes } from "react-dnd-html5-backend";

export interface TargetBoxProps {
  onDrop: (item: { files: any[] }) => void;
  onChange?: (...event: any[]) => void;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const TargetBox = ({
  onDrop,
  className,
  style,
  ...props
}: TargetBoxProps) => {
  const classes = [];

  const [{ canDrop, isOver }, drop] = useDrop(
    () => ({
      accept: [NativeTypes.FILE],
      drop(item: { files: any[] }) {
        if (onDrop) {
          onDrop(item);
        }
      },
      canDrop(item: any) {
        console.log("canDrop", item.files, item.items);
        return true;
      },
      hover(item: any) {
        console.log("hover", item.files, item.items);
      },
      collect: (monitor: DropTargetMonitor) => {
        const item = monitor.getItem() as any;
        if (item) {
          console.log("collect", item.files, item.items);
        }

        return {
          isOver: monitor.isOver(),
          canDrop: monitor.canDrop(),
        };
      },
    }),
    [onDrop, props]
  );

  const isActive = canDrop && isOver;

  const addFile = (files: any) => {
    let arrFile = [];
    for (let file of files) {
      arrFile.push(file);
    }
    onDrop({ files: arrFile });
  };

  if (className) {
    classes.push(className);
  }
  return (
    <Input.File
      ref={drop}
      className={classes.join(" ")}
      style={style}
      type="file"
      onChange={(e) => addFile(e.target.files)}
    >
      {isActive ? "Release to drop" : "Drag file here"}
    </Input.File>
  );
};

export const DropZone = ({
  onDrop,
  onChange,
  className,
  style,
  ...props
}: TargetBoxProps) => {
  const classes = [];
  const { upload } = useUploady();
  const inputFile = React.useRef<HTMLInputElement>(null);
  const [{ canDrop, isOver }, dropRef] = useDrop(
    () => ({
      accept: [NativeTypes.FILE],
      drop(item: { files: any[] }) {
        if (onDrop) {
          onDrop(item);
          upload(item.files);
        }
      },
      canDrop(item: any) {
        console.log("canDrop", item.files, item.items);
        return true;
      },
      hover(item: any) {
        console.log("hover", item.files, item.items);
      },
      collect: (monitor: DropTargetMonitor) => {
        const item = monitor.getItem() as any;
        if (item) {
          console.log("collect", item.files, item.items);
        }

        return {
          isOver: monitor.isOver(),
          canDrop: monitor.canDrop(),
        };
      },
    }),
    [onDrop, props]
  );

  const handleFileInputClick = React.useCallback(
    () => inputFile.current.click(),
    []
  );

  if (className) {
    classes.push(className);
  }

  const isActive = canDrop && isOver;

  return (
    <div
      ref={dropRef}
      onClick={handleFileInputClick}
      className={classes.join(" ")}
    >
      <input
        ref={inputFile}
        onChange={onChange}
        style={{ display: "none" }}
        type="file"
        autoComplete="off"
      />
      <div className="h-full w-full flex place-items-center justify-center">
        <div className="flex flex-col justify-center items-center">
          <div className="inline-flex self-center rounded-full p-2 bg-yellow-500">
            <FilePlusIcon width={22} height={22} className="text-white" />
          </div>
          <h6 className="font-trejanSans font-black text-base">
            {isActive ? "Upload Image" : "Drop and Drop Image Here, or Browse"}
          </h6>
        </div>
      </div>
    </div>
  );
};
