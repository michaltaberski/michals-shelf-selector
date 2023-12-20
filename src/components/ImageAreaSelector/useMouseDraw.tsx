import React, { useEffect } from "react";
import { useRichState } from "../../utils";
import { Point } from "./types";
import { substractOffset } from "./utils";

export type ImageAreaSelectorProps = {
  imageUrl: string;
};

export type MouseDrawState = {
  isDrawing: boolean;
  // offset is the position of the top left corner of the overlay relative to the viewport
  offsetPoint: Point;
  startPoint: Point;
  endPoint: Point;
  // the max [x, y] values of the canvas, or [width, height] (its the same)
  canvasSize: Point;
};

const defaultState: MouseDrawState = {
  isDrawing: false,
  offsetPoint: [0, 0],
  startPoint: [0, 0],
  endPoint: [0, 0],
  canvasSize: [0, 0],
};

export const useMouseDraw = (
  overlayRef: React.RefObject<HTMLDivElement>,
  onDrawEnd: (state: MouseDrawState) => void
) => {
  const { state, updateState, resetState } =
    useRichState<MouseDrawState>(defaultState);

  useEffect(() => {
    // Event handlers
    const handleMouseUp = () => {
      onDrawEnd(state);
      resetState();
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Prevent default behavior (selection of text, or page scrolling)
      // so we don't get ugly UX
      e.preventDefault();

      // return early if not drawing
      if (!state.isDrawing) return;

      updateState({
        endPoint: substractOffset([e.clientX, e.clientY], state.offsetPoint),
      });
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
        canvasSize: [oferlayRect.width, oferlayRect.height],
      });
    },
    mouseDrawState: state,
  };
};
