import { createMockAffiliateLink } from "@/lib/affiliate/affiliateMock";
import type { AffiliateAdapter } from "@/lib/affiliate/affiliateTypes";

export const bokusTradedoublerAdapter: AffiliateAdapter = {
  retailer: "bokus",
  provider: "mock",
  createLink(request) {
    // Placeholder only. Add approved provider settings before enabling tracking.
    return createMockAffiliateLink({
      ...request,
      retailer: "bokus",
      provider: "mock",
    });
  },
};
