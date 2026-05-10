import type { PageProps } from "../types";

export default function Unauthorized({ setPage }: PageProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] gap-4 animate-fadeIn">
      <span className="text-6xl">🔒</span>
      <h1 className="text-2xl font-bold text-white">Доступ запрещён</h1>
      <p className="text-gray-400 text-center max-w-sm">
        У вас недостаточно прав для просмотра этой страницы.
      </p>
      <button
        onClick={() => setPage("home")}
        className="mt-2 px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-semibold transition"
      >
        На главную
      </button>
    </div>
  );
}
