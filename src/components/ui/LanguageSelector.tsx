import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import { Globe, ChevronDown, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const languages = [
  { code: "br", label: "Português", flag: "🇧🇷" },
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "it", label: "Italiano", flag: "🇮🇹" },
  { code: "jp", label: "日本語", flag: "🇯🇵" },
];

export default function LanguageSelector() {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const currentLang =
    languages.find((l) => l.code === i18n.language) || languages[0];

  const handleLanguageChange = (newLangCode: string) => {
    localStorage.setItem("language", newLangCode);

    let currentPath = location.pathname;

    for (const lang of languages) {
      if (lang.code !== "br" && currentPath.startsWith(`/${lang.code}`)) {
        currentPath = currentPath.replace(`/${lang.code}`, "");
        break;
      }
    }
    if (!currentPath) currentPath = "/";

    let targetPath;
    if (newLangCode === "br") {
      targetPath = currentPath;
    } else {
      const suffix = currentPath === "/" ? "" : currentPath;
      targetPath = `/${newLangCode}${suffix}`;
    }

    if (targetPath !== "/" && !targetPath.endsWith("/")) {
      targetPath += "/";
    }

    navigate(targetPath);
    i18n.changeLanguage(newLangCode);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center gap-2 px-3 py-2 rounded-full border transition-all duration-200 cursor-pointer
          ${
            isOpen
              ? "border-blue-500 bg-blue-50 text-blue-600"
              : "border-gray-200 bg-gray-100 text-gray-700 hover:bg-gray-200"
          }
        `}
      >
        <Globe className="w-4 h-4" />
        <span className="text-sm font-medium hidden sm:block">
          {currentLang.label}
        </span>
        <ChevronDown
          className={`w-3 h-3 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute top-full right-0 mt-2 w-44 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50 origin-top-right"
            >
              <div className="max-h-64 overflow-y-auto py-2 custom-scrollbar text-center">
                <div className="px-3 pb-2 mb-2 border-b border-gray-100">
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    {t("select_lang")}
                  </span>
                </div>

                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className={`w-full text-left px-4 py-2.5 flex items-center justify-between transition-colors text-sm cursor-pointer
                      ${
                        i18n.language === lang.code
                          ? "bg-blue-50 text-blue-600 font-medium"
                          : "text-gray-600 hover:bg-gray-50"
                      }
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg leading-none filter">
                        {lang.flag}
                      </span>
                      <span>{lang.label}</span>
                    </div>
                    {i18n.language === lang.code && (
                      <motion.div layoutId="check-icon">
                        <Check className="w-4 h-4 text-blue-600" />
                      </motion.div>
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
