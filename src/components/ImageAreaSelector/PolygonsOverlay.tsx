import { COLORS } from "../../const";
import { Point, Polygon } from "../../types";
import { hexToRgba } from "../../utils";

export type PolygonsOverlayProps = {
  canvasSize: Point;
  polygons: Polygon[];
  polygonColor?: string;
};

export const PolygonsOverlay = ({
  canvasSize,
  polygons,
  polygonColor,
}: PolygonsOverlayProps) => {
  // useMemo to avoid recalculating derived state on every render

  return (
    <svg
      width={canvasSize[0]}
      height={canvasSize[1]}
      xmlns="http://www.w3.org/2000/svg"
    >
      {polygons.map((polygon, i) => {
        const pointsStr = polygon.map((p) => p.join(",")).join(" ");
        const color = polygonColor || COLORS[i % COLORS.length];
        return (
          <polygon
            key={pointsStr}
            points={pointsStr}
            fill={hexToRgba(color, 0.7)}
            stroke={`#${color}`}
            strokeWidth="2"
            strokeDasharray="5,5"
          />
        );
      })}
    </svg>
  );
};
