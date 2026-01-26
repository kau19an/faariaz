import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import "./App.css";
import "./i18n/i18n.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* todo: alterar esse feedback pra um esqueleto de fato */}
    <Suspense fallback="Loading...">
      <HelmetProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </HelmetProvider>
    </Suspense>
  </StrictMode>,
);
