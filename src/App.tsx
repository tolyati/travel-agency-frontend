import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
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
import type { Page, PageProps } from "./types";
import AdminPage from "./pages/Admin/AdminPage";

const pageMap: Record<Page, any> = {
  home: Home,
  travel: Travel,
  packages: Packages,
  relax: Relax,
  hotels: Hotels,
  sights: Sights,
  partners: Partners,
  faq: Faq,
  support: Support,
  login: Login,
  register: Register,
  unauthorized: Unauthorized,
  admin: AdminPage, 
};

function AppContent() {
  const [page, setPage] = useState<Page>("home");
  const [navOpen, setNavOpen] = useState(false);

  const { loading } = useAuth();

  if (loading) {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      Loading...
    </div>
  );
}

  const PageComponent = pageMap[page as keyof typeof pageMap];

  return (
    <div className="bg-black min-h-screen text-gray-300">
      <Navbar page={page} setPage={setPage} open={navOpen} setOpen={setNavOpen} />

      <main className="pt-24">
        <PageComponent setPage={setPage as any} />
      </main>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}