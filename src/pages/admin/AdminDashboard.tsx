import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { supabase } from "../../lib/supabase";
import { Plus, Edit, Trash2, LogOut, FileText } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import SEO from "../../components/seo/SEO";
import { formatDate } from "../../lib/utils";
import ThemeToggle from "../../components/ui/ThemeToggle";
import LanguageSelector from "../../components/ui/LanguageSelector";

export default function AdminDashboard() {
  const [posts, setPosts] = useState<any[]>([]);
  const { signOut } = useAuth();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    const { data } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });
    setPosts(data || []);
  }

  async function handleDelete(id: number) {
    if (!confirm(t("admin.delete_confirm"))) return;

    const { error } = await supabase.from("posts").delete().eq("id", id);
    if (!error) {
      setPosts(posts.filter((post) => post.id !== id));
    } else {
      alert("Error when deleting!");
    }
  }

  return (
    <>
      <SEO title={t("admin.title")} slug="/admin" />

      <div className="min-h-screen bg-gray-50 p-8 transition-colors">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-900">
                {t("admin.title")}
              </h1>
              <p className="text-gray-500">{t("admin.subtitle")}</p>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 mr-2">
                <ThemeToggle />
                <LanguageSelector />
              </div>

              <button
                onClick={() => signOut()}
                className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition font-medium border border-transparent hover:border-red-100"
              >
                <LogOut size={18} /> {t("button.logout")}
              </button>
              <Link
                to="/admin/new"
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-lg shadow-blue-500/30 font-bold"
              >
                <Plus size={18} /> {t("button.new_post")}
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-100">
                  <tr>
                    <th className="p-4 whitespace-nowrap">
                      {t("admin.table_title")}
                    </th>
                    <th className="p-4 whitespace-nowrap">
                      {t("admin.table_slug")}
                    </th>
                    <th className="p-4 whitespace-nowrap">
                      {t("admin.table_date")}
                    </th>
                    <th className="p-4 text-right whitespace-nowrap">
                      {t("admin.table_actions")}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {posts.map((post) => (
                    <tr key={post.id} className="hover:bg-gray-50 transition">
                      <td className="p-4 font-medium text-gray-900">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                            <FileText size={16} />
                          </div>
                          {post.title}
                        </div>
                      </td>
                      <td className="p-4 text-gray-500 text-sm font-mono">
                        {post.slug}
                      </td>
                      <td className="p-4 text-gray-500 text-sm">
                        {formatDate(post.created_at, i18n.language)}
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Link
                            to={`/admin/edit/${post.slug}`}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                          >
                            <Edit size={18} />
                          </Link>
                          <button
                            onClick={() => handleDelete(post.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {posts.length === 0 && (
              <div className="p-12 text-center text-gray-500">
                <FileText size={48} className="mx-auto mb-4 opacity-20" />
                <p>{t("admin.empty_state")}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
