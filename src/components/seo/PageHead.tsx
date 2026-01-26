import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

interface PageHeadProps {
  titleKey: string;
  descriptionKey?: string;
}

export default function PageHead({ titleKey, descriptionKey }: PageHeadProps) {
  const { t, i18n } = useTranslation();

  const title = `${t(titleKey)} | Faariaz`;
  const description = descriptionKey ? t(descriptionKey) : "";

  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <Helmet>
      <html lang={i18n.language} />

      <title>{title}</title>
      <meta name="description" content={description} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
    </Helmet>
  );
}
