type SelectProps = {
  containerClass: string;
  selectClass: string;
  children?: React.ReactNode;
} & Omit<React.ComponentProps<"select">, "children">;

export const Select = ({
  containerClass,
  selectClass,
  children,
  ...rest
}: SelectProps) => {
  return (
    <div className={containerClass}>
      <select className={selectClass} {...rest}>
        {children}
      </select>
    </div>
  );
};
