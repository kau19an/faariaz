import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import {
  ArrowLeft,
  Save,
  Loader2,
  Eye,
  Edit3,
  Image as ImageIcon,
  Upload,
  Trash2,
} from "lucide-react";
import PageHead from "../../components/seo/PageHead";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import CodeBlock from "../../components/ui/CodeBlock";
import { useTranslation } from "react-i18next";

export default function PostEditor() {
  const { t } = useTranslation();

  const { slug } = useParams();
  const navigate = useNavigate();
  const isEditing = !!slug;

  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);

  const [title, setTitle] = useState("");
  const [postSlug, setPostSlug] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState<number | "">("");

  const [coverImage, setCoverImage] = useState("");
  const [imageCaption, setImageCaption] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchCategories();
    if (isEditing) fetchPostData();
  }, [slug]);

  async function fetchCategories() {
    const { data } = await supabase.from("categories").select("*");
    setCategories(data || []);
  }

  async function fetchPostData() {
    setLoading(true);
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error) {
      alert(t("ui.loading_post_error"));
      navigate("/admin");
    } else {
      setTitle(data.title);
      setPostSlug(data.slug);
      setContent(data.content);
      setCategoryId(data.category_id);
      setCoverImage(data.cover_image || "");
      setImageCaption(data.image_caption || "");
    }
    setLoading(false);
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    if (!isEditing) {
      setPostSlug(
        newTitle
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, ""),
      );
    }
  };

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    setIsUploading(true);

    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `covers/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("blog-assets")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from("blog-assets")
        .getPublicUrl(filePath);

      setCoverImage(data.publicUrl);
    } catch (error) {
      console.error("Upload error:", error);
      alert(t("ui.upload_error"));
    } finally {
      setIsUploading(false);
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!title || !postSlug || !content || !categoryId) {
      alert(t("ui.fill_all_fields"));
      return;
    }

    setLoading(true);
    const postData = {
      title,
      slug: postSlug,
      content,
      category_id: categoryId,
      cover_image: coverImage,
      image_caption: imageCaption,
      updated_at: new Date().toISOString(),
    };

    let error;

    if (isEditing) {
      const { error: updateError } = await supabase
        .from("posts")
        .update(postData)
        .eq("slug", slug);
      error = updateError;
    } else {
      const { error: insertError } = await supabase
        .from("posts")
        .insert([{ ...postData, created_at: new Date().toISOString() }]);
      error = insertError;
    }

    setLoading(false);

    if (error) {
      console.error(error);
      alert(t("ui.saving_post_error"));
    } else {
      navigate("/admin");
    }
  }

  return (
    <>
      <PageHead
        titleKey={isEditing ? t("ui.editing_post") : t("ui.creating_post")}
      />

      <div className="min-h-screen bg-gray-50 p-6 flex flex-col">
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center mb-6">
          <Link
            to="/admin"
            className="flex items-center text-gray-500 hover:text-gray-900 transition"
          >
            <ArrowLeft className="mr-2" size={20} /> {t("button.cancel")}
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 hidden md:block">
            {isEditing ? t("ui.editing_post") : t("ui.creating_post")}
          </h1>
          <button
            onClick={handleSave}
            disabled={loading}
            className="flex items-center gap-2 px-6 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-bold shadow-lg shadow-green-500/20 disabled:opacity-70"
          >
            {loading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <Save size={18} />
            )}
            {isEditing ? t("button.update_post") : t("button.publish_post")}
          </button>
        </div>

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-6 grow">
          <div className="flex flex-col gap-4 h-full">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("admin.table_title")}
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={handleTitleChange}
                  className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none font-bold text-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t("admin.table_slug")}
                  </label>
                  <input
                    type="text"
                    value={postSlug}
                    onChange={(e) => setPostSlug(e.target.value)}
                    className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none text-sm font-mono text-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t("admin.table_topic")}
                  </label>
                  <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(Number(e.target.value))}
                    className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value="" disabled>
                      {t("ui.select")}
                    </option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name} ({cat.slug})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-gray-100">
                <label className="block text-sm font-medium text-gray-700">
                  {t("ui.cover_cape")}
                </label>

                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <ImageIcon
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                    <input
                      type="text"
                      value={coverImage}
                      onChange={(e) => setCoverImage(e.target.value)}
                      className="w-full pl-10 pr-3 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                      placeholder={t("ui.image_link_ph")}
                    />
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition flex items-center gap-2 text-sm font-medium"
                  >
                    {isUploading ? (
                      <Loader2 className="animate-spin" size={18} />
                    ) : (
                      <Upload size={18} />
                    )}
                    {t("button.upload")}
                  </button>
                </div>

                {coverImage && (
                  <div className="relative w-full h-48 rounded-xl overflow-hidden border border-gray-200 mt-3 group bg-gray-100">
                    <img
                      src={coverImage}
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => setCoverImage("")}
                      className="absolute top-2 right-2 p-2 bg-red-500/80 hover:bg-red-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-all shadow-lg backdrop-blur-sm"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                )}

                {coverImage && (
                  <input
                    type="text"
                    value={imageCaption}
                    onChange={(e) => setImageCaption(e.target.value)}
                    className="w-full p-2 mt-2 rounded-lg border border-gray-200 bg-gray-50 text-xs text-center italic"
                    placeholder={t("ui.image_legend_ph")}
                  />
                )}
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col grow min-h-75">
              <div className="flex items-center gap-2 mb-2 text-gray-500 text-sm font-medium border-b border-gray-100 pb-2">
                <Edit3 size={16} /> {t("ui.editor")}
              </div>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full h-full p-2 bg-transparent resize-none outline-none font-mono text-sm leading-relaxed"
                placeholder={t("ui.editor_ph")}
              />
            </div>
          </div>

          <div className="bg-gray-100 p-8 rounded-2xl border border-gray-200 overflow-y-auto h-full max-h-[85vh] hidden lg:block">
            <div className="flex items-center gap-2 mb-6 text-gray-400 text-sm font-medium uppercase tracking-wider">
              <Eye size={16} /> {t("ui.preview")}
            </div>
            <article
              className="prose prose-lg prose-img:rounded-2xl prose-img:shadow-lg
  prose-code:before:content-none prose-code:after:content-none
  prose-pre:bg-transparent prose-pre:p-0 prose-pre:m-0 max-w-none"
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  code: CodeBlock,
                }}
              >
                {content}
              </ReactMarkdown>
            </article>
          </div>
        </div>
      </div>
    </>
  );
}
