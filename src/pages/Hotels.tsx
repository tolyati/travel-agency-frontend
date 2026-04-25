import { useState, useCallback, useMemo, useEffect } from "react";
import type { PageProps } from "../types";
import { hotels } from "../data/products"; 
import Header from "../components/Header";
import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";
import FilterButtons from "../components/FilterButtons";
import ProductList from "../components/ProductList";
import Cart from "../components/Cart";
import type { CartItem } from "../components/Cart";
import Loading from "../components/Loading";

const countries = [...new Set(hotels.map((h) => h.country))];

export default function Hotels(_: PageProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  const [search, setSearch] = useState("");
  const [activeCountry, setActiveCountry] = useState<string | null>("Все");
  const [likedIds, setLikedIds] = useState<Set<number>>(new Set());
  const [cartIds, setCartIds] = useState<Set<number>>(new Set());
  const [counts, setCounts] = useState<Record<number, number>>({});
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

  const handleCountChange = useCallback((id: number, val: number) => {
    setCounts((prev) => ({ ...prev, [id]: val }));
  }, []);

  const handleFilterSelect = useCallback((c: string) => {
    setActiveCountry((prev) => (prev === c ? null : c));
  }, []);

  const filtered = useMemo(() => {
    if (activeCountry === null) return [];
    return hotels.filter((h) => {
      const matchesSearch = h.name.toLowerCase().includes(search.trim().toLowerCase());
      const matchesCountry = activeCountry === "Все" || activeCountry === "Понравившиеся" || h.country === activeCountry;
      const matchesLiked = activeCountry === "Понравившиеся" ? likedIds.has(h.id) : true;
      return matchesSearch && matchesCountry && matchesLiked;
    });
  }, [search, activeCountry, likedIds]);

  const cartItems = useMemo((): CartItem[] =>
    hotels
      .filter((h) => cartIds.has(h.id))
      .map((h) => ({ id: h.id, name: h.name, img: h.img, price: h.price, count: counts[h.id] || 1 })),
    [cartIds, counts]
  );

  return loading ? <Loading /> : (
    <div className="animate-fadeIn space-y-4">
      <Header title="Выбирай отель по душе" subtitle="От домика на пляже до центра города - всё здесь" />
      <Hero
        image="https://www.homesforsaleintamarindo.com/wp-content/uploads/2019/11/Homes-For-Sale-in-Tamarindo-4-1.jpg"
        title="Ваш идеальный дом в путешествии"
        subtitle="От уютных бунгало до роскошных небоскребов"
      />
      <SearchBar value={search} onChange={setSearch} placeholder="Поиск отеля..." />
      <FilterButtons countries={countries} active={activeCountry} onSelect={handleFilterSelect} likeCount={likedIds.size} />
      <ProductList
        items={filtered}
        likedIds={likedIds}
        onToggleLike={toggleLike}
        cartIds={cartIds}
        counts={counts}
        onToggleCart={toggleCart}
        onCountChange={handleCountChange}
      />
      <Cart items={cartItems} open={cartOpen} onOpen={() => setCartOpen(true)} onClose={() => setCartOpen(false)} />
    </div>
  );
}