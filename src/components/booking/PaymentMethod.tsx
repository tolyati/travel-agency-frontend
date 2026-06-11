interface Props {
  method: "offline" | "online";
  setMethod: (v: "offline" | "online") => void;
}

export default function PaymentMethod({ method, setMethod }: Props) {
  return (
    <div className="space-y-2">
      <p className="text-gray-400 text-sm">Способ оплаты</p>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setMethod("offline")}
          className={`flex-1 py-2 rounded-xl border text-sm ${
            method === "offline"
              ? "bg-purple-500/20 border-purple-500 text-purple-400"
              : "border-zinc-700 text-gray-400"
          }`}
        >
          На месте
        </button>

        <button
          type="button"
          onClick={() => setMethod("online")}
          className={`flex-1 py-2 rounded-xl border text-sm ${
            method === "online"
              ? "bg-purple-500/20 border-purple-500 text-purple-400"
              : "border-zinc-700 text-gray-400"
          }`}
        >
          Онлайн
        </button>
      </div>
    </div>
  );
}