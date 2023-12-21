import { COLORS } from "../../const";
import { Point, Polygon } from "../../types";
import { cn, hexToRgba } from "../../utils";

export type PolygonsOverlayProps = {
  canvasSize: Point;
  polygons: Polygon[];
  polygonColor?: string;
  skipRenderIndex?: number;
  onPoligonClick?: (index: number) => void;
  className?: string;
};

export const PolygonsOverlay = ({
  canvasSize,
  className,
  polygons,
  polygonColor,
  skipRenderIndex,
  onPoligonClick,
}: PolygonsOverlayProps) => {
  // useMemo to avoid recalculating derived state on every render

  return (
    <svg
      className={cn(
        "absolute top-0 left-0 w-full h-full pointer-events-none",
        className
      )}
      width={canvasSize[0]}
      height={canvasSize[1]}
      xmlns="http://www.w3.org/2000/svg"
    >
      {polygons.map((polygon, i) => {
        if (skipRenderIndex === i) return null;
        const pointsStr = polygon.map((p) => p.join(",")).join(" ");
        const color = polygonColor || COLORS[i % COLORS.length];
        return (
          <polygon
            key={pointsStr}
            className="pointer-events-auto cursor-pointer"
            points={pointsStr}
            fill={hexToRgba(color, 0.7)}
            stroke={`#${color}`}
            strokeWidth="2"
            strokeDasharray="5,5"
            onClick={() => onPoligonClick?.(i)}
          />
        );
      })}
    </svg>
  );
};
