import { MessageCircle, Phone } from "lucide-react";
import { HOTLINE, HOTLINE_TEL } from "@/lib/constants";

export function FloatingContact() {
  return (
    <nav aria-label="Liên hệ nhanh" className="fixed right-4 bottom-4 z-30 flex flex-col gap-3">
      <a
        href="https://zalo.me/0901234561"
        target="_blank"
        rel="noopener noreferrer"
        className="flex size-12 items-center justify-center rounded-full bg-[#0068ff] text-xs font-extrabold text-white shadow-lg transition-transform hover:scale-105"
        aria-label="Chat qua Zalo"
      >
        Zalo
      </a>
      <a
        href="https://m.me/shoesport"
        target="_blank"
        rel="noopener noreferrer"
        className="flex size-12 items-center justify-center rounded-full bg-[#7b3fe4] text-white shadow-lg transition-transform hover:scale-105"
        aria-label="Chat qua Messenger"
      >
        <MessageCircle className="size-6" aria-hidden />
      </a>
      <a
        href={`tel:${HOTLINE_TEL}`}
        className="relative flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105"
        aria-label={`Gọi hotline ${HOTLINE}`}
      >
        <span className="absolute inset-0 animate-ping rounded-full bg-primary/40 motion-reduce:hidden" aria-hidden />
        <Phone className="relative size-5" aria-hidden />
      </a>
    </nav>
  );
}
