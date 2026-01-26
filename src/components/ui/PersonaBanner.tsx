import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Briefcase, Gamepad2, Key, Plane } from "lucide-react";
import { usePersona } from "../../hooks/usePersona";

export default function PersonaBanner() {
  const { t } = useTranslation();
  const { mode, setPersona } = usePersona();

  const isPro = mode === "pro";

  const handleSwitch = () => {
    setPersona(isPro ? "casual" : "pro");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="w-full py-12 px-4 md:px-8">
      <motion.div
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        className={`
          relative w-full max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-2xl cursor-pointer group
          ${
            isPro
              ? "bg-linear-to-r from-indigo-900 via-purple-900 to-black"
              : "bg-linear-to-r from-slate-900 via-slate-800 to-gray-900"
          }
        `}
        onClick={handleSwitch}
      >
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-overlay"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between p-8 md:p-12 gap-6">
          <div className="flex flex-col gap-4 text-center md:text-left items-center md:items-start">
            <div className="flex items-center gap-3 mb-2">
              <span
                className={`p-3 rounded-2xl ${isPro ? "bg-pink-500/20 text-pink-300" : "bg-blue-500/20 text-blue-300"}`}
              >
                {isPro ? <Gamepad2 size={32} /> : <Briefcase size={32} />}
              </span>
              <span className="text-sm font-bold tracking-wider uppercase text-white/60">
                {t(
                  isPro
                    ? "persona_banner.label_casual"
                    : "persona_banner.label_pro",
                )}
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-white max-w-2xl">
              {t(
                isPro
                  ? "persona_banner.title_casual"
                  : "persona_banner.title_pro",
              )}
            </h2>

            <p className="text-white/80 max-w-xl text-lg text-justify">
              {t(
                isPro
                  ? "persona_banner.desc_casual"
                  : "persona_banner.desc_pro",
              )}
            </p>
          </div>

          <div className="shrink-0">
            <button
              className={`
                flex items-center gap-2 px-8 py-4 rounded-full font-bold transition-all duration-300 shadow-lg group-hover:gap-4
                ${
                  isPro
                    ? "bg-white text-purple-900 hover:bg-pink-50"
                    : "bg-white text-slate-900 hover:bg-blue-50"
                }
              `}
            >
              {t(
                isPro
                  ? "persona_banner.button_casual"
                  : "persona_banner.button_pro",
              )}

              {isPro ? <Plane size={20} /> : <Key size={20} />}
            </button>
          </div>
        </div>

        <div
          className={`absolute -bottom-24 -right-24 w-64 h-64 rounded-full blur-3xl opacity-40 ${isPro ? "bg-pink-600" : "bg-blue-600"}`}
        ></div>
        <div
          className={`absolute -top-24 -left-24 w-64 h-64 rounded-full blur-3xl opacity-40 ${isPro ? "bg-indigo-600" : "bg-cyan-600"}`}
        ></div>
      </motion.div>
    </section>
  );
}
