import ProductCard from "./ProductCard";
import type { Item } from "../data/products";

interface Props {
  items: Item[];
  likedIds: Set<number>;
  cartIds: Set<number>;
  counts: Record<number, number>;

  onToggleLike: (id: number) => void;
  onToggleCart: (id: number) => void;
  onCountChange: (id: number, val: number) => void;
  onGoToLogin?: () => void;

  onItemClick?: (item: Item) => void; 
}


export default function ProductList({
  items,
  likedIds,
  cartIds,
  counts,
  onToggleLike,
  onToggleCart,
  onCountChange,
  onGoToLogin,
  onItemClick,
}: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {items.map((item) => (
        <ProductCard
          key={item.id}
          item={item}
          liked={likedIds.has(item.id)}
          inCart={cartIds.has(item.id)}
          count={counts[item.id] || 0}
          onToggleLike={onToggleLike}
          onToggleCart={onToggleCart}
          onCountChange={onCountChange}
          onGoToLogin={onGoToLogin}
          onClick={onItemClick} // 👈 ПРОБРОС
        />
      ))}
    </div>
  );
}