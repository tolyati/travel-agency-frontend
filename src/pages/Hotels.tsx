import { useState, useEffect } from "react";
import type { PageProps } from "../types";
import Header from "../components/Header";
import Loading from "../components/Loading";

export default function Hotels(_: PageProps) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="space-y-6 animate-fadeIn">
      <Header title="Бутик-Отели" subtitle="Мы выбираем отели как искусство" />
      <div className="grid md:grid-cols-2 gap-6">
        <img src="https://images.unsplash.com/photo-1551882547-ff43c63efe81" className="rounded-2xl" />
        <img src="https://t4.ftcdn.net/jpg/09/12/90/33/360_F_912903382_mq5bts1Xw74KGFzHrvKWbjHAzA3XbGl5.jpg" className="rounded-2xl" />
      </div>
    </div>
  );
}
