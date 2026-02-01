import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-4 bg-gray-100 dark:bg-zinc-800/50 text-center transition-colors">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-4">
        <p className="text-sm text-zinc-800 dark:text-gray-100 font-medium">
          © {currentYear} - Kauan Farias. {t("footer.rights")}
        </p>
      </div>
    </footer>
  );
}
