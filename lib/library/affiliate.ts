export type AffiliateLinkProvider =
  | "bokus"
  | "adlibris"
  | "generic"
  | "mock"
  | "unknown";

export type AffiliateLinkTarget = {
  provider: AffiliateLinkProvider;
  bookId: string;
  isbn13?: string;
  title: string;
  author: string;
  rawUrl?: string;
  affiliateUrl?: string;
};
