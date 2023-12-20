import { cn } from "../utils";

export const LayoutContainer = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("p-4 mx-auto max-w-7xl flex flex-row gap-4", className)}>
      {children}
    </div>
  );
};
