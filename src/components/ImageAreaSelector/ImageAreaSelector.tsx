import { useRef } from "react";
import { Polygon } from "../../types";
import { ShelfPictureOverlay } from "./ShelfPictureOverlay";
import { useResizeObserver } from "../../utils";
import { PolygonsOverlay } from "./PolygonsOverlay";
import { COLORS } from "../../const";
import { EditPolygonOverlay } from "./EditPolygonOverlay";

export type ImageAreaSelectorProps = {
  imageUrl: string;
  polygons: Polygon[];
  onPoligonClick: (index: number) => void;
  onNewPolygonDrawn: (shelf: Polygon) => void;
  selectedPolygonIndex?: number;
};

export const ImageAreaSelector = ({
  imageUrl,
  polygons,
  selectedPolygonIndex,
  onPoligonClick,
  onNewPolygonDrawn,
}: ImageAreaSelectorProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const canvasSize = useResizeObserver(overlayRef);

  return (
    // Enforced normalization image width to 640px, so I don't have to play with
    // scaling overlay on resize.
    <div
      ref={overlayRef}
      className="relative w-[640px] min-w-[640px] select-none"
    >
      <ShelfPictureOverlay
        canvasSize={canvasSize}
        onDrawEnd={onNewPolygonDrawn}
      >
        {/* Render existing polygons (except the selected one) */}
        <PolygonsOverlay
          canvasSize={canvasSize}
          polygons={polygons}
          skipRenderIndex={selectedPolygonIndex}
          onPoligonClick={onPoligonClick}
        />
        {/* Render only the selected polygon */}
        {selectedPolygonIndex !== undefined && (
          <EditPolygonOverlay
            canvasSize={canvasSize}
            color={COLORS[selectedPolygonIndex]}
            polygon={polygons[selectedPolygonIndex]}
            onPoligonClick={() => onPoligonClick?.(selectedPolygonIndex)}
            onEditComplete={(polygon) => {
              console.log("onEditComplete", polygon);
            }}
          />
        )}
      </ShelfPictureOverlay>
      <img src={imageUrl} className="w-full" />
    </div>
  );
};
