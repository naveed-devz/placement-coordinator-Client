import { cn } from "@/lib/utils";

type DonutProgressProps = {
  value: number;
  label?: string;
  caption?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizes = {
  sm: "h-14 w-14 text-sm",
  md: "h-20 w-20 text-lg",
  lg: "h-28 w-28 text-2xl",
};

export function DonutProgress({ value, label, caption, size = "md", className }: DonutProgressProps) {
  const normalizedValue = Math.max(0, Math.min(100, value));

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div
        className={cn("relative shrink-0 rounded-full", sizes[size])}
        style={{
          background: `conic-gradient(hsl(var(--secondary)) ${normalizedValue * 3.6}deg, hsl(var(--muted)) 0deg)`,
        }}
        role="img"
        aria-label={`${label ?? "Progress"} ${normalizedValue}%`}
      >
        <div className="absolute inset-1.5 flex items-center justify-center rounded-full bg-white">
          <span className="font-bold text-foreground">{normalizedValue}%</span>
        </div>
      </div>
      {(label || caption) && (
        <div className="min-w-0">
          {label ? <p className="truncate text-sm font-semibold text-foreground">{label}</p> : null}
          {caption ? <p className="mt-0.5 text-xs text-muted-foreground">{caption}</p> : null}
        </div>
      )}
    </div>
  );
}
