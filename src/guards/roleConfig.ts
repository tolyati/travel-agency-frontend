import type { Page, Role } from "../types";

// No page restrictions — all pages are accessible by guests.
export const pageRoles: Partial<Record<Page, Role>> = {};

// Pages only accessible when NOT logged in
export const guestOnlyPages: Page[] = ["login", "register"];
