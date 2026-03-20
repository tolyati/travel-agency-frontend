import { useState, useEffect } from "react";
import type { PageProps, Page } from "../types";

const slides: string[] = [
  "https://images.wondershare.com/filmora/article-images/travel-transition-reels-filmora-1.jpg",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
  "https://assets.hiltonstatic.com/hilton-asset-cache/image/upload/c_fill,w_1920,h_1080,q_70,f_auto,g_auto/Imagery/Property%20Photography/Canopy/S/SEZMAPY/compressed_HR__DJI_20240620172221_0048_D_PHOTO_drone__.jpg"
];

const cards: { title: string; img: string; page: Page }[] = [
  { title: "Приключения", img: slides[0], page: "travel" },
  { title: "Еда", img: slides[1], page: "food" },
  { title: "Отели", img: slides[2], page: "hotels" }
];

export default function Home({ setPage }: PageProps) {
  const [slideIndex, setSlideIndex] = useState<number>(0);

  const nextSlide = () => setSlideIndex((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setSlideIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-10 animate-fadeIn">
      <div className="relative rounded-3xl overflow-hidden border border-zinc-800 group">
        <div className="relative w-full h-96 overflow-hidden">
          {slides.map((src, i) => (
            <img
              key={i}
              src={src}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
                i === slideIndex ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>

        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white/10 hover:bg-purple-500/50 backdrop-blur-sm text-white/80 hover:text-white w-10 h-10 rounded-full flex items-center justify-center border border-white/10 hover:border-purple-400"
        >
          ‹
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white/10 hover:bg-purple-500/50 backdrop-blur-sm text-white/80 hover:text-white w-10 h-10 rounded-full flex items-center justify-center border border-white/10 hover:border-purple-400"
        >
          ›
        </button>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-black/80 to-transparent" />
        <div className="absolute bottom-8 left-10 text-white">
          <h1 className="text-4xl font-bold text-purple-300">Travel Aesthetic</h1>
        </div>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlideIndex(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === slideIndex ? "bg-purple-400 w-6" : "bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {cards.map((card, i) => (
          <div
            key={i}
            onClick={() => setPage(card.page)}
            className="cursor-pointer bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden transition hover:-translate-y-2 hover:border-purple-500"
          >
            <img src={card.img} className="h-52 w-full object-cover" />
            <div className="p-5">
              <h3 className="text-xl font-semibold text-white">{card.title}</h3>
              <p className="text-gray-400">Мир ждет вас.</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
