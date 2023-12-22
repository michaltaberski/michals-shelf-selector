import { Point } from "../../types";
import { useRef } from "react";
import { useMouseDraw } from "./useMouseDraw";

export type EditPolygonHandleProps = {
  color: string;
  point: Point;
  canvasSize: Point;
  onPointMove: (point: Point) => void;
};

export const EditPolygonHandle = ({
  color,
  point,
  canvasSize,
  onPointMove,
}: EditPolygonHandleProps) => {
  const handleRef = useRef<HTMLDivElement>(null);
  const { onMouseDown, mouseDrawState } = useMouseDraw(
    handleRef,
    canvasSize,
    (x) => {
      console.log("onDrawEnd", x);
    }
  );

  console.log("mouseDrawState", mouseDrawState.endPoint[0]);
  return (
    <div
      ref={handleRef}
      onMouseDown={onMouseDown}
      className="absolute w-4 h-4 bg-white border-4 rounded-full -translate-x-2 -translate-y-2 z-10"
      style={{ borderColor: `#${color}`, left: point[0], top: point[1] }}
    />
  );
};
