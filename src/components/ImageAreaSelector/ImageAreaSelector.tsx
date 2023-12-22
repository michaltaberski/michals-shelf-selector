import { useRef } from "react";
import { Polygon } from "../../types";
import { ShelfPictureOverlay } from "./ShelfPictureOverlay";
import { useResizeObserver } from "../../utils";
import { PolygonsOverlay } from "./PolygonsOverlay";
import { BASE_IMAGE_SIZE, COLORS } from "../../const";
import { EditPolygonOverlay } from "./EditPolygonOverlay";

export type ImageAreaSelectorProps = {
  imageUrl: string;
  polygons: Polygon[];
  onPoligonSelect: (index: number | null) => void;
  onNewPolygonDrawn: (shelf: Polygon) => void;
  onPolygonEditEnd: (index: number, polygon: Polygon) => void;
  selectedPolygonIndex?: number;
};

export const ImageAreaSelector = ({
  imageUrl,
  polygons,
  selectedPolygonIndex,
  onPolygonEditEnd,
  onPoligonSelect,
  onNewPolygonDrawn,
}: ImageAreaSelectorProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const canvasSize = useResizeObserver(overlayRef);

  return (
    <div
      ref={overlayRef}
      className="relative select-none"
      // Enforced normalization image width to 640px, so I don't have to play with
      // scaling overlay on resize.
      style={{ width: BASE_IMAGE_SIZE, minWidth: BASE_IMAGE_SIZE }}
    >
      <ShelfPictureOverlay
        overlayRef={overlayRef}
        canvasSize={canvasSize}
        onDrawEnd={onNewPolygonDrawn}
        isNewPolygonDrawingEnabled={selectedPolygonIndex === undefined}
      >
        {/* Render existing polygons (except the selected one) */}
        <PolygonsOverlay
          canvasSize={canvasSize}
          polygons={polygons}
          skipRenderIndex={selectedPolygonIndex}
          onPoligonSelect={onPoligonSelect}
        />
        {/* Render only the selected polygon */}
        {selectedPolygonIndex !== undefined && (
          <EditPolygonOverlay
            overlayRef={overlayRef}
            canvasSize={canvasSize}
            color={COLORS[selectedPolygonIndex]}
            polygon={polygons[selectedPolygonIndex]}
            // onPoligonClick={() => {
            //   onPoligonSelect?.(selectedPolygonIndex);
            // }}
            onEditEnd={(polygon) => {
              onPolygonEditEnd(selectedPolygonIndex, polygon);
            }}
            imageUrl={imageUrl}
          />
        )}
      </ShelfPictureOverlay>
      <img src={imageUrl} className="w-full" />
    </div>
  );
};
