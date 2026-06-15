# Current Corpus Enrichment Plan

## Summary

The current runtime corpus has 12 curated books in `data/library/books/books.ts`. They work in the live recommendation flow today and should not be changed casually.

Phase C10 added a read-only mapper from the runtime book shape to the Phase C1 foundation `Book` shape. The validation report shows no structural errors, but it does show expected warnings where the runtime corpus lacks operational metadata.

This plan describes how to enrich those 12 books gradually, manually, and safely, without inventing data or changing runtime behavior prematurely.

## Current Runtime Corpus Shape

Runtime books are defined by `data/library/books/bookTypes.ts` and stored in `data/library/books/books.ts`.

The current shape is curation-first:

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

This model is already strong for recommendation quality. It does not yet include operational metadata such as `isbn13`, `bokusUrl`, `genres`, `language`, or `firstPublishedYear`.

## Foundation Book Shape

The Phase C1 foundation model lives in `lib/library/book.ts`.

It includes runtime-adjacent and operational fields:

- identity: `id`, `title`, `author`, `originalTitle`
- metadata: `language`, `firstPublishedYear`, `isbn13`, `coverImageUrl`, `description`
- classification: `genres`, `tags`, `themes`, `mood`, `pace`
- product fit: `literaryWarmth`, `giftFit`
- affiliate target fields: `bokusUrl`
- workflow: `enrichmentStatus`, `createdAt`, `updatedAt`

The mapper in `lib/library/runtime-book-mapper.ts` currently preserves known runtime values and fills only minimal defaults needed for validation.

## Validation Gaps

The current validation report is documented in `docs/LIBRARY_VALIDATION_REPORT.md`.

Known warnings:

- `empty_array`: 12 warnings
- `missing_affiliate_metadata`: 12 warnings

The `empty_array` warnings are caused by missing runtime genre data. The mapper leaves `genres` empty because genre does not currently exist in the runtime corpus and should not be invented automatically.

The `missing_affiliate_metadata` warnings are caused by missing `isbn13` and `bokusUrl`. The current runtime corpus only has mock-safe `affiliateRequest` values, and real retailer metadata has not been manually verified yet.

There are no expected duplicate ID, duplicate ISBN13, malformed ISBN13, or duplicate title/author errors.

## Required Enrichment Fields

The first enrichment pass should focus only on fields that unlock validation and future operations:

1. `isbn13`
   - Required before reliable metadata lookup, affiliate routing, or stock checks.
   - Must be manually verified against a trusted bibliographic or retailer source.

2. `genres`
   - Required by the C1 foundation model.
   - Should use a small, stable vocabulary.
   - Should not replace Bokhyllan's emotional taxonomy.

3. `language`
   - Runtime currently defaults to `sv` through the mapper.
   - Should eventually become explicit per book, especially for translated literature.

4. `firstPublishedYear`
   - Useful for audit, collection balance, and occasional context.
   - Should be added only when confidently verified.

5. `bokusUrl`
   - Optional for now.
   - Should be added only if the team decides to store verified retailer URLs per book rather than deriving search/deeplink targets later.

## Manual Enrichment Rules

### Genres

Genres should be broad and stable. They are for operational grouping, not marketing.

Good genre style:

- `literary_fiction`
- `poetry`
- `classic`
- `historical_fiction`
- `speculative_fiction`

Avoid:

- trend labels
- overly specific shelves
- mood words already covered by Bokhyllan taxonomy
- retailer category names copied uncritically

### Tags

Tags should capture recommendation-relevant qualities.

Use tags for durable signals such as form, reading texture, and placement usefulness. Tags can overlap with the current taxonomy, but should not become a dumping ground.

Avoid tags based on popularity, awards, sales, or hype.

### Themes

Themes should describe what the book helps with or explores.

Good theme style:

- grief
- solitude
- renewal
- memory
- moral_clarity
- companionship

Themes should remain reader-useful. They should not become plot summaries.

### Mood

Mood should stay product-useful, not literary overanalysis.

Use the existing foundation values conservatively:

- `still`
- `warm`
- `clear`
- `melancholic`
- `immersive`
- `hopeful`
- `dark`
- `restless`
- `tender`
- `other`

Choose the dominant product mood, not every possible interpretation.

### ISBN / Bokus Data

ISBN and retailer metadata must be verified manually before entry.

Rules:

- Use ISBN13, not ISBN10.
- Confirm the ISBN belongs to the intended edition or an acceptable available edition.
- Do not add publisher IDs, affiliate IDs, tracking parameters, or Tradedoubler links.
- Do not store real affiliate URLs in the corpus.
- Keep affiliate activation behind `lib/affiliate`.

## Fields To Avoid For Now

Do not add or expand these fields during the first enrichment pass:

- prices
- stock status
- retailer ranking
- review scores
- popularity metrics
- user ratings
- AI-generated summaries
- behavioral analytics fields
- real affiliate tracking URLs
- personal curator IDs unless a curator system is actually active

These fields would either make the product feel ecommerce-like or imply runtime systems that do not exist yet.

## Recommended Data Update Order

1. Add explicit `isbn13` to the runtime model and each reviewed book.
2. Decide the controlled `genres` vocabulary before adding genre values.
3. Add `genres` to the runtime model and fill one broad genre per book first.
4. Add explicit `language` only after deciding whether language means original language, reading edition language, or product-facing language.
5. Add `firstPublishedYear` after ISBN review.
6. Re-run the validation report and confirm warning count drops.
7. Consider whether `bokusUrl` should be stored or derived later.

## Acceptance Criteria

The first enrichment pass is complete when:

- every runtime book has a verified `isbn13`
- every runtime book has at least one broad `genre`
- no `empty_array` warnings remain for `genres`
- no `missing_affiliate_metadata` warnings remain because each book has `isbn13`
- no real affiliate tracking parameters are present
- recommendation behavior remains unchanged
- reveal and saved-book flows remain unchanged
- `npm.cmd run lint` passes
- `npm.cmd run build` passes

## Next Suggested Phase

Phase C12 should be a metadata field proposal for the runtime `Book` type.

That phase should define the smallest safe runtime additions, likely:

- `isbn13?: string`
- `genres?: string[]`
- `language?: BookLanguage`
- `firstPublishedYear?: number`

It should still avoid filling values until the manual enrichment rules are approved.
