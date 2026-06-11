import { useState, useCallback, useMemo, useEffect } from "react";
import type { PageProps } from "../types";
import { sights } from "../data/products";

import Header from "../components/Header";
import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";
import FilterButtons from "../components/FilterButtons";
import SightList from "../components/SightList";
import Loading from "../components/Loading";
import { safeLower } from "../utils/safe";

const countries = [...new Set(sights.map((s) => s.country))];

export default function Sights({ setPage }: PageProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  const [search, setSearch] = useState("");
  const [activeCountry, setActiveCountry] = useState<string | null>("Все");
  const [likedIds, setLikedIds] = useState<Set<number>>(new Set());
  const [selectedSight, setSelectedSight] = useState<any | null>(null);

  const openSight = (item: any) => setSelectedSight(item);
  const closeSight = () => setSelectedSight(null);

  const toggleLike = useCallback((id: number) => {
    setLikedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  const filtered = useMemo(() => {
    return sights.filter((s) => {
      const matchesSearch = safeLower(s.name ?? "")
        .includes(search.trim().toLowerCase());

      const matchesCountry =
        activeCountry === "Все" || s.country === activeCountry;

      return matchesSearch && matchesCountry;
    });
  }, [search, activeCountry]);

  return loading ? (
    <Loading />
  ) : (
    <div className="space-y-4">
      <Header title="Удивительные Места" subtitle="Красота мира" />

      <Hero
        image="https://adventureswithamie.com/wp-content/uploads/2021/04/Chinaweb.jpg"
        title="Там, где замирает время"
        subtitle="Главные достопримечательности"
      />

      <SearchBar value={search} onChange={setSearch} placeholder="Поиск..." />

      <FilterButtons
        countries={countries}
        active={activeCountry}
        onSelect={setActiveCountry}
        likeCount={likedIds.size}
      />

      <SightList
        items={filtered}
        likedIds={likedIds}
        onToggleLike={toggleLike}
        onItemClick={openSight}
      />

      {/* MODAL */}
      {selectedSight && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          onClick={closeSight}
        >
          <div
            className="bg-zinc-900 p-6 w-[400px] rounded-lg space-y-3"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold">{selectedSight.name}</h2>

            <img
              src={selectedSight.img}
              className="w-full h-40 object-cover rounded"
            />

            <p className="text-gray-300">{selectedSight.description}</p>

            <p className="text-yellow-400 font-bold">
              {selectedSight.price} $
            </p>

            <button
              onClick={closeSight}
              className="bg-red-600 px-3 py-1 w-full"
            >
              Закрыть
            </button>
          </div>
        </div>
      )}
    </div>
  );
}