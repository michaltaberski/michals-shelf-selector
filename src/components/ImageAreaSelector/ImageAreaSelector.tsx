import { DrawNewShelfOverlay } from "./DrawNewShelfOverlay";

export type ImageAreaSelectorProps = {
  imageUrl: string;
};

export const ImageAreaSelector = ({ imageUrl }: ImageAreaSelectorProps) => {
  return (
    // Enforced normalization image width to 640px, so I don't have to play with
    // scaling overlay on resize.
    <div className="relative w-[640px] min-w-[640px]">
      <DrawNewShelfOverlay
        onDrawEnd={(polygon) => {
          console.log(polygon);
        }}
      />
      <img src={imageUrl} className="w-full" />
    </div>
  );
};
