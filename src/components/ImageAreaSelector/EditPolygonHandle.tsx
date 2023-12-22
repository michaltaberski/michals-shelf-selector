import { Point } from "../../types";
import { useRef } from "react";
import { useMouseDraw } from "./useMouseDraw";

export type EditPolygonHandleProps = {
  color: string;
  point: Point;
  canvasSize: Point;
  onPointMove: (point: Point) => void;
  onPointMoveEnd: (point: Point) => void;
  overlayRef: React.RefObject<HTMLDivElement>;
};

export const EditPolygonHandle = ({
  color,
  point,
  canvasSize,
  onPointMoveEnd,
  onPointMove,
  overlayRef,
}: EditPolygonHandleProps) => {
  const handleRef = useRef<HTMLDivElement>(null);

  const { onMouseDown } = useMouseDraw({
    overlayRef,
    canvasSize,
    onDrawEnd: (x) => onPointMoveEnd(x.endPoint),
    onDraw: (x) => onPointMove(x.endPoint),
  });

  return (
    <div
      ref={handleRef}
      onMouseDown={onMouseDown}
      className="absolute w-4 h-4 bg-white border-4 rounded-full -translate-x-2 -translate-y-2 z-10"
      style={{
        borderColor: `#${color}`,
        left: point[0],
        top: point[1],
      }}
    />
  );
};
