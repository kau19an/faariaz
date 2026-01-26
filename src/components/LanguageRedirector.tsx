import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";

export default function LanguageRedirector() {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      const savedLang = localStorage.getItem("language");

      if (savedLang === "br" || savedLang === "pt-BR" || savedLang === "pt") {
        return;
      }

      const detectedLang = i18n.language;

      if (detectedLang && detectedLang !== "br" && detectedLang !== "pt-BR") {
        const supported = ["en", "es", "fr", "de", "it", "jp"];

        if (supported.includes(detectedLang)) {
          navigate(`/${detectedLang}`, { replace: true });
        }
      }
    }
  }, [i18n.language, location.pathname, navigate]);

  return null;
}
