import { useMemo } from "react";
import { MouseDrawState } from "./useMouseDraw";

export type NewShelfSvgOverlayProps = {
  mouseDrawState: MouseDrawState;
};

const caulculateDerivedState = (mouseDrawState: MouseDrawState) => {
  const canvasWidth = mouseDrawState.canvasSize[0];
  const canvasHeight = mouseDrawState.startPoint[1];

  const topLeftPoint = mouseDrawState.startPoint;
  const topRightPoint = [
    mouseDrawState.endPoint[0],
    mouseDrawState.startPoint[1],
  ];
  const bottomRightPoint = mouseDrawState.endPoint;
  const bottomLeftPoint = [
    mouseDrawState.startPoint[0],
    mouseDrawState.endPoint[1],
  ];

  return {
    canvasHeight,
    canvasWidth,
    points: [topLeftPoint, topRightPoint, bottomRightPoint, bottomLeftPoint],
  };
};

export const NewShelfSvgOverlay = ({
  mouseDrawState,
}: NewShelfSvgOverlayProps) => {
  const state = useMemo(
    () => caulculateDerivedState(mouseDrawState),
    [mouseDrawState]
  );

  console.log(JSON.stringify(state));

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
