import { useState, useEffect } from "react";

const slides = [
  "https://images.unsplash.com/photo-1503220317375-aaad61436b1b",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
  "https://images.unsplash.com/photo-1566073771259-6a8506099945"
];

const cards = [
  { title: "Приключения", img: slides[0], page: "travel" },
  { title: "Еда", img: slides[1], page: "food" },
  { title: "Отели", img: slides[2], page: "hotels" }
];

export default function Home({ setPage }) {
  const [slideIndex, setSlideIndex] = useState(0);

  const nextSlide = () => setSlideIndex((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setSlideIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-10 animate-fadeIn">
      <div className="relative rounded-3xl overflow-hidden border border-zinc-800">
        <img src={slides[slideIndex]} className="w-full h-125 object-cover transition-all duration-700 ease-in-out" />
        <button onClick={prevSlide} className="absolute left-5 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-purple-500/70 text-white p-3 rounded-full transition">◀</button>
        <button onClick={nextSlide} className="absolute right-5 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-purple-500/70 text-white p-3 rounded-full transition">▶</button>
        <div className="absolute bottom-10 left-10 text-white">
          <h1 className="text-4xl font-bold text-purple-300">Travel Aesthetic</h1>
          <p className="text-gray-300 mt-2">My First Tailwind React Page</p>
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
