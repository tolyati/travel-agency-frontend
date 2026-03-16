import { memo, useCallback } from "react";
import type { StoreProduct } from "../hooks/useFetchProducts";

interface StoreProductCardProps {
  product: StoreProduct;
  liked: boolean;
  onToggleLike: (id: number) => void;
  inCart: boolean;
  onToggleCart: (id: number) => void;
}

const StoreProductCard = memo(function StoreProductCard({ product, liked, onToggleLike, inCart, onToggleCart }: StoreProductCardProps) {
  const handleLike = useCallback(() => onToggleLike(product.id), [product.id, onToggleLike]);
  const handleCart = useCallback(() => onToggleCart(product.id), [product.id, onToggleCart]);

  return (
    <div className="grid grid-rows-[auto_1fr] bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-purple-500 transition-all hover:-translate-y-1">
      <div className="h-48 flex items-center justify-center bg-white p-4">
        <img src={product.image} className="h-full object-contain" loading="lazy" />
      </div>
      <div className="grid grid-rows-[auto_auto_1fr_auto] gap-2 p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-white font-semibold text-sm line-clamp-2">{product.title}</h3>
          <span className="text-purple-400 font-bold shrink-0">${product.price}</span>
        </div>
        <span className="text-xs text-zinc-500 border border-zinc-700 rounded-full px-2 py-0.5 w-fit">
          {product.category}
        </span>
        <p className="text-gray-400 text-xs line-clamp-2">{product.description}</p>
        <div className="flex gap-2 pt-2">
          <button
            onClick={handleLike}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl border text-sm transition ${
              liked
                ? "bg-pink-500/20 border-pink-500 text-pink-400"
                : "border-zinc-700 text-gray-400 hover:border-pink-400 hover:text-pink-400"
            }`}
          >
            {liked ? "❤️" : "🤍"} {product.rating.count + (liked ? 1 : 0)}
          </button>
          <button
            onClick={handleCart}
            className={`flex-1 px-4 py-2 rounded-xl border text-sm transition ${
              inCart
                ? "bg-purple-500/20 border-purple-500 text-purple-400"
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

export default StoreProductCard;
