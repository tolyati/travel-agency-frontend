import { useState } from "react";
import type { Item } from "../../data/products";
import BookingWrapper from "./BookingWrapper";

const languages = ["Русский", "Английский", "Немецкий", "Французский", "Испанский", "Китайский"];

interface Props { item: Item; onClose: () => void; onConfirm: () => void; }

export default function BookingFormSight({ item, onClose, onConfirm }: Props) {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState(1);
  const [language, setLanguage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const isValid = name.trim().length > 0 && date.length > 0 && guests >= 1 && language.length > 0;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid) return;
    setSubmitted(true);
    setTimeout(() => { onConfirm(); onClose(); }, 1500);
  }

  return (
    <BookingWrapper item={item} title="🗺️ Билет на экскурсию" submitted={submitted} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input type="text" placeholder="Ваше имя" value={name} onChange={(e) => setName(e.target.value)}
          className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition" />
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} min={new Date().toISOString().split("T")[0]}
          className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition" />
        <div className="flex items-center gap-3">
          <label className="text-gray-400 text-sm shrink-0">Гостей:</label>
          <input type="number" min={1} max={20} value={guests} onChange={(e) => setGuests(Number(e.target.value))}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition" />
        </div>
        <select value={language} onChange={(e) => setLanguage(e.target.value)}
          className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition">
          <option value="">Язык экскурсии</option>
          {languages.map((l) => <option key={l} value={l}>{l}</option>)}
        </select>
        <button type="submit" disabled={!isValid}
          className={`w-full py-3 rounded-xl font-semibold transition ${isValid ? "bg-purple-600 hover:bg-purple-500 text-white" : "bg-zinc-800 text-zinc-600 cursor-not-allowed"}`}>
          Купить билет
        </button>
      </form>
    </BookingWrapper>
  );
}
