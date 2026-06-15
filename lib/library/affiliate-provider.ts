import type { AffiliateLinkTarget } from "@/lib/library/affiliate";

export type AffiliateProviderId = "bokus" | "none" | "custom";

export type AffiliateProvider = {
  id: AffiliateProviderId;
  createUrl: (
    target: AffiliateLinkTarget,
    options?: AffiliateUrlOptions,
  ) => AffiliateUrlResult;
};

export type AffiliateUrlOptions = {
  provider?: AffiliateProviderId;
  defaultProvider?: AffiliateProviderId;
  campaign?: string;
  ref?: string;
};

export type AffiliateUrlResult =
  | {
      available: true;
      provider: AffiliateProviderId;
      url: string;
      isAffiliate: boolean;
      source: "affiliate_url" | "raw_url" | "provider";
    }
  | {
      available: false;
      provider: AffiliateProviderId;
      isAffiliate: false;
      reason: string;
    };

export function getAffiliateUrl(
  target: AffiliateLinkTarget,
  options: AffiliateUrlOptions = {},
): AffiliateUrlResult {
  const provider = getSelectedProvider(target, options);

  if (target.affiliateUrl) {
    return {
      available: true,
      provider,
      url: target.affiliateUrl,
      isAffiliate: true,
      source: "affiliate_url",
    };
  }

  if (provider === "none") {
    return createNoneProviderUrl(target);
  }

  if (provider === "bokus") {
    return createBokusProviderUrl(target, options);
  }

  return createCustomProviderUrl(target, options);
}

export function createBokusSearchUrl(target: AffiliateLinkTarget): string {
  const searchTerm = target.isbn13 || `${target.title} ${target.author}`;
  const params = new URLSearchParams([["search_word", searchTerm]]);

  return `https://www.bokus.com/cgi-bin/product_search.cgi?${params.toString()}`;
}

const bokusProvider: AffiliateProvider = {
  id: "bokus",
  createUrl: createBokusProviderUrl,
};

const noneProvider: AffiliateProvider = {
  id: "none",
  createUrl: createNoneProviderUrl,
};

const customProvider: AffiliateProvider = {
  id: "custom",
  createUrl: createCustomProviderUrl,
};

export const affiliateProviders: Record<AffiliateProviderId, AffiliateProvider> = {
  bokus: bokusProvider,
  none: noneProvider,
  custom: customProvider,
};

function getSelectedProvider(
  target: AffiliateLinkTarget,
  options: AffiliateUrlOptions,
): AffiliateProviderId {
  return options.provider ?? options.defaultProvider ?? normalizeProvider(target.provider);
}

function normalizeProvider(provider: AffiliateLinkTarget["provider"]): AffiliateProviderId {
  if (provider === "bokus") {
    return "bokus";
  }

  if (provider === "generic" || provider === "mock" || provider === "unknown") {
    return "none";
  }

  return "custom";
}

function createBokusProviderUrl(
  target: AffiliateLinkTarget,
  options: AffiliateUrlOptions = {},
): AffiliateUrlResult {
  const url = target.rawUrl || createBokusSearchUrl(target);

  return {
    available: true,
    provider: "bokus",
    url: appendOptionalParams(url, options),
    isAffiliate: false,
    source: target.rawUrl ? "raw_url" : "provider",
  };
}

function createNoneProviderUrl(target: AffiliateLinkTarget): AffiliateUrlResult {
  if (target.rawUrl) {
    return {
      available: true,
      provider: "none",
      url: target.rawUrl,
      isAffiliate: false,
      source: "raw_url",
    };
  }

  return {
    available: false,
    provider: "none",
    isAffiliate: false,
    reason: "No affiliate provider or raw URL is available for this target.",
  };
}

function createCustomProviderUrl(
  target: AffiliateLinkTarget,
  options: AffiliateUrlOptions = {},
): AffiliateUrlResult {
  if (target.rawUrl) {
    return {
      available: true,
      provider: "custom",
      url: appendOptionalParams(target.rawUrl, options),
      isAffiliate: false,
      source: "raw_url",
    };
  }

  return {
    available: false,
    provider: "custom",
    isAffiliate: false,
    reason: "Custom provider requires an affiliateUrl or rawUrl.",
  };
}

function appendOptionalParams(url: string, options: AffiliateUrlOptions) {
  const params = [
    options.campaign ? `campaign=${encodeURIComponent(options.campaign)}` : "",
    options.ref ? `ref=${encodeURIComponent(options.ref)}` : "",
  ].filter(Boolean);

  if (params.length === 0) {
    return url;
  }

  return `${url}${url.includes("?") ? "&" : "?"}${params.join("&")}`;
}
