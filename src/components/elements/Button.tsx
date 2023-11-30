import React from "react";
import { IconType } from "react-icons";

interface ButtonProps {
  label: string; // 버튼 내용
  onClick?: () => void;
  disabled?: boolean;
  outline?: boolean; // 테두리만 있는 하얀 버튼
  small?: boolean;
  icon?: IconType;
}

const Button = ({
  label,
  onClick,
  disabled,
  outline,
  small,
  icon: Icon,
}: ButtonProps) => {
  return (
    <button
      type="submit"
      disabled={disabled}
      onClick={onClick}
      className={`
        relative
        disabled:opacity-70
        disabled:cursor-not-allowed
        rounded-md
        hover:opacity-80
        transition
        w-full
        my-10
        p-3
        ${outline ? "border border-neutral-300" : "bg-orange-400"}
        ${outline ? "border-black" : "border-orange-400"}
        ${outline ? "text-black" : "text-white"}
        ${outline && "hover:text-gray-600"}
        ${small ? "text-sm" : "text-md"}
        ${small ? "py-2" : "py-3"}
        ${small ? "font-medium" : "font-semibold"}
        ${small ? "border-[1px]" : "border-2"}
    `}
    >
      {Icon && <Icon size={24} className="absolute left-4 top-3" />}
      {label}
    </button>
  );
};

export default Button;
