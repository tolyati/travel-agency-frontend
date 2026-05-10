import type { Page } from "../types";
import { useAuth } from "../hooks/useAuth";

const labels: Record<Exclude<Page, "login" | "register" | "unauthorized">, string> = {
  home: "Главная", about: "О нас", travel: "Путешествия",
  packages: "Пакеты", relax: "Отдых", hotels: "Отели",
  sights: "Места", partners: "Партнеры", faq: "FAQ", support: "Поддержка"
};

const pages = Object.keys(labels) as Exclude<Page, "login" | "register" | "unauthorized">[];

interface NavbarProps {
  page: Page;
  setPage: (p: Page) => void;
}

export default function Navbar({ page, setPage }: NavbarProps) {
  const { user, handleLogout } = useAuth();

  return (
    <header className="fixed top-0 w-full backdrop-blur-xl bg-black/80 border-b border-zinc-800 z-50">
      <nav className="container mx-auto flex flex-wrap justify-center gap-2 p-4 text-xs uppercase font-semibold">
        {pages.map((p) => (
          <button
            key={p}
            onClick={() => setPage(p)}
            className={`px-3 py-2 rounded-md transition text-lg ${
              page === p ? "text-purple-400 bg-purple-500/10" : "hover:text-purple-400"
            }`}
          >
            {labels[p]}
          </button>
        ))}

        <div className="flex items-center gap-2 ml-4 border-l border-zinc-700 pl-4">
          {user ? (
            <>
              <span className="text-purple-400 text-sm normal-case font-medium">👤 {user.username}</span>
              <button
                onClick={() => { handleLogout(); setPage("home"); }}
                className="px-3 py-1.5 rounded-md text-sm text-gray-400 hover:text-red-400 transition normal-case"
              >
                Выйти
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setPage("login")}
                className={`px-3 py-1.5 rounded-md text-sm transition normal-case ${
                  page === "login" ? "text-purple-400 bg-purple-500/10" : "text-gray-400 hover:text-purple-400"
                }`}
              >
                Войти
              </button>
              <button
                onClick={() => setPage("register")}
                className={`px-3 py-1.5 rounded-md text-sm transition normal-case border border-purple-500/40 ${
                  page === "register" ? "bg-purple-500/20 text-purple-400" : "text-purple-400 hover:bg-purple-500/10"
                }`}
              >
                Регистрация
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
