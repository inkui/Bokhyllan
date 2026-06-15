import { adlibrisAdapter } from "@/lib/affiliate/providers/adlibrisAdapter";
import { bokusTradedoublerAdapter } from "@/lib/affiliate/providers/bokusTradedoublerAdapter";
import { genericRetailerAdapter } from "@/lib/affiliate/providers/genericRetailerAdapter";
import type {
  AffiliateAdapter,
  AffiliateLinkRequest,
  AffiliateLinkResult,
  RetailerId,
} from "@/lib/affiliate/affiliateTypes";

const preferredRetailer: RetailerId = "bokus";

const retailerAdapters: Partial<Record<RetailerId, AffiliateAdapter>> = {
  bokus: bokusTradedoublerAdapter,
  adlibris: adlibrisAdapter,
};

export function selectAffiliateAdapter(
  request: AffiliateLinkRequest,
): AffiliateAdapter {
  const requestedRetailer = request.retailer ?? preferredRetailer;

  return retailerAdapters[requestedRetailer] ?? genericRetailerAdapter;
}

export function createAffiliateLink(
  request: AffiliateLinkRequest,
): AffiliateLinkResult {
  return selectAffiliateAdapter(request).createLink(request);
}
