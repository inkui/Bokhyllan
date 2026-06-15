# Saved Shelf Bridge Audit

## Summary

The current saved-books runtime flow is separate from the C8 saved-shelf foundation.

Runtime behavior should stay unchanged for now because the existing flow stores user-visible saved book data in `localStorage`. The C8 model is a safer future foundation, but it should be introduced through a compatibility adapter instead of replacing `lib/savedBooks.ts` directly.

## Current Saved-Books Runtime Flow

The current runtime flow is:

1. `components/recommendation/RecommendationActions.tsx`
   - Imports `saveBook(...)` and `isBookSaved(...)` from `lib/savedBooks.ts`.
   - Checks whether the current recommendation is saved after mount.
   - Saves the current recommendation when the user clicks the saved-book action.

2. `lib/savedBooks.ts`
   - Owns the browser `localStorage` persistence contract.
   - Reads, validates, writes, saves, removes, and checks saved books.

3. `app/saved/page.tsx`
   - Renders the saved-books page shell and includes `SavedBooksShelf`.

4. `components/saved/SavedBooksShelf.tsx`
   - Reads saved books from `lib/savedBooks.ts` after mount.
   - Renders the stored books.
   - Calls `removeSavedBook(...)` when the user removes an item.

5. `app/recommend/reveal/page.tsx`
   - Creates the recommendation shown on the reveal page.
   - Does not directly handle saved-book persistence.

## Current localStorage Shape

The storage key is:

```ts
bokhyllan:saved-books
```

The stored value is a JSON array of `SavedBook` objects:

```ts
type SavedBook = {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  emotionalDescriptor: string;
};
```

Invalid stored entries are filtered out by `isSavedBook(...)`. If parsing fails or the stored value is not an array, the runtime returns an empty list.

Removal currently deletes the item from the stored array. There is no persisted removed/dismissed history.

## What C8 Adds

`lib/library/saved-shelf.ts` adds a pure local data foundation:

- `SavedShelfItem`
- `SavedShelfState`
- `SavedShelfItemStatus`
- `SavedShelfSource`
- `saveBookToShelf(...)`
- `removeBookFromShelf(...)`
- `dismissBookFromShelf(...)`
- `getSavedShelfItems(...)`
- `isBookSaved(...)`

The C8 foundation stores item state by `bookId`, supports `saved`, `removed`, and `dismissed` statuses, preserves item history, and keeps helpers pure and deterministic.

## Overlaps And Duplicates

The main overlap is saved-state ownership:

- `lib/savedBooks.ts` owns the current runtime persistence and UI-ready saved-book shape.
- `lib/library/saved-shelf.ts` owns the future domain state model and pure state transitions.

Both expose an `isBookSaved(...)` helper, but they operate on different inputs:

- Runtime: `isBookSaved(bookId)` reads from browser `localStorage`.
- Foundation: `isBookSaved(state, bookId)` checks a passed `SavedShelfState`.

Both support saving and removing, but with different semantics:

- Runtime remove deletes the item.
- Foundation remove changes the item status to `removed`.

## Migration Risks

The main migration risks are:

- Breaking existing saved books by changing the `localStorage` shape without a reader for old data.
- Losing title, author, cover image, or emotional descriptor data that the current saved page renders directly.
- Confusing delete semantics, because runtime removal deletes while C8 removal preserves history.
- Accidentally changing the order of saved books.
- Introducing SSR/browser boundary bugs by moving `localStorage` access into code that can run server-side.

## Privacy Considerations

The current runtime storage is local to the browser and contains book display metadata only:

- book id
- title
- author
- cover image
- emotional descriptor

It does not store email, name, raw recommendation answers, free-text user input, IP address, user agent, or analytics identifiers.

C8 keeps the future shelf model similarly small by storing `bookId`, status, timestamp, optional source, and optional note. Future integrations should avoid storing raw personal context in saved-shelf data.

## Recommended Bridge Strategy

Do not delete `lib/savedBooks.ts` yet.

Recommended future strategy:

1. Keep `lib/savedBooks.ts` as the runtime compatibility boundary.
2. Add internal conversion helpers inside the saved-books boundary:
   - current `SavedBook[]` to a `SavedShelfState`
   - `SavedShelfState` plus runtime recommendation/book lookup back to UI-ready `SavedBook[]`
3. Preserve the existing storage key until a migration reader is in place.
4. Read both old and future shapes during a transition period.
5. Continue returning the same runtime API from `lib/savedBooks.ts` so UI components do not change.
6. Move pure state transitions to C8 helpers only after compatibility is proven.

This makes C8 authoritative for saved-shelf state transitions later without forcing a risky storage migration now.

## Future Integration Acceptance Criteria

A future saved-shelf integration phase should verify:

- Existing saved books still appear after migration.
- The saved page layout, copy, and behavior stay unchanged.
- `RecommendationActions` can still save and detect saved state.
- Removing a saved book still updates the UI immediately.
- Old `bokhyllan:saved-books` arrays are readable.
- New state does not store raw personal answers or direct personal data.
- Browser-only `localStorage` access remains inside client-safe code.
- Lint and build pass.
