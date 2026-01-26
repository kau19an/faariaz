import { Routes, Route } from "react-router-dom";
import Main from "./layouts/Main";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import LanguageRedirector from "./components/LanguageRedirector";

function App() {
  return (
    <>
      <LanguageRedirector />

      <Routes>
        <Route path="/" element={<Main />}>
          <Route index element={<Home />} />
        </Route>

        <Route path="/:lang" element={<Main />}>
          <Route index element={<Home />} />
        </Route>

        <Route path="/:lang/*" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
