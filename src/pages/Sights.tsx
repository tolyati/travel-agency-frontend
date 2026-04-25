import { useState, useCallback, useMemo, useEffect } from "react";
import type { PageProps } from "../types";
import { sights } from "../data/products"; 
import Header from "../components/Header";
import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";
import FilterButtons from "../components/FilterButtons";
import ProductList from "../components/ProductList";
import Cart from "../components/Cart";
import type { CartItem } from "../components/Cart";
import Loading from "../components/Loading";

const countries = [...new Set(sights.map((s) => s.country))];

export default function Sights(_: PageProps) {
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
    return sights.filter((s) => {
      const matchesSearch = s.name.toLowerCase().includes(search.trim().toLowerCase());
      const matchesCountry = activeCountry === "Все" || activeCountry === "Понравившиеся" || s.country === activeCountry;
      const matchesLiked = activeCountry === "Понравившиеся" ? likedIds.has(s.id) : true;
      return matchesSearch && matchesCountry && matchesLiked;
    });
  }, [search, activeCountry, likedIds]);

  const cartItems = useMemo((): CartItem[] =>
    sights
      .filter((s) => cartIds.has(s.id))
      .map((s) => ({ id: s.id, name: s.name, img: s.img, price: s.price, count: counts[s.id] || 1 })),
    [cartIds, counts]
  );

  return loading ? <Loading /> : (
    <div className="animate-fadeIn space-y-4">
      <Header title="Удивительные Места" subtitle="Прикоснитесь к истории и красоте нашей планеты" />
      <Hero
        image="https://adventureswithamie.com/wp-content/uploads/2021/04/Chinaweb.jpg"
        title="Там, где замирает время"
        subtitle="Главные достопримечательности, которые стоит увидеть хотя бы раз"
      />
      <SearchBar value={search} onChange={setSearch} placeholder="Поиск мест..." />
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