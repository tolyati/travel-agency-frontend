import { useState, useEffect } from "react";

export interface StoreProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: { rate: number; count: number };
  discount?: number;
}

export default function useFetchProducts() {
  const [products, setProducts] = useState<StoreProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => {
        if (!res.ok) throw new Error(`Ошибка сети: ${res.status} ${res.statusText}`);
        return res.json();
      })
      .then((data: StoreProduct[]) => {
  const withDiscounts = data.map((p) => ({
    ...p,

    discount:
      p.id === 1
        ? 25
        : p.id === 2
        ? 15
        : p.id === 3
        ? 10
        : undefined,
  }));

  setProducts(withDiscounts);
})
      .catch((e: unknown) => setError(e instanceof Error ? e.message : "Неизвестная ошибка"))
      .finally(() => setLoading(false));
  }, []);

  return { products, loading, error };
}
