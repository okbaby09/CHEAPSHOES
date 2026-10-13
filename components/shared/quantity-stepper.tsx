"use client";

import { Minus, Plus } from "lucide-react";
import { MAX_QUANTITY } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface Props {
  value: number;
  onChange: (value: number) => void;
  size?: "sm" | "lg";
  label?: string;
}

export function QuantityStepper({ value, onChange, size = "sm", label = "Số lượng" }: Props) {
  const btn = size === "lg" ? "size-12" : "size-9";
  return (
    <div className="inline-flex items-center rounded-lg border border-input" role="group" aria-label={label}>
      <button
        type="button"
        className={cn(btn, "flex items-center justify-center text-foreground transition-colors hover:bg-muted disabled:opacity-40")}
        onClick={() => onChange(value - 1)}
        disabled={value <= 1}
        aria-label="Giảm số lượng"
      >
        <Minus className="size-4" aria-hidden />
      </button>
      <span className={cn("min-w-10 text-center font-semibold tabular-nums", size === "lg" ? "text-base" : "text-sm")} aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        className={cn(btn, "flex items-center justify-center text-foreground transition-colors hover:bg-muted disabled:opacity-40")}
        onClick={() => onChange(value + 1)}
        disabled={value >= MAX_QUANTITY}
        aria-label="Tăng số lượng"
      >
        <Plus className="size-4" aria-hidden />
      </button>
    </div>
  );
}
