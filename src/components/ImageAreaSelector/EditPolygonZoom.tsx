import { Crosshair, Dot } from "lucide-react";
import { BASE_IMAGE_SIZE } from "../../const";
import { Point } from "../../types";

export type EditPolygonZoomProps = {
  imageUrl: string;
  zoomCoordinates: Point;
};

const ZOOM_FACTOR = 2;
const CIRCLE_RADIUS = 40;
const ZOOMED_IMAGE_SIZE = BASE_IMAGE_SIZE * ZOOM_FACTOR;

export const EditPolygonZoom = ({
  imageUrl,
  zoomCoordinates,
}: EditPolygonZoomProps) => {
  const transfromX = -zoomCoordinates[0] * ZOOM_FACTOR + CIRCLE_RADIUS;
  const transfromY = -zoomCoordinates[1] * ZOOM_FACTOR + CIRCLE_RADIUS;
  return (
    <div
      className="fixed bottom-0 right-0 rounded-full overflow-hidden border-white"
      style={{ width: CIRCLE_RADIUS * 2, height: CIRCLE_RADIUS * 2 }}
    >
      <img
        src={imageUrl}
        style={{
          width: ZOOMED_IMAGE_SIZE,
          minWidth: ZOOMED_IMAGE_SIZE,
          transform: `translate(${transfromX}px,${transfromY}px)`,
        }}
      />
      <Crosshair
        className="absolute top-0 left-0 text-red-700"
        size={80}
        strokeWidth={1}
      />
      <Dot
        className="absolute top-0 left-0 text-red-700"
        size={80}
        strokeWidth={1}
      />
    </div>
  );
};
