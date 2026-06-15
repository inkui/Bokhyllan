# Book Import Template Guide

## Purpose

The book import templates provide a standard shape for future Bokhyllan book candidates before they are reviewed, enriched, or added to the runtime corpus.

They are templates only. They do not import books, modify runtime data, call external services, or change recommendation behavior.

## Template File Locations

Canonical blank template:

```text
data/library/templates/book-template.json
```

Fictional example template:

```text
data/library/templates/book-template-example.json
```

The example file uses placeholder values only. It is not a real book and should not be copied into the runtime corpus as data.

## Template Structure

The template contains only approved metadata fields:

```json
{
  "id": "",
  "title": "",
  "author": "",
  "originalTitle": "",
  "language": "",
  "firstPublishedYear": null,
  "isbn13": "",
  "bokusUrl": "",
  "genres": []
}
```

## Required Fields

Required before a candidate can move toward runtime review:

- `id`
- `title`
- `author`
- `language`
- `genres`

`genres` should contain at least one broad stable key before validation review.

## Optional Fields

Optional fields should remain blank unless manually verified:

- `originalTitle`
- `firstPublishedYear`
- `isbn13`
- `bokusUrl`

Blank optional fields are better than guessed metadata.

## Validation Expectations

The template aligns with the C1 library foundation and C2 validation direction:

- `title`, `author`, `language`, `genres`, and later mapped workflow fields are expected for foundation validation.
- `isbn13` should contain 13 digits after removing hyphens and spaces.
- `genres` should not be empty when a candidate is ready for review.
- Missing `isbn13` and `bokusUrl` will remain an affiliate metadata warning until manually resolved.

No validation or import logic is implemented by this template phase.

## Metadata Verification Rules

- Do not invent ISBNs.
- Do not add ISBN13 unless the intended edition has been manually verified.
- Do not add tracking URLs.
- Do not add Tradedoubler links, publisher IDs, campaign IDs, click IDs, or secrets.
- Do not use marketing categories as genres.
- Leave uncertain values blank.
- Manually verify affiliate metadata before entry.
- Prefer clean source metadata over convenience.

## Common Mistakes

### Copying Example Data

Do not copy `book-template-example.json` into production data. Its values are fictional placeholders.

### Treating Blank Fields As Errors Too Early

Blank optional fields are acceptable during candidate collection. They become review items later.

### Adding Retailer Categories As Genres

Use broad operational keys such as `literary_fiction`, `poetry`, `classic`, `historical_fiction`, or `speculative_fiction`.

### Adding Recommendation Copy To Metadata

Do not put curator voice, emotional descriptions, or recommendation notes into the import template.

### Storing Affiliate Links Too Early

Do not add Bokus URLs until the URL is clean, manually verified, and free of tracking parameters.

## Import Readiness Checklist

Before a candidate is ready for import/review:

- `id` is stable, lowercase, and URL-safe.
- `title` is checked.
- `author` is checked.
- `originalTitle` is checked if relevant.
- `language` is set to a supported foundation language value.
- `firstPublishedYear` is verified or left `null`.
- `isbn13` is manually verified or left blank.
- `bokusUrl` is clean and manually verified or left blank.
- `genres` uses broad stable keys.
- No tracking URLs, secrets, or affiliate parameters are present.
- No unapproved semantic fields have been added.

## Future Compatibility

### C1 Library Foundation

The template mirrors the operational metadata fields that map cleanly toward `lib/library/Book`: identity, language, publication year, ISBN13, Bokus URL, and genres.

### Validation System

The template prepares candidates for `validateLibraryBooks(...)` by making required metadata explicit and leaving unresolved affiliate metadata visible as warnings rather than hiding it.

### Enrichment Pipeline

The template stops before curation. Future enrichment drafts can add reader needs, emotional effects, recommendation angles, and curator voice after metadata review.

### Core 100 / 500 / 1000 Datasets

The same template can be used for Core 100, Core 500, and Core 1000 candidates. Higher tiers should increase process maturity and metadata coverage, not loosen data quality.

## Not Implemented In This Phase

This phase does not:

- import JSON into runtime books
- modify `books.ts`
- add scripts
- add external metadata providers
- call Google Books or Open Library
- call AI services
- activate affiliate links
- change recommendation behavior
