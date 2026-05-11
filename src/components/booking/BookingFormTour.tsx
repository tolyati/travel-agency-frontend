import { useState } from "react";
import type { Item } from "../../data/products";
import BookingWrapper from "./BookingWrapper";

interface Props { item: Item; onClose: () => void; onConfirm: () => void; }

export default function BookingFormTour({ item, onClose, onConfirm }: Props) {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const isValid = name.trim().length > 0 && city.trim().length > 0 && date.length > 0 && guests >= 1;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid) return;
    setSubmitted(true);
    setTimeout(() => { onConfirm(); onClose(); }, 1500);
  }

  return (
    <BookingWrapper item={item} title="✈️ Бронирование тура" submitted={submitted} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input type="text" placeholder="Ваше имя" value={name} onChange={(e) => setName(e.target.value)}
          className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition" />
        <input type="text" placeholder="Город вылета" value={city} onChange={(e) => setCity(e.target.value)}
          className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition" />
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} min={new Date().toISOString().split("T")[0]}
          className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition" />
        <div className="flex items-center gap-3">
          <label className="text-gray-400 text-sm shrink-0">Туристов:</label>
          <input type="number" min={1} max={20} value={guests} onChange={(e) => setGuests(Number(e.target.value))}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition" />
        </div>
        <button type="submit" disabled={!isValid}
          className={`w-full py-3 rounded-xl font-semibold transition ${isValid ? "bg-purple-600 hover:bg-purple-500 text-white" : "bg-zinc-800 text-zinc-600 cursor-not-allowed"}`}>
          Подтвердить бронирование
        </button>
      </form>
    </BookingWrapper>
  );
}
