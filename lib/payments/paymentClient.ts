import { createMockCheckoutSession } from "@/lib/payments/paymentMock";
import type { CheckoutSession } from "@/lib/payments/paymentTypes";

export async function createCheckoutSession(
  planId: string,
): Promise<CheckoutSession> {
  return createMockCheckoutSession(planId);
}
