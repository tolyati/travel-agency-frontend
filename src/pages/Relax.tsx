import type { PageProps } from "../types";

export default function Relax(_: PageProps) {
  return (
    <div className="text-center space-y-6 animate-fadeIn">
      <h1 className="text-3xl text-purple-400">Релакс и SPA</h1>
      <img src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874" className="rounded-full mx-auto w-2/3" />
      <p className="text-gray-300">Найдите свой дзен в термальных источниках.</p>
    </div>
  );
}
