import { Point, Polygon } from "../../types";
import { PolygonsOverlay } from "./PolygonsOverlay";
import { SELECTION_COLOR } from "../../const";
import { EditPolygonHandle } from "./EditPolygonHandle";
import { useState } from "react";
import set from "lodash/set";

export type EditPolygonOverlayProps = {
  canvasSize: Point;
  polygon: Polygon;
  color: string;
  onEditEnd: (polygon: Polygon) => void;
  overlayRef: React.RefObject<HTMLDivElement>;
};

export const EditPolygonOverlay = ({
  canvasSize,
  polygon,
  color,
  onEditEnd,
  overlayRef,
}: EditPolygonOverlayProps) => {
  const [currentPolygon, setCurrentPolygon] = useState<Polygon>(polygon);
  return (
    <>
      {currentPolygon.map((point, index) => (
        <EditPolygonHandle
          key={index}
          color={color}
          point={point}
          canvasSize={canvasSize}
          overlayRef={overlayRef}
          onPointMoveEnd={() => {
            // Only onPointMoveEnd we update the global state
            // so we don't re-render the whole tree on every
            // point move
            onEditEnd(currentPolygon);
          }}
          onPointMove={(point) => {
            // On every point move we only update the local state
            setCurrentPolygon(set([...currentPolygon], index, point));
          }}
        />
      ))}
      <PolygonsOverlay
        canvasSize={canvasSize}
        polygons={[currentPolygon]}
        polygonColor={SELECTION_COLOR}
      />
    </>
  );
};
