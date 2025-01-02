import { forwardRef, InputHTMLAttributes } from "react";
import { cn } from "@/utils/utils";

interface Option {
  value?: number | string;
  label: string;
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  errorMessage?: string;
}

interface SelectProps extends InputHTMLAttributes<HTMLSelectElement> {
  className?: string;
  options: Option[];
  errorMessage?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, errorMessage, ...props }, ref) => {
    return (
      <>
        <input
          ref={ref}
          className={cn(
            "focus:bg-white focus:outline-none focus:border-slate-400 bg-slate-100 p-2 border-[1px] border-slate-300 rounded-md",
            errorMessage && "border-red-500 border-2 focus:border-red-400",
            className
          )}
          {...props}
        />
        {errorMessage && <p className="text-sm text-red-300">{errorMessage}</p>}
      </>
    );
  }
);

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, errorMessage, options, ...props }, ref) => {
    return (
      <>
        <select
          ref={ref}
          className={cn(
            "focus:bg-white focus:outline-none focus:border-slate-400 bg-slate-100 p-2 border-[1px] border-slate-300 rounded-md",
            errorMessage && "border-red-500 border-2",
            className
          )}
          {...props}
        >
          {options.map((option) => (
            <option key={option.label} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {errorMessage && <p className="text-sm text-red-300">{errorMessage}</p>}
      </>
    );
  }
);
