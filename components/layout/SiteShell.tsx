import { Header } from "@/components/layout/Header";

type SiteShellProps = {
  children: React.ReactNode;
  tone?: "paper" | "dark";
};

export function SiteShell({ children, tone = "paper" }: SiteShellProps) {
  const isDark = tone === "dark";

  return (
    <div
      className={
        isDark
          ? "min-h-screen bg-green-deep text-paper-soft"
          : "min-h-screen bg-transparent text-ink"
      }
    >
      <Header tone={tone} />
      <main className="mx-auto flex min-h-[calc(100vh-88px)] w-full max-w-6xl flex-col px-5 pb-14 pt-8 sm:px-8 sm:pt-10 lg:px-10">
        {children}
      </main>
    </div>
  );
}
