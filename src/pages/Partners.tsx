import { useState, useMemo, useCallback } from "react";
import type { PageProps } from "../types";
import useFetchProducts from "../hooks/useFetchProducts";
import StoreProductCard from "../components/StoreProductCard";
import Cart from "../components/Cart";
import Loading from "../components/Loading";
import ErrorState from "../components/ErrorState";
import type { CartItem } from "../components/Cart";
import EmptyState from "../components/EmptyState";

const categoryLabels: Record<string, string> = {
  all: "Все",
  liked: "Понравившиеся",
  electronics: "Электроника",
  jewelery: "Ювелирные украшения",
  "men's clothing": "Мужская одежда",
  "women's clothing": "Женская одежда",
};

const categories = Object.keys(categoryLabels);

export default function Partners(_: PageProps) {
  const { products, loading, error } = useFetchProducts();
  const [activeCategory, setActiveCategory] = useState<string | null>("all");
  const [likedIds, setLikedIds] = useState<Set<number>>(new Set());
  const [cartIds, setCartIds] = useState<Set<number>>(new Set());
  const [cartOpen, setCartOpen] = useState(false);

  const toggleLike = useCallback((id: number) => {
    setLikedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  const toggleCart = useCallback((id: number) => {
    setCartIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  const handleCategorySelect = useCallback((c: string) => {
    setActiveCategory((prev) => (prev === c ? null : c));
  }, []);

  const filtered = useMemo(() => {
    if (activeCategory === null) return [];
    if (activeCategory === "all") return products;
    if (activeCategory === "liked") return products.filter((p) => likedIds.has(p.id));
    return products.filter((p) => p.category === activeCategory);
  }, [products, activeCategory, likedIds]);

  const cartItems = useMemo((): CartItem[] =>
    products
      .filter((p) => cartIds.has(p.id))
      .map((p) => ({ id: p.id, name: p.title, img: p.image, price: p.price, count: 1 })),
    [products, cartIds]
  );

  return (
    <div className="animate-fadeIn space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-purple-400">Популярные товары</h1>
        <p className="text-gray-400">Лучшие товары от наших партнёров</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => handleCategorySelect(c)}
            className={`px-4 py-1.5 rounded-full text-sm border transition ${
              activeCategory === c
                ? "bg-purple-500 border-purple-500 text-white"
                : "border-zinc-700 text-gray-400 hover:border-purple-400 hover:text-purple-400"
            }`}
          >
            {c === "liked" ? `❤️ Понравившиеся${likedIds.size > 0 ? ` (${likedIds.size})` : ""}` : categoryLabels[c]}
          </button>
        ))}
      </div>

      {error && <ErrorState message={error} />}

      {!error && loading && <Loading />}

      {!error && !loading && filtered.length === 0 && <EmptyState />}

      {!error && !loading && filtered.length > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <StoreProductCard
              key={p.id}
              product={p}
              liked={likedIds.has(p.id)}
              onToggleLike={toggleLike}
              inCart={cartIds.has(p.id)}
              onToggleCart={toggleCart}
            />
          ))}
        </div>
      )}

      <Cart items={cartItems} open={cartOpen} onOpen={() => setCartOpen(true)} onClose={() => setCartOpen(false)} />
    </div>
  );
}
