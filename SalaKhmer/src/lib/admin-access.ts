/**
 * Client-side visibility check for the admin route. Real write authorization
 * will be enforced again by the future Cloudflare Worker using a Firebase
 * admin claim; an email check in the browser is never sufficient by itself.
 */
export function isConfiguredAdmin(email?: string | null): boolean {
  if (!email) return false;
  const allowedEmails = (import.meta.env.VITE_ADMIN_EMAILS ?? "")
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);

  return allowedEmails.includes(email.trim().toLowerCase());
}
