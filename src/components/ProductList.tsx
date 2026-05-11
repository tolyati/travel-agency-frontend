import { memo } from "react";
import type { Item } from "../data/products";
import ProductCard from "./ProductCard";
import EmptyState from "./EmptyState";

interface ProductListProps {
  items: Item[];
  likedIds: Set<number>;
  onToggleLike: (id: number) => void;
  cartIds: Set<number>;
  counts: Record<number, number>;
  onToggleCart: (id: number) => void;
  onCountChange: (id: number, val: number) => void;
  onGoToLogin?: () => void;
}

const ProductList = memo(function ProductList({ items, likedIds, onToggleLike, cartIds, counts, onToggleCart, onCountChange, onGoToLogin }: ProductListProps) {
  if (items.length === 0) return <EmptyState />;

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <ProductCard
          key={item.id}
          item={item}
          liked={likedIds.has(item.id)}
          onToggleLike={onToggleLike}
          inCart={cartIds.has(item.id)}
          count={counts[item.id] || 0}
          onToggleCart={onToggleCart}
          onCountChange={onCountChange}
          onGoToLogin={onGoToLogin}
        />
      ))}
    </div>
  );
});

export default ProductList;
