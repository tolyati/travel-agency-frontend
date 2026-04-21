import { useState, useEffect } from "react";
import type { PageProps } from "../types";
import Header from "../components/Header";
import Loading from "../components/Loading";

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
