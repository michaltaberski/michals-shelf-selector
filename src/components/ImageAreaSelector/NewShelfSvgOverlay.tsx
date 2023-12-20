import { Point, Polygon } from ".";

export type NewShelfSvgOverlayProps = {
  canvasSize: Point;
  polygons: Polygon[];
};

export const NewShelfSvgOverlay = ({
  canvasSize,
  polygons,
}: NewShelfSvgOverlayProps) => {
  // useMemo to avoid recalculating derived state on every render

  return (
    <svg
      width={canvasSize[0]}
      height={canvasSize[1]}
      xmlns="http://www.w3.org/2000/svg"
    >
      {polygons.map((polygon) => {
        const pointsStr = polygon.map((p) => p.join(",")).join(" ");
        return (
          <polygon
            key={pointsStr}
            points={pointsStr}
            fill="rgba(255, 0, 0, 0.5)"
            stroke="red"
            strokeWidth="2"
            strokeDasharray="5,5"
          />
        );
      })}
    </svg>
  );
};
