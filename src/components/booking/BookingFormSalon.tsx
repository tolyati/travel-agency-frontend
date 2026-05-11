import { useState } from "react";
import type { Item } from "../../data/products";
import BookingWrapper from "./BookingWrapper";

const timeSlots = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"];
const procedures = ["Массаж", "Обёртывание", "Ароматерапия", "Пилинг", "Гидротерапия", "Стоун-терапия"];

interface Props { item: Item; onClose: () => void; onConfirm: () => void; }

export default function BookingFormSalon({ item, onClose, onConfirm }: Props) {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [procedure, setProcedure] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const isValid = name.trim().length > 0 && date.length > 0 && time.length > 0 && procedure.length > 0;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid) return;
    setSubmitted(true);
    setTimeout(() => { onConfirm(); onClose(); }, 1500);
  }

  return (
    <BookingWrapper item={item} title="💆 Запись в SPA" submitted={submitted} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input type="text" placeholder="Ваше имя" value={name} onChange={(e) => setName(e.target.value)}
          className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition" />
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} min={new Date().toISOString().split("T")[0]}
          className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition" />
        <select value={time} onChange={(e) => setTime(e.target.value)}
          className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition">
          <option value="">Выберите время</option>
          {timeSlots.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
        <select value={procedure} onChange={(e) => setProcedure(e.target.value)}
          className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition">
          <option value="">Выберите процедуру</option>
          {procedures.map((p) => <option key={p} value={p}>{p}</option>)}
        </select>
        <button type="submit" disabled={!isValid}
          className={`w-full py-3 rounded-xl font-semibold transition ${isValid ? "bg-purple-600 hover:bg-purple-500 text-white" : "bg-zinc-800 text-zinc-600 cursor-not-allowed"}`}>
          Записаться
        </button>
      </form>
    </BookingWrapper>
  );
}
