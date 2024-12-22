import { forwardRef, TextareaHTMLAttributes } from "react";
import { cn } from "@/utils/utils";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          "bg-slate-50 border-[1px] border-slate-300 p-2 rounded-md focus:outline-none focus:bg-white focus:border-slate-400",
          className
        )}
        {...props}
      />
    );
  }
);

export default TextArea;
