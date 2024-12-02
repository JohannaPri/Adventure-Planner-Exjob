"use client";
import { Path } from "@phosphor-icons/react";
import { useState } from "react";
import {
  Select,
  SelectAction,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectValue,
} from "keep-react";

interface SelectItemType {
  value: string;
  label: string;
}

interface SelectComponentProps {
  items: SelectItemType[];
  defaultValue?: string;
}

export const SelectComponent = ({
  items,
  //@ts-expect-error: Unused variable warning
  defaultValue,
}: SelectComponentProps) => {
  //@ts-expect-error: Unused variable warning
  const [selectedValue, setSelectedValue] = useState<string>("");

  const handleSelect = (value: string): void => {
    setSelectedValue(value);
  };

  return (
    <Select>
      <SelectAction className="border border-slateGray rounded-lg outline-none lg:w-[300px] w-full h-[50px] focus:outline-none text-slateGray pr-4 pl-9 py-1 cursor-pointer">
        <div className="flex items-center text-[#3C3F4E] text-base">
          <span>
            <Path
              size={20}
              className="-ml-6"
              color="slateGray"
              weight="regular"
            />
          </span>
          <SelectValue placeholder="Departure (min 3 letters)" />
        </div>
      </SelectAction>
      <SelectContent>
        <SelectGroup>
          {items.map((item: SelectItemType) => {
            return (
              <SelectItem
                key={item.value}
                value={item.value}
                onClick={() => handleSelect(item.value)}
                className="text-slateGray opacity-1"
              >
                {item.label}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
