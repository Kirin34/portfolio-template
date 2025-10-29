"use client";

import { useState, useEffect } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-200"
          : "bg-transparent backdrop-blur-[2px]"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4 relative">
        {/* 🔹 Menu sinistro */}
        <nav
          className={`hidden md:flex items-center gap-10 text-lg font-sans transition-colors duration-300 ${
            scrolled ? "text-[--color-foreground]" : "text-white drop-shadow"
          }`}
        >
          <a href="#chi-sono" className="hover:text-[--color-primary] transition">
            Chi sono
          </a>
          <a href="#servizi" className="hover:text-[--color-primary] transition">
            Servizi
          </a>
        </nav>

        {/* 🎨 Logo centrale */}
        <a
          href="#top"
          className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center"
        >
          <img
            src="/logo.png"
            alt="Logo artista"
            className={`h-16 md:h-20 transition-all duration-300 ${
              scrolled
                ? "opacity-90 scale-95"
                : "opacity-100 scale-100 drop-shadow-[0_0_6px_rgba(255,255,255,0.5)]"
            }`}
          />
        </a>

        {/* 🔹 Menu destro */}
        <nav
          className={`hidden md:flex items-center gap-10 text-lg font-sans transition-colors duration-300 ${
            scrolled ? "text-[--color-foreground]" : "text-white drop-shadow"
          }`}
        >
          <a href="#portfolio" className="hover:text-[--color-primary] transition">
            Portfolio
          </a>
          <a href="#contatti" className="hover:text-[--color-primary] transition">
            Contatti
          </a>
        </nav>

        {/* 🔹 Hamburger mobile */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col justify-center space-y-1 focus:outline-none ml-auto"
          aria-label="Apri menu"
        >
          <span
            className={`block w-6 h-[2px] transition-all ${
              scrolled ? "bg-[--color-foreground]" : "bg-white"
            }`}
          ></span>
          <span
            className={`block w-6 h-[2px] transition-all ${
              scrolled ? "bg-[--color-foreground]" : "bg-white"
            }`}
          ></span>
          <span
            className={`block w-6 h-[2px] transition-all ${
              scrolled ? "bg-[--color-foreground]" : "bg-white"
            }`}
          ></span>
        </button>
      </div>

      {/* 🔹 Menu mobile */}
      {menuOpen && (
        <div className="md:hidden bg-white/95 border-t border-gray-200 px-6 py-4 text-center space-y-3 shadow-lg">
          <a href="#chi-sono" className="block" onClick={() => setMenuOpen(false)}>
            Chi sono
          </a>
          <a href="#servizi" className="block" onClick={() => setMenuOpen(false)}>
            Servizi
          </a>
          <a href="#portfolio" className="block" onClick={() => setMenuOpen(false)}>
            Portfolio
          </a>
          <a href="#contatti" className="block" onClick={() => setMenuOpen(false)}>
            Contatti
          </a>
        </div>
      )}
    </header>
  );
}
