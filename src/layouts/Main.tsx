import { Outlet, useParams, useLocation, useNavigate } from "react-router-dom";
import { useLayoutEffect } from "react";
import { useTranslation } from "react-i18next";
import { supportedLngs } from "../i18n/i18n";
import NotFound from "../pages/NotFound";
import Header from "./Header";
import Footer from "./Footer";
import GeoBanner from "../components/ui/GeoBanner";

export default function Main() {
  const { i18n } = useTranslation();
  const { lang } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const isInvalidLang = lang && !supportedLngs.includes(lang);
  const isAdjusting = isInvalidLang && i18n.language !== "br";

  useLayoutEffect(() => {
    if (isInvalidLang) {
      if (i18n.language !== "br") i18n.changeLanguage("br");
      return;
    }

    if (lang && supportedLngs.includes(lang)) {
      if (i18n.language !== lang) i18n.changeLanguage(lang);
    } else if (!lang) {
      if (i18n.language !== "br") i18n.changeLanguage("br");
    }

    if (location.pathname !== "/" && !location.pathname.endsWith("/")) {
      navigate(location.pathname + "/", { replace: true });
    }
  }, [lang, i18n, location.pathname, navigate, isInvalidLang]);

  if (isAdjusting) return null;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 transition-colors duration-300 font-sans">
      <GeoBanner />
      {!isInvalidLang && <Header />}

      <main
        className={`grow flex flex-col px-5 md:px-15 pb-6 ${!isInvalidLang ? "pt-20" : ""}`}
      >
        {isInvalidLang ? <NotFound /> : <Outlet />}
      </main>

      {!isInvalidLang && <Footer />}
    </div>
  );
}
