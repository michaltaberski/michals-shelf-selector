import React from "react";
import { PolygonsOverlay } from "./PolygonsOverlay";
import { Polygon } from "../../types";
import { useResizeObserver } from "../../utils";

export type DrawShelfsOverlayProps = {
  polygons: Polygon[];
  skipRenderIndex?: number;
  onPoligonClick: (index: number) => void;
};

export const DrawShelfsOverlay = ({
  polygons,
  skipRenderIndex,
  onPoligonClick,
}: DrawShelfsOverlayProps) => {
  const overlayRef = React.useRef<HTMLDivElement>(null);
  const canvasSize = useResizeObserver(overlayRef);

  return (
    <div ref={overlayRef} className="absolute top-0 left-0 w-full h-full">
      <PolygonsOverlay
        canvasSize={canvasSize}
        polygons={polygons}
        skipRenderIndex={skipRenderIndex}
        onPoligonClick={onPoligonClick}
      />
    </div>
  );
};
