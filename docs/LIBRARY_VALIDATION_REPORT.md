# Library Validation Report

## Summary

The current curated runtime corpus can now be converted into the Phase C1 `lib/library/Book` shape and checked with the Phase C2 validation utilities without changing runtime behavior.

The report path is read-only:

```text
data/library/books/books.ts
-> lib/library/runtime-book-mapper.ts
-> lib/library/validation.ts
-> scripts/report-library-validation.ts
```

The current corpus passes structural validation with no expected errors after conservative mapping. The known findings are warnings caused by affiliate metadata that is still intentionally incomplete for most runtime books.

## How To Run

The report utility is:

```text
scripts/report-library-validation.ts
```

It is typechecked by `npm.cmd run build`.

There is no package script yet because the project does not include a TypeScript script runner such as `tsx` or `ts-node`, and no new dependency was added for this phase.

## Current Known Issues

Expected report shape for the current corpus:

- Total books: 12
- Errors: 0
- Warnings: 9
- `missing_affiliate_metadata`: 9 warnings

The earlier `empty_array` genre warnings are no longer expected because the current runtime corpus now contains broad operational `genres` values for all 12 books.

The remaining `missing_affiliate_metadata` warnings are expected because 9 runtime books still do not store either `isbn13` or `bokusUrl`. Runtime affiliate behavior remains mock-safe through `lib/affiliate`.

No duplicate IDs, duplicate ISBN13 values, malformed ISBN13 values, or duplicate title/author combinations are expected from the current mapped corpus.

## Mapper Assumptions

`lib/library/runtime-book-mapper.ts` makes only conservative mappings:

- Preserves `id`, `title`, and `author`.
- Defaults `language` to `sv` because the current product is Swedish-facing and runtime books do not carry language metadata yet.
- Maps runtime `genres` into foundation `genres` when present.
- Maps existing curation taxonomy into `tags` and `themes`.
- Maps runtime `atmosphere` to foundation `mood` when supported.
- Maps runtime cover image to `coverImageUrl`.
- Maps runtime short description to `description`.
- Sets `enrichmentStatus` to `published` because these books are already live in the curated runtime corpus.

## Fix Manually

These should be fixed by human curation or metadata work, not guessed in code:

- Add verified ISBN13 values for the remaining curated books.
- Decide whether `bokusUrl` should exist per book or remain derived by the affiliate boundary.
- Add a controlled genre vocabulary if genre will become operationally useful.
- Decide whether runtime language should be per-book metadata rather than a mapper default.

## Ignore For Now

These are acceptable during the scaffold phase:

- Missing affiliate metadata warnings.
- No direct package script for the TypeScript report utility.

## Recommendations For Next Phase

1. Add ISBN13 metadata to the curated corpus through a review step, not automated guessing.
2. Decide whether `lib/library/Book` should become the canonical model or remain an operational audit model.
3. Add a runnable validation command only after choosing a TypeScript script runner or a build-to-JS script convention.
4. Keep affiliate validation warnings separate from production affiliate activation.
