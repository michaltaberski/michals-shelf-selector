import React, { useEffect } from "react";
import { substractOffset, useRichState } from "../../utils";
import { Point, Rectangle } from "../../types";
import clamp from "lodash/clamp";

export type ImageAreaSelectorProps = {
  imageUrl: string;
};

export type MouseDrawState = Rectangle & {
  isDrawing: boolean;
  // offset is the position of the top left corner of the overlay relative to the viewport
  offsetPoint: Point;
};

const defaultState: MouseDrawState = {
  isDrawing: false,
  offsetPoint: [0, 0],
  startPoint: [0, 0],
  endPoint: [0, 0],
};

export const useMouseDraw = ({
  overlayRef,
  canvasSize,
  onDraw,
  onDrawEnd,
}: {
  overlayRef: React.RefObject<HTMLDivElement>;
  canvasSize: Point;
  onDraw?: (state: MouseDrawState) => void;
  onDrawEnd?: (state: MouseDrawState) => void;
}) => {
  const { state, updateState, resetState } =
    useRichState<MouseDrawState>(defaultState);

  useEffect(() => {
    // Event handlers
    const handleMouseUp = () => {
      onDrawEnd?.(state);
      resetState();
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Prevent default behavior (selection of text, or page scrolling)
      // so we don't get ugly UX
      e.preventDefault();

      // return early if not drawing
      if (!state.isDrawing) return;

      const endPointBeforeValidation = substractOffset(
        [e.clientX, e.clientY],
        state.offsetPoint
      );

      updateState(
        {
          endPoint: [
            // clamp to canvas size (so the end point is within the canvas bounds)
            clamp(endPointBeforeValidation[0], 0, canvasSize[0]),
            clamp(endPointBeforeValidation[1], 0, canvasSize[1]),
          ],
        },
        onDraw
      );
    };

    // Subscribe
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      // Unsubscribe
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mousemove", handleMouseMove);
    };
  });

  return {
    onMouseDown: (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      // return early if overlayRef is not set
      if (!overlayRef.current) return;
      const oferlayRect = overlayRef.current.getBoundingClientRect();
      const offsetPoint: Point = [oferlayRect.x, oferlayRect.y];
      const startPoint = substractOffset([e.clientX, e.clientY], offsetPoint);

      // starting new selection, so reset state to start fresh
      resetState({
        isDrawing: true,
        startPoint,
        endPoint: startPoint,
        offsetPoint,
      });
    },
    mouseDrawState: state,
  };
};
