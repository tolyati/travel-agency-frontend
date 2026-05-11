import { useState, useEffect } from "react";
import type { PageProps } from "../types";
import { packages, type Package } from "../data/packages";
import Header from "../components/Header";
import Loading from "../components/Loading";
import BookingForm from "../components/BookingForm";
import { useAuth } from "../hooks/useAuth";
import type { Item } from "../data/products";

const tierStyles: Record<Package["tier"], { badge: string; border: string; glow: string }> = {
  econom:   { badge: "bg-zinc-700 text-zinc-300",        border: "border-zinc-700",       glow: "" },
  standard: { badge: "bg-blue-500/20 text-blue-400",     border: "border-blue-500/40",    glow: "" },
  pro:      { badge: "bg-purple-500/20 text-purple-400", border: "border-purple-500/40",  glow: "" },
  premium:  { badge: "bg-yellow-500/20 text-yellow-400", border: "border-yellow-500/40",  glow: "ring-1 ring-yellow-500/30" },
};

const tierLabels: Record<Package["tier"], string> = {
  econom: "Эконом", standard: "Стандарт", pro: "Про", premium: "Премиум ⭐",
};

function packageToItem(pkg: Package): Item {
  return { id: pkg.id, name: pkg.name, category: "package", country: "", description: pkg.description, img: pkg.img, price: pkg.price, likes: 0 };
}

export default function Packages({ setPage }: PageProps) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [bookingItem, setBookingItem] = useState<Item | null>(null);
  const [booked, setBooked] = useState<Set<number>>(new Set());

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  function handleBook(pkg: Package) {
    if (!user) { setPage("login"); return; }
    setBookingItem(packageToItem(pkg));
  }

  if (loading) return <Loading />;

  return (
    <div className="space-y-10 animate-fadeIn">
      <Header title="Туристические пакеты" subtitle="Выберите пакет, который подходит именно вам" />

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {packages.map((pkg) => {
          const style = tierStyles[pkg.tier];
          const isBooked = booked.has(pkg.id);
          return (
            <div key={pkg.id} className={`grid grid-rows-[auto_1fr_auto] bg-zinc-900 border ${style.border} ${style.glow} rounded-2xl overflow-hidden transition-all`}>
              <div className="relative">
                <img src={pkg.img} className="w-full h-44 object-cover" loading="lazy" />
                <span className={`absolute top-3 left-3 text-xs font-semibold px-3 py-1 rounded-full ${style.badge}`}>
                  {tierLabels[pkg.tier]}
                </span>
              </div>

              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-white font-bold text-lg">{pkg.name}</h3>
                  <span className="text-gray-400 text-xs">{pkg.duration}</span>
                </div>
                <p className="text-gray-400 text-sm">{pkg.description}</p>
                <ul className="space-y-1">
                  {pkg.includes.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-300 text-xs">
                      <span className="text-purple-400 shrink-0">✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-5 pt-0 space-y-3">
                <div className="flex items-center justify-between border-t border-zinc-800 pt-3">
                  <span className="text-gray-400 text-sm">Стоимость:</span>
                  <span className="text-purple-400 font-bold text-xl">${pkg.price}</span>
                </div>
                <button
                  onClick={() => isBooked
                    ? setBooked(prev => { const n = new Set(prev); n.delete(pkg.id); return n; })
                    : handleBook(pkg)
                  }
                  className={`w-full py-2.5 rounded-xl font-semibold text-sm transition ${
                    isBooked
                      ? "bg-purple-500/20 border border-purple-500 text-purple-400"
                      : "bg-purple-600 hover:bg-purple-500 text-white"
                  }`}
                >
                  {isBooked ? "✓ Забронировано" : "Забронировать"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {bookingItem && (
        <BookingForm
          item={bookingItem}
          onClose={() => setBookingItem(null)}
          onConfirm={() => {
            setBooked(prev => new Set(prev).add(bookingItem.id));
            setBookingItem(null);
          }}
        />
      )}
    </div>
  );
}
