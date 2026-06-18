import { cn } from "@/shared/lib/utils";

interface AvatarProps {
  name: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: "h-7 w-7 text-xs",
  md: "h-9 w-9 text-sm",
  lg: "h-12 w-12 text-lg",
};

export function Avatar({ name, className, size = "md" }: AvatarProps) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full bg-primary/20 font-semibold text-primary",
        sizeMap[size],
        className
      )}
    >
      {initials}
    </div>
  );
}
