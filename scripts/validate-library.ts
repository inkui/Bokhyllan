import { loadBooksFromJsonFile } from "../lib/library/io";
import { validateLibraryBooks } from "../lib/library/validation";

const filePath = process.argv[2];

if (!filePath) {
  console.error("Usage: validate-library <path-to-books.json>");
  process.exit(1);
}

try {
  const books = loadBooksFromJsonFile(filePath);
  const result = validateLibraryBooks(books);

  console.log(`Books: ${books.length}`);
  console.log(`Errors: ${result.errorCount}`);
  console.log(`Warnings: ${result.warningCount}`);

  if (result.issues.length > 0) {
    console.log("");
    console.log("Issues:");

    result.issues.forEach((issue) => {
      const location = [
        issue.bookId ? `bookId=${issue.bookId}` : undefined,
        issue.field ? `field=${issue.field}` : undefined,
      ]
        .filter(Boolean)
        .join(" ");

      console.log(
        `- ${issue.severity.toUpperCase()} ${issue.code}: ${issue.message}${
          location ? ` (${location})` : ""
        }`,
      );
    });
  }

  process.exit(result.errorCount > 0 ? 1 : 0);
} catch (error) {
  const message = error instanceof Error ? error.message : "Unknown validation error";

  console.error(message);
  process.exit(1);
}
