import { memo } from "react";
import type { Item } from "../data/products";

interface Props {
  item: Item;
  liked: boolean;
  onToggleLike: (id: number) => void;
  onClick: (item: Item) => void;
}

const SightCard = memo(function SightCard({
  item,
  liked,
  onToggleLike,
  onClick,
}: Props) {
  return (
    <div
      onClick={() => onClick(item)}
      className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden cursor-pointer hover:border-purple-500 transition"
    >
      <img src={item.img} className="w-full h-48 object-cover" />

      <div className="p-4 space-y-2">
        <div className="flex justify-between items-center">
          <h3 className="text-white font-semibold">{item.name}</h3>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleLike(item.id);
            }}
            className="text-sm"
          >
            {liked ? "❤️" : "🤍"}
          </button>
        </div>

        <p className="text-gray-400 text-sm line-clamp-2">
          {item.description}
        </p>

        <p className="text-purple-400 font-bold">${item.price}</p>
      </div>
    </div>
  );
});

export default SightCard;