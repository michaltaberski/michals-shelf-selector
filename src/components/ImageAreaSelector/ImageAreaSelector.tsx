import { useRef } from "react";
import { Polygon } from "../../types";
import { DrawNewShelfOverlay } from "./DrawNewShelfOverlay";
import { useResizeObserver } from "../../utils";
import { PolygonsOverlay } from "./PolygonsOverlay";

export type ImageAreaSelectorProps = {
  imageUrl: string;
  polygons: Polygon[];
  onPoligonClick: (index: number) => void;
  onNewShelfDrawn: (shelf: Polygon) => void;
  selectedPolygonIndex?: number;
};

export const ImageAreaSelector = ({
  imageUrl,
  polygons,
  selectedPolygonIndex,
  onPoligonClick,
  onNewShelfDrawn,
}: ImageAreaSelectorProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const canvasSize = useResizeObserver(overlayRef);

  return (
    // Enforced normalization image width to 640px, so I don't have to play with
    // scaling overlay on resize.
    <div ref={overlayRef} className="relative w-[640px] min-w-[640px]">
      {/*
        Why 2 overlays?
        To avoid fat component with too many responsibilities.
      */}
      <PolygonsOverlay
        className="absolute top-0 left-0 w-full h-full"
        canvasSize={canvasSize}
        polygons={polygons}
        skipRenderIndex={selectedPolygonIndex}
        onPoligonClick={onPoligonClick}
      />

      <DrawNewShelfOverlay onDrawEnd={onNewShelfDrawn} />
      <img src={imageUrl} className="w-full" />
    </div>
  );
};
