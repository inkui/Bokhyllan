export type ReviewStatus =
  | "candidate"
  | "metadata_ready"
  | "enrichment_ready"
  | "approved"
  | "published";

export const reviewStatuses: ReviewStatus[] = [
  "candidate",
  "metadata_ready",
  "enrichment_ready",
  "approved",
  "published",
];
