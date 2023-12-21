import { cn } from "../utils";
import { COLORS } from "../const";
import { Trash2 } from "lucide-react";

export type StockListItemProps = {
  onClick: () => void;
  onDeleteClick: () => void;
  isSelected: boolean;
  index: number;
};

export const StockListItem = ({
  onClick,
  onDeleteClick,
  isSelected,
  index,
}: StockListItemProps) => {
  return (
    <li
      onClick={onClick}
      className={cn(
        "group flex items-center gap-2 hover:bg-slate-50 rounded p-2 border border-transparent hover:border-slate-300 cursor-pointer",
        isSelected &&
          `border-rose-500 hover:border-rose-500 bg-rose-50 hover:bg-rose-100 text-rose-700`
      )}
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
          !isSelected &&
            "text-transparent group-hover:text-slate-400 hover:text-slate-600"
        )}
        onClick={(e) => {
          e.stopPropagation();
          onDeleteClick();
        }}
      >
        <Trash2 width={20} height={20} />
      </button>
    </li>
  );
};
