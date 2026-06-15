# Library Import Pipeline

Bokhyllan's import pipeline is the operational path from a possible book to a reviewed curated book.

```text
Candidate -> Metadata -> Enrichment -> Review -> Publish
```

This phase is scaffolding only. There are no external API calls, no AI calls, no automation, and no live affiliate behavior.

## Models

- `BookCandidate` represents a book before curation commitment. It stores title, author, ISBN, source, creation time, and optional notes.
- `BookMetadata` represents recoverable bibliographic data such as publication year, cover image, page count, language, and description.
- `BookEnrichmentDraft` represents curator judgment before approval. It uses the existing Book Atlas taxonomy: reading state, reading energy, emotional tone, atmosphere, emotional effects, and pacing. Voice fields are optional until review.
- `ReviewStatus` makes the workflow explicit: `candidate`, `metadata_ready`, `enrichment_ready`, `approved`, `published`.
- `LibraryImportRecord` carries one book through the workflow without changing the live recommendation library.

## Mappers

The mapper functions live in `lib/library-import/publish/pipelineMappers.ts`.

- `createMetadataFromCandidate` maps Candidate to Metadata with optional mock overrides.
- `createEnrichmentDraftFromMetadata` maps Metadata to an enrichment draft with safe placeholder taxonomy values.
- `createCuratedBookFromEnrichmentDraft` maps an approved draft to the current `Book` shape.
- Record helpers move an import record through candidate, metadata, enrichment, approval, and publish states.

Placeholders are intentionally plain. Curator voice fields that are not ready are marked as pending review.

## Mock Seed

`lib/library-import/mockSeed.ts` contains mock examples for:

- Gilead
- Stoner
- A Gentleman in Moscow
- Piranesi

The seed demonstrates the full pipeline but does not publish anything into `data/library/books/books.ts`.

## Future Integrations

Extension points live in `lib/library-import/integrations`.

- `MetadataProvider` is the shared contract for bibliographic metadata providers.
- `googleBooksProvider` is a no-op placeholder for a future Google Books integration.
- `openLibraryProvider` is a no-op placeholder for a future Open Library integration.
- `EnrichmentProvider` and `aiEnrichmentProvider` reserve the shape of future enrichment support without making model calls.

Future implementations must keep API keys, credentials, request signing, and provider-specific behavior out of public UI and committed code.

## Boundaries

This pipeline must not alter the recommendation engine, reveal system, curator voice rules, affiliate boundary, or payment boundary. Publish should remain an explicit human decision.
