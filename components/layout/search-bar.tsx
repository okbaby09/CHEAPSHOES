"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useDeferredValue, useId, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import { searchProducts } from "@/lib/search";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";

const MAX_SUGGESTIONS = 5;

export function SearchBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initial = pathname === "/tim-kiem" ? (searchParams.get("q") ?? "") : "";

  const [query, setQuery] = useState(initial);
  const [lastInitial, setLastInitial] = useState(initial);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const listId = useId();

  if (initial !== lastInitial) {
    setLastInitial(initial);
    setQuery(initial);
  }

  const deferred = useDeferredValue(query);
  const suggestions = searchProducts(deferred).slice(0, MAX_SUGGESTIONS);
  const showDropdown = open && deferred.trim().length >= 2;

  function submit(value = query) {
    const q = value.trim();
    if (!q) return;
    setOpen(false);
    inputRef.current?.blur();
    router.push(`/tim-kiem?q=${encodeURIComponent(q)}`);
  }

  function goTo(slug: string) {
    setOpen(false);
    inputRef.current?.blur();
    router.push(`/san-pham/${slug}`);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown" && suggestions.length) {
      e.preventDefault();
      setOpen(true);
      setActiveIndex((i) => (i + 1) % suggestions.length);
    } else if (e.key === "ArrowUp" && suggestions.length) {
      e.preventDefault();
      setActiveIndex((i) => (i <= 0 ? suggestions.length - 1 : i - 1));
    } else if (e.key === "Escape") {
      setOpen(false);
    } else if (e.key === "Enter") {
      if (e.nativeEvent.isComposing || e.keyCode === 229) return;
      e.preventDefault();
      if (showDropdown && activeIndex >= 0 && suggestions[activeIndex]) goTo(suggestions[activeIndex].slug);
      else submit();
    }
  }

  return (
    <div className="relative">
      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
        className="flex h-11 items-center rounded-full border border-input bg-muted/60 pr-1 pl-4 transition-colors focus-within:border-primary focus-within:bg-background md:h-12"
      >
        <label htmlFor="site-search" className="sr-only">
          Tìm kiếm sản phẩm
        </label>
        <input
          ref={inputRef}
          id="site-search"
          type="search"
          autoComplete="off"
          placeholder="Tìm giày đá bóng, bóng rổ, balo..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
            setActiveIndex(-1);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          onKeyDown={onKeyDown}
          role="combobox"
          aria-expanded={showDropdown}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={activeIndex >= 0 ? `${listId}-${activeIndex}` : undefined}
          className="h-full min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-muted-foreground [&::-webkit-search-cancel-button]:hidden"
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              inputRef.current?.focus();
            }}
            className="flex size-9 items-center justify-center rounded-full text-muted-foreground hover:text-foreground"
            aria-label="Xóa nội dung tìm kiếm"
          >
            <X className="size-4" aria-hidden />
          </button>
        )}
        <button
          type="submit"
          className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground transition-opacity hover:opacity-90 md:size-10"
          aria-label="Tìm kiếm"
        >
          <Search className="size-4" aria-hidden />
        </button>
      </form>

      {showDropdown && (
        <div className="absolute inset-x-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-border bg-popover shadow-xl">
          {suggestions.length ? (
            <>
              <ul id={listId} role="listbox" aria-label="Gợi ý sản phẩm">
                {suggestions.map((p, i) => (
                  <li key={p.id} id={`${listId}-${i}`} role="option" aria-selected={i === activeIndex}>
                    <Link
                      href={`/san-pham/${p.slug}`}
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2.5 transition-colors hover:bg-muted",
                        i === activeIndex && "bg-muted",
                      )}
                    >
                      <span className="relative size-12 shrink-0 overflow-hidden rounded-md bg-muted">
                        <Image src={p.images[0]} alt="" fill sizes="48px" className="object-cover" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-medium">{p.name}</span>
                        <span className="text-sm font-bold text-primary">{formatPrice(p.price)}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => submit()}
                className="w-full border-t border-border px-3 py-3 text-center text-sm font-semibold text-primary hover:bg-muted"
              >
                Xem tất cả kết quả cho &ldquo;{query.trim()}&rdquo;
              </button>
            </>
          ) : (
            <p className="px-4 py-5 text-center text-sm text-muted-foreground">Không tìm thấy sản phẩm phù hợp</p>
          )}
        </div>
      )}
    </div>
  );
}
