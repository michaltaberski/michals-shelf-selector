import React, { useEffect } from "react";
import { useRichState } from "../../utils";
import { Point } from "./types";

export type ImageAreaSelectorProps = {
  imageUrl: string;
};

type MouseDrawState = {
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

export const useMouseDraw = (overlayRef: React.RefObject<HTMLDivElement>) => {
  const { state, updateState, resetState } =
    useRichState<MouseDrawState>(defaultState);

  useEffect(() => {
    // Event handlers
    const handleMouseUp = (e: MouseEvent) => {
      updateState({
        isDrawing: false,
        endPoint: [e.clientX, e.clientY],
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      // return early if not drawing
      if (!state.isDrawing) return;

      updateState({
        endPoint: [e.clientX, e.clientY],
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
      // starting new selection, so reset state to start fresh
      resetState({
        isDrawing: true,
        startPoint: [e.clientX, e.clientY],
        offsetPoint: [oferlayRect.x, oferlayRect.y],
        canvasSize: [oferlayRect.width, oferlayRect.height],
      });
    },
    state,
  };
};
