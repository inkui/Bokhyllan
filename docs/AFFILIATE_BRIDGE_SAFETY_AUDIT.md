# Affiliate Bridge Safety Audit

## Summary

The C15 affiliate bridge connects the existing runtime buy-link boundary to the C6 provider abstraction, but real outbound provider links remain disabled by default.

The current UI behavior is intentionally unchanged:

- The action label remains `Hitta boken`.
- The runtime URL remains `#` when no explicitly enabled provider URL is available.
- `isAffiliate` remains `false`.
- No Tradedoubler, tracking parameters, analytics events, publisher IDs, or secrets are used.

## Current Runtime Buy-Link Flow

The runtime flow is:

1. `app/recommend/reveal/page.tsx`
   - Reads the selected recommendation.
   - Calls `createAffiliateLink(recommendationBase.affiliateRequest)` when an affiliate request exists.

2. `lib/affiliate/affiliateClient.ts`
   - Selects the configured affiliate adapter.
   - Current adapters still return mock-safe affiliate results.

3. `lib/affiliate/affiliateMock.ts`
   - Delegates to `resolveBookBuyLink(...)`.

4. `lib/affiliate/affiliateBridge.ts`
   - Converts the runtime affiliate request into a C6 `AffiliateLinkTarget`.
   - Calls `getAffiliateUrl(...)` from `lib/library/affiliate-provider.ts`.
   - Forces provider resolution to `none` by default.
   - Returns the runtime-safe `AffiliateLinkResult` shape expected by the UI.

5. `components/recommendation/RecommendationActions.tsx`
   - Receives only `affiliateLink.url` and `affiliateLink.label`.
   - Falls back to `{ label: "Hitta boken", url: "#" }` when no affiliate link exists.

## Why Provider Defaults To `none`

`resolveBookBuyLink(...)` passes `{ provider: "none", defaultProvider: "none" }` into `getAffiliateUrl(...)` unless a future caller explicitly opts into provider URLs.

This keeps the bridge safe while still proving the architecture:

- The UI can continue using the same simple link contract.
- The C6 provider abstraction is now the authoritative URL boundary.
- Real Bokus or Tradedoubler behavior cannot appear accidentally through adapter selection alone.

## What The UI Currently Receives

The recommendation UI currently receives a small runtime link object:

- `label`
- `url`
- `retailer`
- `provider`
- `isAffiliate`

The UI does not receive provider internals, tracking details, Tradedoubler concepts, publisher IDs, campaign IDs, or analytics event data.

Current mock-safe values are:

- `label`: `Hitta boken`
- `url`: `#`
- `provider`: `mock` unless a request already specifies another safe provider label
- `isAffiliate`: `false`

## What Must Change Before Real Links Are Enabled

A future real-link phase should require all of the following:

- A dedicated implementation plan for Bokus and/or Bokus via Tradedoubler.
- Verified publisher/account configuration kept outside source control.
- A provider adapter that builds links from documented provider rules.
- Tests or fixtures proving that missing configuration falls back safely.
- Explicit opt-in to provider URLs at the affiliate boundary.
- A review of whether `affiliateUrl`, `rawUrl`, `campaign`, or `ref` should be allowed in runtime calls.
- Confirmation that UI components still only receive the safe link contract.

Real-link activation should not be done by changing UI components.

## Privacy And Tracking Note

No tracking is emitted in the current bridge.

The current implementation does not:

- Send analytics events.
- Store click data.
- Add tracking scripts.
- Add Tradedoubler parameters.
- Include publisher IDs.
- Store user-identifying data.

Future affiliate click analytics should use the typed analytics foundation and should avoid full URL storage where possible.

## Future Real-Link Acceptance Criteria

Before enabling real outbound links, a future phase should verify:

- Existing reveal and saved-book flows still work.
- UI copy, layout, and styling remain unchanged.
- UI components do not hardcode Bokus, Adlibris, Tradedoubler, or tracking details.
- Missing provider configuration returns a safe unavailable result.
- No secrets or publisher IDs are committed.
- No real tracking parameters appear in source-controlled fixtures.
- Lint and build pass.
