import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { MapPinOff, ArrowLeft, Search, FileX, Fingerprint } from "lucide-react";
import { useFavicon } from "../hooks/useFavicon";
import PageHead from "../components/seo/PageHead";
import ThemeToggle from "../components/ui/ThemeToggle";
import LanguageSelector from "../components/ui/LanguageSelector";

export default function NotFound() {
  useFavicon("gray");
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const currentLangPrefix = location.pathname.split("/")[1];
  const supportedLngs = ["en", "es", "fr", "de", "it", "jp"];
  const isForeignLang = supportedLngs.includes(currentLangPrefix);
  const backLink = isForeignLang ? `/${currentLangPrefix}` : "/";

  useEffect(() => {
    if (!isForeignLang) {
      const savedLang = localStorage.getItem("language");
      if (savedLang === "br" || savedLang === "pt-BR" || savedLang === "pt") {
        return;
      }

      const browserLang = navigator.language.split("-")[0].toLowerCase();

      if (supportedLngs.includes(browserLang)) {
        if (i18n.language !== browserLang) {
          i18n.changeLanguage(browserLang);
        }

        navigate(`/${browserLang}${location.pathname}`, { replace: true });
      }
    }
  }, [i18n, location.pathname, navigate, isForeignLang]);

  const containerVars = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.1 },
    },
  };

  const itemVars = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <PageHead titleKey="title.notfound" />

      <div className="hidden">
        <ThemeToggle />
        <LanguageSelector />
      </div>

      <div
        key={location.pathname}
        className="fixed inset-0 z-50 overflow-y-auto bg-gray-50 dark:bg-gray-900 transition-colors duration-300"
      >
        <motion.div
          variants={containerVars}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center justify-center min-h-full w-full px-6 py-12 text-center"
        >
          <motion.div variants={itemVars} className="relative mb-8 z-10">
            <h1 className="text-9xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-gray-200 to-gray-400 dark:from-gray-800 dark:to-gray-700 select-none">
              404
            </h1>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-600">
              <MapPinOff size={64} strokeWidth={1.5} />
            </div>
          </motion.div>

          <motion.div
            variants={itemVars}
            className="max-w-2xl mx-auto space-y-4 mb-12 z-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">
              {t("notfound.headline")}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {t("notfound.subheadline")}
            </p>
          </motion.div>

          <motion.div
            variants={itemVars}
            className="w-full max-w-lg min-h-70 flex flex-col justify-center bg-white dark:bg-gray-800/50 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 mb-10 text-left shadow-sm backdrop-blur-sm z-10 transition-all"
          >
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-6 border-b border-gray-200 dark:border-gray-700 pb-2">
              {t("notfound.reasons_title")}
            </h3>

            <ul className="space-y-5">
              <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-md shrink-0">
                  <Fingerprint size={18} />
                </div>
                <span className="text-sm leading-relaxed">
                  {t("notfound.reason_1")}
                </span>
              </li>
              <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-md shrink-0">
                  <FileX size={18} />
                </div>
                <span className="text-sm leading-relaxed">
                  {t("notfound.reason_2")}
                </span>
              </li>
              <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                <div className="p-2 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-md shrink-0">
                  <Search size={18} />
                </div>
                <span className="text-sm leading-relaxed">
                  {t("notfound.reason_3")}
                </span>
              </li>
            </ul>
          </motion.div>

          <motion.div variants={itemVars} className="z-10">
            <Link
              to={backLink}
              className="group flex items-center gap-2 px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold transition-all shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40 hover:-translate-y-0.5"
            >
              <ArrowLeft
                size={20}
                className="group-hover:-translate-x-1 transition-transform"
              />
              {t("button.return_home")}
            </Link>
          </motion.div>

          <div className="absolute inset-0 pointer-events-none opacity-30 dark:opacity-10 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-blue-100 via-transparent to-transparent dark:from-blue-900/20"></div>
        </motion.div>
      </div>
    </>
  );
}
