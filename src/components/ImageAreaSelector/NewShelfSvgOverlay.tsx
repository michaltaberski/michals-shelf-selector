import { useMemo } from "react";
import { MouseDrawState } from "./useMouseDraw";

export type NewShelfSvgOverlayProps = {
  mouseDrawState: MouseDrawState;
};

const caulculateDerivedState = (mouseDrawState: MouseDrawState) => {
  return {
    canvasWidth: mouseDrawState.canvasSize[0],
    canvasHeight: mouseDrawState.canvasSize[1],
    points: [
      // top left
      mouseDrawState.startPoint,
      // top right
      [mouseDrawState.endPoint[0], mouseDrawState.startPoint[1]],
      // bottom right
      mouseDrawState.endPoint,
      // bottom left
      [mouseDrawState.startPoint[0], mouseDrawState.endPoint[1]],
    ],
  };
};

export const NewShelfSvgOverlay = ({
  mouseDrawState,
}: NewShelfSvgOverlayProps) => {
  // useMemo to avoid recalculating derived state on every render
  const state = useMemo(
    () => caulculateDerivedState(mouseDrawState),
    [mouseDrawState]
  );

  return (
    <svg
      width={state.canvasWidth}
      height={state.canvasHeight}
      xmlns="http://www.w3.org/2000/svg"
    >
      <polygon
        points={state.points.map((p) => p.join(",")).join(" ")}
        fill="rgba(255, 0, 0, 0.5)"
        stroke="red"
        stroke-width="2"
        stroke-dasharray="5,5"
      />
    </svg>
  );
};
