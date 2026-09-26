import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        // Solid Google Blue (#1A73E8) — the real home.google.com primary CTA color.
        default: "bg-accent text-accent-ink hover:brightness-110 hover:shadow-md",
        // Dark pill — Google's secondary solid button, for use on colored/photo sections.
        accent: "bg-ink text-white hover:brightness-125 hover:shadow-md",
        // 2px purple outline pill — matches the real promo-bar "Buy now" style (#2B0E44).
        outline: "border-2 border-[#2b0e44] text-[#2b0e44] bg-transparent hover:bg-[#2b0e44]/5",
        ghost: "hover:bg-neutral-100",
      },
      size: {
        default: "h-11 px-5",
        sm: "h-9 px-4 text-xs",
        icon: "h-10 w-10 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
