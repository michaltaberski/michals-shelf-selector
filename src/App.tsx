import { LayoutContainer } from "./components/LayoutContainer";
import { LayoutBox } from "./components/LayoutBox";
import { ImageAreaSelector } from "./components/ImageAreaSelector";
import { LayoutFooter } from "./components/LayoutFooter";
import { cn, useRichState } from "./utils";
import { COLORS } from "./const";
import { Trash2 } from "lucide-react";
import { Polygon } from "./types";

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
            <ul className="flex flex-col gap-2">
              {state.polygons.map((_polygon, index) => {
                const isSelected = index === state.selectedPolygonIndex;
                return (
                  <li
                    key={index}
                    className={cn(
                      "flex items-center gap-2 hover:bg-slate-50 rounded p-2 border border-transparent hover:border-slate-300",
                      isSelected &&
                        `border-rose-500 hover:border-rose-500 bg-rose-50 hover:bg-rose-100 text-rose-700`
                    )}
                    onClick={() =>
                      updateState({
                        selectedPolygonIndex: isSelected ? null : index,
                      })
                    }
                  >
                    <div
                      className="w-6 h-6 rounded shrink-0"
                      style={{
                        backgroundColor: `#${COLORS[index % COLORS.length]}`,
                      }}
                    />
                    <div className="text-sm w-full">Item #{index + 1}</div>
                    <button
                      className={cn(
                        "hover:scale-125 transition-transform ease-in-out",
                        !isSelected && "text-slate-400 hover:text-slate-600"
                      )}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (confirm("Are you sure?") === false) return;
                        updateState({
                          selectedPolygonIndex: null,
                          polygons: state.polygons.filter(
                            (_, i) => i !== index
                          ),
                        });
                      }}
                    >
                      <Trash2 width={20} height={20} />
                    </button>
                  </li>
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
