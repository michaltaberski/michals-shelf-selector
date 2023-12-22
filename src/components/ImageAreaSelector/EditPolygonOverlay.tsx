import { Point, Polygon } from "../../types";
import { PolygonsOverlay } from "./PolygonsOverlay";
import { SELECTION_COLOR } from "../../const";
import { EditPolygonHandle } from "./EditPolygonHandle";

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
      {polygon.map((point, index) => (
        <EditPolygonHandle
          key={index}
          color={color}
          point={point}
          canvasSize={canvasSize}
          onPointMove={(point) => {
            console.log("onPointMove", point);
          }}
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
