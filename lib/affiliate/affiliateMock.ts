import { resolveBookBuyLink } from "@/lib/affiliate/affiliateBridge";
import type {
  AffiliateLinkRequest,
  AffiliateLinkResult,
} from "@/lib/affiliate/affiliateTypes";

export function createMockAffiliateLink(
  request: AffiliateLinkRequest,
): AffiliateLinkResult {
  return resolveBookBuyLink(request);
}
