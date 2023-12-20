export type ImageAreaSelectorProps = {
  src: string;
};

export const ImageAreaSelector = ({ src }: ImageAreaSelectorProps) => {
  return (
    <>
      {/*
        Enforced normalization image width to 640px, so I don't have to play with
        scaling overlay on resize.
      */}
      <img src={src} className="w-[640px] min-w-[640px]" />
    </>
  );
};
