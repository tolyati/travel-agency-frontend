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

export default function BookingFormTour({ item, onClose, onConfirm }: Props) {
  const [fullName, setFullName] = useState("");
  const [city, setCity] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [guests, setGuests] = useState(1);

  const [payment, setPayment] = useState<"offline" | "online">("offline");
  const [submitted, setSubmitted] = useState(false);

  const isValid =
    fullName.trim().length > 0 &&
    city.trim().length > 0 &&
    dateFrom.length > 0 &&
    guests > 0;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid) return;

    const dto = {
      userId: 1,
      tourId: item.id,

      dateFrom: new Date(dateFrom).toISOString(),
      dateTo: new Date(dateFrom).toISOString(),

      fullName,
      departureCity: city,
      guests,
      status: "Pending",
      paymentMethod: payment,
    };

    await fetch("https://localhost:7233/api/tour-booking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(dto),
    });

    setSubmitted(true);

    setTimeout(() => {
      onConfirm();
      onClose();
    }, 1200);
  }

  return (
    <BookingWrapper
      item={item}
      title="✈️ Бронирование тура"
      submitted={submitted}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} className="space-y-3">

        {/* ФИО */}
        <input
          placeholder="ФИО"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2 text-white"
        />

        {/* Город */}
        <input
          placeholder="Город вылета"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2 text-white"
        />

        {/* Дата */}
        <input
          type="date"
          value={dateFrom}
          onChange={(e) => setDateFrom(e.target.value)}
          className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2 text-white"
        />

        {/* Люди */}
        <input
          type="number"
          min={1}
          value={guests}
          onChange={(e) => setGuests(Number(e.target.value))}
          className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2 text-white"
        />

        {/* Оплата */}
        <PaymentMethod method={payment} setMethod={setPayment} />

        {/* Карта */}
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
          Подтвердить бронирование
        </button>
      </form>
    </BookingWrapper>
  );
}