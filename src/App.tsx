import { LayoutContainer } from "./components/LayoutContainer";
import { LayoutBox } from "./components/LayoutBox";

const App = () => {
  return (
    <>
      <LayoutContainer>
        <LayoutBox className="w-3/4"></LayoutBox>
        <LayoutBox className="w-1/4 min-w-64"></LayoutBox>
      </LayoutContainer>
      <LayoutContainer>
        <div className="p-4 border-t w-full text-sm">
          Michal's Shelf Selector
        </div>
      </LayoutContainer>
    </>
  );
};

export default App;
