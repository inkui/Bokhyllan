import type {
  AffiliateLinkRequest,
  AffiliateLinkResult,
} from "@/lib/affiliate/affiliateTypes";

export function createMockAffiliateLink(
  request: AffiliateLinkRequest,
): AffiliateLinkResult {
  return {
    label: "Hitta boken",
    url: "#",
    retailer: request.retailer,
    provider: "mock",
    isAffiliate: false,
  };
}
