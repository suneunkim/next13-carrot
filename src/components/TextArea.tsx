import React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface TextAreaProps {
  id: string;
  label: string;
  disabled?: boolean;
  register: UseFormRegister<FieldValues>;
  required?: boolean;
  errors: FieldErrors;
  [key: string]: any;
}

const TextArea = ({
  id,
  label,
  type,
  disabled,
  register,
  required,
  errors,
  ...rest
}: TextAreaProps) => {
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
        <textarea
          id={id}
          disabled={disabled}
          {...register(id, { required })}
          rows={4}
          {...rest}
          className={`w-full p-2 border rounded-md shadow-sm transition 
          focus:outline-none focus:ring-orange-400 focus:border-orange-400 focus:ring-1
          disabled:opacity-70 disabled:cursor-not-allowed 
          ${errors[id] ? "border-red-500" : "border-neutral-300"}
          ${errors[id] ? "focus:border-rose-500" : "focus:border-black"}
        `}
        />
      </div>
    </div>
  );
};

export default TextArea;
