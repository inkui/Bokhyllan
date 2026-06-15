import type { TableMembershipRole } from "@/lib/tables/table-membership";

export type TableCapacityLevel = "very_low" | "low" | "medium" | "high";

export type TableDifficultyLevel = "low" | "medium" | "high";

export type TableCapacityDimension = "reading_energy" | "difficulty_tolerance";

export type TableCapacityRange<TLevel extends string> = {
  minimum?: TLevel;
  maximum?: TLevel;
  preferred?: TLevel[];
};

export type TableCapacityEntryRule = {
  dimension: TableCapacityDimension;
  when: TableCapacityLevel | TableDifficultyLevel;
  preferRole?: TableMembershipRole;
  preferMembershipId?: string;
  note?: string;
};

export type TableCapacityEntryPoint = {
  membershipId?: string;
  bookId?: string;
  role: TableMembershipRole;
  note?: string;
};

/**
 * Conceptual guidance for how Atlas may enter a table after the table is chosen.
 *
 * Atlas -> Table -> Book means capacity should not route around the curator's
 * table. Capacity can only influence where to enter the already selected table:
 * lead, supporting, alternative, or surprise.
 */
export type TableCapacityGuidance = {
  readingEnergy?: TableCapacityRange<TableCapacityLevel>;
  difficultyTolerance?: TableCapacityRange<TableDifficultyLevel>;
  lowCapacityEntry?: TableCapacityEntryPoint;
  highCapacityEntry?: TableCapacityEntryPoint;
  entryRules?: TableCapacityEntryRule[];
  lowCapacityNote?: string;
  highCapacityNote?: string;
  curatorNote?: string;
};
