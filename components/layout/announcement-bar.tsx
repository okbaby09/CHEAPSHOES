const MESSAGES = [
  "Cam kết 100% chính hãng",
  "Bảo hành miễn phí 6 tháng",
  "Miễn phí giao hàng đơn trên 1 triệu",
  "Hỗ trợ đổi trả 15 ngày",
];

function MessageRow({ hidden }: { hidden?: boolean }) {
  return (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden}>
      {[...MESSAGES, ...MESSAGES].map((m, i) => (
        <li key={i} className="flex items-center gap-6 px-6 whitespace-nowrap">
          <span>{m}</span>
          <span aria-hidden className="text-white/60">
            •
          </span>
        </li>
      ))}
    </ul>
  );
}

export function AnnouncementBar() {
  return (
    <div className="overflow-hidden bg-primary py-2 text-xs font-medium text-primary-foreground sm:text-sm">
      <p className="sr-only">{MESSAGES.join(" • ")}</p>
      <div className="flex w-max animate-marquee motion-reduce:animate-none" aria-hidden>
        <MessageRow hidden />
        <MessageRow hidden />
      </div>
    </div>
  );
}
