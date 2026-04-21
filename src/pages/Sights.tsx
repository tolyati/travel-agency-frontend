import { useState, useEffect } from "react";
import type { PageProps } from "../types";
import Header from "../components/Header";
import Loading from "../components/Loading";

export default function Sights(_: PageProps) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="space-y-6 animate-fadeIn">
      <Header title="Архитектура" subtitle="Исследуйте великие сооружения человечества" />
      <img src="https://images.unsplash.com/photo-1503917988258-f19178c1ef5b" className="rounded-2xl shadow-xl" />
    </div>
  );
}
