import React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
  id: string;
  label: string;
  type: string;
  disabled?: boolean;
  formatPrice?: boolean;
  register: UseFormRegister<FieldValues>;
  required?: boolean;
  errors: FieldErrors;
  [key: string]: any;
}

const Input = ({ id, label, type, disabled, formatPrice, register, required, errors, ...rest }: InputProps) => {
  return (
    <div className="relative">
      <label
        htmlFor={id}
        className={`
        mb-1 pl-1 block text-sm font-medium text-neutral-700
        peer-placeholder-shown:text-neutral-400
        peer-placeholder-shown:scale-100
        peer-focus-:scale-75
        ${errors[id] ? "text-rose-500" : "text-zinc-400"} 
      `}
      >
        {label}
      </label>
      <div>
        {formatPrice && (
          <span
            className="absolute left-0 pl-3 bottom-2
        text-neutral-500 pointer-events-none
        "
          >
            ₩
          </span>
        )}
        <input
          id={id}
          disabled={disabled}
          type={type}
          {...register(id, { required })}
          {...rest}
          className={`w-full p-2 border rounded-md shadow-sm transition 
          focus:outline-none focus:ring-orange-400 focus:border-orange-400 focus:ring-1
          disabled:opacity-70 disabled:cursor-not-allowed 
          ${formatPrice ? "pl-8" : ""}
          ${errors[id] ? "border-red-500" : "border-neutral-300"}
          ${errors[id] ? "focus:border-rose-500" : "focus:border-black"}
        `}
        />
      </div>
    </div>
  );
};

export default Input;
