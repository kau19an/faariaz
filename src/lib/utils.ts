const localeMap: Record<string, string> = {
  br: "pt-BR",
  en: "en-US",
  es: "es-ES",
};

const timeSeparatorMap: Record<string, string> = {
  br: " às ",
  en: " at ",
  es: " a las ",
};

export function formatDate(dateString: string, lang: string = "br"): string {
  const date = new Date(dateString);
  const locale = localeMap[lang] || "pt-BR";

  const datePart = new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);

  const timePart = new Intl.DateTimeFormat(locale, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);

  const separator = timeSeparatorMap[lang] || " ";
  return `${datePart}${separator}${timePart}`;
}

export function getReadingTime(content: string): number {
  if (!content) return 1;
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

export function getLocalizedPath(path: string, currentLang: string): string {
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  if (currentLang === "br") return `/${cleanPath}`;
  return `/${currentLang}/${cleanPath}`;
}

export function removeMarkdown(markdown: string): string {
  if (!markdown) return "";

  return (
    markdown
      // Remove images: ![text](url)
      .replace(/!\[[^\]]*\]\([^)]+\)/g, "")

      // Remove links: [text](url) (only keeps "text")
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")

      // Remove titles: # Title
      .replace(/^#+\s+/gm, "")

      // Remove horizontal lines: --- or ***
      .replace(/^(?:---|__|\*\*\*)\s*$/gm, "")

      // Remove quotations: > ...
      .replace(/^>\s+/gm, "")

      // Transforms lists (- item) into visual bullets (• item)
      .replace(/^[\*\-]\s+/gm, " • ")

      // Remove inline code: `code`
      .replace(/`([^`]+)`/g, "$1")

      // Remove block code: ```...```
      .replace(/```[\s\S]*?```/g, "")

      // Remove extra spaces
      .trim()
  );
}
