import { useState, useRef, useEffect, type ReactNode } from "react";
import { cn } from "@/shared/lib/utils";

interface DropdownMenuProps {
  trigger: ReactNode;
  children: ReactNode;
  align?: "start" | "end";
}

export function DropdownMenu({ trigger, children, align = "end" }: DropdownMenuProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    <div ref={ref} className="relative inline-block">
      <div onClick={() => setOpen(!open)}>{trigger}</div>
      {open && (
        <div
          className={cn(
            "absolute top-full z-50 mt-1 min-w-[180px] rounded-[12px] border border-border bg-surface p-1 shadow-lg animate-in fade-in slide-in-from-top-2",
            align === "end" ? "right-0" : "left-0"
          )}
          onClick={() => setOpen(false)}
        >
          {children}
        </div>
      )}
    </div>
  );
}

interface DropdownMenuItemProps {
  children: ReactNode;
  onClick?: () => void;
  danger?: boolean;
  className?: string;
}

export function DropdownMenuItem({ children, onClick, danger, className }: DropdownMenuItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
        danger
          ? "text-danger hover:bg-danger/10"
          : "text-textSecondary hover:bg-surface hover:text-textPrimary",
        className
      )}
    >
      {children}
    </button>
  );
}
