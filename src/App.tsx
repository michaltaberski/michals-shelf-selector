import { LayoutContainer } from "./components/LayoutContainer";
import { LayoutBox } from "./components/LayoutBox";

const App = () => {
  return (
    <>
      <LayoutContainer className="mt-4">
        <h1 className="text-3xl">Shelf Selector 🎉</h1>
      </LayoutContainer>
      <LayoutContainer>
        <LayoutBox className="w-3/4"></LayoutBox>
        <LayoutBox className="w-1/4 min-w-64"></LayoutBox>
      </LayoutContainer>
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
    </>
  );
};

export default App;
