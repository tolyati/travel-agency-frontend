import { useEffect } from "react";
import type { Page } from "../types";
import { useAuth } from "../hooks/useAuth";
import logo from "../assets/logo.png";

const labels: Partial<Record<Page, string>> = {
  home: "Главная",
  travel: "Путешествия",
  packages: "Пакеты",
  relax: "Отдых",
  hotels: "Отели",
  sights: "Места",
  partners: "Партнеры",
  faq: "FAQ",
  support: "Поддержка",
};

const pages: Page[] = [
  "home",
  "travel",
  "packages",
  "relax",
  "hotels",
  "sights",
  "partners",
  "faq",
  "support",
];

interface NavbarProps {
  page: Page;
  setPage: (p: Page) => void;
  open: boolean;
  setOpen: (v: boolean) => void;
}

export default function Navbar({ page, setPage, open, setOpen }: NavbarProps) {
  const { user, handleLogout } = useAuth();

  function navigate(p: Page) {
    setPage(p);
    setOpen(false);
  }

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [setOpen]);

  return (
    <header className="fixed top-0 w-full z-50 backdrop-blur-xl bg-black/80 border-b border-zinc-800">
      <nav className="max-w-[1536px] mx-auto flex items-center px-4 py-3 uppercase font-semibold">

        <img
          src={logo}
          className="h-14 cursor-pointer"
          onClick={() => navigate("home")}
        />

        <div className="hidden xl:flex flex-1 justify-center gap-2">
          {pages.map((p) => (
            <button
              key={p}
              onClick={() => navigate(p)}
              className={`px-2 py-1 ${
                page === p ? "text-purple-400" : "text-gray-300"
              }`}
            >
              {labels[p]}
            </button>
          ))}
        </div>

        <div className="hidden xl:flex items-center gap-3 border-l pl-4 border-zinc-700">

          {user ? (
            <>
              <span className="text-purple-400">👤 {user.username}</span>

              {user.role === "admin" && (
                <button onClick={() => navigate("admin")} className="text-yellow-400">
                  Админка
                </button>
              )}

              <button
                onClick={() => {
                  handleLogout();
                  navigate("home");
                }}
                className="text-red-400"
              >
                Выйти
              </button>
            </>
          ) : (
            <>
              <button onClick={() => navigate("login")}>Войти</button>
              <button onClick={() => navigate("register")} className="text-purple-400">
                Регистрация
              </button>
            </>
          )}
        </div>

        <button className="xl:hidden ml-auto" onClick={() => setOpen(true)}>
          ☰
        </button>
      </nav>
    </header>
  );
}