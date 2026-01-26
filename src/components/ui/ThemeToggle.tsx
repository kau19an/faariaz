import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";
import { motion } from "framer-motion";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex items-center gap-1 p-1 bg-gray-100 rounded-full border border-gray-200 shadow-inner">
      <button
        onClick={() => toggleTheme("light")}
        className="relative z-10 p-1.5 rounded-full transition-colors duration-200 cursor-pointer"
      >
        <Sun
          size={16}
          className={`transition-colors ${
            theme === "light" ? "text-yellow-600" : "text-gray-400"
          }`}
        />

        {theme === "light" && (
          <motion.div
            layoutId="theme-pill"
            className="absolute inset-0 bg-white rounded-full shadow-sm border border-gray-200"
            initial={false}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            style={{ zIndex: -1 }}
          />
        )}
      </button>

      <button
        onClick={() => toggleTheme("dark")}
        className="relative z-10 p-1.5 rounded-full transition-colors duration-200 cursor-pointer"
      >
        <Moon
          size={16}
          className={`transition-colors ${
            theme === "dark" ? "text-blue-400" : "text-gray-400"
          }`}
        />

        {theme === "dark" && (
          <motion.div
            layoutId="theme-pill"
            className="absolute inset-0 bg-gray-700 rounded-full shadow-sm border border-gray-600"
            initial={false}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            style={{ zIndex: -1 }}
          />
        )}
      </button>
    </div>
  );
}
