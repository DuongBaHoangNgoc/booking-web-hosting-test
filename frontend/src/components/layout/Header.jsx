import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (!element) return;

    const headerOffset = 80; // chiều cao header
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });

    setMobileMenuOpen(false);
  };

  // Detect Scroll để thêm hiệu ứng bóng đổ
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Class hỗ trợ Active Link (Updated for Brighter Ocean Theme)
  const getLinkClass = (path) => {
    const isActive = location.pathname === path;
    return `px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
      isActive
        ? "bg-white/20 text-white shadow-sm backdrop-blur-sm" // Active: Nền trắng mờ
        : "text-blue-50 hover:text-white hover:bg-white/10" // Inactive: Text trắng ngà, hover trắng tinh
    }`;
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-gradient-to-r from-blue-600 to-cyan-500 shadow-lg shadow-cyan-500/20"
          : "bg-gradient-to-r from-blue-600/95 to-cyan-500/95 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 md:px-6 h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-xl flex items-center justify-center shadow-lg overflow-hidden group-hover:scale-105 transition-transform">
            <img
              src="/logos/logo-kyt.jpg"
              alt="Khúc Yêu Thương 2026"
              className="w-full h-full object-contain p-1"
            />
          </div>

          <span className="text-xl md:text-2xl font-bold tracking-tight text-white">
            Khúc yêu thương 2026
          </span>
        </Link>

        <div className="hidden md:flex flex-1 justify-center gap-4">
          <button
            onClick={() => scrollToSection("hero")}
            className={getLinkClass("")}
          >
            KYT 2026
          </button>

          <button
            onClick={() => scrollToSection("clb")}
            className={getLinkClass("")}
          >
            CLB Guitar DUE
          </button>

          <button
            onClick={() => scrollToSection("swing")}
            className={getLinkClass("")}
          >
            Swing Band
          </button>

          <button
            onClick={() => scrollToSection("contact")}
            className={getLinkClass("")}
          >
            Liên hệ
          </button>
        </div>

        {/* =========================================
          MENU Phải (DESKTOP)
        ========================================= */}
        <div className="hidden md:flex items-center gap-2">
          <Link to="/datve" className={getLinkClass("/datve")}>
            Đặt vé ngay
          </Link>
          <Link to="/tracuu" className={getLinkClass("/tracuu")}>
            Tra cứu vé
          </Link>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* =========================================
        MOBILE MENU
      ========================================= */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-xl absolute w-full left-0 top-20 animate-in slide-in-from-top-5">
          <div className="p-4 space-y-2">
            {/* Scroll sections */}
            <button
              onClick={() => scrollToSection("hero")}
              className="w-full text-left px-4 py-3 rounded-xl hover:bg-slate-100 text-slate-700 font-medium"
            >
              KYT 2026
            </button>

            <button
              onClick={() => scrollToSection("clb")}
              className="w-full text-left px-4 py-3 rounded-xl hover:bg-slate-100 text-slate-700 font-medium"
            >
              CLB Guitar DUE
            </button>

            <button
              onClick={() => scrollToSection("swing")}
              className="w-full text-left px-4 py-3 rounded-xl hover:bg-slate-100 text-slate-700 font-medium"
            >
              Swing Band
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="w-full text-left px-4 py-3 rounded-xl hover:bg-slate-100 text-slate-700 font-medium"
            >
              Liên hệ
            </button>

            <hr />

            {/* Routes */}
            <Link
              to="/datve"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-3 rounded-xl bg-blue-600 text-white font-semibold text-center"
            >
              Đặt vé ngay
            </Link>

            <Link
              to="/tracuu"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-3 rounded-xl border border-blue-600 text-blue-600 font-semibold text-center"
            >
              Tra cứu vé
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
