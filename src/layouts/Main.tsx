import {
  Outlet,
  Link,
  useParams,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useLayoutEffect } from "react";
import { useTranslation } from "react-i18next";
import { supportedLngs } from "../i18n/i18n";
import LanguageSelector from "../components/ui/LanguageSelector";
import ThemeToggle from "../components/ui/ThemeToggle";
import GeoBanner from "../components/ui/GeoBanner";
import PersonaBanner from "../components/ui/PersonaBanner";
import NotFound from "../pages/NotFound";

export default function Main() {
  const { i18n } = useTranslation();
  const { lang } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const isInvalidLang = lang && !supportedLngs.includes(lang);
  const isAdjusting = isInvalidLang && i18n.language !== "br";

  useLayoutEffect(() => {
    if (isInvalidLang) {
      if (i18n.language !== "br") {
        i18n.changeLanguage("br");
      }
      return;
    }

    if (lang && supportedLngs.includes(lang)) {
      if (i18n.language !== lang) {
        i18n.changeLanguage(lang);
      }
    } else if (!lang) {
      if (i18n.language !== "br") {
        i18n.changeLanguage("br");
      }
    }

    if (location.pathname !== "/" && !location.pathname.endsWith("/")) {
      navigate(location.pathname + "/", { replace: true });
    }
  }, [lang, i18n, location.pathname, navigate, isInvalidLang]);

  if (isAdjusting) {
    return null;
  }

  const homeLink = i18n.language === "br" ? "/" : `/${i18n.language}`;

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 text-gray-900 dark:bg-neutral-900 dark:text-gray-50 transition-colors">
      <GeoBanner />
      <header
        className={`
          py-2 px-4 justify-between items-center sticky top-0 z-50 bg-neutral-50 dark:bg-neutral-900
          transition-colors ${isInvalidLang ? "hidden" : "flex"} 
        `}
      >
        <Link
          to={homeLink}
          className="flex items-center select-none hover:opacity-70 transition-opacity"
        >
          <img
            src="/assets/images/logo-200.png"
            className="w-14 h-14 select-none pointer-events-none"
            draggable="false"
            onContextMenu={(e) => e.preventDefault()}
          />
        </Link>
        <nav className="flex gap-4 items-center">
          <ThemeToggle />
          <LanguageSelector />
        </nav>
      </header>

      <main className="grow py-4 px-8">
        {isInvalidLang ? <NotFound /> : <Outlet />}
      </main>

      {!isInvalidLang && !isAdjusting && <PersonaBanner />}

      <footer
        className={`
          p-4 bg-gray-200 text-center text-sm transition-colors
          ${isInvalidLang ? "hidden" : "block"}
        `}
      >
        © 2026 Kauan Farias
      </footer>
    </div>
  );
}
