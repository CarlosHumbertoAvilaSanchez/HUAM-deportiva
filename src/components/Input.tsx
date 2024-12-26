import { forwardRef, InputHTMLAttributes } from "react";
import { cn } from "@/utils/utils";

interface Option {
  value?: number | string;
  label: string;
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

interface SelectProps extends InputHTMLAttributes<HTMLSelectElement> {
  className?: string;
  options: Option[];
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "focus:bg-white focus:outline-none focus:border-slate-400 bg-slate-100 p-2 border-[1px] border-slate-300 rounded-md",
          className
        )}
        {...props}
      />
    );
  }
);

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, options, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={cn(
          "focus:bg-white focus:outline-none focus:border-slate-400 bg-slate-100 p-2 border-[1px] border-slate-300 rounded-md",
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
    );
  }
);
