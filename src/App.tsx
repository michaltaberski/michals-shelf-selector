import { LayoutContainer } from "./components/LayoutContainer";
import { LayoutBox } from "./components/LayoutBox";
import { ImageAreaSelector, Polygon } from "./components/ImageAreaSelector";
import { LayoutFooter } from "./components/LayoutFooter";
import { useRichState } from "./utils";
import { COLORS } from "./const";

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
          {state.polygons.length === 0 ? (
            <div className="p-4 text-center text-slate-700">
              Select item on the picture
            </div>
          ) : (
            <ul className="flex flex-col gap-4">
              {state.polygons.map((polygon, index) => (
                <li key={index} className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded"
                    style={{
                      backgroundColor: `#${COLORS[index % COLORS.length]}`,
                    }}
                  />
                  <div className="text-sm text-slate-700">
                    Item #{index + 1}
                  </div>
                </li>
              ))}
            </ul>
          )}
          <div className="pt-4 mt-4 border-t">
            <button
              disabled={state.polygons.length === 0}
              className="p-2 rounded text-white w-full text-sm bg-rose-500 hover:bg-rose-600 active:bg-rose-700 disabled:bg-rose-200"
              onClick={() => resetState()}
            >
              Reset
            </button>
          </div>
        </LayoutBox>
      </LayoutContainer>
      <LayoutFooter />
    </>
  );
};

export default App;
