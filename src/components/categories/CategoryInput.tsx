import React from "react";

interface CategoryInputProps {
  label: string;
  selected?: boolean;
  path: string;
  onClick: (value: string) => void;
}

const CategoryInput = ({
  label,
  selected,
  onClick,
  path,
}: CategoryInputProps) => {
  return (
    <div
      onClick={() => onClick(path)}
      className={`
        border-2  text-gray-500 font-medium text-sm
        rounded-md p-3
        cursor-pointer transition
        flex justify-center
        hover:border-orange-300
        ${selected ? "border-orange-300" : "border-gray-200"}
        `}
    >
      <div>{label}</div>
    </div>
  );
};

export default CategoryInput;
