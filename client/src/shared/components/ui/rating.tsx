import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/shared/lib/utils";

interface RatingProps {
  value: number;
  onChange?: (value: number) => void;
  size?: "sm" | "md" | "lg";
  readonly?: boolean;
  showValue?: boolean;
}

const sizeMap = { sm: "h-3.5 w-3.5", md: "h-4 w-4", lg: "h-5 w-5" };

export function Rating({ value, onChange, size = "md", readonly = false, showValue }: RatingProps) {
  const [hovered, setHovered] = useState(0);
  const displayValue = hovered || value;

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            disabled={readonly}
            onMouseEnter={() => !readonly && setHovered(star)}
            onMouseLeave={() => !readonly && setHovered(0)}
            onClick={() => onChange?.(star)}
            className={cn(
              "transition-colors",
              readonly ? "cursor-default" : "cursor-pointer",
              star <= displayValue ? "text-warning" : "text-border"
            )}
          >
            <Star className={cn(sizeMap[size], "fill-current")} />
          </button>
        ))}
      </div>
      {showValue && (
        <span className="text-xs text-textSecondary">{value.toFixed(1)}</span>
      )}
    </div>
  );
}

export function RatingDisplay({ value, size = "sm" }: { value: number; size?: "sm" | "md" | "lg" }) {
  return <Rating value={value} readonly size={size} showValue />;
}
