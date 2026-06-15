import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import type { Book } from "@/lib/library/book";

type BooksJsonShape = Book[] | { books: Book[] };

export function loadBooksFromJsonFile(filePath: string): Book[] {
  const resolvedPath = resolve(filePath);
  const rawJson = readFileSync(resolvedPath, "utf8");
  const parsedJson = parseJson(rawJson, resolvedPath);

  if (Array.isArray(parsedJson)) {
    assertBookArrayShape(parsedJson, resolvedPath);
    return parsedJson as Book[];
  }

  if (isRecord(parsedJson) && Array.isArray(parsedJson.books)) {
    assertBookArrayShape(parsedJson.books, resolvedPath);
    return parsedJson.books as Book[];
  }

  throw new Error(
    `Invalid library JSON shape in ${resolvedPath}: expected an array or an object with a books array.`,
  );
}

export function writeBooksToJsonFile(filePath: string, books: Book[]): void {
  const resolvedPath = resolve(filePath);
  const outputBooks = sortBooksForOutput(books);

  mkdirSync(dirname(resolvedPath), { recursive: true });
  writeFileSync(resolvedPath, `${JSON.stringify(outputBooks, null, 2)}\n`, "utf8");
}

function parseJson(rawJson: string, filePath: string): unknown {
  try {
    return JSON.parse(rawJson) as BooksJsonShape;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown parse error";

    throw new Error(`Invalid JSON in ${filePath}: ${message}`);
  }
}

function assertBookArrayShape(value: unknown[], filePath: string): void {
  const invalidIndex = value.findIndex((item) => !isRecord(item));

  if (invalidIndex >= 0) {
    throw new Error(
      `Invalid library JSON shape in ${filePath}: books[${invalidIndex}] must be an object.`,
    );
  }
}

function sortBooksForOutput(books: Book[]) {
  return [...books].sort((left, right) =>
    getBookSortKey(left).localeCompare(getBookSortKey(right)),
  );
}

function getBookSortKey(book: Book) {
  return [book.id, book.title, book.author].map((value) => value ?? "").join("\0");
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
