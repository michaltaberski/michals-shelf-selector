import { LayoutContainer } from "./components/LayoutContainer";
import { LayoutBox } from "./components/LayoutBox";
import { ImageAreaSelector } from "./components/ImageAreaSelector";
import { LayoutFooter } from "./components/LayoutFooter";

const App = () => {
  return (
    <>
      <LayoutContainer className="mt-4">
        <h1 className="text-3xl">Shelf Selector 🎉</h1>
      </LayoutContainer>
      <LayoutContainer>
        <LayoutBox className="w-3/4 overflow-scroll">
          <ImageAreaSelector src="/images/shelf-1.avif" />
        </LayoutBox>
        <LayoutBox className="w-1/4 min-w-64"></LayoutBox>
      </LayoutContainer>
      <LayoutFooter />
    </>
  );
};

export default App;
