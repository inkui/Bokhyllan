# Runtime Book Metadata Field Proposal

## Summary

The current runtime `Book` model is strong for recommendation and curator voice, but it lacks a few operational metadata fields needed for validation, import workflows, and future affiliate routing.

This proposal recommends the smallest safe optional additions to `data/library/books/bookTypes.ts`. It does not recommend changing `books.ts` yet, and it does not recommend adding semantic enrichment fields directly to the runtime model before the next Atlas/recommendation decisions are clearer.

## Current Runtime Book Fields

The runtime `Book` type currently lives in `data/library/books/bookTypes.ts`.

Current fields:

- `id`
- `title`
- `author`
- `coverImage`
- `shortDescription`
- `emotionalDescription`
- `curatorConnection`
- `voiceNote`
- `practicalNotes`
- `emotionalTone`
- `readingState`
- `pacing`
- `emotionalEffects`
- `readingEnergy`
- `lengthCategory`
- `atmosphere`
- `affiliateRequest`

This shape directly supports today's recommendation resolver and reveal UI. It should remain stable while metadata is added gradually.

## Foundation Book Fields That Matter Now

The Phase C1 foundation model in `lib/library/book.ts` contains many future-facing fields. Only a few matter for the current validation gap:

- `isbn13`
- `bokusUrl`
- `genres`
- `firstPublishedYear`
- `originalTitle`

These fields are relatively concrete, manually verifiable, and low-risk when optional. They help close the C10 validation warnings without changing recommendation behavior.

## Proposed Smallest Runtime Additions

Recommended optional fields:

```ts
isbn13?: string;
bokusUrl?: string;
genres?: string[];
firstPublishedYear?: number;
originalTitle?: string;
```

These should be optional at first. Adding them as required fields would force incomplete or guessed metadata into the current 12-book corpus, which is exactly what the enrichment plan says to avoid.

## Field-By-Field Rationale

### `isbn13?: string`

Why needed:

- Provides the safest stable identifier for metadata lookup, validation, and future affiliate routing.
- Directly resolves the `missing_affiliate_metadata` warning when present.

Supports:

- validation
- affiliate preparation
- future import/enrichment workflows

Manual verification:

- Yes. It must be checked against a trusted bibliographic or retailer source.

Risk level:

- Low if optional and manually verified.
- Medium if added quickly without edition review.

### `bokusUrl?: string`

Why needed:

- Allows a manually verified retailer URL to be stored if Bokhyllan decides not to derive all Bokus destinations from ISBN later.

Supports:

- affiliate preparation
- validation

Manual verification:

- Yes. Must be checked manually and must remain a clean retailer URL, not a tracking URL.

Risk level:

- Medium. It can blur the affiliate boundary if used directly by UI.
- Keep usage behind `lib/affiliate`; do not expose provider mechanics in components.

### `genres?: string[]`

Why needed:

- The foundation validator currently expects `genres`.
- A small genre field helps operational grouping without changing the emotional taxonomy.

Supports:

- validation
- future corpus audits
- future import workflows

Manual verification:

- Yes, but genre should be curated rather than scraped.

Risk level:

- Medium. Genre can sprawl or become marketplace-like if too granular.
- Use a small controlled vocabulary.

### `firstPublishedYear?: number`

Why needed:

- Useful for metadata completeness, collection balance, and occasional editorial review.

Supports:

- future enrichment
- corpus audit
- import workflow alignment

Manual verification:

- Yes. Should be checked against bibliographic sources.

Risk level:

- Low if optional.

### `originalTitle?: string`

Why needed:

- Helps translated literature and future metadata review without affecting recommendation logic.

Supports:

- future enrichment
- metadata quality
- curator review

Manual verification:

- Yes. Should be checked manually, especially for translations and alternate editions.

Risk level:

- Low if optional.

## Fields Explicitly Not Recommended Yet

Do not add these directly to the runtime `Book` model in the next phase:

- `tags`
- `themes`
- `mood`
- `pace`
- `literaryWarmth`
- `giftFit`

Reasons:

- Runtime already has `emotionalTone`, `readingState`, `pacing`, `emotionalEffects`, `readingEnergy`, and `atmosphere`.
- Adding parallel semantic fields now risks duplicate meaning and taxonomy drift.
- `tags` and `themes` need a controlled vocabulary decision before they become runtime data.
- `mood` overlaps with `atmosphere` and `emotionalTone`.
- `pace` overlaps with the existing `pacing` taxonomy.
- `literaryWarmth` and `giftFit` are product strategy fields, not required for current validation.

These fields may belong in enrichment drafts, foundation/audit models, or a later Atlas v2 runtime model. They should not be added just to mirror the foundation type.

## Migration-Safe Acceptance Criteria

Phase C13 is safe if:

- only optional fields are added to `data/library/books/bookTypes.ts`
- no existing book entries are modified
- no runtime UI imports change
- no recommendation logic changes
- `lib/library/runtime-book-mapper.ts` reads the optional fields when present
- fallback behavior remains the same when fields are absent
- no real affiliate tracking URLs or publisher IDs are added
- `npm.cmd run lint` passes
- `npm.cmd run build` passes

## Recommended Next Phase

Phase C13 should add optional metadata fields to the runtime `Book` type only:

```ts
isbn13?: string;
bokusUrl?: string;
genres?: string[];
firstPublishedYear?: number;
originalTitle?: string;
```

It should also update `lib/library/runtime-book-mapper.ts` to consume those fields when present.

Phase C13 should not add values to `books.ts`, change UI, change routing, activate affiliate links, or alter recommendation behavior.
