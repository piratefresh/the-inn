import React from "react";
import Image from "next/image";
import { useCallback, useState } from "react";
import { HTML5Backend } from "react-dnd-html5-backend";
import update from "immutability-helper";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { DndProvider, useDrag, useDrop, XYCoord } from "react-dnd";
import { useDropzone } from "react-dropzone";
import { XSquare } from "react-feather";
import DropZoneStyles from "./Dropzone.module.css";
import { Identifier } from "dnd-core";
import { TargetBox } from "./Targetbox";

interface IFileCardProps {
  index: number;
  onMoveCard: (dragIndex: number, hoverIndex: number) => void;
  onRemoveCard: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  file: File;
  id: number | string;
}

interface DragItem {
  index: number;
  id: string;
  type: string;
}

export const ItemTypes = {
  CARD: "card",
};

export const FileCard = ({
  id,
  index,
  onMoveCard,
  onRemoveCard,
  file,
}: IFileCardProps) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      onMoveCard(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: () => {
      return { id, index };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));
  return (
    <div
      ref={ref}
      style={{ opacity }}
      className="flex relative w-full h-48"
      data-handler-id={handlerId}
    >
      <button
        className="absolute top-1 right-1 z-10 text-white cursor-pointer"
        data-filename={file.name}
        onClick={(e) => onRemoveCard(e)}
      >
        <XSquare />
      </button>
      <Image
        layout="fill"
        objectFit="cover"
        className="rounded-md  w-full h-full"
        src={URL.createObjectURL(file)}
        alt={file.name}
      />
    </div>
  );
};

export const Dropzone = ({
  onChange,
  ...rest
}: {
  onChange: (...event: any[]) => void;
}) => {
  const [files, setFiles] = useState<File[]>(null);
  const handleOnDrop = useCallback((item: { files: any[] }) => {
    // Do something with the files
    if (item) {
      const files = item.files;
      setFiles((oldFiles) => (oldFiles ? [...oldFiles, ...files] : [...files]));
    }
  }, []);
  // const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleMoveCard = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragCard = files[dragIndex];
      setFiles(
        update(files, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragCard],
          ],
        })
      );
    },
    [files]
  );

  const handleRemoveCard = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const fileName = e.currentTarget.dataset.filename;
    console.log("filename: ", fileName);
    const filteredFiles = files.filter((file) => file.name !== fileName);

    setFiles(filteredFiles);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div
        className={`grid gap-4 h-full bg-white p-4 ${DropZoneStyles.root}`}
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(30%, 1fr))",
        }}
      >
        {files &&
          files.map((file, index) => (
            <FileCard
              key={file.name}
              index={index}
              id={file.name}
              file={file}
              onRemoveCard={handleRemoveCard}
              onMoveCard={handleMoveCard}
            />
          ))}
        <TargetBox
          onDrop={handleOnDrop}
          className="col-span-3 relative h-48 bg-white p-5 border-dashed border-2 border-brandYellow cursor-pointer rounded-md overflow-hidden"
          style={{ flex: "1 0 25%" }}
        />

        {/* <div
              className="col-span-3 relative h-48 bg-white p-5 border-dashed border-2 border-brandYellow cursor-pointer rounded-md overflow-hidden"
              style={{ flex: "1 0 25%" }}
              {...getRootProps()}
            >
              <input {...getInputProps({ onChange })} />
              <div>
                {isDragActive ? (
                  <p className="break-words">Drop the files here ...</p>
                ) : (
                  <p className="break-words">
                    Drag &apos;n&apos; drop some files here, or click to select
                    files
                  </p>
                )}
              </div>
            </div> */}
      </div>
    </DndProvider>
  );
};
