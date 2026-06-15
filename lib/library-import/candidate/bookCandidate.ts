export type BookCandidateSource =
  | "curator"
  | "user_suggestion"
  | "library_gap"
  | "editorial";

export type BookCandidate = {
  title: string;
  author: string;
  isbn: string;
  source: BookCandidateSource;
  createdAt: string;
  notes?: string;
  curatorSuggestion?: string;
};
