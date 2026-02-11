import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

interface SEOProps {
  title: string;
  description?: string;
  image?: string;
  type?: "website" | "article";
  slug?: string;
}

export default function SEO({
  title,
  description,
  image,
  type = "website",
  slug,
}: SEOProps) {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  // Default settings
  const siteName = "Kauan Farias";
  const defaultDescription = "Developer, traveler and tech enthusiast.";
  const siteUrl = "https://faariaz.vercel.app";
  const defaultImage = `${siteUrl}/assets/images/og-default.png`; // TODO
  const twitterHandle = "@kau19an";

  const metaDescription = description || defaultDescription;
  const metaImage = image
    ? image.startsWith("http")
      ? image
      : `${siteUrl}${image}`
    : defaultImage;

  const path = slug ? (slug.startsWith("/") ? slug : `/${slug}`) : "";
  const canonicalUrl =
    currentLang === "br"
      ? `${siteUrl}${path}`
      : `${siteUrl}/${currentLang}${path}`;

  const fullTitle = `${title} | ${siteName}`;

  return (
    <Helmet>
      <html lang={currentLang} />
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph (social medias) */}
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={currentLang} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />

      {/* X/Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={twitterHandle} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />

      {/* i18n alternates */}
      <link rel="alternate" hrefLang="pt-BR" href={`${siteUrl}${path}`} />
      <link rel="alternate" hrefLang="en" href={`${siteUrl}/en${path}`} />
      <link rel="alternate" hrefLang="es" href={`${siteUrl}/es${path}`} />
      <link rel="alternate" hrefLang="x-default" href={`${siteUrl}${path}`} />
    </Helmet>
  );
}
