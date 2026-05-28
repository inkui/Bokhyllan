export type CheckoutSessionRequest = {
  planId: string;
};

export type CheckoutSession = {
  id: string;
  planId: string;
  url: string;
  provider: "mock";
  status: "created";
};
