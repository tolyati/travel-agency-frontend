import { useState, useCallback, useMemo, useEffect } from "react";
import type { PageProps } from "../types";
import { salons } from "../data/products"; 
import Header from "../components/Header";
import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";
import FilterButtons from "../components/FilterButtons";
import ProductList from "../components/ProductList";
import Cart from "../components/Cart";
import type { CartItem } from "../components/Cart";
import Loading from "../components/Loading";
import { safeLower } from "../utils/safe";
import SalonDetailsModal from "../components/SalonDetailsModal";

const countries = [...new Set(salons.map((s) => s.country))];

export default function Relax({ setPage }: PageProps) {
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
  const [selectedSalon, setSelectedSalon] = useState<any | null>(null);

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
    return salons.filter((s) => {
      const matchesSearch = safeLower(s.name ?? "").includes(search.trim().toLowerCase());
      const matchesCountry = activeCountry === "Все" || activeCountry === "Понравившиеся" || s.country === activeCountry;
      const matchesLiked = activeCountry === "Понравившиеся" ? likedIds.has(s.id) : true;
      return matchesSearch && matchesCountry && matchesLiked;
    });
  }, [search, activeCountry, likedIds]);

  const cartItems = useMemo((): CartItem[] =>
    salons
      .filter((s) => cartIds.has(s.id))
      .map((s) => ({ id: s.id, name: s.name, img: s.img, price: s.price, count: 1 })),
    [cartIds]
  );

  return loading ? <Loading /> : (
    <div className="animate-fadeIn space-y-4">
      <Header title="Мир Релакса" subtitle="Лучшие SPA и оздоровительные центры мира" />
      <Hero
        image="https://i.etsystatic.com/isbl/265bdc/48233911/isbl_1680x420.48233911_i27aqdrv.jpg?version=0"
        title="Тишина и баланс"
        subtitle="Найдите идеальное место для восстановления сил"
      />
      <SearchBar value={search} onChange={setSearch} placeholder="Поиск процедур..." />
      <FilterButtons countries={countries} active={activeCountry} onSelect={handleFilterSelect} likeCount={likedIds.size} />
      <ProductList
        items={filtered}
        likedIds={likedIds}
        onToggleLike={toggleLike}
        cartIds={cartIds}
        counts={{}}
        onToggleCart={toggleCart}
        onCountChange={() => {}}
        onGoToLogin={() => setPage("login")}
        onItemClick={(item) => setSelectedSalon(item)}
      />
      <Cart items={cartItems} open={cartOpen} onOpen={() => setCartOpen(true)} onClose={() => setCartOpen(false)} onGoToLogin={() => setPage("login")} />
      {selectedSalon && (
        <SalonDetailsModal
          item={selectedSalon}
          onClose={() => setSelectedSalon(null)}
        />
      )}
    </div>
  );
}