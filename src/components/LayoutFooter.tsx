import { LayoutContainer } from "./LayoutContainer";

export const LayoutFooter = () => {
  return (
    <LayoutContainer>
      <div className="p-4 border-t w-full text-sm text-slate-500">
        Michal's Shelf Selector. Images from{" "}
        <a
          href="https://unsplash.com"
          target="_blank"
          className="text-amber-500 underline  hover:no-underline"
        >
          https://unsplash.com
        </a>
        .
      </div>
    </LayoutContainer>
  );
};
