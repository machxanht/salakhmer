/**
 * auth-access.ts
 * Access control middleware — single source of truth for guest/registered permissions.
 */

import { UserRole } from "./db/schema";

// ── Content Categories ─────────────────────────────────────────────────────

export type ContentCategory =
  "module_1" | "module_2" | "module_3" | "module_4" | "module_5" | "module_6";

export interface AccessCheckOptions {
  category: ContentCategory;
  /** Sub-category id — used for fine-grained phrase access */
  subCategory?: string;
  /** 0-based index of the item being accessed (e.g. lesson index in alphabet) */
  itemIndex?: number;
  /** How many quizzes the guest has taken today */
  dailyQuizCount?: number;
}

// ── Guest Access Rules ────────────────────────────────────────────────────
//
// GUEST:
//   • module_1  → first 10 consonant cards only (index 0–9)
//   • module_3  → full access (greetings/dialogues)
//   • others    → LOCKED
//
// REGISTERED:
//   → 100% full access

export function checkContentAccess(role: UserRole, options: AccessCheckOptions): boolean {
  if (role === "REGISTERED") return true;

  const { category, subCategory, itemIndex = 0, dailyQuizCount = 0 } = options;

  switch (category) {
    case "module_1":
      // Access to the first 10 cards
      return itemIndex < 10;

    case "module_3":
      // Free access
      return true;

    case "module_2":
    case "module_4":
    case "module_5":
    case "module_6":
    default:
      return false;
  }
}

// ── Category-Level Access (for Home page overlay) ─────────────────────────

export function isCategoryAccessible(role: UserRole, category: ContentCategory): boolean {
  if (role === "REGISTERED") return true;

  // Guests can enter alphabet (m1) and dialogues (m3)
  return category === "module_1" || category === "module_3";
}
