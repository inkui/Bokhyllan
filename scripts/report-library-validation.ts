import { books } from "../data/library/books/books";
import { mapRuntimeBooksToFoundationBooks } from "../lib/library/runtime-book-mapper";
import { validateLibraryBooks } from "../lib/library/validation";
import type {
  LibraryValidationIssue,
  LibraryValidationIssueCode,
} from "../lib/library/validation";

const foundationBooks = mapRuntimeBooksToFoundationBooks(books);
const result = validateLibraryBooks(foundationBooks);
const groupedIssues = groupIssuesByCode(result.issues);

console.log("Bokhyllan library validation report");
console.log(`Total books: ${foundationBooks.length}`);
console.log(`Errors: ${result.errorCount}`);
console.log(`Warnings: ${result.warningCount}`);
console.log("");
console.log("Issue codes:");

if (Object.keys(groupedIssues).length === 0) {
  console.log("- none");
} else {
  Object.entries(groupedIssues)
    .sort(([leftCode], [rightCode]) => leftCode.localeCompare(rightCode))
    .forEach(([code, issues]) => {
      const affectedBooks = getTopAffectedBooks(issues);

      console.log(`- ${code}: ${issues.length}`);

      if (affectedBooks.length > 0) {
        console.log(`  affected: ${affectedBooks.join(", ")}`);
      }
    });
}

process.exit(result.errorCount > 0 ? 1 : 0);

function groupIssuesByCode(issues: LibraryValidationIssue[]) {
  return issues.reduce<Partial<Record<LibraryValidationIssueCode, LibraryValidationIssue[]>>>(
    (groups, issue) => {
      groups[issue.code] = [...(groups[issue.code] ?? []), issue];
      return groups;
    },
    {},
  );
}

function getTopAffectedBooks(issues: LibraryValidationIssue[]) {
  return Array.from(
    new Set(
      issues
        .map((issue) => issue.bookId)
        .filter((bookId): bookId is string => Boolean(bookId)),
    ),
  ).slice(0, 5);
}
