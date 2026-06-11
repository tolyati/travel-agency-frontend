import { useState } from "react";
import type { Item } from "../../data/products";
import BookingWrapper from "./BookingWrapper";
import PaymentMethod from "./PaymentMethod";
import CardFields from "./CardFields";

const timeSlots = [
  "09:00","10:00","11:00","12:00",
  "13:00","14:00","15:00","16:00","17:00","18:00"
];

const procedures = [
  "Массаж",
  "Обёртывание",
  "Ароматерапия",
  "Пилинг",
  "Гидротерапия",
  "Стоун-терапия"
];

interface Props {
  item: Item;
  onClose: () => void;
  onConfirm: () => void;
}

export default function BookingFormSalon({
  item,
  onClose,
  onConfirm,
}: Props) {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [procedure, setProcedure] = useState("");

  const [payment, setPayment] = useState<"offline" | "online">("offline");
  const [submitted, setSubmitted] = useState(false);

  const isValid =
    name.trim().length > 0 &&
    date.length > 0 &&
    time.length > 0 &&
    procedure.length > 0;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid) return;

    setSubmitted(true);
    setTimeout(() => {
      onConfirm();
      onClose();
    }, 1200);
  }

  return (
    <BookingWrapper
      item={item}
      title="💆 SPA запись"
      submitted={submitted}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} className="space-y-3">

        <input
          placeholder="Имя"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2 text-white"
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2 text-white"
        />

        <select
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2 text-white"
        >
          <option value="">Время</option>
          {timeSlots.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>

        <select
          value={procedure}
          onChange={(e) => setProcedure(e.target.value)}
          className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2 text-white"
        >
          <option value="">Процедура</option>
          {procedures.map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>

        <PaymentMethod method={payment} setMethod={setPayment} />
        {payment === "online" && <CardFields />}

        <button
          type="submit"
          disabled={!isValid}
          className={`w-full py-3 rounded-xl font-semibold ${
            isValid
              ? "bg-purple-600 hover:bg-purple-500 text-white"
              : "bg-zinc-800 text-zinc-600"
          }`}
        >
          Записаться
        </button>
      </form>
    </BookingWrapper>
  );
}