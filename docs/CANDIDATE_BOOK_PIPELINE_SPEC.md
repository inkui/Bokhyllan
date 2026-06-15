# Candidate Book Pipeline Spec

## Purpose

This document defines how candidate books should move from idea to approved Bokhyllan core-library entry.

It is documentation only. It does not change book data, runtime types, UI, routing, scripts, enrichment behavior, affiliate behavior, or external integrations.

The pipeline exists to keep corpus growth controlled before Bokhyllan moves from the current seed corpus toward 50, 100, 500, and 1000 books.

## Pipeline Stages

The candidate pipeline uses these stages:

1. `candidate`
2. `metadata_verified`
3. `taxonomy_reviewed`
4. `enrichment_pending`
5. `enriched`
6. `editorial_review`
7. `approved`
8. `rejected`

The stages are intentionally stricter than the current runtime corpus. They describe the desired authoring workflow for future imports, not current UI behavior.

## Stage Definitions

### `candidate`

Meaning: A book has been proposed for Bokhyllan but has not been verified.

Entry criteria:

- A candidate has a working title and author.
- The book appears potentially relevant to the core-library selection principles.
- The candidate has not yet been written into the runtime corpus.

Exit criteria:

- Required metadata is manually checked enough to move to `metadata_verified`.
- Or the candidate is rejected because it is out of scope, duplicated, or too uncertain.

Allowed fields:

- `id`
- `title`
- `author`
- `notes` in a candidate-only workspace
- source or provenance notes if kept outside runtime book data

Forbidden actions:

- Do not add guessed ISBNs.
- Do not add affiliate or tracking URLs.
- Do not write the candidate directly into `data/library/books/books.ts`.
- Do not create recommendation copy.

Review owner/type: Corpus editor or data reviewer.

### `metadata_verified`

Meaning: Basic bibliographic metadata has been checked manually.

Entry criteria:

- `title` is confirmed.
- `author` is confirmed.
- `language` is selected.
- `firstPublishedYear` is included only if confidently verified.
- `originalTitle` is included only if relevant and verified.
- `isbn13` is included only if manually verified for the intended edition.
- `bokusUrl` is included only if manually verified and clean.

Exit criteria:

- Metadata follows the authoring guide and normalization rules.
- Required fields are present for the template or deliberately left blank when optional.
- The candidate is ready for taxonomy review.

Allowed fields:

- `id`
- `title`
- `author`
- `originalTitle`
- `language`
- `firstPublishedYear`
- `isbn13`
- `bokusUrl`
- `genres` as a draft taxonomy field

Forbidden actions:

- Do not add Tradedoubler URLs.
- Do not add tracking parameters.
- Do not use bookstore marketing categories as metadata.
- Do not add themes, moods, or tags before the relevant taxonomy review exists for the import batch.

Review owner/type: Metadata reviewer.

### `taxonomy_reviewed`

Meaning: The book has approved controlled vocabulary assignments.

Entry criteria:

- Metadata is already verified.
- Genre keys are selected from `docs/GENRE_TAXONOMY_V1.md`.
- Future theme keys, mood keys, and tags are selected only if those fields are part of the active import model.

Exit criteria:

- Genres are broad, stable, ordered, and not overstuffed.
- Future themes describe what the book explores rather than plot summary.
- Future moods describe reader-facing atmosphere rather than quality judgment.
- Future tags are operational descriptors, not recommendation copy.

Allowed fields:

- Approved metadata fields from `metadata_verified`
- `genres`
- Future `themes`
- Future `mood` or `moods`
- Future `tags`

Forbidden actions:

- Do not invent new taxonomy keys during data entry.
- Do not mix Swedish display labels with metadata keys.
- Do not use deprecated genre patterns such as `feelgood`, `bestseller`, `award_winner`, `novel`, or `literary`.
- Do not use taxonomy fields as marketing copy.

Review owner/type: Taxonomy reviewer.

### `enrichment_pending`

Meaning: The book is ready for enrichment drafting but has not received enrichment content yet.

Entry criteria:

- Metadata has been verified.
- Taxonomy fields have been reviewed.
- The book is eligible for an `EnrichmentDraft`.

Exit criteria:

- A draft is created with `createPendingEnrichmentDraft`.
- The draft has status `pending`.
- The draft is connected to the book by `bookId`.

Allowed fields:

- Existing verified book fields
- `EnrichmentDraft` fields with empty `recommendationAngles`, `readerNeeds`, and `giftUseCases`
- `source` values such as `manual`, `import_pipeline`, `curator_review`, or future `future_ai`

Forbidden actions:

- Do not call AI services.
- Do not generate curator voice.
- Do not publish draft content directly.
- Do not treat pending enrichment as approved recommendation copy.

Review owner/type: Enrichment coordinator or import pipeline reviewer.

### `enriched`

Meaning: An enrichment draft exists and contains draft enrichment content.

Entry criteria:

- A connected `EnrichmentDraft` exists.
- Draft content has been added manually or by a future approved process.
- The draft can be marked `enriched` without mutating the source book record.

Exit criteria:

- Draft enrichment is ready for editorial review.
- Any uncertainty is recorded as warnings or review notes.

Allowed fields:

- `summary`
- `recommendationAngles`
- `readerNeeds`
- `giftUseCases`
- `warnings`
- Draft status `enriched`

Forbidden actions:

- Do not publish directly from enrichment.
- Do not store raw personal data.
- Do not store raw reader answers.
- Do not store final Bokhyllan voice as unreviewed generated copy.

Review owner/type: Enrichment reviewer.

### `editorial_review`

Meaning: Metadata, taxonomy, and enrichment are being checked together before approval.

Entry criteria:

- The book has passed metadata and taxonomy review.
- A draft enrichment exists if enrichment is required for the target corpus tier.
- Validation issues are known and either fixed or explicitly accepted.

Exit criteria:

- The book is approved for the target corpus tier.
- Or the book is returned to an earlier stage for corrections.
- Or the book is rejected.

Allowed fields:

- All verified metadata fields
- Reviewed taxonomy fields
- Reviewed enrichment draft fields
- Editorial notes outside runtime book data

Forbidden actions:

- Do not change UI copy or recommendation behavior as part of review.
- Do not add tracking URLs to book data.
- Do not accept uncertain ISBN or affiliate metadata.
- Do not approve books only because they are famous.

Review owner/type: Editorial reviewer.

### `approved`

Meaning: The book is ready to enter the core library for the selected dataset tier.

Entry criteria:

- Required metadata is verified.
- Taxonomy assignments are approved.
- Required enrichment is reviewed or explicitly deferred.
- The book passes validation expectations for the target tier.
- Any affiliate metadata is clean and safe.

Exit criteria:

- The book can be added to the relevant data file or future import payload.
- The book remains eligible for later enrichment, affiliate, or Atlas v2 upgrades.

Allowed fields:

- Approved runtime fields.
- Approved foundation fields if used by the import path.
- Clean optional metadata only when manually verified.

Forbidden actions:

- Do not add unreviewed generated text.
- Do not add secrets.
- Do not add affiliate IDs.
- Do not add production tracking URLs.

Review owner/type: Final corpus approval.

### `rejected`

Meaning: The candidate should not continue through the import pipeline in its current form.

Entry criteria:

- Metadata confidence is too low.
- The book duplicates an existing book or edition without a clear reason.
- The book is out of scope for Bokhyllan.
- The book is too dependent on a short-lived trend.
- Affiliate or edition uncertainty is unsafe for the current data policy.

Exit criteria:

- Rejection reason is recorded outside runtime book data.
- The candidate can be reconsidered later only with new verified information.

Allowed fields:

- Candidate identifier
- Rejection reason
- Review note

Forbidden actions:

- Do not partially add rejected candidates to the runtime corpus.
- Do not keep uncertain metadata as if it were verified.
- Do not use rejected candidates to train future recommendation behavior without a separate policy.

Review owner/type: Corpus editor or editorial reviewer.

## Metadata Verification Requirements

### `title`

Use the reader-facing display title. Preserve casing and diacritics. Do not include edition, retailer, format, or campaign text.

### `author`

Use the author display name only. Do not include translator, editor, publisher, dates, or biographical notes.

### `originalTitle`

Use only when the displayed title is translated, localized, or meaningfully different from the original. Leave blank when uncertain. Do not duplicate `title` just to fill the field.

### `firstPublishedYear`

Use a four-digit number only when confidently verified. Do not use a random edition year unless that field is explicitly redefined in a later model.

### `isbn13`

Use only a manually verified ISBN13 for the intended edition. Prefer 13 digits without spaces or hyphens. Leave blank if uncertain.

### `bokusUrl`

Use only a manually verified clean Bokus URL if Bokhyllan chooses to store one. Do not store Tradedoubler URLs, affiliate IDs, campaign parameters, `utm_` parameters, redirect links, or provider-specific tracking URLs.

### `genres`

Use approved keys from `docs/GENRE_TAXONOMY_V1.md`. Prefer one primary genre. Use a second genre only when it improves operational matching. Do not use marketing categories.

## Taxonomy Review Requirements

### Genres

Genres answer what kind of book this is. They should remain broad and stable enough to support validation and corpus balance.

Review checks:

- Uses approved genre keys.
- Ordered primary-first.
- No duplicates.
- No genre stuffing.
- No deprecated labels such as `bestseller`, `feelgood`, `award_winner`, or `novel`.

### Future Themes

Themes describe what a book explores, helps with, or circles around. They should come from `docs/THEME_TAXONOMY_V1.md` when themes become part of the import model.

Review checks:

- Uses approved theme keys.
- Captures central themes, not incidental topics.
- Does not become plot summary.
- Does not become recommendation copy.

### Future Moods

Moods describe reader-facing emotional feel or atmosphere. They should come from `docs/MOOD_TAXONOMY_V1.md` when mood data becomes part of the import model.

Review checks:

- Uses approved mood keys.
- Avoids quality judgments.
- Avoids subjective overreach.
- Keeps primary and secondary moods clear.

### Future Tags

Tags should be operational descriptors used only after Bokhyllan defines a controlled tag model.

Review checks:

- Does not duplicate genre, theme, or mood.
- Does not contain marketing copy.
- Does not contain reader personal data.
- Uses normalized lowercase `snake_case` keys.

## Enrichment Relationship

The candidate pipeline is adjacent to the C4 enrichment scaffold but does not automate enrichment.

`EnrichmentDraft` is the draft container for future recommendation-supporting content. It currently supports:

- `status`
- `source`
- `summary`
- `recommendationAngles`
- `readerNeeds`
- `giftUseCases`
- `warnings`

`createPendingEnrichmentDraft` can create a deterministic pending draft connected to a `Book` by `bookId`. In this pipeline, that belongs at the `enrichment_pending` stage after metadata and taxonomy review.

Future AI-assisted enrichment may be introduced later as a source, but it must remain behind explicit review. AI output should never move a candidate directly to `approved`.

Manual editorial review remains the approval gate for enrichment content, curator suitability, taxonomy correctness, and final corpus fit.

## Rejection Rules

Reject or pause candidates when:

- Metadata confidence is insufficient.
- ISBN13 cannot be verified for the intended edition and the book requires edition-specific handling.
- Bokus URL or affiliate metadata is uncertain.
- The candidate duplicates an existing book or edition without a clear reason.
- The book is out of scope for Bokhyllan's controlled core library.
- The book is added only because it is famous.
- The book is too dependent on a short-lived trend.
- The taxonomy fit requires inventing new keys too early.
- The candidate would push the corpus toward one narrow reader persona.

Rejection should be reversible only when new verified information appears.

## Acceptance Criteria For Approved Books

An approved book should meet these criteria:

- `id` is stable, normalized, and unique.
- `title` and `author` are verified display strings.
- `language` is set to a supported value.
- `originalTitle` is included only when useful and verified.
- `firstPublishedYear` is included only when confidently verified.
- `isbn13` is either manually verified or intentionally absent.
- `bokusUrl` is either clean and manually verified or intentionally absent.
- `genres` use approved genre keys.
- Arrays are deduplicated and deterministically ordered.
- No metadata field contains recommendation copy.
- No field contains raw personal data.
- No field contains affiliate IDs, tracking parameters, secrets, or provider-specific tracking URLs.
- Enrichment status and draft status are clear for the target dataset tier.
- Editorial review has accepted the book for Bokhyllan's current corpus goals.

## Future Automation Opportunities

Future automation can support this pipeline, but should not replace review gates.

Possible future automation:

- Candidate intake form validation against the import template.
- Duplicate detection by normalized title and author.
- ISBN13 format validation.
- Clean URL checks for affiliate metadata.
- Taxonomy key validation against controlled vocabularies.
- Batch creation of pending enrichment drafts.
- Import readiness reports grouped by stage.
- AI-assisted enrichment drafts that always remain review-only until approved.

These opportunities are speculative and non-runtime. They should not add external services, network calls, tracking, or UI behavior without a dedicated future phase.

## Recommended Next Phase

Recommended next phase: **Phase C31 - Import Error Taxonomy**.

That phase should define a controlled set of candidate/import error codes so future validation, review, and import tooling can report problems consistently without adding runtime behavior yet.
