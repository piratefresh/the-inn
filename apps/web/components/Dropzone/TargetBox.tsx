import { Input } from "@components/ui/Input";
import { DropTargetMonitor, useDrop } from "react-dnd";
import { NativeTypes } from "react-dnd-html5-backend";

export interface TargetBoxProps {
  onDrop: (item: { files: any[] }) => void;
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
