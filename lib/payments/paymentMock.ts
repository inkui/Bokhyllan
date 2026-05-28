import type { CheckoutSession } from "@/lib/payments/paymentTypes";

export async function createMockCheckoutSession(
  planId: string,
): Promise<CheckoutSession> {
  return {
    id: `mock_checkout_${planId}`,
    planId,
    url: `/mock-checkout?plan=${encodeURIComponent(planId)}`,
    provider: "mock",
    status: "created",
  };
}
