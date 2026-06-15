# Library Foundation Audit

## Summary

Phase C1-C8 added a typed library foundation for future scale work: normalized book data, validation, JSON IO utilities, enrichment drafts, curator matching, affiliate URL providers, analytics events, and saved shelf state helpers.

The current Bokhyllan runtime does not use these new foundation modules yet. The user-facing app still runs through the existing curated corpus in `data/library`, the current recommendation resolver, the mock-safe affiliate boundary in `lib/affiliate`, and the browser storage helper in `lib/savedBooks.ts`.

This is the correct state for now: the foundation exists, but no runtime behavior has changed.

## Existing Runtime Data Flow

### Book Data

- Runtime book type: `data/library/books/bookTypes.ts`
- Runtime corpus: `data/library/books/books.ts`
- Runtime taxonomy: `data/library/taxonomy/*`
- Runtime recommendation projection: `data/sampleRecommendations.ts`

The current `Book` type is curation-first. It contains fields such as `shortDescription`, `emotionalDescription`, `curatorConnection`, `voiceNote`, `readingState`, `emotionalTone`, `pacing`, `emotionalEffects`, `readingEnergy`, `lengthCategory`, `atmosphere`, and `affiliateRequest`.

This runtime type is separate from the new Phase C1 `Book` type in `lib/library/book.ts`.

### Recommendations

- Question definitions: `data/recommendationFlow.ts`
- Answer interpretation: `data/library/intelligence/answerInterpretation.ts`
- Recommendation resolver: `data/library/intelligence/recommendationResolver.ts`
- App mapping helper: `lib/recommendationMapping.ts`
- Result route: `app/recommend/result/page.tsx`
- Reveal route: `app/recommend/reveal/page.tsx`
- Reveal component: `components/recommendation/RecommendationReveal.tsx`

Runtime recommendations are deterministic. The app converts querystring answers into signals, maps those signals to emotional profiles and life moments, selects one book from `data/library/books/books.ts`, and passes a reveal note plus curator copy to the reveal route.

The new Phase C5 curator matching helpers in `lib/library/curator-system.ts` are not used by this flow.

### Saved Books / Saved Shelf

- Runtime saved storage helper: `lib/savedBooks.ts`
- Runtime saved page: `app/saved/page.tsx`
- Runtime saved shelf UI: `components/saved/SavedBooksShelf.tsx`
- Runtime save action location: `components/recommendation/RecommendationActions.tsx`

The current saved-books feature stores compact recommendation snapshots in `window.localStorage` under `bokhyllan:saved-books`. Saved items contain `id`, `title`, `author`, `coverImage`, and `emotionalDescriptor`.

The new Phase C8 saved shelf module in `lib/library/saved-shelf.ts` is not used by the runtime UI yet.

### Affiliate Links / Bokus

- Runtime affiliate types: `lib/affiliate/affiliateTypes.ts`
- Runtime affiliate client: `lib/affiliate/affiliateClient.ts`
- Runtime mock result: `lib/affiliate/affiliateMock.ts`
- Runtime provider placeholders: `lib/affiliate/providers/*`
- Reveal integration point: `app/recommend/reveal/page.tsx`
- Link rendering point: `components/recommendation/RecommendationActions.tsx`

The runtime affiliate boundary remains mock-safe. `createAffiliateLink` returns an `AffiliateLinkResult` with the calm label `Hitta boken`, URL `#`, and `isAffiliate: false`.

The new Phase C6 affiliate provider abstraction in `lib/library/affiliate-provider.ts` is not used by the runtime UI yet.

### Analytics / Event Tracking

- New analytics scaffold: `lib/analytics/events.ts`
- New analytics export: `lib/analytics/index.ts`

No runtime analytics or event tracking currently exists. No UI component imports `lib/analytics`, and no external analytics service is configured.

## New Foundation Modules C1-C8

### C1: Data Foundation

- `lib/library/book.ts`
- `lib/library/curator.ts`
- `lib/library/enrichment.ts`
- `lib/library/recommendation.ts`
- `lib/library/affiliate.ts`
- `lib/library/index.ts`

Adds broad future-facing types for books, curators, enrichment drafts, recommendation reasons, and affiliate targets.

Runtime UI usage: not used.

### C2: Library Validation

- `lib/library/validation.ts`

Adds `validateLibraryBooks` and typed validation issues for missing fields, duplicates, ISBN checks, empty arrays, and missing affiliate metadata.

Runtime UI usage: not used.

### C3: Import / Export Utilities

- `lib/library/io.ts`
- `scripts/validate-library.ts`

Adds JSON load/write utilities and a TypeScript validation CLI scaffold.

Runtime UI usage: not used.

Note: no package script was added because the project does not include a TypeScript script runner such as `tsx` or `ts-node`.

### C4: Enrichment Pipeline Scaffold

- `lib/library/enrichment-pipeline.ts`

Adds deterministic draft creation, status transition helpers, batch draft creation, and missing-draft lookup.

Runtime UI usage: not used.

### C5: Curator System Foundation

- `lib/library/curator-system.ts`

Adds simple curator/book scoring, matching, top-curator lookup, and internal recommendation reason creation.

Runtime UI usage: not used.

### C6: Affiliate Abstraction

- `lib/library/affiliate-provider.ts`

Adds provider-based URL selection for `bokus`, `none`, and `custom`, plus a Bokus search URL helper.

Runtime UI usage: not used.

### C7: Analytics Events Foundation

- `lib/analytics/events.ts`
- `lib/analytics/index.ts`

Adds typed local analytics events and a no-op tracker. It does not send events or store personal data.

Runtime UI usage: not used.

### C8: Saved Shelf Data Foundation

- `lib/library/saved-shelf.ts`

Adds pure saved shelf state helpers with `saved`, `removed`, and `dismissed` statuses.

Runtime UI usage: not used.

## Overlaps / Duplicates

### Two Book Models

- Runtime model: `data/library/books/bookTypes.ts`
- Foundation model: `lib/library/book.ts`

These serve different purposes today. The runtime model is curation and recommendation oriented. The foundation model is broader and more operational, with fields like `isbn13`, `genres`, `tags`, `themes`, `mood`, `bokusUrl`, and `enrichmentStatus`.

Future bridge needed: a mapper between `lib/library/Book` and the runtime curated `data/library/books/Book`, or a staged migration that makes the runtime model consume the foundation model safely.

### Two Affiliate Layers

- Runtime boundary: `lib/affiliate/*`
- Foundation abstraction: `lib/library/affiliate.ts` and `lib/library/affiliate-provider.ts`

The runtime layer produces UI-safe `AffiliateLinkResult` objects. The foundation layer models affiliate link targets and provider URL resolution. They should not be merged until the runtime affiliate boundary can wrap the new provider abstraction without exposing tracking details to UI.

Future bridge needed: an adapter from runtime `AffiliateLinkRequest` to foundation `AffiliateLinkTarget`, called only inside `lib/affiliate`.

### Two Saved Shelf Concepts

- Runtime browser storage: `lib/savedBooks.ts`
- Foundation state helpers: `lib/library/saved-shelf.ts`

The runtime helper stores full UI card snapshots in localStorage and deletes removed books. The foundation helper stores only `bookId`, status history, source, note, and timestamps, and preserves removed/dismissed records.

Future bridge needed: a storage adapter that can read old `bokhyllan:saved-books` entries and gradually write the new `SavedShelfState` shape.

### Two Recommendation Reason Concepts

- Runtime curator copy: `data/library/intelligence/recommendationResolver.ts`
- Foundation reason type: `lib/library/recommendation.ts`
- Foundation helper: `lib/library/curator-system.ts`

Runtime copy is user-facing and literary. Foundation recommendation reasons are internal, functional, and data-derived. They should remain separate.

Future bridge needed: use `RecommendationReason` for internal audit/debug tooling only, not reveal copy.

### Analytics Scaffold vs Product Principles

- Foundation analytics: `lib/analytics/*`
- Existing product principles warn against behavioral tracking in `docs/00-foundation/PRODUCT_STRUCTUREv1.md`

The analytics scaffold is typed and local only, but any future integration must be reviewed against Bokhyllan's privacy posture. Especially sensitive events such as `affiliate_clicked` should remain aggregate and non-personal if ever emitted.

## Safe Integration Opportunities

1. Add an offline validation command for future JSON library files.
   - Use `lib/library/io.ts`
   - Use `lib/library/validation.ts`
   - Avoid touching runtime `data/library/books/books.ts` at first.

2. Create a one-way mapper from runtime books to foundation books for auditing.
   - Input: `data/library/books/Book`
   - Output: `lib/library/Book`
   - Purpose: validation and completeness reports only.

3. Bridge saved shelf state behind `lib/savedBooks.ts`.
   - Keep UI imports unchanged.
   - Internally migrate from array deletion to `SavedShelfState` once a migration plan exists.

4. Wrap the Phase C6 affiliate provider inside `lib/affiliate`.
   - Keep UI receiving only `label`, `url`, `retailer`, `provider`, and `isAffiliate`.
   - Do not expose Bokus, Tradedoubler, or tracking mechanics to components.

5. Use `lib/analytics` only through a single internal analytics boundary.
   - Keep the no-op behavior until a privacy policy and consent posture exist.
   - Do not add page-view tracking by default.

## Risks

- Model drift: `data/library/books/bookTypes.ts` and `lib/library/book.ts` can diverge if new fields are added in one place only.
- Duplicate affiliate concepts: `AffiliateProviderId` exists in the runtime affiliate boundary and another provider type exists in the foundation layer.
- Saved shelf migration risk: existing localStorage values are an array of saved card snapshots, not a `SavedShelfState`.
- Build/run mismatch for scripts: `scripts/validate-library.ts` is typechecked but not directly runnable without a TypeScript runner or a compile step.
- Privacy risk: analytics event names exist now, but product principles require restraint before any runtime instrumentation.
- Source-of-truth ambiguity: future work should choose whether `data/library` remains the curated runtime source or whether `lib/library` becomes the canonical data model.

## Recommended Next Phases

1. Phase D1: Runtime-to-foundation mapper.
   - Add pure mapping from `data/library/books/Book` to `lib/library/Book`.
   - Use it for validation reports only.

2. Phase D2: Library validation report.
   - Add a local script that validates the current curated runtime corpus without changing it.
   - Report missing ISBNs, affiliate metadata, and duplicate IDs.

3. Phase D3: Saved shelf adapter plan.
   - Design a migration-safe bridge from `lib/savedBooks.ts` to `lib/library/saved-shelf.ts`.
   - Preserve existing localStorage entries.

4. Phase D4: Affiliate boundary bridge.
   - Keep `components/recommendation/RecommendationActions.tsx` unchanged.
   - Let `lib/affiliate` optionally consume `lib/library/affiliate-provider.ts` internally when real URLs are explicitly configured.

5. Phase D5: Import pipeline alignment.
   - Align `lib/library-import/*` with `lib/library/*` types so future candidate-to-publish workflows produce the same foundation model.

6. Phase D6: Analytics governance.
   - Keep `trackAnalyticsEvent` as a no-op until a privacy and product decision is made.
   - If analytics are enabled later, start with sparse aggregate events and no personal data.
