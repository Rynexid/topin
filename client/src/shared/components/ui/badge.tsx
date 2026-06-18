import { forwardRef, HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/shared/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
  {
    variants: {
      variant: {
        default: "bg-primary/20 text-primary",
        success: "bg-success/20 text-success",
        warning: "bg-warning/20 text-warning",
        danger: "bg-danger/20 text-danger",
        secondary: "bg-textSecondary/20 text-textSecondary",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface BadgeProps extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, ...props }, ref) => (
    <span ref={ref} className={cn(badgeVariants({ variant }), className)} {...props} />
  )
);
Badge.displayName = "Badge";

export { Badge, badgeVariants };
