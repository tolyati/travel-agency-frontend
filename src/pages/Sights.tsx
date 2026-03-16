import type { PageProps } from "../types";

export default function Sights(_: PageProps) {
  return (
    <div className="space-y-6 animate-fadeIn">
      <h1 className="text-3xl text-purple-400">Архитектура</h1>
      <p className="text-gray-300 text-lg">Исследуйте великие сооружения человечества.</p>
      <img src="https://images.unsplash.com/photo-1503917988258-f19178c1ef5b" className="rounded-2xl shadow-xl" />
    </div>
  );
}
