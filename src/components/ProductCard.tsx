import { memo, useCallback } from "react";
import type { Item } from "../data/products";
import Counter from "./Counter";

interface ProductCardProps {
  item: Item;
  liked: boolean;
  onToggleLike: (id: number) => void;
  inCart: boolean;
  count: number;
  onToggleCart: (id: number) => void;
  onCountChange: (id: number, val: number) => void;
}

const ProductCard = memo(function ProductCard({ item, liked, onToggleLike, inCart, count, onToggleCart, onCountChange }: ProductCardProps) {
  const handleLike = useCallback(() => onToggleLike(item.id), [item.id, onToggleLike]);
  const handleCart = useCallback(() => onToggleCart(item.id), [item.id, onToggleCart]);
  const handleCount = useCallback((val: number) => onCountChange(item.id, val), [item.id, onCountChange]);

  return (
    <div className="grid grid-rows-[auto_1fr] bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-purple-500 transition-all hover:-translate-y-1">
      <img src={item.img} className="w-full h-48 object-cover" loading="lazy" />
      <div className="grid grid-rows-[auto_1fr_auto_auto] gap-2 p-5">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-white font-semibold text-lg">{item.name}</h3>
          <span className="text-xs text-purple-400 border border-purple-500/40 rounded-full px-2 py-0.5 shrink-0">
            {item.country || item.category}
          </span>
        </div>
        <p className="text-gray-400 text-sm">{item.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-purple-400 font-semibold">${item.price}</span>
          <Counter count={count} onChange={handleCount} disabled={inCart} />
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleLike}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl border text-sm transition ${
              liked
                ? "bg-pink-500/20 border-pink-500 text-pink-400"
                : "border-zinc-700 text-gray-400 hover:border-pink-400 hover:text-pink-400"
            }`}
          >
            {liked ? "❤️" : "🤍"} {item.likes + (liked ? 1 : 0)}
          </button>
          <button
            onClick={handleCart}
            disabled={!inCart && count === 0}
            className={`flex-1 px-4 py-2 rounded-xl border text-sm transition ${
              inCart
                ? "bg-purple-500/20 border-purple-500 text-purple-400"
                : count === 0
                ? "border-zinc-800 text-zinc-700 cursor-not-allowed"
                : "border-zinc-700 text-gray-400 hover:border-purple-400 hover:text-purple-400"
            }`}
          >
            {inCart ? "✓ В корзине" : "Добавить в корзину"}
          </button>
        </div>
      </div>
    </div>
  );
});

export default ProductCard;
