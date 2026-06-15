# Library Foundation Readiness Summary

## Executive Summary

Phases C1-C18 have created a stable foundation around Bokhyllan's library data without changing the user-facing product flow.

The current app still runs on the existing curated runtime corpus, recommendation resolver, mock-safe affiliate boundary, and `localStorage` saved-books helper. The new foundation is mostly typed infrastructure, audit tooling, and compatibility bridges. That is the right shape for this stage: Bokhyllan now has safer places to put future import, enrichment, affiliate, analytics, and saved-shelf work, while the live experience remains quiet and unchanged.

The recommended next move is a small data quality branch, not a recommendation rewrite.

## Completed Phases C1-C18

### C1: Data Foundation

Added `lib/library/*` types for books, curators, enrichment drafts, recommendation reasons, and affiliate link targets.

Runtime behavior: none.

Status: scaffold-only.

### C2: Library Validation

Added `lib/library/validation.ts` with deterministic validation for required fields, duplicates, ISBN13 shape, empty arrays, and missing affiliate metadata.

Runtime behavior: none.

Status: scaffold-only.

### C3: Import / Export Scripts

Added JSON import/export helpers in `lib/library/io.ts` and a validation CLI scaffold in `scripts/validate-library.ts`.

Runtime behavior: none.

Status: scaffold-only. The scripts are typechecked, but there is no package runner such as `tsx` or `ts-node`.

### C4: Enrichment Pipeline Scaffold

Added `lib/library/enrichment-pipeline.ts` for pending enrichment drafts, status transitions, batch draft creation, and missing-draft checks.

Runtime behavior: none.

Status: scaffold-only.

### C5: Curator System Foundation

Added `lib/library/curator-system.ts` for simple curator/book scoring and internal recommendation reasons.

Runtime behavior: none.

Status: scaffold-only.

### C6: Affiliate Abstraction

Added `lib/library/affiliate-provider.ts` with provider-neutral URL resolution for `bokus`, `none`, and `custom`.

Runtime behavior: none at the time of creation.

Status: scaffold-only, later bridged by C15.

### C7: Analytics Events Foundation

Added typed local analytics events in `lib/analytics/events.ts` and `lib/analytics/index.ts`.

Runtime behavior: none. `trackAnalyticsEvent(...)` is a no-op.

Status: scaffold-only.

### C8: Saved Shelf Data Foundation

Added `lib/library/saved-shelf.ts` with pure saved shelf state helpers and `saved`, `removed`, and `dismissed` statuses.

Runtime behavior: none at the time of creation.

Status: scaffold-only, later bridged by C18.

### C9: Foundation Integration Audit

Added `docs/LIBRARY_FOUNDATION_AUDIT.md` to map existing runtime flows against the new foundation modules.

Runtime behavior: none.

Status: audit-only.

### C10: Current Corpus Validation Report

Added `lib/library/runtime-book-mapper.ts`, `scripts/report-library-validation.ts`, and `docs/LIBRARY_VALIDATION_REPORT.md`.

Runtime behavior: none.

Status: audit/report scaffold.

### C11: Current Corpus Enrichment Gap Plan

Added `docs/CURRENT_CORPUS_ENRICHMENT_PLAN.md`.

Runtime behavior: none.

Status: audit-only.

### C12: Runtime Book Metadata Field Proposal

Added `docs/RUNTIME_BOOK_METADATA_FIELD_PROPOSAL.md`.

Runtime behavior: none.

Status: proposal-only.

### C13: Runtime Book Optional Metadata Fields

Extended `data/library/books/bookTypes.ts` with optional metadata fields and updated `lib/library/runtime-book-mapper.ts` to consume them.

Runtime behavior: no visible behavior change.

Status: partially integrated at the type/mapper boundary.

### C14: Current Corpus Minimal Metadata Pass

Added minimal approved metadata to `data/library/books/books.ts` where available.

Runtime behavior: no visible behavior change.

Status: data quality step.

### C15: Affiliate Boundary Bridge

Added `lib/affiliate/affiliateBridge.ts` and routed `lib/affiliate/affiliateMock.ts` through it.

Runtime behavior: preserved. The UI still receives mock-safe links.

Status: partially integrated boundary bridge.

### C16: Affiliate Bridge Safety Audit

Added `docs/AFFILIATE_BRIDGE_SAFETY_AUDIT.md`.

Runtime behavior: none.

Status: audit-only.

### C17: Saved Shelf Bridge Audit

Added `docs/SAVED_SHELF_BRIDGE_AUDIT.md`.

Runtime behavior: none.

Status: audit-only.

### C18: Saved Shelf Compatibility Adapter

Added `toSavedShelfState(...)` and `fromSavedShelfState(...)` inside `lib/savedBooks.ts`.

Runtime behavior: preserved. Existing `localStorage` reads/writes still use the current `SavedBook[]` shape.

Status: partially integrated compatibility adapter.

## Current Runtime Status

### Book Corpus Metadata

The runtime corpus remains in `data/library/books/books.ts` and the runtime book type remains in `data/library/books/bookTypes.ts`.

C13 added optional fields:

- `isbn13`
- `bokusUrl`
- `genres`
- `firstPublishedYear`
- `originalTitle`

C14 added broad genres across the current 12-book corpus and a few locally verified metadata values. Most books still do not have ISBN13 or Bokus URL metadata.

### Validation Status

The mapper in `lib/library/runtime-book-mapper.ts` can convert runtime books into the foundation `Book` shape.

`docs/LIBRARY_VALIDATION_REPORT.md` describes the earlier validation baseline. Since C14 added genres, the old `empty_array` genre warnings should no longer be expected for the current corpus. Missing affiliate metadata warnings are still expected for books without `isbn13` or `bokusUrl`.

The validation report script is typechecked by build but is not directly runnable through a package script because no TypeScript runner has been added.

### Affiliate Links

Runtime affiliate flow now passes through `lib/affiliate/affiliateBridge.ts`, which calls the C6 provider abstraction.

Real outbound links remain disabled by default. The bridge forces provider selection to `none` unless a future phase explicitly opts into provider URLs. UI components still receive only a simple link contract and continue to render `Hitta boken` with a mock-safe URL.

### Saved Shelf

Runtime saved books still use `lib/savedBooks.ts` and browser `localStorage` under `bokhyllan:saved-books`.

C18 added pure compatibility helpers to convert between current `SavedBook[]` snapshots and C8 `SavedShelfState`, but runtime storage has not migrated.

### Analytics

`lib/analytics/*` contains typed event scaffolding and a no-op tracker.

No UI or runtime flow sends analytics events. No external service is configured.

### Curator And Enrichment Systems

Curator matching, enrichment drafts, import/export utilities, and recommendation reason helpers exist as local scaffolds only.

The live recommendation flow still uses the existing deterministic resolver and curated runtime copy.

## What Is Ready

- Typed library foundation in `lib/library/*`.
- Local validation utilities in `lib/library/validation.ts`.
- Runtime-to-foundation mapper in `lib/library/runtime-book-mapper.ts`.
- Import/export helper scaffolding in `lib/library/io.ts`.
- Enrichment draft scaffold in `lib/library/enrichment-pipeline.ts`.
- Curator scoring scaffold in `lib/library/curator-system.ts`.
- Affiliate bridge that keeps real links disabled by default.
- Saved shelf compatibility adapter inside `lib/savedBooks.ts`.
- Privacy-safe analytics event model with no-op tracking.
- Audit documents for foundation integration, affiliate safety, saved shelf migration, and corpus enrichment.

## What Is Not Ready

- Real Bokus affiliate enablement.
- Tradedoubler integration.
- Publisher IDs, tracking parameters, or campaign configuration.
- Runtime analytics tracking.
- Full enrichment pipeline.
- AI-assisted enrichment.
- Google Books or Open Library integration.
- Curator-generated recommendations.
- Large corpus import workflow.
- Atlas v2 recommendation model decisions.
- Saved shelf storage migration.
- A runnable package script for TypeScript report utilities.

## Recommended Next Branches

### A. Data Quality Branch

Focus on low-risk corpus metadata quality.

Possible work:

- Verify remaining ISBN13 values manually.
- Decide whether `bokusUrl` should be stored or derived.
- Re-run or make runnable the validation report without adding unnecessary dependencies.
- Update validation docs after metadata changes.

### B. Affiliate Real-Link Branch

Focus on real outbound retailer URLs only after data quality is stronger.

Possible work:

- Decide whether Bokus links should derive from ISBN or stored clean URLs.
- Keep Tradedoubler out until account/config rules are clear.
- Add explicit provider enablement behind the affiliate boundary.
- Keep UI unaware of provider details.

### C. Atlas v2 / Recommendation Model Branch

Focus on taxonomy and recommendation semantics before adding more rich fields.

Possible work:

- Decide how foundation `tags`, `themes`, `mood`, `pace`, `literaryWarmth`, and `giftFit` relate to current runtime taxonomy.
- Avoid adding duplicate semantic fields directly to runtime books until this is settled.

### D. Saved Shelf Migration Branch

Focus on a safe compatibility migration.

Possible work:

- Keep `lib/savedBooks.ts` as the public boundary.
- Read the old `SavedBook[]` shape and optionally a future `SavedShelfState` shape.
- Preserve old saved books and UI-ready display data.
- Avoid changing the `localStorage` key until migration reading is proven.

### E. Analytics Governance Branch

Focus on product and privacy rules before instrumentation.

Possible work:

- Define which events are allowed.
- Confirm no raw personal answers or free-text data are stored.
- Keep affiliate click events host-level rather than full-URL where possible.
- Decide whether analytics should remain purely local/no-op.

## Recommended Immediate Next Step

Recommended next phase: **Phase C20 - Current Corpus Metadata Quality Pass 2**.

Why this should come next:

- It is small and low-risk.
- It improves the foundation without changing UI or recommendation behavior.
- It reduces validation noise before bigger affiliate, import, or Atlas work.
- It supports future Bokus linking without enabling real affiliate behavior yet.

Suggested scope:

- Edit only `data/library/books/books.ts` and docs if needed.
- Add only manually verified `isbn13`, `firstPublishedYear`, `originalTitle`, or clean non-tracking `bokusUrl` values.
- Do not add tags, themes, mood, pace, literary warmth, gift fit, tracking links, or provider secrets.
- Keep runtime behavior unchanged.
