// "use client";

// import React, { ReactNode, ButtonHTMLAttributes, forwardRef } from "react";

// interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
//   children?: ReactNode;
//   className?: string;
//   variant?: string;
// }

// const Button = forwardRef<HTMLButtonElement, ButtonProps>(({children, className, variant, ...props}, ref))
// // const Button: React.FC<ButtonProps> = ({
// //   onClick,
// //   type = "button",
// //   children,
// //   className = "",
// // }) => {
// //   return (
// //     <button
// //       type={type}
// //       onClick={onClick}
// //       className={`shadow-md px-4 py-2 inline-flex items-center justify-center rounded-md ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${className}`}
// //     >
// //       {children}
// //     </button>
// //   );
// // };

// export default Button;

"use client";

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
}

const Button: React.FC<ButtonProps> = ({
  variant = "default",
  size = "md",
  className,
  children,
  ...props
}) => {
  // Clases base y variantes
  const baseClasses =
    "shadow-md px-4 py-2 inline-flex items-center justify-center rounded-md ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

  const variantClasses = {
    default: "bg-slate-100 hover:bg-slate-100 border-[1px]",
    primary: "bg-[#043364] text-white",
    secondary: "bg-gray-300 text-gray-700 hover:bg-gray-400",
    danger: "bg-red-600 text-white hover:bg-red-700",
    ghost:
      "bg-transparent text-gray-900 hover:bg-gray-100 border-[1px] border-[#043364]",
  };

  const sizeClasses = {
    sm: "px-2 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  // Combinar las clases
  const classes = twMerge(
    clsx(baseClasses, variantClasses[variant], sizeClasses[size], className)
  );

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

export default Button;
