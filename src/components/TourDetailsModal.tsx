import type { Item } from "../data/products";

interface Props {
  item: Item;
  onClose: () => void;
}

export default function TourDetailsModal({ item, onClose }: Props) {
  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-md p-6 space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold text-white">{item.name}</h2>

        <img
          src={item.img}
          className="w-full h-48 object-cover rounded-xl"
        />

        <p className="text-gray-400 text-sm">{item.description}</p>

        <div className="flex items-center justify-between">
          <span className="text-purple-400 font-bold">${item.price}</span>
          <span className="text-xs text-purple-300 border border-purple-500/30 px-2 py-1 rounded-full">
            {item.country}
          </span>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-red-600 hover:bg-red-500 text-white py-2 rounded-xl transition"
        >
          Закрыть
        </button>
      </div>
    </div>
  );
}