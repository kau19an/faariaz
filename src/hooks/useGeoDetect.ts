import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const countryToLangMap: Record<string, string> = {
  BR: "br",
  US: "en",
  GB: "en",
  ES: "es",
  AR: "es",
  MX: "es",
  FR: "fr",
  DE: "de",
  IT: "it",
  JP: "jp",
  PT: "br",
};

export function useGeoDetect() {
  const { i18n } = useTranslation();

  const [suggestion, setSuggestion] = useState<{
    lang: string;
    countryCode: string;
  } | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const normalizeLang = (langCode: string) => {
    if (!langCode) return "";
    const code = langCode.toLowerCase();
    if (code === "pt" || code === "pt-br" || code.startsWith("pt-"))
      return "br";
    return code;
  };

  useEffect(() => {
    const checkGeo = async () => {
      const dismissed = localStorage.getItem("geo_banner_dismissed");
      if (dismissed) return;

      try {
        const response = await fetch("https://ipwho.is/");
        const data = await response.json();

        if (!data.success) return;

        const userCountryCode = data.country_code;
        const suggestedLang = countryToLangMap[userCountryCode];

        const currentLang = normalizeLang(i18n.language);
        const normalizedSuggestion = normalizeLang(suggestedLang);

        if (suggestedLang && normalizedSuggestion !== currentLang) {
          setSuggestion({
            lang: suggestedLang,
            countryCode: userCountryCode,
          });
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      } catch (error) {
        console.error("Erro Geo:", error);
      }
    };

    checkGeo();
  }, [i18n.language]);

  const dismiss = () => {
    setIsVisible(false);
    localStorage.setItem("geo_banner_dismissed", "true");
  };

  return { isVisible, suggestion, dismiss };
}
