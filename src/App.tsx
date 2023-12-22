import { LayoutContainer } from "./components/LayoutContainer";
import { LayoutBox } from "./components/LayoutBox";
import { ImageAreaSelector } from "./components/ImageAreaSelector";
import { LayoutFooter } from "./components/LayoutFooter";
import { useRichState } from "./utils";
import { Polygon } from "./types";
import { StockListItem } from "./components/StockListItem";
import { set } from "lodash";

const App = () => {
  const { state, updateState, resetState } = useRichState<{
    selectedPolygonIndex: number | null;
    polygons: Polygon[];
  }>({
    selectedPolygonIndex: null,
    polygons: [],
  });

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
            selectedPolygonIndex={state.selectedPolygonIndex ?? undefined}
            onPolygonEditEnd={(index, polygon) => {
              updateState({
                polygons: set([...state.polygons], index, [...polygon]),
                selectedPolygonIndex: null,
              });
            }}
            onPoligonSelect={(index) => {
              // Toggle selection on click
              const selectedPolygonIndex =
                state.selectedPolygonIndex === index ? null : index;
              updateState({ selectedPolygonIndex });
            }}
            onNewPolygonDrawn={(shelf) => {
              updateState({ polygons: [...state.polygons, shelf] });
            }}
          />
        </LayoutBox>
        <LayoutBox className="w-1/4 min-w-64">
          {state.polygons.length === 0 ? (
            <div className="py-2 text-center text-slate-400">
              Select stock on the picture
            </div>
          ) : (
            <ul className="flex flex-col gap-2">
              {state.polygons.map((_polygon, index) => {
                const isSelected = index === state.selectedPolygonIndex;
                return (
                  <StockListItem
                    key={index}
                    index={index}
                    isSelected={isSelected}
                    onClick={() =>
                      updateState({
                        selectedPolygonIndex: isSelected ? null : index,
                      })
                    }
                    onDeleteClick={() => {
                      updateState({
                        selectedPolygonIndex: null,
                        polygons: state.polygons.filter((_, i) => i !== index),
                      });
                    }}
                  />
                );
              })}
            </ul>
          )}
          <div className="pt-4 mt-4 border-t">
            <button
              disabled={state.polygons.length === 0}
              className="p-2 rounded text-white w-full text-sm bg-rose-500 hover:bg-rose-600 active:bg-rose-700 disabled:bg-rose-200"
              onClick={() => confirm("Are you sure?") && resetState()}
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
