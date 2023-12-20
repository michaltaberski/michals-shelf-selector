import React, { useEffect } from "react";
import { useRichState } from "../../utils";

export type ImageAreaSelectorProps = {
  src: string;
};

type MouseDrawState = {
  isDrawing: boolean;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
};

const defaultState: MouseDrawState = {
  isDrawing: false,
  startX: 0,
  startY: 0,
  endX: 0,
  endY: 0,
};

const useMouseDraw = (overlayRef: React.RefObject<HTMLDivElement>) => {
  const { state, updateState, resetState } =
    useRichState<MouseDrawState>(defaultState);

  useEffect(() => {
    // Event handlers
    const handleMouseUp = (e: MouseEvent) => {
      updateState({
        isDrawing: false,
        endX: e.clientX,
        endY: e.clientY,
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      // return early if not drawing
      if (!state.isDrawing) return;

      updateState({
        endX: e.clientX,
        endY: e.clientY,
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
      // starting new selection, so reset state to start fresh
      resetState({
        isDrawing: true,
        startX: e.clientX,
        startY: e.clientY,
      });
    },
    state,
  };
};

const Overlay = () => {
  const overlayRef = React.useRef<HTMLDivElement>(null);
  const { onMouseDown, state } = useMouseDraw(overlayRef);

  useEffect(() => {
    console.log(state);
  }, [state]);

  return (
    <div
      ref={overlayRef}
      onMouseDown={onMouseDown}
      className="absolute top-0 left-0 w-full h-full"
    ></div>
  );
};

export const ImageAreaSelector = ({ src }: ImageAreaSelectorProps) => {
  return (
    // Enforced normalization image width to 640px, so I don't have to play with
    // scaling overlay on resize.
    <div className="relative w-[640px] min-w-[640px]">
      <Overlay />
      <img src={src} className="w-full" />
    </div>
  );
};
