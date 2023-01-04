import React from "react";
import ResizerStyles from "./resizer.module.scss";

export const Direction = {
  Top: "top",
  TopLeft: "topLeft",
  TopRight: "topRight",
  Right: "right",
  Bottom: "bottom",
  BottomLeft: "bottomLeft",
  BottomRight: "bottomRight",
  Left: "left",
};

interface IResizer {
  onResize: (direction: string, x: number, y: number) => void;
  selected: boolean;
}

const Resizer = ({ onResize, selected }: IResizer) => {
  const [direction, setDirection] = React.useState("");
  const [mouseDown, setMouseDown] = React.useState(false);

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!direction) return;

      const ratio = window.devicePixelRatio;

      onResize(direction, e.movementX / ratio, e.movementY / ratio);
    };

    if (mouseDown) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseDown, direction, onResize]);

  React.useEffect(() => {
    const handleMouseUp = () => setMouseDown(false);

    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const handleMouseDown = (direction: string) => () => {
    setDirection(direction);
    setMouseDown(true);
  };
  if (!selected) return <></>;
  return (
    <>
      <div
        className={ResizerStyles.topLeft}
        onMouseDown={handleMouseDown(Direction.TopLeft)}
      ></div>
      {/* 
      <div className="top" onMouseDown={handleMouseDown(Direction.Top)}></div> */}

      <div
        className={ResizerStyles.topRight}
        onMouseDown={handleMouseDown(Direction.TopRight)}
      ></div>

      {/* <div
        className={ResizerStyles.right}
        onMouseDown={handleMouseDown(Direction.Right)}
      ></div> */}

      <div
        className={`${ResizerStyles.rightBottom} ${ResizerStyles.bottomRightCursor}`}
        onMouseDown={handleMouseDown(Direction.BottomRight)}
      ></div>

      {/* <div
        className={ResizerStyles.bottom}
        onMouseDown={handleMouseDown(Direction.Bottom)}
      ></div> */}

      <div
        className={ResizerStyles.bottomLeft}
        onMouseDown={handleMouseDown(Direction.BottomLeft)}
      ></div>

      {/* <div
        className={ResizerStyles.left}
        onMouseDown={handleMouseDown(Direction.Left)}
      ></div> */}
    </>
  );
};

export default Resizer;
