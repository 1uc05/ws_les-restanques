import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "min-h-[120px] w-full resize-y rounded-none border-0 border-b border-provence-300 bg-transparent px-0 py-2 font-sans text-[0.9375rem] leading-relaxed text-ink transition-colors duration-300",
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
Textarea.displayName = "Textarea";

export { Textarea };
