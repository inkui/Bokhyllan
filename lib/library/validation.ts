import type { Book } from "@/lib/library/book";

export type LibraryValidationSeverity = "error" | "warning";

export type LibraryValidationIssueCode =
  | "missing_required_field"
  | "duplicate_id"
  | "duplicate_isbn13"
  | "duplicate_title_author"
  | "malformed_isbn13"
  | "empty_array"
  | "missing_affiliate_metadata";

export type LibraryValidationIssue = {
  severity: LibraryValidationSeverity;
  code: LibraryValidationIssueCode;
  message: string;
  bookId?: string;
  field?: keyof Book | "title_author" | "affiliate";
};

export type LibraryValidationResult = {
  valid: boolean;
  issueCount: number;
  errorCount: number;
  warningCount: number;
  issues: LibraryValidationIssue[];
};

const requiredStringFields = ["id", "title", "author"] as const;
const requiredArrayFields = ["genres", "tags", "themes"] as const;
const requiredValueFields = ["language", "mood", "enrichmentStatus"] as const;

export function validateLibraryBooks(books: Book[]): LibraryValidationResult {
  const issues: LibraryValidationIssue[] = [];

  books.forEach((book) => {
    issues.push(...validateRequiredFields(book));
    issues.push(...validateEmptyArrays(book));
    issues.push(...validateIsbn13(book));
    issues.push(...validateAffiliateMetadata(book));
  });

  issues.push(...findDuplicateIds(books));
  issues.push(...findDuplicateIsbn13Values(books));
  issues.push(...findDuplicateTitleAuthorPairs(books));

  const errorCount = issues.filter((issue) => issue.severity === "error").length;
  const warningCount = issues.length - errorCount;

  return {
    valid: errorCount === 0,
    issueCount: issues.length,
    errorCount,
    warningCount,
    issues,
  };
}

function validateRequiredFields(book: Book): LibraryValidationIssue[] {
  const issues: LibraryValidationIssue[] = [];

  requiredStringFields.forEach((field) => {
    if (isBlank(book[field])) {
      issues.push(createIssue({
        severity: "error",
        code: "missing_required_field",
        message: `Missing required field: ${field}.`,
        book,
        field,
      }));
    }
  });

  requiredArrayFields.forEach((field) => {
    if (!Array.isArray(book[field])) {
      issues.push(createIssue({
        severity: "error",
        code: "missing_required_field",
        message: `Missing required field: ${field}.`,
        book,
        field,
      }));
    }
  });

  requiredValueFields.forEach((field) => {
    if (isBlank(book[field])) {
      issues.push(createIssue({
        severity: "error",
        code: "missing_required_field",
        message: `Missing required field: ${field}.`,
        book,
        field,
      }));
    }
  });

  return issues;
}

function validateEmptyArrays(book: Book): LibraryValidationIssue[] {
  return requiredArrayFields.flatMap((field) => {
    if (Array.isArray(book[field]) && book[field].length === 0) {
      return [
        createIssue({
          severity: "warning",
          code: "empty_array",
          message: `Suspicious empty array: ${field}.`,
          book,
          field,
        }),
      ];
    }

    return [];
  });
}

function validateIsbn13(book: Book): LibraryValidationIssue[] {
  if (isBlank(book.isbn13)) {
    return [];
  }

  return /^\d{13}$/.test(normalizeIsbn13(book.isbn13))
    ? []
    : [
        createIssue({
          severity: "error",
          code: "malformed_isbn13",
          message:
            "Malformed ISBN13: expected 13 digits after removing hyphens and spaces.",
          book,
          field: "isbn13",
        }),
      ];
}

function validateAffiliateMetadata(book: Book): LibraryValidationIssue[] {
  if (!isBlank(book.bokusUrl) || !isBlank(book.isbn13)) {
    return [];
  }

  return [
    createIssue({
      severity: "warning",
      code: "missing_affiliate_metadata",
      message: "Missing affiliate metadata: provide bokusUrl or isbn13 later.",
      book,
      field: "affiliate",
    }),
  ];
}

function findDuplicateIds(books: Book[]): LibraryValidationIssue[] {
  return findDuplicates(
    books,
    (book) => normalizeText(book.id),
    "duplicate_id",
    "id",
    (value) => `Duplicate book id: ${value}.`,
  );
}

function findDuplicateIsbn13Values(books: Book[]): LibraryValidationIssue[] {
  return findDuplicates(
    books,
    (book) => {
      if (isBlank(book.isbn13)) {
        return undefined;
      }

      return normalizeIsbn13(book.isbn13);
    },
    "duplicate_isbn13",
    "isbn13",
    (value) => `Duplicate ISBN13: ${value}.`,
  );
}

function findDuplicateTitleAuthorPairs(books: Book[]): LibraryValidationIssue[] {
  return findDuplicates(
    books,
    (book) => {
      if (isBlank(book.title) || isBlank(book.author)) {
        return undefined;
      }

      return `${normalizeText(book.title)}::${normalizeText(book.author)}`;
    },
    "duplicate_title_author",
    "title_author",
    () => "Duplicate title and author combination.",
  );
}

function findDuplicates(
  books: Book[],
  getValue: (book: Book) => string | undefined,
  code: LibraryValidationIssueCode,
  field: LibraryValidationIssue["field"],
  createMessage: (value: string) => string,
) {
  const seen = new Map<string, Book[]>();

  books.forEach((book) => {
    const value = getValue(book);

    if (!value) {
      return;
    }

    const matches = seen.get(value) ?? [];
    matches.push(book);
    seen.set(value, matches);
  });

  return Array.from(seen.entries()).flatMap(([value, matches]) => {
    if (matches.length < 2) {
      return [];
    }

    return matches.map((book) =>
      createIssue({
        severity: "error",
        code,
        message: createMessage(value),
        book,
        field,
      }),
    );
  });
}

function createIssue({
  severity,
  code,
  message,
  book,
  field,
}: {
  severity: LibraryValidationSeverity;
  code: LibraryValidationIssueCode;
  message: string;
  book: Book;
  field?: LibraryValidationIssue["field"];
}): LibraryValidationIssue {
  return {
    severity,
    code,
    message,
    bookId: isBlank(book.id) ? undefined : book.id,
    field,
  };
}

function isBlank(value: unknown): value is undefined | null | "" {
  return typeof value !== "string" || value.trim().length === 0;
}

function normalizeText(value: string) {
  return value.trim().toLowerCase();
}

function normalizeIsbn13(value: string) {
  return value.replace(/[-\s]/g, "");
}
