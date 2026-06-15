import { getAffiliateUrl } from "@/lib/library/affiliate-provider";
import type { AffiliateLinkTarget } from "@/lib/library/affiliate";
import type {
  AffiliateLinkRequest,
  AffiliateLinkResult,
  RetailerId,
} from "@/lib/affiliate/affiliateTypes";

type ResolveBookBuyLinkOptions = {
  enableProviderUrls?: boolean;
};

const defaultLabel = "Hitta boken";
const unavailableUrl = "#";

export function resolveBookBuyLink(
  request: AffiliateLinkRequest,
  options: ResolveBookBuyLinkOptions = {},
): AffiliateLinkResult {
  const target = createAffiliateTarget(request);
  const affiliateUrl = getAffiliateUrl(
    target,
    // Keep runtime buy links mock-safe until a dedicated real-link phase enables providers explicitly.
    options.enableProviderUrls
      ? {}
      : {
          provider: "none",
          defaultProvider: "none",
        },
  );

  return {
    label: defaultLabel,
    url: affiliateUrl.available ? affiliateUrl.url : unavailableUrl,
    retailer: request.retailer ?? "generic",
    provider: request.provider ?? "mock",
    isAffiliate: false,
  };
}

function createAffiliateTarget(request: AffiliateLinkRequest): AffiliateLinkTarget {
  return {
    provider: mapRetailerToProvider(request.retailer),
    bookId: createBookId(request),
    isbn13: request.isbn,
    title: request.title,
    author: request.author ?? "",
  };
}

function mapRetailerToProvider(
  retailer: RetailerId | undefined,
): AffiliateLinkTarget["provider"] {
  if (retailer === "bokus") {
    return "bokus";
  }

  if (retailer === "adlibris") {
    return "adlibris";
  }

  return "generic";
}

function createBookId(request: AffiliateLinkRequest) {
  return `${request.title}-${request.author ?? "unknown"}`
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
