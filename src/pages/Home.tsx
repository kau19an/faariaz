import { useTranslation } from "react-i18next";
import SEO from "../components/seo/SEO";

export default function Home() {
  const { t } = useTranslation();

  return (
    <>
      <SEO
        title={t("title.home")}
        description="Página inicial de Kauan Farias, apresentando uma visão geral de seus projetos, habilidades e experiências como desenvolvedor."
        slug="/"
      />

      <div className="text-center">
        <h1 className="text-xl font-bold mb-2">{t("wip.title")}</h1>
        <p>{t("wip.text")}</p>
      </div>
    </>
  );
}
