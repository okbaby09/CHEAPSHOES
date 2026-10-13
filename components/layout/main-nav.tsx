"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "@/lib/constants";

export function MainNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Danh mục chính" className="border-t border-border">
      <ul className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 [scrollbar-width:none] md:justify-center md:gap-4">
        {NAV_ITEMS.map((item) => {
          const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          return (
            <li key={item.href} className="shrink-0">
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative flex h-11 items-center px-3 text-sm font-semibold whitespace-nowrap transition-colors md:px-4 md:text-[15px]",
                  active ? "text-primary" : "text-foreground/80 hover:text-foreground",
                )}
              >
                {item.label}
                <span
                  aria-hidden
                  className={cn(
                    "absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-primary transition-opacity md:inset-x-4",
                    active ? "opacity-100" : "opacity-0",
                  )}
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
