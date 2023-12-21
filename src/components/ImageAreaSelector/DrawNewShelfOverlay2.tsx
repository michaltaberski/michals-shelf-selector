import React, { useCallback, useMemo } from "react";
import { MouseDrawState, useMouseDraw } from "./useMouseDraw";
import { PolygonsOverlay } from "./PolygonsOverlay";
import { Polygon } from "../../types";
import { MIN_SHELF_SIZE, SELECTION_COLOR } from "../../const";
import { rectangleToPolygon } from "../../utils";

export type DrawNewShelfOverlayProps = {
  onDrawEnd: (polygon: Polygon) => void;
  children?: React.ReactNode;
};

export const DrawNewShelfOverlay = ({
  onDrawEnd,
  children,
}: DrawNewShelfOverlayProps) => {
  const overlayRef = React.useRef<HTMLDivElement>(null);

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

  const { onMouseDown, mouseDrawState } = useMouseDraw(
    overlayRef,
    handleDrawEnd
  );

  const polygon = useMemo(
    () => rectangleToPolygon(mouseDrawState),
    [mouseDrawState]
  );

  return (
    <div
      ref={overlayRef}
      onMouseDown={onMouseDown}
      className="absolute top-0 left-0 w-full h-full"
    >
      {mouseDrawState.isDrawing && (
        <PolygonsOverlay
          canvasSize={mouseDrawState.canvasSize}
          polygonColor={SELECTION_COLOR}
          polygons={[polygon]}
        />
      )}
      {children}
    </div>
  );
};
