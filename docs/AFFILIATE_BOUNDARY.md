# Affiliate Boundary

Bokhyllan may later guide readers to external bookstores, but affiliate logic must stay behind a provider-neutral boundary.

- Affiliate links must be generated through `lib/affiliate`.
- `createAffiliateLink` is the public interface for UI and recommendation code.
- UI components must never hardcode retailer URLs, affiliate URLs, publisher IDs, tracking parameters, or affiliate network details.
- UI components should only render the safe result fields: `label`, `url`, `retailer`, `provider`, and `isAffiliate`.
- No affiliate secrets, private publisher IDs, tracking pixels, customer data, payment data, or user identifiers belong in public code.
- Provider-specific adapters live under `lib/affiliate/providers` and must remain safe placeholders until approved agreements and configuration exist.
- Bokus is the preferred default retailer, Adlibris is reserved as a later fallback, and generic retailer behavior remains the safe fallback.
- Purchase language should stay soft and bookshop-like, such as "Hitta boken", "Se hos bokhandeln", or "Las vidare hos bokhandeln".
- Affiliate behavior is separate from payments: affiliate links send users to an external retailer, while payments would be for future Bokhyllan subscriptions or paid features.

The current implementation uses mock placeholder links only. No real affiliate links or tracking parameters are active.
