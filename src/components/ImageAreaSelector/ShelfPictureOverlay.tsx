import React, { useCallback, useMemo } from "react";
import { MouseDrawState, useMouseDraw } from "./useMouseDraw";
import { PolygonsOverlay } from "./PolygonsOverlay";
import { Point, Polygon } from "../../types";
import { MIN_SHELF_SIZE, NEW_SELECTION_COLOR } from "../../const";
import { rectangleToPolygon } from "../../utils";

export type ShelfPictureOverlayProps = {
  canvasSize: Point;
  overlayRef: React.RefObject<HTMLDivElement>;
  onDrawEnd: (polygon: Polygon) => void;
  children?: React.ReactNode;
  isNewPolygonDrawingEnabled?: boolean;
};

export const ShelfPictureOverlay = ({
  canvasSize,
  onDrawEnd,
  children,
  overlayRef,
  isNewPolygonDrawingEnabled,
}: ShelfPictureOverlayProps) => {
  const handleDrawEnd = useCallback(
    ({ startPoint, endPoint }: MouseDrawState) => {
      const rectWidth = Math.abs(endPoint[0] - startPoint[0]);
      const rectHeight = Math.abs(endPoint[1] - startPoint[1]);
      // Skip new shelf creation if it's too small
      if (rectWidth < MIN_SHELF_SIZE || rectHeight < MIN_SHELF_SIZE) return;
      onDrawEnd(rectangleToPolygon({ startPoint, endPoint }));
    },
    [onDrawEnd]
  );

  const { onMouseDown, mouseDrawState } = useMouseDraw({
    overlayRef,
    canvasSize,
    onDrawEnd: handleDrawEnd,
  });

  const polygon = useMemo(
    () => rectangleToPolygon(mouseDrawState),
    [mouseDrawState]
  );

  return (
    <div
      onMouseDown={isNewPolygonDrawingEnabled ? onMouseDown : undefined}
      className="absolute top-0 left-0 w-full h-full"
    >
      {mouseDrawState.isDrawing && (
        <PolygonsOverlay
          canvasSize={canvasSize}
          polygonColor={NEW_SELECTION_COLOR}
          polygons={[polygon]}
        />
      )}
      {children}
    </div>
  );
};
