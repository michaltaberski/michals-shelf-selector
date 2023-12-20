import { Polygon } from "../../types";
import { DrawNewShelfOverlay } from "./DrawNewShelfOverlay";
import { DrawShelfsOverlay } from "./DrawShelfsOverlay";

export type ImageAreaSelectorProps = {
  imageUrl: string;
  polygons: Polygon[];
  onNewShelfDrawn: (shelf: Polygon) => void;
};

export const ImageAreaSelector = ({
  imageUrl,
  polygons,
  onNewShelfDrawn,
}: ImageAreaSelectorProps) => {
  return (
    // Enforced normalization image width to 640px, so I don't have to play with
    // scaling overlay on resize.
    <div className="relative w-[640px] min-w-[640px]">
      {/*
        Why 2 overlays?
        To avoid fat component with too many responsibilities.
      */}
      <DrawShelfsOverlay polygons={polygons} />
      <DrawNewShelfOverlay onDrawEnd={onNewShelfDrawn} />
      <img src={imageUrl} className="w-full" />
    </div>
  );
};
