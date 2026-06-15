import { createMockAffiliateLink } from "@/lib/affiliate/affiliateMock";
import type { AffiliateAdapter } from "@/lib/affiliate/affiliateTypes";

export const adlibrisAdapter: AffiliateAdapter = {
  retailer: "adlibris",
  provider: "mock",
  createLink(request) {
    // Placeholder only. Keep provider details private until an agreement exists.
    return createMockAffiliateLink({
      ...request,
      retailer: "adlibris",
      provider: "mock",
    });
  },
};
