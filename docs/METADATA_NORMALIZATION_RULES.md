# Metadata Normalization Rules

## Purpose

This document defines normalization rules for Bokhyllan metadata so future book, genre, theme, mood, tag, and affiliate data stays consistent as the corpus grows.

It is documentation only. It does not change runtime types, book data, UI, routing, scripts, or external integrations.

## Key Naming Rules

Metadata keys should be stable machine-readable identifiers.

Rules:

- Use lowercase.
- Use `snake_case`.
- Use ASCII characters.
- Use no spaces.
- Use no punctuation except underscores.
- Do not mix Swedish and English in keys.
- Prefer stable keys over pretty labels.
- Do not rename keys casually once used in data.

Good:

```text
literary_fiction
moral_choice
firstPublishedYear
isbn13
```

Bad:

```text
Literary Fiction
litterar_fiktion
moral-choice
Moral choice
feelgood
```

Note: object field names such as `firstPublishedYear` and `originalTitle` follow the existing TypeScript style. Taxonomy values inside arrays should use lowercase `snake_case`.

## Display Label Rules

User-facing Swedish labels and copy should be separate from metadata keys.

Metadata:

```ts
genres: ["literary_fiction"]
```

Display label, if needed later:

```text
Litterär fiktion
```

Do not store translated display labels as taxonomy keys. This keeps runtime data stable while allowing Swedish UI copy to change later.

## Field Normalization Rules

### `id`

Use a stable URL-safe identifier.

Rules:

- lowercase
- ASCII
- hyphen-separated
- no spaces
- no diacritics
- no edition suffix unless required to disambiguate

Good:

```ts
id: "aterstoden-av-dagen"
```

Bad:

```ts
id: "Återstoden av dagen"
id: "aterstoden_av_dagen"
id: "aterstoden-av-dagen-2024-paperback"
```

### `title`

Use the product-facing display title.

Rules:

- preserve correct casing
- preserve diacritics
- use the title Bokhyllan should show to readers
- do not append retailer or edition metadata

Good:

```ts
title: "Sommarboken"
```

Bad:

```ts
title: "Sommarboken (Pocket)"
title: "SOMMARBOKEN"
```

### `author`

Use the author display name.

Rules:

- preserve correct casing
- preserve diacritics
- do not add translator, editor, or publisher
- do not add dates or biographical notes

Good:

```ts
author: "Tove Jansson"
```

Bad:

```ts
author: "Tove Jansson, translated by Example Translator"
```

### `originalTitle`

Use when the runtime title is translated, localized, or differs meaningfully from the original.

Rules:

- display string, not a key
- preserve original casing and punctuation
- leave blank if uncertain
- do not duplicate `title` just to fill the field

Good:

```ts
originalTitle: "A Gentleman in Moscow"
```

Bad:

```ts
originalTitle: "En gentleman i Moskva"
```

### `language`

Use a supported foundation language value.

Current foundation values:

```text
sv, en, no, da, fi, fr, de, es, other
```

Rules:

- use ISO-like lowercase keys where available
- use `other` only when no supported key exists
- do not store full display labels such as `Swedish` or `Svenska`

Good:

```json
"language": "sv"
```

Bad:

```json
"language": "Svenska"
```

### `firstPublishedYear`

Use the verified first publication year when confidently known.

Rules:

- four-digit number
- use `null` in templates when unknown
- omit in runtime data when unknown
- do not use a random edition year unless that is explicitly the field meaning

Good:

```ts
firstPublishedYear: 1972
```

Bad:

```ts
firstPublishedYear: "1972"
firstPublishedYear: 2024
```

### `isbn13`

Use manually verified ISBN13 for the intended edition.

Rules:

- prefer 13 digits with no spaces or hyphens
- leave blank if uncertain
- do not invent or convert from memory
- do not use an ISBN for the wrong edition or language unless intentionally selected

Good:

```ts
isbn13: "9780312424404"
```

Bad:

```ts
isbn13: "031242440X"
isbn13: "unknown"
```

### `bokusUrl`

Use only clean manually verified Bokus URLs if Bokhyllan decides to store URLs per book.

Rules:

- no tracking parameters
- no affiliate IDs
- no Tradedoubler links
- no campaign parameters
- leave blank if unsure
- provider logic belongs in `lib/affiliate`

Good:

```ts
bokusUrl: "https://www.bokus.com/bok/9780312424404/gilead/"
```

Bad:

```ts
bokusUrl: "https://clk.tradedoubler.com/click?p=..."
bokusUrl: "https://www.bokus.com/bok/9780312424404/gilead/?utm_source=..."
```

### `genres`

Use approved genre keys from `docs/GENRE_TAXONOMY_V1.md`.

Rules:

- array of lowercase `snake_case` keys
- first value is the primary genre
- prefer 1 genre
- use 2 only when useful
- avoid empty arrays when preparing data for foundation validation

Good:

```ts
genres: ["literary_fiction"]
```

Bad:

```ts
genres: ["Litterär roman", "feelgood", "award_winner"]
```

### Future `themes`

Use approved theme keys from `docs/THEME_TAXONOMY_V1.md` when themes become runtime or import-pipeline data.

Rules:

- array of lowercase `snake_case` keys
- prefer 2-4 central themes
- do not list incidental topics
- do not write plot summaries

Good:

```ts
themes: ["grief", "memory", "responsibility"]
```

Bad:

```ts
themes: ["sad family story where someone remembers childhood"]
```

### Future `moods`

Use approved mood keys from `docs/MOOD_TAXONOMY_V1.md` when mood metadata becomes runtime or import-pipeline data.

Rules:

- array of lowercase `snake_case` keys if multiple moods are supported
- use a single approved key if the model expects one mood
- first value is primary if stored as an array
- avoid mood stuffing

Good:

```ts
mood: "melancholic"
moods: ["quiet", "tender"]
```

Bad:

```ts
moods: ["sad", "beautiful", "award_winning"]
```

### Future `tags`

Tags should be future operational descriptors, not a substitute for genre, theme, or mood.

Possible future tag areas:

- form
- reading accessibility
- length/use case
- structural texture
- audience context

Rules:

- lowercase `snake_case`
- controlled enough to audit
- do not duplicate genre/theme/mood
- do not use as marketing copy

Good:

```ts
tags: ["short_read", "low_energy_friendly"]
```

Bad:

```ts
tags: ["must_read", "perfect_gift", "beautiful"]
```

## Array Rules

Arrays should be deterministic and reviewable.

Rules:

- no duplicates
- deterministic order
- primary value first
- broad-to-specific where useful
- avoid empty arrays when field is required by foundation validation
- do not use arrays to store prose

Good:

```ts
genres: ["literary_fiction", "historical_fiction"]
themes: ["memory", "place", "responsibility"]
```

Bad:

```ts
genres: ["literary_fiction", "literary_fiction"]
themes: []
```

## URL Rules

URLs in book metadata should be clean source metadata, not affiliate machinery.

Rules:

- no tracking parameters in book data
- no affiliate IDs in raw book metadata
- no Tradedoubler URLs
- no campaign parameters
- Bokus URLs only when manually verified
- provider logic belongs in the affiliate layer
- UI components should not know provider mechanics

If a URL contains `utm_`, `click`, `campaign`, `publisher`, `partner`, `ref`, or a redirect/tracking host, do not store it in book data.

## Taxonomy Rules

### Genres

Genres are broad categories. They answer: what kind of book is this?

Examples:

```text
literary_fiction
poetry
historical_fiction
```

### Themes

Themes describe what the book explores or helps a reader sit with.

Examples:

```text
grief
memory
family
moral_choice
```

### Moods

Moods describe the emotional atmosphere or reader-facing feel.

Examples:

```text
quiet
tender
melancholic
unsettling
```

### Tags

Tags are future operational descriptors. They may eventually capture form, accessibility, reading use case, or structural qualities.

Tags should not become an uncontrolled dump for anything useful.

## Examples

### Good Metadata

```ts
{
  id: "example-title",
  title: "Example Title",
  author: "Example Author",
  originalTitle: "",
  isbn13: "",
  bokusUrl: "",
  genres: ["literary_fiction"],
  firstPublishedYear: undefined,
}
```

Why it is good:

- stable `id`
- clean display strings
- approved genre key
- uncertain ISBN and URL left blank

### Bad Metadata

```ts
{
  id: "Example Title!",
  title: "Example Title - Bokus edition",
  author: "Example Author, translated by Someone",
  isbn13: "probably 123",
  bokusUrl: "https://clk.tradedoubler.com/click?p=...",
  genres: ["feelgood", "award winner", "roman"],
}
```

Why it is bad:

- unstable `id`
- title includes edition noise
- author includes non-author metadata
- ISBN is guessed
- URL contains affiliate tracking
- genres are uncontrolled labels

## Validation Expectations

Current validation checks include:

- missing required fields
- duplicate IDs
- duplicate ISBN13 values
- duplicate title/author combinations
- malformed ISBN13
- suspicious empty arrays
- missing affiliate metadata

Human review should additionally check:

- taxonomy keys are approved
- keys use normalized casing and separators
- no Swedish/English mixing in keys
- arrays are ordered and deduplicated
- URLs are clean
- uncertain values remain blank

## Recommended Next Phase

Recommended next phase: **Phase C30 - Candidate Book Pipeline Spec**.

That phase should define how candidate books move from proposed metadata into review without being written directly into the runtime corpus.
