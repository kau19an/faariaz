import { useEffect } from "react";

type FaviconType = "default" | "gray";

export function useFavicon(type: FaviconType) {
  useEffect(() => {
    const folder =
      type === "gray" ? "/assets/favicons/gray" : "/assets/favicons";

    const updateLink = (selector: string, fileName: string) => {
      const link = document.querySelector(selector) as HTMLLinkElement;
      if (link) {
        link.href = `${folder}/${fileName}`;
      }
    };

    updateLink("link[rel='icon'][sizes='32x32']", "favicon-32x32.png");
    updateLink("link[rel='icon'][sizes='16x16']", "favicon-16x16.png");
    updateLink("link[rel='apple-touch-icon']", "apple-touch-icon.png");
    updateLink("link[rel='manifest']", "site.webmanifest");

    return () => {
      if (type === "gray") {
        const defaultFolder = "/assets/favicons";
        const resetLink = (sel: string, file: string) => {
          const l = document.querySelector(sel) as HTMLLinkElement;
          if (l) l.href = `${defaultFolder}/${file}`;
        };

        resetLink("link[rel='icon'][sizes='32x32']", "favicon-32x32.png");
        resetLink("link[rel='icon'][sizes='16x16']", "favicon-16x16.png");
        resetLink("link[rel='apple-touch-icon']", "apple-touch-icon.png");
        resetLink("link[rel='manifest']", "site.webmanifest");
      }
    };
  }, [type]);
}
