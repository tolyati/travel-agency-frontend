import { memo } from "react";
import type { Item } from "../data/products";
import SightCard from "./SightCard";
import EmptyState from "./EmptyState";

interface Props {
  items: Item[];
  likedIds: Set<number>;
  onToggleLike: (id: number) => void;
  onItemClick: (item: Item) => void;
}

const SightList = memo(function SightList({
  items,
  likedIds,
  onToggleLike,
  onItemClick,
}: Props) {
  if (items.length === 0) return <EmptyState />;

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <SightCard
          key={item.id}
          item={item}
          liked={likedIds.has(item.id)}
          onToggleLike={onToggleLike}
          onClick={onItemClick}
        />
      ))}
    </div>
  );
});

export default SightList;