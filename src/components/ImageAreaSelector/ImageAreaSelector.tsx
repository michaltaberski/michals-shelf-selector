import React from "react";
import { useMouseDraw } from "./useMouseDraw";
import { NewShelfSvgOverlay } from "./NewShelfSvgOverlay";

export type ImageAreaSelectorProps = {
  imageUrl: string;
};

const Overlay = () => {
  const overlayRef = React.useRef<HTMLDivElement>(null);
  const { onMouseDown, mouseDrawState } = useMouseDraw(
    overlayRef,
    (result) => {}
  );

  return (
    <div
      ref={overlayRef}
      onMouseDown={onMouseDown}
      className="absolute top-0 left-0 w-full h-full"
    >
      <NewShelfSvgOverlay mouseDrawState={mouseDrawState} />
    </div>
  );
};

export const ImageAreaSelector = ({ imageUrl }: ImageAreaSelectorProps) => {
  return (
    // Enforced normalization image width to 640px, so I don't have to play with
    // scaling overlay on resize.
    <div className="relative w-[640px] min-w-[640px]">
      <Overlay />
      <img src={imageUrl} className="w-full" />
    </div>
  );
};
