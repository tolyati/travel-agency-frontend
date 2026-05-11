import { useState } from "react";
import type { Item } from "../../data/products";
import BookingWrapper from "./BookingWrapper";

interface Props { item: Item; onClose: () => void; onConfirm: () => void; }

export default function BookingFormHotel({ item, onClose, onConfirm }: Props) {
  const [name, setName] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const isValid = name.trim().length > 0 && checkIn.length > 0 && checkOut.length > 0 && checkOut > checkIn && guests >= 1;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid) return;
    setSubmitted(true);
    setTimeout(() => { onConfirm(); onClose(); }, 1500);
  }

  const nights = checkIn && checkOut && checkOut > checkIn
    ? Math.round((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000)
    : 0;

  return (
    <BookingWrapper item={item} title="🏨 Бронирование отеля" submitted={submitted} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input type="text" placeholder="Ваше имя" value={name} onChange={(e) => setName(e.target.value)}
          className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition" />
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-gray-400 text-xs">Заезд</label>
            <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} min={new Date().toISOString().split("T")[0]}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-purple-500 transition text-sm" />
          </div>
          <div className="space-y-1">
            <label className="text-gray-400 text-xs">Выезд</label>
            <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} min={checkIn || new Date().toISOString().split("T")[0]}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-purple-500 transition text-sm" />
          </div>
        </div>
        {nights > 0 && (
          <p className="text-purple-400 text-xs text-center">{nights} ночей · итого ${(item.price * nights).toFixed(0)}</p>
        )}
        <div className="flex items-center gap-3">
          <label className="text-gray-400 text-sm shrink-0">Гостей:</label>
          <input type="number" min={1} max={10} value={guests} onChange={(e) => setGuests(Number(e.target.value))}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition" />
        </div>
        <button type="submit" disabled={!isValid}
          className={`w-full py-3 rounded-xl font-semibold transition ${isValid ? "bg-purple-600 hover:bg-purple-500 text-white" : "bg-zinc-800 text-zinc-600 cursor-not-allowed"}`}>
          Забронировать номер
        </button>
      </form>
    </BookingWrapper>
  );
}
