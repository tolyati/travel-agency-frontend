import { useState } from "react";

export default function CardFields() {
  const [card, setCard] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  return (
    <div className="space-y-2 border-t border-zinc-800 pt-3">
      <p className="text-gray-400 text-sm">Данные карты</p>

      <input
        placeholder="Номер карты"
        value={card}
        onChange={(e) => setCard(e.target.value)}
        className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2 text-white"
      />

      <div className="grid grid-cols-2 gap-2">
        <input
          placeholder="MM/YY"
          value={expiry}
          onChange={(e) => setExpiry(e.target.value)}
          className="bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2 text-white"
        />

        <input
          placeholder="CVV"
          value={cvv}
          onChange={(e) => setCvv(e.target.value)}
          className="bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2 text-white"
        />
      </div>
    </div>
  );
}