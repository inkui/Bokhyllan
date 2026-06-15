export type RetailerId = "bokus" | "adlibris" | "generic";

export type AffiliateProviderId =
  | "tradedoubler"
  | "adtraction"
  | "awin"
  | "direct"
  | "mock";

export type AffiliateLinkRequest = {
  retailer?: RetailerId;
  provider?: AffiliateProviderId;
  isbn?: string;
  title: string;
  author?: string;
};

export type AffiliateLinkResult = {
  label: string;
  url: string;
  retailer: RetailerId;
  provider: AffiliateProviderId;
  isAffiliate: boolean;
};

export type AffiliateAdapter = {
  retailer: RetailerId;
  provider: AffiliateProviderId;
  createLink: (request: AffiliateLinkRequest) => AffiliateLinkResult;
};
