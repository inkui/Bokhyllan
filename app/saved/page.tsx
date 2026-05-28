import { SiteShell } from "@/components/layout/SiteShell";

export default function SavedPage() {
  return (
    <SiteShell>
      <section className="mx-auto flex flex-1 w-full max-w-2xl flex-col justify-center py-16">
        <p className="mb-5 text-sm uppercase tracking-[0.18em] text-brass-muted">sparat</p>
        <h1 className="font-serif text-5xl leading-tight text-ink">Här vilar böckerna senare.</h1>
        <p className="mt-6 text-lg leading-8 text-ink-soft">
          Sparade rekommendationer hör till en senare fas. För nu får sidan vara
          enkel och tyst.
        </p>
      </section>
    </SiteShell>
  );
}
