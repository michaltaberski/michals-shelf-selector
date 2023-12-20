import { cn } from "../utils";

export const LayoutBox = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("p-4 bg-white rounded border", className)}>
      {children}
    </div>
  );
};
