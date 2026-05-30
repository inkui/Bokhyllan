import { SiteShell } from "@/components/layout/SiteShell";
import { SavedBooksShelf } from "@/components/saved/SavedBooksShelf";

export default function SavedPage() {
  return (
    <SiteShell>
      <section className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center py-12 sm:py-16">
        <p className="mb-5 text-sm uppercase tracking-[0.18em] text-brass-muted">
          sparat
        </p>
        <h1 className="max-w-2xl font-serif text-[2.65rem] leading-[1.05] text-ink sm:text-6xl">
          Böcker att återvända till
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-8 text-ink-soft">
          En stillsam plats för böcker som får vänta tills tiden är rätt.
        </p>
        <SavedBooksShelf />
      </section>
    </SiteShell>
  );
}
