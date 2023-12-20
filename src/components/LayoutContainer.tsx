export const LayoutContainer = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  return (
    <div className="p-4 mx-auto max-w-7xl flex flex-row gap-4">{children}</div>
  );
};
