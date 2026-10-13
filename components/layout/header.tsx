import Link from "next/link";
import { SearchBar } from "./search-bar";
import { CartButton } from "./cart-button";
import { MainNav } from "./main-nav";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/85">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-4 gap-y-3 px-4 py-3 md:flex-nowrap md:gap-8 md:py-4">
        <Link href="/" className="order-1 shrink-0 text-2xl font-extrabold tracking-tight text-foreground" aria-label="SHOESPORT – Trang chủ">
          SHOE<span className="text-primary">SPORT</span>
        </Link>
        <div className="order-3 w-full md:order-2 md:flex-1">
          <SearchBar />
        </div>
        <div className="order-2 ml-auto md:order-3 md:ml-0">
          <CartButton />
        </div>
      </div>
      <MainNav />
    </header>
  );
}
