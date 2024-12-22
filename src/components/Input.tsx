import { forwardRef, InputHTMLAttributes } from "react";
import { cn } from "@/utils/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "focus:bg-white focus:outline-none focus:border-slate-400 bg-slate-50 p-2 border-[1px] border-slate-300 rounded-md",
          className
        )}
        {...props}
      />
    );
  }
);

export default Input;
