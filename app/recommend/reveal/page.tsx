import { SiteShell } from "@/components/layout/SiteShell";
import { RecommendationReveal } from "@/components/recommendation/RecommendationReveal";
import { getRecommendationById } from "@/data/sampleRecommendations";
import { createAffiliateLink } from "@/lib/affiliate/affiliateClient";
import { getRecommendationIdFromParams } from "@/lib/recommendationMapping";

type RevealPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function RevealPage({ searchParams }: RevealPageProps) {
  const params = await searchParams;
  const recommendationBase = getRecommendationById(
    getRecommendationIdFromParams(params.id),
  );
  const recommendation = {
    ...recommendationBase,
    affiliateLink: recommendationBase.affiliateRequest
      ? createAffiliateLink(recommendationBase.affiliateRequest)
      : undefined,
  };

  return (
    <SiteShell tone="dark">
      <RecommendationReveal recommendation={recommendation} />
    </SiteShell>
  );
}
