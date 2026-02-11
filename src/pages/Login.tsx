import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AlertCircle, Lock, Mail, Loader2 } from "lucide-react";
import SEO from "../components/seo/SEO";
import ThemeToggle from "../components/ui/ThemeToggle";
import LanguageSelector from "../components/ui/LanguageSelector";
import { getLocalizedPath } from "../lib/utils";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { signIn } = useAuth();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError("");
    setIsSubmitting(true);

    if (!email || !password) {
      setLocalError(t("auth.error_missing_fields"));
      setIsSubmitting(false);
      return;
    }

    const { error } = await signIn(email, password);

    if (error) {
      console.error(error);
      setLocalError(t("auth.error_invalid_auth"));
      setIsSubmitting(false);
    } else {
      navigate(getLocalizedPath("/admin", i18n.language));
    }
  };

  return (
    <>
      <SEO
        title={t("auth.title")}
        description={t("seo.login.description")}
        slug="/login"
      />

      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-neutral-950 transition-colors px-4 relative">
        <div className="absolute top-6 left-6 z-10">
          <Link
            to={getLocalizedPath("/", i18n.language)}
            className="flex items-center hover:opacity-80 transition-opacity"
            title={t("button.return_home")}
          >
            <img
              src="/assets/images/logo-200.png"
              className="w-12 h-12 object-contain select-none pointer-events-none"
              alt="Logo"
            />
          </Link>
        </div>

        <div className="absolute top-6 right-6 flex gap-4 z-10">
          <ThemeToggle />
          <LanguageSelector />
        </div>

        <div className="w-full max-w-md bg-white dark:bg-neutral-900 rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800 transition-colors">
          <div className="p-8 md:p-10">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4 text-blue-600 dark:text-blue-400">
                <Lock size={32} />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {t("auth.title")}
              </h1>
            </div>

            {localError && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 flex items-start gap-3">
                <AlertCircle
                  className="text-red-500 dark:text-red-400 shrink-0 mt-0.5"
                  size={18}
                />
                <p className="text-sm text-red-600 dark:text-red-300 font-medium">
                  {localError}
                </p>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <div className="relative">
                  <Mail
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    type="email"
                    placeholder={t("auth.email_placeholder")}
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-neutral-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="relative">
                  <Lock
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    type="password"
                    placeholder={t("auth.password_placeholder")}
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-neutral-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <button
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-lg shadow-lg shadow-blue-500/30 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    {t("ui.logging")}
                  </>
                ) : (
                  t("button.login")
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
