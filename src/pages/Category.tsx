import { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { supabase } from "../lib/supabase";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, AlertCircle, FolderOpen } from "lucide-react";
import IconMapper from "../components/ui/IconMapper";
import PageHead from "../components/seo/PageHead";
import { getLocalizedPath, removeMarkdown } from "../lib/utils";

export default function Category() {
  const { slug } = useParams();
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const currentLang = i18n.language;

  const [posts, setPosts] = useState<any[]>([]);
  const [categoryInfo, setCategoryInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const { data: catData, error } = await supabase
        .from("categories")
        .select("*")
        .eq("slug", slug)
        .single();

      if (error || !catData) {
        setLoading(false);
        return;
      }
      setCategoryInfo(catData);

      const { data: postsData } = await supabase
        .from("posts")
        .select(`*, categories(slug, icon)`)
        .eq("category_id", catData.id)
        .order("created_at", { ascending: false });

      setPosts(postsData || []);
      setLoading(false);
    }
    fetchData();
  }, [slug]);

  if (loading)
    return <div className="p-20 text-center animate-pulse">{t("ui.loading")}</div>;

  if (!categoryInfo)
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6 pt-20">
        <AlertCircle size={64} className="text-gray-300 mb-4" />
        <h2 className="text-3xl font-bold mb-2 text-gray-900">
          {t("ui.topic_not_found")}
        </h2>
        <Link
          to={getLocalizedPath("blog", currentLang)}
          className="px-6 py-3 mt-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
        >
          {t("button.see_all_posts")}
        </Link>
      </div>
    );

  const categoryName = t(`categories.${categoryInfo.slug}`);

  return (
    <>
      <PageHead titleKey={`${categoryName}`} />

      <div className="min-h-screen pt-4 px-6 max-w-4xl mx-auto">
        <Link
          to={getLocalizedPath("blog", currentLang)}
          className="inline-flex items-center text-gray-500 hover:text-blue-600 mb-8 transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" />
          {t("button.return")}
        </Link>

        <div className="flex items-center gap-4 mb-8 bg-gray-100 p-6 rounded-3xl">
          <div className="p-4 bg-white rounded-2xl text-blue-600 shadow-sm">
            <IconMapper name={categoryInfo.icon} className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{categoryName}</h1>
            <p className="text-gray-500 mt-1">
              {posts.length} {posts.length === 1 ? "post" : "posts"}
            </p>
          </div>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-20 px-6 bg-gray-50 rounded-3xl border border-dashed border-gray-300">
            <FolderOpen size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-600">
              {t("ui.no_posts_topic")}
            </h3>
          </div>
        ) : (
          <div className="grid gap-6">
            {posts.map((post) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="group bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="flex flex-col gap-2">
                  {post.cover_image && (
                    <Link
                      to={getLocalizedPath(`blog/${post.slug}`, currentLang)}
                      className="block mb-6 -mx-6 -mt-6 overflow-hidden aspect-video border-b border-gray-100"
                    >
                      <img
                        src={post.cover_image}
                        className="w-full h-full rounded-t-2xl object-cover transform hover:scale-105 transition-transform duration-500"
                      />
                    </Link>
                  )}

                  <h2 className="text-xl font-bold group-hover:text-blue-500 transition-colors text-gray-900">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 line-clamp-2 mb-4 text-sm">
                    {removeMarkdown(post.content)}
                  </p>
                  <Link
                    to={getLocalizedPath(`blog/${post.slug}`, currentLang)}
                    state={{ from: location }}
                    className="text-blue-600 font-medium inline-flex items-center text-sm"
                  >
                    {t("button.read_more")}{" "}
                    <ArrowRight
                      size={16}
                      className="ml-2 group-hover:translate-x-1 transition-transform"
                    />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
