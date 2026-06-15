import type {
  TableCapacityLevel,
  TableDifficultyLevel,
} from "@/lib/tables/table-capacity";

export type TableMembershipRole =
  | "lead"
  | "supporting"
  | "alternative"
  | "surprise";

export type TableMembershipStatus = "draft" | "active" | "retired";

export type TableMembershipCapacityFit = {
  readingEnergy?: TableCapacityLevel[];
  difficultyTolerance?: TableDifficultyLevel[];
  note?: string;
};

/**
 * A book's authored placement on a table.
 *
 * In the Atlas -> Table -> Book model, Atlas does not select books directly.
 * It routes to a table. The table membership then tells the runtime which
 * curator-approved book roles exist for that reader moment.
 */
export type TableMembership = {
  id: string;
  tableId: string;
  bookId: string;
  role: TableMembershipRole;
  position: number;
  status: TableMembershipStatus;
  placementRationale?: string;
  capacityFit?: TableMembershipCapacityFit;
  createdAt?: string;
  updatedAt?: string;
};

export type TableMembershipSummary = {
  tableId: string;
  leadBookId?: string;
  supportingBookIds: string[];
  alternativeBookIds: string[];
  surpriseBookIds: string[];
};
