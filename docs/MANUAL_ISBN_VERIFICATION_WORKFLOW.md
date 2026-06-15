# Manual ISBN Verification Workflow

## Purpose

This document defines a safe manual workflow for verifying ISBN13 and affiliate metadata before it enters Bokhyllan datasets.

It is documentation only. It does not change book data, runtime types, UI, routing, scripts, external services, affiliate behavior, or recommendation behavior.

The workflow exists so future corpus expansion can add metadata without guessing, leaking tracking details, or confusing editions.

## Why ISBN Verification Matters

### Edition Ambiguity

ISBN13 identifies a specific edition or format, not just a title and author. Translations, paperbacks, hardbacks, collected editions, reprints, and market-specific editions may all have different ISBNs.

Bokhyllan should not add an ISBN simply because it appears near the right title. The verifier must confirm that the ISBN belongs to the intended edition for the dataset.

### Affiliate Accuracy

Future affiliate routing may use ISBN13 to create retailer destinations. A wrong ISBN can point readers to the wrong language, format, edition, or unavailable product.

ISBN verification must happen before affiliate metadata is approved.

### Recommendation Integrity

Bokhyllan's recommendations depend on trust. Incorrect edition metadata can weaken curation notes, gift suitability, translation context, and future enrichment work.

Metadata should support the quiet recommendation experience, not turn the dataset into uncertain retailer data.

### Duplicate Prevention

Verified ISBN13 values help detect duplicate editions and accidental repeated entries. Duplicate title and author checks are useful, but ISBN review is needed when editions differ or translated titles create ambiguity.

## Verification Workflow

### 1. Candidate Identified

Start with a candidate outside the runtime corpus.

Required before moving on:

- candidate has a working `title`
- candidate has a working `author`
- candidate has a reason to belong in Bokhyllan
- candidate is not already an obvious duplicate

Do not add ISBN13 or affiliate metadata at this stage.

### 2. Title Verified

Confirm the reader-facing title that Bokhyllan should store.

Check:

- correct spelling
- correct casing
- correct diacritics
- no retailer suffixes
- no format labels unless they are part of the title

If the title is translated or localized, record original-title review as a separate metadata task.

### 3. Author Verified

Confirm the author display name.

Check:

- correct spelling
- correct casing
- correct diacritics
- no translator, editor, publisher, dates, or biographical notes in `author`

If attribution is ambiguous, pause ISBN verification until the intended work is clear.

### 4. Edition Verified

Decide which edition the dataset intends to represent.

Check:

- language
- translation or original edition
- format if relevant
- collected edition vs single work
- market relevance for Bokhyllan
- whether the ISBN belongs to the same title/author combination

If edition choice is unclear, leave `isbn13` blank and mark the candidate for metadata review.

### 5. ISBN13 Verified

Verify the ISBN13 against the intended edition.

Rules:

- use ISBN13, not ISBN10
- prefer 13 digits with no spaces or hyphens in source data
- confirm the ISBN belongs to the intended edition
- confirm title and author match the candidate
- confirm language and format are acceptable for the dataset
- do not convert from memory
- do not guess missing digits
- do not use an ISBN just because it appears in search results or secondary notes

If there are conflicting ISBNs, do not choose one casually. Pause for review.

### 6. Metadata Reviewed

Review the verified ISBN with the rest of the candidate metadata.

Check:

- `title` is verified
- `author` is verified
- `originalTitle` is verified if used
- `firstPublishedYear` is verified if used
- `genres` use approved stable keys
- `isbn13` contains 13 digits after removing hyphens and spaces
- no metadata field contains recommendation copy
- no metadata field contains tracking data

Warnings are acceptable only when deliberately deferred.

### 7. Approved For Entry

The ISBN13 can enter a dataset only after metadata review accepts it.

Approval means:

- the edition is understood
- the ISBN13 is manually verified
- the value is clean source metadata
- any unresolved uncertainty is documented outside runtime book data

If approved, store only the clean ISBN13 value. Do not store source notes, URLs, provider parameters, or review comments inside the book record.

## Acceptable Evidence Sources

Acceptable evidence should be generic and process-oriented. Bokhyllan should avoid hardcoding one vendor as the only truth source.

Good evidence characteristics:

- authoritative bibliographic or publisher context
- clear title and author match
- clear edition or format context
- clear language or translation context when relevant
- stable product or catalog metadata
- enough detail to distinguish collected editions from individual works

Acceptable source categories may include:

- publisher catalog information
- library catalog records
- national bibliography or ISBN registry context
- retailer product pages used only as metadata evidence
- physical book colophon or back-cover ISBN
- existing verified local project data

Do not treat affiliate links, tracking links, search snippets, AI output, or unverified notes as sufficient evidence.

## Rejection Conditions

Reject or pause ISBN entry when:

- multiple conflicting ISBN13 values appear for the same candidate
- the intended edition is unclear
- title, author, language, or format does not match the candidate
- the source cannot be verified
- only ISBN10 is available and no verified ISBN13 is confirmed
- the ISBN appears to belong to a collected edition when the candidate is a single work
- the ISBN appears to belong to the wrong translation or language
- the metadata source is a redirect, tracking link, or affiliate URL
- reviewer confidence is too low

Use the import error taxonomy language where useful:

- `approval_metadata_uncertain`
- `approval_duplicate_candidate`
- `affiliate_unverified_bokus_url`
- `affiliate_tracking_url`
- `affiliate_id_in_metadata`
- `affiliate_secret_detected`

Blocking affiliate or metadata uncertainty should stop approval until resolved.

## Affiliate Metadata Relationship

ISBN verification comes before affiliate metadata.

Rules:

- Do not add affiliate metadata before title, author, edition, and ISBN review.
- Do not guess affiliate metadata.
- Do not add Bokus URLs unless they are clean and manually verified.
- Do not add Tradedoubler links to book data.
- Do not add publisher IDs, campaign IDs, click IDs, partner IDs, secrets, or tracking parameters.
- Do not store redirect URLs as raw metadata.
- Do not store full affiliate URLs in `books.ts`.
- Provider-specific behavior belongs in the affiliate boundary, not in book records.

Raw book metadata may contain:

- clean `isbn13`
- clean manually verified `bokusUrl` only if the project chooses stored retailer URLs

Raw book metadata must not contain:

- `utm_` parameters
- click or redirect URLs
- affiliate IDs
- Tradedoubler URLs
- campaign metadata
- private credentials

## Audit Trail Expectations

The runtime book record should stay clean. Review notes should live outside runtime book data until a dedicated audit structure exists.

An audit trail should record:

- candidate ID or book ID
- verifier or review owner if the team uses owners
- verification status
- edition decision
- whether ISBN13 was approved, rejected, or deferred
- whether affiliate metadata was approved, rejected, or deferred
- reason for any deferral or rejection
- source category, not necessarily full source URL

Audit records should not store:

- secrets
- affiliate IDs
- tracking URLs
- raw personal data
- unnecessary full URLs
- free-form recommendation copy

## Common Mistakes

### Adding ISBNs To Silence Warnings

Validation warnings are useful. Do not add guessed ISBN13 values just to reduce `missing_affiliate_metadata`.

### Treating Title Match As Edition Match

The same title and author can have multiple ISBNs. Confirm edition, language, format, and collected-work context.

### Copying Retailer URLs Too Early

A product page can help with manual verification, but raw book metadata should not receive retailer URLs unless the URL is clean and the project has chosen to store it.

### Storing Tracking Links

Tracking URLs, redirect URLs, campaign URLs, Tradedoubler links, and URLs with affiliate parameters do not belong in book data.

### Confusing ISBN10 And ISBN13

Use ISBN13 only. Do not convert from memory or infer missing values.

### Duplicating Original Title

Do not fill `originalTitle` with the same value as `title` just to make metadata feel complete.

### Storing Review Notes In Book Metadata

Edition uncertainty, source notes, and reviewer comments should stay outside runtime book records until a dedicated audit model exists.

## Acceptance Criteria

An ISBN13 is acceptable for Bokhyllan data when:

- title is verified
- author is verified
- intended edition is clear
- ISBN13 is manually verified for that edition
- ISBN13 contains 13 digits after removing hyphens and spaces
- language and format are acceptable for the dataset
- no conflicting ISBN remains unresolved
- no tracking URL or affiliate parameter was copied into metadata
- uncertainty is either resolved or the field is left blank

Affiliate metadata is acceptable only when:

- ISBN or edition review has happened first
- URL, if stored, is clean and manually verified
- no affiliate IDs, provider IDs, campaign IDs, tracking parameters, secrets, or redirect hosts are present
- provider-specific behavior remains in the affiliate layer

## Recommended Next Phase

Recommended next phase: **Phase C34 - Affiliate Enablement Plan**.

That phase should define what must be true before Bokhyllan can safely enable real affiliate destinations, without adding tracking or real provider implementation prematurely.
