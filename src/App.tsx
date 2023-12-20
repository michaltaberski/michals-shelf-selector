import { LayoutContainer } from "./components/LayoutContainer";
import { LayoutBox } from "./components/LayoutBox";
import { ImageAreaSelector, Polygon } from "./components/ImageAreaSelector";
import { LayoutFooter } from "./components/LayoutFooter";
import { useRichState } from "./utils";

const App = () => {
  const { state, updateState, resetState } = useRichState<{
    polygons: Polygon[];
  }>({ polygons: [] });

  return (
    <>
      <LayoutContainer className="mt-4">
        <h1 className="text-3xl">Shelf Selector 🎉</h1>
      </LayoutContainer>
      <LayoutContainer>
        <LayoutBox className="w-3/4 overflow-scroll">
          <ImageAreaSelector
            imageUrl="/images/shelf-1.avif"
            polygons={state.polygons}
            onNewShelfDrawn={(shelf) => {
              updateState({ polygons: [...state.polygons, shelf] });
            }}
          />
        </LayoutBox>
        <LayoutBox className="w-1/4 min-w-64">
          <button
            className="p-2 rounded text-white w-full text-sm bg-rose-500 hover:bg-rose-600 active:bg-rose-700"
            onClick={() => resetState()}
          >
            Reset
          </button>
        </LayoutBox>
      </LayoutContainer>
      <LayoutFooter />
    </>
  );
};

export default App;
