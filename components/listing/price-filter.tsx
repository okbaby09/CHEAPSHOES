"use client";

import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { PRICE_MAX, PRICE_MIN, PRICE_PRESETS, PRICE_STEP } from "@/lib/constants";
import { formatNumber, formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";

interface Props {
  min: number;
  max: number;
  onApply: (min: number, max: number) => void;
}

function parseInput(value: string) {
  const digits = value.replace(/\D/g, "");
  return digits ? Number(digits) : 0;
}

function clamp(n: number) {
  return Math.min(PRICE_MAX, Math.max(PRICE_MIN, n));
}

export function PriceFilter({ min, max, onApply }: Props) {
  const [draft, setDraft] = useState<[number, number]>([min, max]);
  const [synced, setSynced] = useState<[number, number]>([min, max]);

  if (synced[0] !== min || synced[1] !== max) {
    setSynced([min, max]);
    setDraft([min, max]);
  }

  function apply(next = draft) {
    const lo = clamp(Math.min(next[0], next[1]));
    const hi = clamp(Math.max(next[0], next[1]));
    setDraft([lo, hi]);
    onApply(lo, hi);
  }

  return (
    <div className="flex flex-col gap-4">
      <Slider
        min={PRICE_MIN}
        max={PRICE_MAX}
        step={PRICE_STEP}
        value={draft}
        onValueChange={(v) => Array.isArray(v) && setDraft([v[0], v[1]])}
        onValueCommitted={(v) => Array.isArray(v) && apply([v[0], v[1]])}
        aria-label="Khoảng giá"
        className="px-1"
      />
      <p className="text-xs text-muted-foreground">
        {formatPrice(draft[0])} – {formatPrice(draft[1])}
      </p>
      <div className="grid grid-cols-2 gap-2">
        <label className="flex flex-col gap-1 text-xs font-medium">
          Giá thấp nhất
          <input
            inputMode="numeric"
            value={formatNumber(draft[0])}
            onChange={(e) => setDraft([parseInput(e.target.value), draft[1]])}
            className="h-10 rounded-md border border-input bg-background px-2 text-sm outline-none focus:border-primary"
          />
        </label>
        <label className="flex flex-col gap-1 text-xs font-medium">
          Giá cao nhất
          <input
            inputMode="numeric"
            value={formatNumber(draft[1])}
            onChange={(e) => setDraft([draft[0], parseInput(e.target.value)])}
            className="h-10 rounded-md border border-input bg-background px-2 text-sm outline-none focus:border-primary"
          />
        </label>
      </div>
      <Button type="button" onClick={() => apply()} className="h-10 w-full text-sm font-semibold">
        Áp dụng
      </Button>
      <ul className="flex flex-wrap gap-2" aria-label="Chọn nhanh khoảng giá">
        {PRICE_PRESETS.map((p) => {
          const active = min === p.min && max === p.max;
          return (
            <li key={p.label}>
              <button
                type="button"
                aria-pressed={active}
                onClick={() => apply([p.min, p.max])}
                className={cn(
                  "h-9 rounded-full border px-3 text-xs font-medium transition-colors",
                  active ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-foreground",
                )}
              >
                {p.label}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
