import type { Page, Role } from "../types";
import { pageRoles, guestOnlyPages } from "./roleConfig";

const roleRank: Record<Role, number> = {
  guest: 0,
  user: 1,
  admin: 2,
};

export function getRedirect(page: Page, userRole: Role): Page | null {
  // Logged-in users shouldn't see login/register
  if (guestOnlyPages.includes(page) && userRole !== "guest") {
    return "home";
  }

  const required = pageRoles[page];
  if (!required) return null; // page is public

  if (roleRank[userRole] < roleRank[required]) {
    // Not logged in at all → send to login
    if (userRole === "guest") return "login";
    // Logged in but wrong role → show unauthorized
    return "unauthorized";
  }

  return null;
}
