# Payment Boundary

Bokhyllan does not implement real payments in this AI-visible frontend phase.

- No payment secrets, webhook secrets, provider credentials, or production environment values belong in this repository.
- Bokhyllan must never collect, store, or process card details directly.
- The public app may call safe abstractions such as `createCheckoutSession(planId)`, but the current implementation returns mock checkout data only.
- A future production payment flow should use Stripe Checkout hosted pages with server-side session creation.
- Webhook verification and billing infrastructure must live in isolated server-only code and be reviewed separately before production.
- Real payment implementation should be kept outside AI-visible work, either in a separate private repository or a separate non-AI-visible folder.
