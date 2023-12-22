import { Point, Polygon } from "../../types";
import { PolygonsOverlay } from "./PolygonsOverlay";
import { SELECTION_COLOR } from "../../const";

export type EditPolygonOverlayProps = {
  canvasSize: Point;
  polygon: Polygon;
  color: string;
  onEditComplete: (polygon: Polygon) => void;
  onPoligonClick: () => void;
};

export const EditPolygonOverlay = ({
  canvasSize,
  polygon,
  color,
  onEditComplete,
  onPoligonClick,
}: EditPolygonOverlayProps) => {
  return (
    <>
      {polygon.map(([x, y], index) => (
        <div
          key={index}
          className="absolute w-4 h-4 bg-white border-4 rounded-full -translate-x-2 -translate-y-2 z-10"
          style={{ borderColor: `#${color}`, left: x, top: y }}
        />
      ))}
      <PolygonsOverlay
        canvasSize={canvasSize}
        polygons={[polygon]}
        polygonColor={SELECTION_COLOR}
        onPoligonClick={onPoligonClick}
      />
    </>
  );
};
