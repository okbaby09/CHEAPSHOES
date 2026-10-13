"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function FilterGroup({ title, children, defaultOpen = true }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();

  return (
    <section className="border-b border-border py-4 last:border-b-0">
      <h3>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls={id}
          className="flex min-h-9 w-full items-center justify-between text-left text-sm font-bold uppercase tracking-wide"
        >
          {title}
          <ChevronDown className={cn("size-4 transition-transform", open && "rotate-180")} aria-hidden />
        </button>
      </h3>
      <div id={id} hidden={!open} className="pt-3">
        {children}
      </div>
    </section>
  );
}
