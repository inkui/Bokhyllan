# Affiliate Enablement Plan

## Purpose

This document defines a safe future plan for enabling real affiliate links in Bokhyllan while preserving the existing provider abstraction and keeping runtime behavior safe today.

It is documentation only. It does not change code, enable real affiliate links, add Tradedoubler integration, add tracking, add analytics, modify UI, modify routing, or change design.

The plan exists so Bokhyllan can eventually move from mock-safe buy links to real outbound destinations without leaking provider details into UI components or raw book metadata.

## Current State

### Provider Abstraction Exists

The C6 provider abstraction lives in:

```text
lib/library/affiliate-provider.ts
```

It defines provider-neutral URL behavior for:

- `bokus`
- `none`
- `custom`

It can return a structured available or unavailable result. For Bokus, the current helper can create a non-affiliate search URL from ISBN13 or title and author, but this is not real affiliate tracking.

### Affiliate Bridge Exists

The runtime affiliate bridge lives in:

```text
lib/affiliate/affiliateBridge.ts
```

It converts the existing runtime `AffiliateLinkRequest` into the foundation `AffiliateLinkTarget`, then calls `getAffiliateUrl(...)`.

The bridge currently forces provider resolution to:

```text
provider: "none"
defaultProvider: "none"
```

unless a future caller explicitly enables provider URLs.

### Runtime Defaults Remain Safe

The runtime flow remains mock-safe:

1. `lib/affiliate/affiliateClient.ts` selects an adapter.
2. Bokus, Adlibris, and generic adapters are currently safe placeholders.
3. Placeholder adapters call `createMockAffiliateLink(...)`.
4. `createMockAffiliateLink(...)` calls `resolveBookBuyLink(...)`.
5. `resolveBookBuyLink(...)` returns the existing UI-safe link shape.

The UI receives only:

- `label`
- `url`
- `retailer`
- `provider`
- `isAffiliate`

Current visible behavior remains:

- label: `Hitta boken`
- URL: `#` when no safe URL is available
- `isAffiliate`: `false`
- provider: `mock`

### No Real Affiliate Links Enabled

The current implementation does not:

- add Tradedoubler links
- add publisher IDs
- add campaign IDs
- add click IDs
- add affiliate parameters
- add analytics events
- add tracking scripts
- expose provider internals to UI components

The adapter files under `lib/affiliate/providers/` are safe stubs/placeholders only.

## Preconditions Before Enablement

Real affiliate enablement should not begin until all preconditions below are satisfied.

### ISBN Verification Workflow

The workflow in `docs/MANUAL_ISBN_VERIFICATION_WORKFLOW.md` should be followed before any ISBN-derived destination is used.

Required:

- title verified
- author verified
- intended edition verified
- ISBN13 manually verified
- conflicting ISBNs resolved
- wrong-language or wrong-format editions rejected

ISBN13 should never be added just to silence `missing_affiliate_metadata` warnings.

### Metadata Confidence

The book corpus should have enough metadata confidence to avoid sending readers to incorrect editions.

Required:

- no malformed ISBN13 values
- no unresolved duplicate ISBN13 conflicts
- no unresolved duplicate title/author conflicts
- no guessed `bokusUrl` values
- no tracking URLs in raw metadata
- no affiliate IDs in source-controlled book data

Missing affiliate metadata may remain a warning, but real-link enablement should only use books whose target metadata has passed manual review.

### Affiliate Provider Agreement

Before provider integration, Bokhyllan must have a real agreement or documented provider setup outside source control.

Required:

- provider terms understood
- approved destination rules documented
- publisher/account identifiers stored outside source control
- no secrets committed
- no real provider URLs in placeholder fixtures

Tradedoubler-specific work should remain disabled until the provider agreement and configuration rules are clear.

### Compliance Review

Before launch, review:

- affiliate disclosure requirements
- provider terms
- privacy implications
- cookie or tracking behavior
- data retention
- whether analytics is required, optional, or intentionally absent
- whether UI copy must disclose affiliate status

This review should happen before any production rollout, not after implementation.

### QA Review

QA should verify:

- reveal page still works
- saved books still works
- fallback behavior still returns safe unavailable links
- UI remains non-ecommerce-like
- UI components do not hardcode Bokus, Adlibris, Tradedoubler, provider IDs, or tracking details
- missing configuration cannot accidentally produce malformed links
- generated URLs never include secrets from source-controlled code

## Enablement Stages

### Stage 0: Disabled

Status today.

Behavior:

- provider defaults to `none`
- adapters remain mock-safe
- URL falls back to `#` when unavailable
- `isAffiliate` remains `false`
- no analytics or tracking occurs

Allowed work:

- documentation
- metadata verification
- tests or fixtures without real IDs
- provider interface planning

Forbidden work:

- real affiliate IDs
- Tradedoubler links
- tracking parameters
- analytics events
- UI ecommerce changes

### Stage 1: Verified Bokus Links

Goal: allow clean, non-affiliate Bokus destinations only for books with verified metadata.

Possible behavior:

- use verified clean `bokusUrl` when present
- or derive a clean Bokus search/product destination from verified ISBN13
- keep `isAffiliate` as `false`
- keep provider internals out of UI

Required before Stage 1:

- manual ISBN verification workflow in use
- clean URL rules approved
- fallback behavior tested
- no affiliate provider credentials required

This stage should still avoid Tradedoubler and real affiliate tracking.

### Stage 2: Affiliate Provider Integration

Goal: add a real provider adapter behind the existing affiliate boundary.

Possible behavior:

- Bokus via a provider adapter becomes available behind explicit configuration
- missing configuration returns unavailable or safe non-affiliate fallback
- UI still receives only `label`, `url`, `retailer`, `provider`, and `isAffiliate`

Required before Stage 2:

- provider agreement complete
- configuration storage decided outside source control
- secrets handling reviewed
- provider URL construction documented
- no real IDs in repo fixtures
- tests prove disabled and misconfigured states are safe

Tradedoubler support belongs here or later, not in Stage 1.

### Stage 3: Analytics Review

Goal: decide whether affiliate clicks should be measured.

Possible behavior:

- use the typed analytics foundation if tracking is approved
- avoid storing full URLs where possible
- store only safe fields such as provider and destination host
- keep raw personal answers, names, emails, IP addresses, and user agents out of event payloads

Required before Stage 3:

- privacy review complete
- event payloads approved
- retention policy decided
- no external analytics service added without a dedicated phase

Analytics should not be bundled into basic affiliate enablement.

### Stage 4: Production Rollout

Goal: enable real outbound affiliate behavior in production after metadata, provider, compliance, and QA gates pass.

Required before Stage 4:

- staged rollout plan
- rollback plan tested
- representative books checked
- provider configuration present only in approved environments
- UI behavior reviewed
- monitoring or manual checks defined
- no secrets or real IDs in source control

Production rollout should be reversible without code changes to UI components.

## Risks

### Incorrect Editions

Wrong ISBNs can send readers to the wrong language, translation, format, or collected edition.

Mitigation:

- follow manual ISBN verification
- treat conflicts as blocking
- leave uncertain fields blank

### Broken Links

Retailer URLs can change or products can disappear.

Mitigation:

- keep fallback behavior safe
- prefer provider abstraction over UI hardcoding
- test unavailable states

### Tracking Leakage

Affiliate IDs, campaign parameters, redirect URLs, and click URLs can leak into book data or fixtures.

Mitigation:

- keep provider details in the affiliate layer
- block tracking URLs in raw metadata
- review source-controlled examples
- never commit secrets

### Metadata Drift

Affiliate pressure can encourage guessed ISBNs or unverified URLs.

Mitigation:

- keep validation warnings visible
- require manual review
- reject metadata added only to activate links

### User Trust

If affiliate links feel hidden, incorrect, too commercial, or noisy, Bokhyllan's recommendation trust is weakened.

Mitigation:

- keep UI calm
- preserve recommendation-first behavior
- disclose affiliate status if required
- do not make the product ecommerce-like

## Rollback Strategy

Rollback should be possible at the affiliate boundary.

Preferred rollback controls:

- force provider selection back to `none`
- disable provider URL opt-in
- return mock-safe `#` URLs
- keep `isAffiliate` as `false`
- remove provider configuration from the environment
- leave UI components unchanged

Rollback should not require:

- deleting book data
- rewriting UI components
- changing recommendation flow
- removing saved books
- changing route behavior

After rollback, run:

- `npm.cmd run lint`
- `npm.cmd run build`
- reveal page smoke test
- saved books smoke test

## Acceptance Criteria

Before any real affiliate enablement:

- ISBN verification workflow is documented and followed.
- Affiliate metadata is manually verified or intentionally absent.
- No raw book metadata contains tracking parameters.
- No source-controlled file contains secrets, publisher IDs, campaign IDs, click IDs, or real Tradedoubler links.
- Provider integration lives behind `lib/affiliate` and `lib/library/affiliate-provider.ts`.
- UI components receive only the safe link contract.
- Missing provider configuration fails closed.
- Reveal and saved-book flows still work.
- Existing label and visual behavior remain calm.
- Compliance review is complete.
- QA review is complete.
- Rollback path is tested.
- `npm.cmd run lint` passes.
- `npm.cmd run build` passes.

## Explicit Non-Goals

This plan does not:

- enable real affiliate links
- add Tradedoubler integration
- add publisher IDs
- add campaign IDs
- add click tracking
- add analytics
- add external services
- change UI copy
- change visual design
- change routing
- change recommendation behavior
- turn Bokhyllan into an ecommerce interface
- store provider secrets in source control
- store affiliate URLs in raw book metadata

## Recommended Next Phase

Recommended next phase: **Phase C35 - Atlas v2 Handoff Brief**.

That phase should summarize what the data foundation, taxonomies, corpus roadmap, enrichment scaffold, and affiliate safety work mean for the next recommendation-model design branch.
