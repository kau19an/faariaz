import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, X } from "lucide-react";
import { useTranslation, Trans } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import { useGeoDetect } from "../../hooks/useGeoDetect";

const intlLocaleMap: Record<string, string> = {
  br: "pt-BR",
  en: "en-US",
  es: "es-ES",
  fr: "fr-FR",
  de: "de-DE",
  it: "it-IT",
  jp: "ja-JP",
};

const isoLangMap: Record<string, string> = {
  br: "pt",
  en: "en",
  es: "es",
  fr: "fr",
  de: "de",
  it: "it",
  jp: "ja",
};

export default function GeoBanner() {
  const { i18n } = useTranslation();
  const { isVisible, suggestion, dismiss } = useGeoDetect();
  const navigate = useNavigate();
  const location = useLocation();

  const [customT, setCustomT] = useState<any>(null);
  const [pendingLang, setPendingLang] = useState<string | null>(null);

  useEffect(() => {
    if (suggestion) {
      if (i18n.hasResourceBundle(suggestion.lang, "translation")) {
        setCustomT(() => i18n.getFixedT(suggestion.lang));
      } else {
        const i18nAny = i18n as any;
        if (i18nAny.loadLanguages) {
          i18nAny.loadLanguages([suggestion.lang], () => {
            setCustomT(() => i18n.getFixedT(suggestion.lang));
          });
        }
      }
    }
  }, [suggestion, i18n]);

  if (!suggestion || !customT) return null;

  const normalizeLang = (code: string) => {
    const lower = code?.toLowerCase() || "";
    if (lower === "pt" || lower === "pt-br" || lower.startsWith("pt-"))
      return "br";
    return lower;
  };

  if (normalizeLang(i18n.language) === normalizeLang(suggestion.lang)) {
    return null;
  }

  const targetLocale = intlLocaleMap[suggestion.lang] || "en-US";

  let translatedCountry = suggestion.countryCode;
  try {
    const regionNames = new Intl.DisplayNames([targetLocale], {
      type: "region",
    });
    translatedCountry =
      regionNames.of(suggestion.countryCode) || suggestion.countryCode;
  } catch (e) {}

  let translatedLangName = suggestion.lang;
  try {
    const langNames = new Intl.DisplayNames([targetLocale], {
      type: "language",
    });
    const isoCode = isoLangMap[suggestion.lang] || suggestion.lang;
    translatedLangName = langNames.of(isoCode) || suggestion.lang;
    translatedLangName =
      translatedLangName.charAt(0).toUpperCase() + translatedLangName.slice(1);
  } catch (e) {}

  const handleSwitch = () => {
    setPendingLang(suggestion.lang);
    dismiss();
  };

  const onAnimationComplete = () => {
    if (!pendingLang) return;

    localStorage.setItem("language", pendingLang);

    const newLang = pendingLang;
    let currentPath = location.pathname;

    const currentLang = i18n.language;
    if (currentLang !== "br" && currentPath.startsWith(`/${currentLang}`)) {
      currentPath = currentPath.replace(`/${currentLang}`, "");
    }
    if (!currentPath) currentPath = "/";

    let targetPath =
      newLang === "br"
        ? currentPath
        : `/${newLang}${currentPath === "/" ? "" : currentPath}`;

    if (targetPath !== "/" && !targetPath.endsWith("/")) {
      targetPath += "/";
    }

    i18n.changeLanguage(newLang);
    navigate(targetPath);
    setPendingLang(null);
  };

  return (
    <AnimatePresence onExitComplete={onAnimationComplete}>
      {isVisible && (
        <motion.div
          key="geo-banner"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="bg-blue-600 text-white relative z-40 overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-full">
                <Globe size={16} />
              </div>
              <p>
                <Trans
                  t={customT}
                  i18nKey="geo_banner.text"
                  values={{
                    country: translatedCountry,
                    lang: translatedLangName,
                  }}
                  components={{
                    strong: <strong className="font-bold text-white" />,
                  }}
                />
              </p>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={handleSwitch}
                className="flex-1 sm:flex-none px-4 py-1.5 bg-white text-blue-600 font-semibold rounded-full hover:bg-blue-50 transition-colors shadow-sm whitespace-nowrap"
              >
                {customT("geo_banner.yes", { lang: translatedLangName })}
              </button>

              <button
                onClick={dismiss}
                className="p-1.5 hover:bg-white/20 rounded-full transition-colors"
              >
                <X size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
