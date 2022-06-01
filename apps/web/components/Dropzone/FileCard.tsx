import React from "react";
import { useDrag, useDrop, XYCoord } from "react-dnd";
import { XSquare } from "react-feather";
import Image from "next/image";
import { Identifier } from "dnd-core";

export const ItemTypes = {
  CARD: "card",
};

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
