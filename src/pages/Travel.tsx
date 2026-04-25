import { useState, useCallback, useMemo, useEffect } from "react";
import type { PageProps } from "../types";
import Header from "../components/Header";
import Loading from "../components/Loading";
import { tours } from "../data/products"; 
import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";
import FilterButtons from "../components/FilterButtons";
import ProductList from "../components/ProductList";
import Cart from "../components/Cart";
import type { CartItem } from "../components/Cart";

const countries = [...new Set(tours.map((t) => t.country))];

export default function Travel(_: PageProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="space-y-6 animate-fadeIn">
      <Header title="Путешествия" subtitle="Наши маршруты — это результат исследований" />
      <img src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f" className="rounded-3xl w-full object-cover" />
    </div>
  );
}
