import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Travel from "./pages/Travel";
import Packages from "./pages/Packages";
import Relax from "./pages/Relax";
import Hotels from "./pages/Hotels";
import Sights from "./pages/Sights";
import Partners from "./pages/Partners";
import Faq from "./pages/Faq";
import Support from "./pages/Support";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Unauthorized from "./pages/Unauthorized";
import { AuthProvider } from "./context/AuthContext";
import { useAuth } from "./hooks/useAuth";
import { getRedirect } from "./guards/usePageGuard";
import type { Page, PageProps, Role } from "./types";
import type { ComponentType } from "react";
import AdminTours from "./pages/AdminTours";

const pageMap: Record<Page, ComponentType<PageProps>> = {
  home: Home, about: About, travel: Travel, packages: Packages,
  relax: Relax, hotels: Hotels, sights: Sights,
  partners: Partners, faq: Faq, support: Support,
  login: Login, register: Register, unauthorized: Unauthorized,
  adminTours: AdminTours
};

function AppContent() {
  const [page, setPage] = useState<Page>("home");
  const [returnTo, setReturnTo] = useState<Page>("home");
  const { user, loading } = useAuth();

  const userRole: Role = user ? (user.role.toLowerCase() as Role) : "guest";

  useEffect(() => {
    if (loading) return;
    const redirect = getRedirect(page, userRole);
    if (redirect) setPage(redirect);
  }, [page, userRole, loading]);

  // When user navigates to login/register, remember where they came from
  function navigate(p: Page) {
    if (p === "login" || p === "register") {
      setReturnTo(page);
    }
    setPage(p);
  }

  const PageComponent = pageMap[page];

  // Pass returnTo into Login/Register via a wrapped setPage
  function makeSetPage(returnPage: Page): (p: Page) => void {
    return (p: Page) => {
      if (p === "home" && (page === "login" || page === "register")) {
        setPage(returnPage);
      } else {
        navigate(p);
      }
    };
  }

  const pageProps: PageProps = {
    setPage: (page === "login" || page === "register")
      ? makeSetPage(returnTo)
      : navigate,
  };

  return (
    <div className="bg-black min-h-screen text-gray-300 font-sans">
      <Navbar page={page} setPage={navigate} />

      <main className="container mx-auto px-6 pt-32 pb-20">
        <PageComponent {...pageProps} />
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

export default function TravelApp() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
