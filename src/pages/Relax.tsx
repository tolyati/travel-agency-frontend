import { useState, useEffect } from "react";
import type { PageProps } from "../types";
import Header from "../components/Header";
import Loading from "../components/Loading";

export default function Relax(_: PageProps) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="text-center space-y-6 animate-fadeIn">
      <Header title="Релакс и SPA" subtitle="Найдите свой дзен в термальных источниках" />
      <img src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874" className="rounded-full mx-auto w-2/3" />
    </div>
  );
}