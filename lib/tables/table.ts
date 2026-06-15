import type { TableCapacityGuidance } from "@/lib/tables/table-capacity";
import type { TableMembership } from "@/lib/tables/table-membership";

export type TableStatus = "draft" | "active" | "retired";

export type TableAudience = "self" | "gift" | "both";

export type TableId = string;

export type TableReaderMoment = {
  summary: string;
  readerStatement?: string;
  intent?: string;
  capacityProfile?: string;
};

export type TableQualityGuidance = {
  vouchingTest?: string;
  truthTest?: string;
  distinctnessTest?: string;
  surpriseTest?: string;
};

/**
 * Runtime-safe representation of a Bokhyllan table.
 *
 * Atlas -> Table -> Book:
 * - Atlas reads the user's present moment.
 * - Atlas routes to a curator-authored table.
 * - The table provides ordered, role-based book membership.
 *
 * This type intentionally models the table as curator authority, not as a
 * metadata category or score result.
 */
export type Table = {
  id: TableId;
  version: string;
  name: string;
  displayName: string;
  status: TableStatus;
  audience: TableAudience;
  purpose: string;
  readerMoment: TableReaderMoment;
  curatorIntent: string;
  leadBookId?: string;
  leadMembershipId?: string;
  surpriseBookIds?: string[];
  membership: TableMembership[];
  capacityGuidance?: TableCapacityGuidance;
  qualityGuidance?: TableQualityGuidance;
  createdAt?: string;
  updatedAt?: string;
};

export type TableSummary = {
  id: TableId;
  version: string;
  name: string;
  displayName: string;
  status: TableStatus;
  audience: TableAudience;
  purpose: string;
};
