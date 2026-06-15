# Metadata Provider Boundary

The metadata provider boundary defines how Bokhyllan looks up recoverable book facts during library import. It is intentionally separate from curation, recommendation, affiliate links, and payments.

## Purpose

Metadata providers return basic bibliographic facts such as title, author, ISBN-13, publisher, publication year, description, and cover image URL. These facts support the import pipeline, but they are not Bokhyllan's curator voice and they do not decide whether a book belongs in the library.

The current default provider is `mockMetadataProvider`. It returns safe local placeholder records and performs no network calls.

## Architecture

All providers implement the same `MetadataProvider` contract:

```ts
lookup(request: MetadataLookupRequest): Promise<MetadataLookupResult | undefined>
```

Import pipeline code should call `resolveMetadata()` rather than a provider-specific function. That keeps the pipeline independent of whether metadata later comes from Google Books, Open Library, or another source.

Provider stubs live in:

```text
lib/library-import/metadata-provider/
```

The UI, recommendation resolver, curator voice, affiliate boundary, and payment boundary should not depend on metadata providers.

## Future Providers

Google Books support can be added later by replacing the stubbed `googleBooksProvider` with a real adapter behind the same contract.

Open Library support can be added the same way, either as a fallback provider or as a corroborating source for editions and ISBNs.

Future provider code must keep API keys, credentials, and protected configuration out of public code. If a provider ever requires secrets, it should run only in server-side import tooling.

## Manual Review

Provider results are scaffolding, not approval. Metadata can identify a book and reduce manual lookup work, but a curator still reviews the record before publication.

Descriptions from external sources must not become Bokhyllan voice. Human review remains responsible for emotional descriptions, taxonomy, curator connection, and the final decision to publish.
