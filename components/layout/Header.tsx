import Link from "next/link";

type HeaderProps = {
  tone?: "paper" | "dark";
};

export function Header({ tone = "paper" }: HeaderProps) {
  const isDark = tone === "dark";

  return (
    <header
      className={`mx-auto flex h-20 w-full max-w-6xl items-center justify-between px-5 sm:h-[88px] sm:px-8 lg:px-10 ${
        isDark ? "text-paper-soft" : "text-ink"
      }`}
    >
      <Link
        href="/"
        className="font-serif text-2xl leading-none tracking-normal outline-none transition-colors duration-calm focus-visible:ring-2 focus-visible:ring-brass"
      >
        Bokhyllan
      </Link>
      <nav aria-label="Huvudnavigation" className="flex items-center gap-5 text-sm text-inherit/80">
        <Link
          href="/about"
          className="min-h-11 rounded-quiet px-1 py-3 transition-colors duration-calm hover:text-brass focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass"
        >
          om
        </Link>
        <Link
          href="/saved"
          className="min-h-11 rounded-quiet px-1 py-3 transition-colors duration-calm hover:text-brass focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass"
        >
          sparat
        </Link>
      </nav>
    </header>
  );
}
