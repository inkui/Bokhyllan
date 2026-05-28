import Image from "next/image";
import type { Recommendation } from "@/data/sampleRecommendations";

type BookCoverProps = {
  recommendation: Recommendation;
};

export function BookCover({ recommendation }: BookCoverProps) {
  return (
    <figure className="relative mx-auto aspect-[0.68] w-full max-w-[320px]">
      <div className="absolute inset-y-6 left-4 right-[-10px] rounded-quiet bg-green-shadow/50 blur-sm" />
      <div className="relative h-full overflow-hidden rounded-quiet bg-walnut-deep shadow-book ring-1 ring-brass/20">
        <Image
          src={recommendation.coverImage}
          alt={`Omslag för ${recommendation.title} av ${recommendation.author}`}
          fill
          sizes="(min-width: 1024px) 320px, 78vw"
          className="object-cover"
          priority
        />
      </div>
    </figure>
  );
}
