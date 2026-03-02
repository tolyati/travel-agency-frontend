import { useState, useEffect } from "react";

const pages = [
  "home",
  "about",
  "travel",
  "food",
  "relax",
  "hotels",
  "sights",
  "popular",
  "faq",
  "support"
];


export default function TravelApp() {
  const [page, setPage] = useState("home");

  const slides = [
  "https://images.unsplash.com/photo-1503220317375-aaad61436b1b",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
  "https://images.unsplash.com/photo-1566073771259-6a8506099945"
];

const [slideIndex, setSlideIndex] = useState(0);

const nextSlide = () => {
  setSlideIndex((prev) => (prev + 1) % slides.length);
};

const prevSlide = () => {
  setSlideIndex((prev) =>
    prev === 0 ? slides.length - 1 : prev - 1
  );
};

useEffect(() => {
  const interval = setInterval(() => {
    nextSlide();
  }, 5000); 

  return () => clearInterval(interval);
}, []);

  const renderPage = () => {
    switch (page) {
      case "home":
        return (
          <div className="space-y-10 animate-fadeIn">

  <div className="relative rounded-3xl overflow-hidden border border-zinc-800">

    <img
      src={slides[slideIndex]}
      className="w-full h-125 object-cover transition-all duration-700 ease-in-out"
    />

    <button
      onClick={prevSlide}
      className="absolute left-5 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-purple-500/70 text-white p-3 rounded-full transition"
    >
      ◀
    </button>

    
    <button
      onClick={nextSlide}
      className="absolute right-5 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-purple-500/70 text-white p-3 rounded-full transition"
    >
      ▶
    </button>

 
    <div className="absolute bottom-10 left-10 text-white">
      <h1 className="text-4xl font-bold text-purple-300">
        Travel Aesthetic
      </h1>
      <p className="text-gray-300 mt-2">
        My First Tailwind React Page
      </p>
    </div>
  </div>


  <div className="grid md:grid-cols-3 gap-6">
    {[
      {
        title: "Приключения",
        img: "https://images.unsplash.com/photo-1503220317375-aaad61436b1b",
        page: "travel"
      },
      {
        title: "Еда",
        img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
        page: "food"
      },
      {
        title: "Отели",
        img: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
        page: "hotels"
      }
    ].map((card, i) => (
      <div
        key={i}
        onClick={() => setPage(card.page)}
        className="cursor-pointer bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden transition hover:-translate-y-2 hover:border-purple-500"
      >
        <img
          src={card.img}
          className="h-52 w-full object-cover"
        />
        <div className="p-5">
          <h3 className="text-xl font-semibold text-white">
            {card.title}
          </h3>
          <p className="text-gray-400">Мир ждет вас.</p>
        </div>
      </div>
    ))}
  </div>

</div>
        );

      case "about":
        return (
          <div className="grid md:grid-cols-2 gap-8 items-center animate-fadeIn">
            <div>
              <h1 className="text-3xl text-purple-400 mb-6">
                О нашем проекте
              </h1>
              <p className="text-lg text-gray-300 leading-relaxed">
                Мы создали сайт используя HTML, CSS и React + Tailwind.
                Наша цель — показать красоту мира.
              </p>
            </div>

            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
              className="rounded-3xl"
            />
          </div>
        );

      case "travel":
        return (
          <div className="space-y-6 animate-fadeIn">
            <h1 className="text-3xl text-purple-400">Путешествия</h1>
            <img
              src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f"
              className="rounded-3xl w-full object-cover"
            />
            <p className="text-gray-300 text-lg">
              Наши маршруты — это результат исследований.
            </p>
          </div>
        );

      case "food":
        return (
          <div className="grid md:grid-cols-2 gap-8 animate-fadeIn">
            <img
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4"
              className="rounded-2xl"
            />
            <p className="text-gray-300 text-xl self-center">
              Путешествуйте через вкусы лучших ресторанов Европы и Азии.
            </p>
          </div>
        );

      case "relax":
        return (
          <div className="text-center space-y-6 animate-fadeIn">
            <h1 className="text-3xl text-purple-400">Релакс и SPA</h1>
            <img
              src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874"
              className="rounded-full mx-auto w-2/3"
            />
            <p className="text-gray-300">
              Найдите свой дзен в термальных источниках.
            </p>
          </div>
        );

      case "hotels":
        return (
          <div className="space-y-6 animate-fadeIn">
            <h1 className="text-3xl text-purple-400">Бутик-Отели</h1>

            <div className="grid md:grid-cols-2 gap-6">
              <img
                src="https://images.unsplash.com/photo-1551882547-ff43c63efe81"
                className="rounded-2xl"
              />
              <img
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945"
                className="rounded-2xl"
              />
            </div>

            <p className="text-gray-300">
              Мы выбираем отели как искусство.
            </p>
          </div>
        );

      case "sights":
        return (
          <div className="space-y-6 animate-fadeIn">
            <h1 className="text-3xl text-purple-400">Архитектура</h1>
            <p className="text-gray-300 text-lg">
              Исследуйте великие сооружения человечества.
            </p>

            <img
              src="https://images.unsplash.com/photo-1503917988258-f19178c1ef5b"
              className="rounded-2xl shadow-xl"
            />
          </div>
        );

      case "popular":
        return (
          <ul className="text-xl text-gray-300 space-y-3 animate-fadeIn">
            <li>1. Исландия</li>
            <li>2. Япония</li>
            <li>3. Норвегия</li>
          </ul>
        );

      case "faq":
        return (
          <div className="space-y-4 animate-fadeIn">
            {[
              {
                q: "Что такое HTML?",
                a: "HTML — основа создания веб сайтов."
              },
              {
                q: "Что такое CSS?",
                a: "Язык стилизации веб страниц."
              }
            ].map((item, i) => (
              <details
                key={i}
                className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 cursor-pointer"
              >
                <summary className="text-white font-medium">
                  {item.q}
                </summary>
                <p className="text-gray-400 mt-3">{item.a}</p>
              </details>
            ))}
          </div>
        );

      case "support":
        return (
          <div className="text-center border border-zinc-800 rounded-3xl p-12 space-y-5 animate-fadeIn">
            <p className="text-gray-300">📞 8 (800) 555-35-35</p>
            <p className="text-gray-300">✉️ support@aesthetic.travel</p>

            <button className="px-6 py-3 border border-purple-500 text-purple-400 rounded-xl hover:bg-purple-500 hover:text-white transition">
              Начать чат
            </button>
          </div>
        );
    }
  };

  return (
    <div className="bg-black min-h-screen text-gray-300 font-sans">
      <header className="fixed top-0 w-full backdrop-blur-xl bg-black/80 border-b border-zinc-800 z-50">
        <nav className="container mx-auto flex flex-wrap justify-center gap-2 p-4 text-xs uppercase font-semibold">
          {pages.map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`px-3 py-2 rounded-md transition ${
                page === p
                  ? "text-purple-400 bg-purple-500/10"
                  : "hover:text-purple-400"
              }`}
            >
              {p === "home"
                ? "Главная"
                : p === "about"
                ? "О нас"
                : p === "travel"
                ? "Путешествия"
                : p === "food"
                ? "Еда"
                : p === "relax"
                ? "Отдых"
                : p === "hotels"
                ? "Отели"
                : p === "sights"
                ? "Места"
                : p === "popular"
                ? "Популярное"
                : p === "faq"
                ? "FAQ"
                : "Поддержка"}
            </button>
          ))}
        </nav>
      </header>

     
      <main className="container mx-auto px-6 pt-32 pb-20">
        {renderPage()}
      </main>

      <footer className="bg-zinc-900 border-t border-zinc-800 text-center p-10 mt-20">
        © 2026 | Travel Aesthetic React Tailwind Version
      </footer>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease forwards;
        }
      `}</style>
    </div>
  );
}