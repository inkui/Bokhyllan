import { SiteShell } from "@/components/layout/SiteShell";

export default function AboutPage() {
  return (
    <SiteShell>
      <section className="mx-auto flex flex-1 w-full max-w-2xl flex-col justify-center py-16">
        <p className="mb-5 text-sm uppercase tracking-[0.18em] text-brass-muted">om</p>
        <h1 className="font-serif text-5xl leading-tight text-ink">En bok, varsamt vald.</h1>
        <p className="mt-6 text-lg leading-8 text-ink-soft">
          Bokhyllan är en stillsam plats för rekommendationer som känns mänskliga,
          tydliga och noggrant placerade.
        </p>
      </section>
    </SiteShell>
  );
}
