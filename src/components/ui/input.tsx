import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

/**
 * Champs minimalistes : filet inférieur uniquement, fond transparent.
 * L'écriture se pose sur le papier plutôt que dans une boîte.
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "h-11 w-full rounded-none border-0 border-b border-provence-300 bg-transparent px-0 py-2 font-sans text-[0.9375rem] text-ink transition-colors duration-300",
          "placeholder:text-ink-faint/55",
          "hover:border-provence-400 focus:border-olive-700 focus:shadow-[0_1px_0_0_#586033] focus:outline-none focus-visible:outline-none",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
