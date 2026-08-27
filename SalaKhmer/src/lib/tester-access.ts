/**
 * Local/internal tester access. This only removes learning-path locks for
 * explicitly configured accounts; it does not grant CMS or server privileges.
 */
export function hasFullLessonTestAccess(email?: string | null): boolean {
  if (!email) return false;
  const testers = `${import.meta.env.VITE_TESTER_EMAILS ?? ""},${import.meta.env.VITE_ADMIN_EMAILS ?? ""}`
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);
  return testers.includes(email.trim().toLowerCase());
}
