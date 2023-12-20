import React from "react";
import { PolygonsOverlay } from "./PolygonsOverlay";
import { Polygon } from "./types";
import { useResizeObserver } from "./useResizeObserver";

export type DrawShelfsOverlayProps = {
  polygons: Polygon[];
};

export const DrawShelfsOverlay = ({ polygons }: DrawShelfsOverlayProps) => {
  const overlayRef = React.useRef<HTMLDivElement>(null);
  const canvasSize = useResizeObserver(overlayRef);

  return (
    <div ref={overlayRef} className="absolute top-0 left-0 w-full h-full">
      <PolygonsOverlay canvasSize={canvasSize} polygons={polygons} />
    </div>
  );
};
