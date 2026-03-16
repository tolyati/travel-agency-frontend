import type { Page } from "../types";

const labels: Record<Page, string> = {
  home: "Главная", about: "О нас", travel: "Путешествия",
  food: "Еда", relax: "Отдых", hotels: "Отели",
  sights: "Места", popular: "Популярное", faq: "FAQ", support: "Поддержка"
};

const pages = Object.keys(labels) as Page[];

interface NavbarProps {
  page: Page;
  setPage: (p: Page) => void;
}

export default function Navbar({ page, setPage }: NavbarProps) {
  return (
    <header className="fixed top-0 w-full backdrop-blur-xl bg-black/80 border-b border-zinc-800 z-50">
      <nav className="container mx-auto flex flex-wrap justify-center gap-2 p-4 text-xs uppercase font-semibold">
        {pages.map((p) => (
          <button
            key={p}
            onClick={() => setPage(p)}
            className={`px-3 py-2 rounded-md transition ${
              page === p ? "text-purple-400 bg-purple-500/10" : "hover:text-purple-400"
            }`}
          >
            {labels[p]}
          </button>
        ))}
      </nav>
    </header>
  );
}
