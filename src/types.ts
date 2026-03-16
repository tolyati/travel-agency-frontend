export type Page = "home" | "about" | "travel" | "food" | "relax" | "hotels" | "sights" | "popular" | "faq" | "support";

export interface PageProps {
  setPage: (p: Page) => void;
}
