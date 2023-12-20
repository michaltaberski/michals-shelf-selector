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
};

const defaultState: MouseDrawState = {
  isDrawing: false,
  offsetPoint: { x: 0, y: 0 },
  startPoint: { x: 0, y: 0 },
  endPoint: { x: 0, y: 0 },
};

export const useMouseDraw = (overlayRef: React.RefObject<HTMLDivElement>) => {
  const { state, updateState, resetState } =
    useRichState<MouseDrawState>(defaultState);

  useEffect(() => {
    // Event handlers
    const handleMouseUp = (e: MouseEvent) => {
      updateState({
        isDrawing: false,
        endPoint: { x: e.clientX, y: e.clientY },
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      // return early if not drawing
      if (!state.isDrawing) return;

      updateState({
        endPoint: { x: e.clientX, y: e.clientY },
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
        startPoint: { x: e.clientX, y: e.clientY },
        offsetPoint: { x: oferlayRect.x, y: oferlayRect.y },
      });
    },
    state,
  };
};
