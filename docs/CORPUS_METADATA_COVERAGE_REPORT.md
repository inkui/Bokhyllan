# Corpus Metadata Coverage Report

## Summary

The current runtime corpus contains 12 curated books. The corpus is strong enough for the existing recommendation experience, but several operational metadata fields remain incomplete for future validation, import, and affiliate work.

This report documents coverage only. It does not add, infer, or correct book data.

ISBN13 and Bokus URL values should be verified manually before entry. Do not use guessed ISBNs, affiliate URLs, tracking URLs, publisher IDs, or Tradedoubler links.

## Current Corpus Size

- Total runtime books: 12
- Source file: `data/library/books/books.ts`
- Runtime type: `data/library/books/bookTypes.ts`

## Field Coverage

| Field | Present | Missing | Coverage | Notes |
| --- | ---: | ---: | ---: | --- |
| `title` | 12 | 0 | 100% | Required runtime field. |
| `author` | 12 | 0 | 100% | Required runtime field. |
| `genres` | 12 | 0 | 100% | Broad operational genres are present for all books. |
| `isbn13` | 3 | 9 | 25% | Present only where already verified in local corpus context. |
| `bokusUrl` | 0 | 12 | 0% | No clean Bokus URLs are stored in the corpus. |
| `firstPublishedYear` | 4 | 8 | 33% | Present for a small subset with local context. |
| `originalTitle` | 1 | 11 | 8% | Present for `En gentleman i Moskva`; not every book needs this field. |

## Missing Metadata Summary

The main operational gap is affiliate-ready metadata:

- 9 books are missing `isbn13`.
- 12 books are missing `bokusUrl`.
- 8 books are missing `firstPublishedYear`.
- 11 books are missing `originalTitle`, though this is only relevant when the runtime title differs from the original or a translated title needs review context.

The current validation expectation is:

- 0 errors
- 9 warnings
- `missing_affiliate_metadata`: 9 warnings

The earlier `empty_array` genre warnings are no longer expected because all 12 books now have broad `genres` values.

## Safe Manual Enrichment Queue

### Highest Priority

Verify ISBN13 values for books that currently lack both `isbn13` and `bokusUrl`:

- `handelser-vid-vatten`
- `gentleman-i-moskva`
- `brant-barn`
- `outline`
- `aterstoden-av-dagen`
- `dora-bruder`
- `den-allvarsamma-leken`
- `det-vilda-torget`
- `samuel-bok`

Manual verification should target the intended edition for Bokhyllan, preferably the Swedish-market edition where relevant. If edition choice is unclear, leave the field blank and document the decision needed.

### Secondary Priority

Verify `firstPublishedYear` for books where it is still missing:

- `handelser-vid-vatten`
- `brant-barn`
- `outline`
- `aterstoden-av-dagen`
- `dora-bruder`
- `den-allvarsamma-leken`
- `det-vilda-torget`
- `samuel-bok`

### Optional Review

Add `originalTitle` only where it is useful and manually verified:

- translated titles
- titles where Swedish and original publication titles differ
- cases where edition or translation choice needs future review context

Do not add `originalTitle` merely to duplicate the displayed title.

### Bokus URL Policy

No `bokusUrl` values should be added until Bokhyllan decides whether Bokus destinations should be:

- stored as clean manually verified URLs per book, or
- derived later from ISBN inside the affiliate boundary.

If `bokusUrl` is added later, it must be a clean retailer URL with no affiliate tracking parameters.

## Fields Not Tracked Yet

These fields are intentionally not part of the runtime corpus yet:

- `tags`
- `themes`
- `mood`
- `pace`
- `literaryWarmth`
- `giftFit`

Reasons:

- The runtime model already has Bokhyllan-specific curation fields such as `emotionalTone`, `readingState`, `pacing`, `emotionalEffects`, `readingEnergy`, and `atmosphere`.
- Adding parallel semantic fields now would risk taxonomy drift.
- `tags`, `themes`, and `mood` need controlled vocabulary decisions before becoming runtime data.
- `pace` overlaps with existing runtime `pacing`.
- `literaryWarmth` and `giftFit` are product strategy fields, not required for the current validation pass.

These fields may belong in foundation models, enrichment drafts, or a future Atlas v2 runtime model after recommendation model decisions are clearer.

## Recommended Next Phase

Recommended next phase: **Phase C22 - Book Data Authoring Guide**.

That phase should document how humans should add and review runtime book metadata safely:

- accepted genre vocabulary
- ISBN13 verification rules
- Bokus URL rules
- when to use `originalTitle`
- how to avoid affiliate tracking data in source
- what not to add before Atlas v2 decisions
