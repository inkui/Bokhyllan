# Book Data Authoring Guide

## Purpose

This guide explains how to add and maintain Bokhyllan runtime book data safely.

The goal is consistency, not volume. Leave uncertain metadata blank rather than guessing. Book data should support validation, future import workflows, and future affiliate routing without changing Bokhyllan's quiet recommendation experience into ecommerce metadata.

## Current Runtime Book Shape

Runtime books live in:

```text
data/library/books/books.ts
```

The runtime type lives in:

```text
data/library/books/bookTypes.ts
```

The current runtime `Book` shape contains:

- identity fields: `id`, `title`, `author`
- approved optional metadata: `originalTitle`, `isbn13`, `bokusUrl`, `genres`, `firstPublishedYear`
- runtime presentation and curation fields: `coverImage`, `shortDescription`, `emotionalDescription`, `curatorConnection`, `voiceNote`, `practicalNotes`
- recommendation taxonomy fields: `emotionalTone`, `readingState`, `pacing`, `emotionalEffects`, `readingEnergy`, `lengthCategory`, `atmosphere`
- affiliate request scaffold: `affiliateRequest`

This guide covers only the approved metadata fields.

## Approved Metadata Fields

The approved operational metadata fields are:

- `title`
- `author`
- `originalTitle`
- `isbn13`
- `bokusUrl`
- `genres`
- `firstPublishedYear`

Do not add runtime fields such as `tags`, `themes`, `mood`, `pace`, `literaryWarmth`, or `giftFit` until a future Atlas/recommendation model phase explicitly approves them.

## Field Rules

### `title`

When to use it:

Use the product-facing title shown to readers in Bokhyllan.

Required format:

Plain display string with correct casing, diacritics, and punctuation.

What not to do:

- Do not append edition labels unless the title itself requires it.
- Do not include subtitles unless Bokhyllan intentionally displays them.
- Do not use retailer-specific title formatting.

Safe usage:

```ts
title: "Sommarboken",
```

### `author`

When to use it:

Use the author name Bokhyllan should display.

Required format:

Plain display string with correct casing and diacritics.

What not to do:

- Do not add translator, editor, or publisher names here.
- Do not use `"Various"` unless the book is intentionally attributed that way.
- Do not include dates or biographical notes.

Safe usage:

```ts
author: "Tove Jansson",
```

### `originalTitle`

When to use it:

Use this when the runtime `title` is translated, localized, or differs meaningfully from the original title.

Required format:

Plain display string for the verified original title.

What not to do:

- Do not duplicate `title` just to fill the field.
- Do not add guessed original titles.
- Do not add alternate titles unless the intended original title is clear.

Safe usage:

```ts
originalTitle: "A Gentleman in Moscow",
```

### `isbn13`

When to use it:

Use this only after manually verifying the intended edition.

Required format:

Prefer 13 digits without spaces or hyphens:

```ts
isbn13: "9780312424404",
```

The validator accepts hyphens and spaces for shape checking, but source data should stay compact and consistent.

What not to do:

- Do not invent ISBNs.
- Do not convert ISBN10 from memory.
- Do not use an ISBN for the wrong language, edition, or collected volume unless that edition is intentionally selected.
- Do not add an ISBN just because the title and author match somewhere.

Safe usage:

```ts
isbn13: "9781590171998",
```

### `bokusUrl`

When to use it:

Use this only if Bokhyllan decides to store clean manually verified Bokus URLs per book rather than deriving destinations from ISBN inside the affiliate boundary.

Required format:

A clean Bokus product URL with no affiliate tracking parameters.

What not to do:

- Do not paste Tradedoubler links.
- Do not paste URLs with publisher IDs, campaign IDs, click IDs, or tracking parameters.
- Do not paste search result URLs as if they were verified product URLs.
- Do not expose affiliate mechanics to UI components.

Safe usage:

```ts
bokusUrl: "https://www.bokus.com/bok/9780312424404/gilead/",
```

Only add a URL like this after manual verification. If unsure, leave it blank and let the affiliate boundary derive a destination later.

### `genres`

When to use it:

Use broad operational genres for validation, grouping, and future corpus audits.

Required format:

An array of stable lowercase keys in English, using snake case.

Recommended vocabulary for now:

- `literary_fiction`
- `poetry`
- `classic`
- `historical_fiction`
- `speculative_fiction`

What not to do:

- Do not use retailer categories directly.
- Do not mix Swedish and English keys randomly.
- Do not add micro-genres such as `quiet_nordic_forest_murder`.
- Do not use mood words already covered by Bokhyllan taxonomy.
- Do not turn genres into recommendation copy.

Safe usage:

```ts
genres: ["literary_fiction"],
```

### `firstPublishedYear`

When to use it:

Use this when the first publication year is confidently known and useful for metadata review.

Required format:

A four-digit number.

What not to do:

- Do not use the publication year of a random edition unless that is intentionally what is being tracked.
- Do not add a year from memory if there is uncertainty.
- Do not add translation publication year unless the team explicitly decides that is the field meaning.

Safe usage:

```ts
firstPublishedYear: 1972,
```

## Metadata Principles

- Do not invent ISBNs.
- Do not paste unverified affiliate links.
- Keep genres broad, stable, and operational.
- Avoid semantic overfitting.
- Leave uncertain fields blank.
- Keep recommendation copy in curation fields, not metadata fields.
- Keep affiliate activation behind `lib/affiliate`.
- Never store publisher IDs, tracking parameters, secrets, or Tradedoubler URLs in book data.

## Manual Verification Checklist

Before adding a new book:

- Title checked.
- Author checked.
- Original title checked if translated or localized.
- First publication year checked if available.
- ISBN13 manually verified against the intended edition.
- Bokus URL manually verified if added.
- Bokus URL is clean and contains no tracking parameters.
- Genre uses the approved stable vocabulary.
- No tags, themes, mood, pace, literary warmth, or gift fit fields were added.
- Recommendation copy stays in the existing curation fields.
- `npm.cmd run lint` passes.
- `npm.cmd run build` passes.

## Common Mistakes

### Adding Marketing Categories As Genres

Avoid categories like `bestseller`, `feelgood`, `staff_pick`, or retailer shelf names. Genres are for operational grouping, not promotion.

### Mixing Genre Key Languages

Avoid mixing values such as `roman`, `poetry`, `klassiker`, and `literary_fiction`. Use stable English snake-case keys.

### Storing Recommendation Copy In Metadata

Do not put emotional recommendation language into `genres`, `originalTitle`, `isbn13`, `bokusUrl`, or `firstPublishedYear`.

### Adding Tracking URLs Directly To Books

Do not store affiliate URLs, Tradedoubler links, campaign links, or URLs with click parameters in `books.ts`.

### Filling Fields To Silence Warnings

Validation warnings are useful. Do not silence them with guessed ISBNs, placeholder URLs, or vague metadata.

## Acceptance Criteria For A New Book Entry

A new runtime book entry is acceptable when:

- Required runtime fields are complete.
- `title` and `author` are correct.
- `genres` contains at least one approved broad genre.
- `isbn13` is present only if manually verified.
- `bokusUrl` is absent unless clean and manually verified.
- `firstPublishedYear` is present only if confidently verified.
- `originalTitle` is present only when useful and verified.
- No unapproved metadata fields are added.
- No affiliate tracking data is committed.
- Recommendation behavior remains unchanged unless the phase explicitly changes it.
- Lint and build pass.

## Recommended Next Phase

Recommended next phase: **Phase C23 - Core Library Dataset Specification**.

That phase should define the shape and acceptance criteria for a larger core dataset before importing or authoring many more books.
