import { createMockAffiliateLink } from "@/lib/affiliate/affiliateMock";
import type {
  AffiliateLinkRequest,
  AffiliateLinkResult,
} from "@/lib/affiliate/affiliateTypes";

export function createAffiliateLink(
  request: AffiliateLinkRequest,
): AffiliateLinkResult {
  return createMockAffiliateLink(request);
}
