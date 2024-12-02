import React, { useState, useEffect, Suspense } from "react";
import * as PhosphorIcons from "@phosphor-icons/react";

type IconName = keyof typeof PhosphorIcons;

type ButtonProps = {
  className: string;
  iconName?: IconName;
  size?: number;
  selected?: boolean;
  children: string | React.ReactNode;
} & Omit<React.ComponentProps<"button">, "children">;

export const ButtonWIcon = ({
  className,
  iconName,
  size,
  selected = false,
  children,
  ...rest
}: ButtonProps) => {
  const [Icon, setIcon] = useState<React.ElementType | null>(null);

  const loadIcon = async (name: IconName) => {
    try {
      const iconModule = await import("@phosphor-icons/react");
      const IconComponent = iconModule[name] as React.FC<{ size?: number }>;
      return IconComponent;
    } catch (error) {
      console.error(`Icon: "${name} not found.`, error);
      return null;
    }
  };

  useEffect(() => {
    if (iconName) {
      loadIcon(iconName as IconName).then(setIcon);
    }
  }, [iconName]);

  return (
    <button
      {...rest}
      className={`rounded-none flex flex-col items-center border-b-2 ${
        selected ? "border-slateGray" : "border-transparent"
      } ${className}`}
    >
      <Suspense fallback={<span>Loading icon...</span>}>
        {Icon && <Icon size={size} />}
      </Suspense>
      {children}
    </button>
  );
};
