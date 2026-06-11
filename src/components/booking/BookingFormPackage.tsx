import { useState } from "react";
import type { Item } from "../../data/products";
import BookingWrapper from "./BookingWrapper";
import PaymentMethod from "./PaymentMethod";
import CardFields from "./CardFields";

interface Props {
  item: Item;
  onClose: () => void;
  onConfirm: () => void;
}

export default function BookingFormPackage({
  item,
  onClose,
  onConfirm,
}: Props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState(1);

  const [payment, setPayment] = useState<"offline" | "online">("offline");
  const [submitted, setSubmitted] = useState(false);

  const isValid =
    name.trim().length > 0 &&
    phone.trim().length > 0 &&
    date.length > 0 &&
    guests >= 1;

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
      title="📦 Оформление пакета"
      submitted={submitted}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} className="space-y-3">

        <input
          placeholder="Ваше имя"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white"
        />

        <input
          type="tel"
          placeholder="Телефон"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white"
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white"
        />

        <input
          type="number"
          min={1}
          value={guests}
          onChange={(e) => setGuests(Number(e.target.value))}
          className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white"
        />

        <PaymentMethod method={payment} setMethod={setPayment} />

        {payment === "online" && <CardFields />}

        <button
          type="submit"
          disabled={!isValid}
          className={`w-full py-3 rounded-xl font-semibold transition ${
            isValid
              ? "bg-purple-600 hover:bg-purple-500 text-white"
              : "bg-zinc-800 text-zinc-600"
          }`}
        >
          Оформить пакет
        </button>
      </form>
    </BookingWrapper>
  );
}