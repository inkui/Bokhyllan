import Link from "next/link";
import { DoorChoiceCard } from "@/components/home/DoorChoiceCard";

export function TwoDoorsHero() {
  return (
    <section className="flex flex-1 flex-col justify-center py-6 sm:py-12">
      <div className="mx-auto w-full max-w-4xl">
        <div className="mb-10 max-w-3xl sm:mb-16">
          <p className="mb-5 text-sm uppercase tracking-[0.18em] text-brass-muted">
            En stillsam början
          </p>
          <h1 className="font-serif text-[2.55rem] leading-[1.04] tracking-normal text-ink sm:text-6xl lg:text-7xl">
            Vem söker vi en bok åt i dag?
          </h1>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
          <DoorChoiceCard
            title="Någon jag bryr mig om"
            subtitle="När boken ska bära en tanke från dig till någon annan."
            tone="green"
            href="/recommend/gift"
          />
          <DoorChoiceCard
            title="För mig själv"
            subtitle="När du vill bli varsamt ledd till något som passar just nu."
            tone="walnut"
            href="/recommend/self"
          />
        </div>

        <div className="mt-9">
          <Link
            href="/recommend/reveal"
            className="inline-flex min-h-11 items-center rounded-quiet text-base text-ink-soft underline decoration-brass/60 underline-offset-8 transition-colors duration-calm hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass"
          >
            Inte säker än — visa mig något.
          </Link>
        </div>
      </div>
    </section>
  );
}
