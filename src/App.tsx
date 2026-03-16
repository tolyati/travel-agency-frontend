import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Travel from "./pages/Travel";
import Food from "./pages/Food";
import Relax from "./pages/Relax";
import Hotels from "./pages/Hotels";
import Sights from "./pages/Sights";
import Partners from "./pages/Partners";
import Faq from "./pages/Faq";
import Support from "./pages/Support";
import type { Page, PageProps } from "./types";
import type { ComponentType } from "react";

const pageMap: Record<Page, ComponentType<PageProps>> = {
  home: Home, about: About, travel: Travel, food: Food,
  relax: Relax, hotels: Hotels, sights: Sights,
  partners: Partners, faq: Faq, support: Support
};

export default function TravelApp() {
  const [page, setPage] = useState<Page>("home");
  const PageComponent = pageMap[page];

  return (
    <div className="bg-black min-h-screen text-gray-300 font-sans">
      <Navbar page={page} setPage={setPage} />

      <main className="container mx-auto px-6 pt-32 pb-20">
        <PageComponent setPage={setPage} />
      </main>

      <Footer />

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
