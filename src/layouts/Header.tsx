import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Menu, X } from "lucide-react";
import ThemeToggle from "../components/ui/ThemeToggle";
import LanguageSelector from "../components/ui/LanguageSelector";
import { getLocalizedPath } from "../lib/utils";
import GeoBanner from "../components/ui/GeoBanner";

export default function Header() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const currentLang = i18n.language;

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { label: "menu.home", path: "/" },
    { label: "menu.blog", path: "blog" },
    { label: "menu.projects", path: "/projects" },
  ];
  const buttonStyles =
    "p-2 rounded-full border hover:bg-gray-200 dark:hover:bg-zinc-800 border-gray-200 dark:border-zinc-700 text-neutral-800 dark:text-gray-100 transition-colors";

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex flex-col transition-all duration-300 font-sans">
      <div className="relative z-60">
        <GeoBanner />
      </div>

      <header
        className={`w-full h-16 transition-all duration-300 bg-gray-50 text-neutral-800 dark:bg-zinc-900 dark:text-gray-100 relative z-50`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              to={getLocalizedPath("/", currentLang)}
              className="flex items-center hover:opacity-80 transition-opacity"
            >
              <img
                src="/assets/images/logo-200.png"
                className="w-12 h-12 object-contain select-none pointer-events-none"
              />
            </Link>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden ${buttonStyles}`}
            >
              {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>

          {/* Desktop: Menu */}
          <nav className="hidden md:flex items-center gap-6 absolute ml-18">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={getLocalizedPath(link.path, currentLang)}
                className="text-sm font-bold uppercase hover:underline hover:underline-offset-4 transition-colors hover:text-blue-600 dark:hover:text-yellow-400 dark:text-gray-100 text-neutral-800"
              >
                {t(link.label)}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <LanguageSelector />
          </div>
        </div>
      </header>

      {/* Mobile: Menu (dropdown) */}
      <div
        className={`absolute top-full left-0 w-full h-screen bg-gray-50 text-neutral-800 dark:bg-zinc-900 dark:text-gray-100 backdrop-blur-xl transition-all duration-300 origin-top z-40 ${
          isMobileMenuOpen
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible -translate-y-4 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col p-6 gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={getLocalizedPath(link.path, currentLang)}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-xl font-bold py-4 not-last:border-b border-gray-200 dark:border-zinc-800 hover:text-blue-600 dark:hover:text-yellow-400 hover:pl-2 transition-all uppercase"
            >
              {t(link.label)}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
