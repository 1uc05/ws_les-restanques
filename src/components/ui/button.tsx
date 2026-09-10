import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Boutons "pierre taillée" : rectangulaires, texte capitales espacées,
 * transition de valeur plutôt qu'effet lumineux. Jamais de pilule.
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-sm font-sans font-semibold uppercase tracking-wideish transition-all duration-300 ease-editorial disabled:pointer-events-none disabled:opacity-40",
  {
    variants: {
      variant: {
        default:
          "bg-olive-700 text-provence-50 hover:bg-olive-800 active:bg-olive-900",
        terracotta:
          "bg-terracotta-600 text-provence-50 hover:bg-terracotta-700 active:bg-terracotta-800",
        destructive: "bg-red-700 text-white hover:bg-red-800",
        outline:
          "border border-ink/25 bg-transparent text-ink hover:border-ink/60 hover:bg-ink/[0.03]",
        /* Sur fond sombre ou photographie */
        light:
          "bg-provence-50 text-ink hover:bg-white active:bg-provence-100",
        lightOutline:
          "border border-provence-50/45 bg-transparent text-provence-50 backdrop-blur-[2px] hover:border-provence-50 hover:bg-provence-50/10",
        secondary:
          "bg-provence-200 text-ink hover:bg-provence-300",
        ghost: "text-ink-soft hover:bg-provence-100 hover:text-ink",
        link: "font-normal normal-case tracking-normal text-olive-700 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-6 text-[0.6875rem]",
        sm: "h-9 px-4 text-[0.625rem]",
        lg: "h-[3.25rem] px-9 text-xs",
        icon: "h-10 w-10 px-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
