# Affiliate Boundary

Bokhyllan may later guide readers to external bookstores, but affiliate logic must stay behind a provider-neutral boundary.

- Affiliate links must be generated through `lib/affiliate`.
- UI components must never hardcode retailer URLs, affiliate URLs, publisher IDs, tracking parameters, or affiliate network details.
- UI components should only render a safe affiliate result: `label`, `url`, `retailer`, `provider`, and `isAffiliate`.
- No affiliate secrets, private publisher IDs, tracking pixels, customer data, payment data, or user identifiers belong in public code.
- Real Bokus affiliate integration should be added only after publisher approval. Bokus via Tradedoubler is likely the first production adapter.
- Future adapters may include Adlibris, Adtraction, Awin, direct retailer links, generic bookstore links, or other Swedish bookstores.
- Provider-specific adapters should live behind `lib/affiliate` and be server-only if they require secrets, signing, private IDs, or protected environment variables.
- Purchase language should stay soft and bookshop-like, such as "Hitta boken", "Se hos bokhandeln", or "Läs vidare hos bokhandeln".
- Affiliate behavior is separate from payments: affiliate links send users to an external retailer, while payments would be for future Bokhyllan subscriptions or paid features.

The current implementation uses mock placeholder links only. No real affiliate links or tracking parameters are active.
