import { createMockAffiliateLink } from "@/lib/affiliate/affiliateMock";
import type { AffiliateAdapter } from "@/lib/affiliate/affiliateTypes";

export const genericRetailerAdapter: AffiliateAdapter = {
  retailer: "generic",
  provider: "mock",
  createLink(request) {
    return createMockAffiliateLink({
      ...request,
      retailer: "generic",
      provider: "mock",
    });
  },
};
