import React, { useEffect } from "react";
import { useMouseDraw } from "./useMouseDraw";

export type ImageAreaSelectorProps = {
  imageUrl: string;
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
