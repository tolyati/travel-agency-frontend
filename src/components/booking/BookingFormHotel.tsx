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

export default function BookingFormHotel({ item, onClose, onConfirm }: Props) {
  const [name, setName] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);

  const [payment, setPayment] = useState<"offline" | "online">("offline");
  const [submitted, setSubmitted] = useState(false);

  const isValid = name && checkIn && checkOut && guests > 0;

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
    <BookingWrapper item={item} title="🏨 Отель" submitted={submitted} onClose={onClose}>
      <form className="space-y-3" onSubmit={handleSubmit}>

        <input
          placeholder="Имя"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2 text-white"
        />

        <div className="grid grid-cols-2 gap-2">
          <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)}
            className="bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2 text-white" />

          <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)}
            className="bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2 text-white" />
        </div>

        <input
          type="number"
          value={guests}
          onChange={(e) => setGuests(Number(e.target.value))}
          className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2 text-white"
        />

        <PaymentMethod method={payment} setMethod={setPayment} />
        {payment === "online" && <CardFields />}

        <button
          className="w-full py-3 bg-purple-600 rounded-xl text-white"
          disabled={!isValid}
        >
          Забронировать
        </button>
      </form>
    </BookingWrapper>
  );
}