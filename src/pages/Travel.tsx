import { useState, useCallback, useMemo, useEffect } from "react";
import type { PageProps } from "../types";
import { tours } from "../data/products";
import Header from "../components/Header";
import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";
import FilterButtons from "../components/FilterButtons";
import ProductList from "../components/ProductList";
import Cart from "../components/Cart";
import type { CartItem } from "../components/Cart";
import Loading from "../components/Loading";
import TourDetailsModal from "../components/TourDetailsModal";
import { safeLower } from "../utils/safe";

const countries = [...new Set(tours.map((t) => t.country))];

export default function Travel({ setPage }: PageProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  const [search, setSearch] = useState("");
  const [activeCountry, setActiveCountry] = useState<string | null>("Все");
  const [likedIds, setLikedIds] = useState<Set<number>>(new Set());
  const [cartIds, setCartIds] = useState<Set<number>>(new Set());
  const [cartOpen, setCartOpen] = useState(false);

  const [selectedTour, setSelectedTour] = useState<any | null>(null); // 👈 НОВОЕ

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

  const handleFilterSelect = useCallback((c: string) => {
    setActiveCountry((prev) => (prev === c ? null : c));
  }, []);

  const filtered = useMemo(() => {
    if (activeCountry === null) return [];
    return tours.filter((t) => {
      const matchesSearch = safeLower(t.name ?? "").includes(search.trim().toLowerCase());
      const matchesCountry =
        activeCountry === "Все" ||
        activeCountry === "Понравившиеся" ||
        t.country === activeCountry;

      const matchesLiked =
        activeCountry === "Понравившиеся" ? likedIds.has(t.id) : true;

      return matchesSearch && matchesCountry && matchesLiked;
    });
  }, [search, activeCountry, likedIds]);

  const cartItems = useMemo(
    (): CartItem[] =>
      tours
        .filter((t) => cartIds.has(t.id))
        .map((t) => ({
          id: t.id,
          name: t.name,
          img: t.img,
          price: t.price,
          count: 1,
        })),
    [cartIds]
  );

  return loading ? (
    <Loading />
  ) : (
    <div className="animate-fadeIn space-y-4">
      <Header title="Путешествия" subtitle="Отправляйтесь в незабываемые туры по всему миру" />

      <Hero
        image="https://media.istockphoto.com/id/1346345533/photo/commercial-airplane-flying-above-clouds.jpg"
        title="Открой для себя мир"
        subtitle="10 уникальных направлений для незабываемого отпуска"
      />

      <SearchBar value={search} onChange={setSearch} placeholder="Поиск туров..." />

      <FilterButtons
        countries={countries}
        active={activeCountry}
        onSelect={handleFilterSelect}
        likeCount={likedIds.size}
      />

      <ProductList
        items={filtered}
        likedIds={likedIds}
        cartIds={cartIds}
        counts={{}}
        onToggleLike={toggleLike}
        onToggleCart={toggleCart}
        onCountChange={() => {}}
        onGoToLogin={() => setPage("login")}
        onItemClick={(item) => setSelectedTour(item)} // 👈 КЛИК
      />

      <Cart
        items={cartItems}
        open={cartOpen}
        onOpen={() => setCartOpen(true)}
        onClose={() => setCartOpen(false)}
        onGoToLogin={() => setPage("login")}
      />

      {selectedTour && (
        <TourDetailsModal
          item={selectedTour}
          onClose={() => setSelectedTour(null)}
        />
      )}
    </div>
  );
}