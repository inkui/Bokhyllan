export type SavedShelfItemStatus = "saved" | "removed" | "dismissed";

export type SavedShelfSource =
  | "recommendation"
  | "saved_page"
  | "import"
  | "manual"
  | "unknown";

export type SavedShelfItem = {
  bookId: string;
  savedAt: string;
  status: SavedShelfItemStatus;
  source?: SavedShelfSource;
  note?: string;
};

export type SavedShelfState = {
  items: SavedShelfItem[];
  updatedAt?: string;
};

export type SavedShelfUpdateOptions = {
  now?: string;
  source?: SavedShelfSource;
  note?: string;
};

export function saveBookToShelf(
  state: SavedShelfState,
  bookId: string,
  options: SavedShelfUpdateOptions = {},
): SavedShelfState {
  return updateShelfItem(state, bookId, "saved", options);
}

export function removeBookFromShelf(
  state: SavedShelfState,
  bookId: string,
  options: SavedShelfUpdateOptions = {},
): SavedShelfState {
  return updateShelfItem(state, bookId, "removed", options);
}

export function dismissBookFromShelf(
  state: SavedShelfState,
  bookId: string,
  options: SavedShelfUpdateOptions = {},
): SavedShelfState {
  return updateShelfItem(state, bookId, "dismissed", options);
}

export function getSavedShelfItems(state: SavedShelfState): SavedShelfItem[] {
  return state.items
    .filter((item) => item.status === "saved")
    .sort(compareSavedShelfItems);
}

export function isBookSaved(state: SavedShelfState, bookId: string): boolean {
  return state.items.some(
    (item) => item.bookId === bookId && item.status === "saved",
  );
}

function updateShelfItem(
  state: SavedShelfState,
  bookId: string,
  status: SavedShelfItemStatus,
  options: SavedShelfUpdateOptions,
): SavedShelfState {
  const now = options.now ?? new Date().toISOString();
  const existingItem = state.items.find((item) => item.bookId === bookId);
  const nextItem = createNextShelfItem(existingItem, bookId, status, now, options);
  const nextItems = existingItem
    ? state.items.map((item) => (item.bookId === bookId ? nextItem : item))
    : [...state.items, nextItem];

  return {
    items: nextItems,
    updatedAt: now,
  };
}

function createNextShelfItem(
  existingItem: SavedShelfItem | undefined,
  bookId: string,
  status: SavedShelfItemStatus,
  now: string,
  options: SavedShelfUpdateOptions,
): SavedShelfItem {
  if (existingItem?.status === "saved" && status === "saved") {
    return {
      ...existingItem,
      source: options.source ?? existingItem.source,
      note: options.note ?? existingItem.note,
    };
  }

  return {
    bookId,
    savedAt: status === "saved" ? now : existingItem?.savedAt ?? now,
    status,
    source: options.source ?? existingItem?.source,
    note: options.note ?? existingItem?.note,
  };
}

function compareSavedShelfItems(left: SavedShelfItem, right: SavedShelfItem) {
  const dateCompare = right.savedAt.localeCompare(left.savedAt);

  if (dateCompare !== 0) {
    return dateCompare;
  }

  return left.bookId.localeCompare(right.bookId);
}
