import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import useAdminBlogStore from "../../zustand/AdminBlogStore";
import { AiOutlineClose } from "react-icons/ai";


const quillModules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image"],
    [{ align: [] }],
    ["clean"],
  ],
};

export default function AdminEditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateBlog, blogs, fetchBlogs, loading: storeLoading } = useAdminBlogStore();

  const [form, setForm] = useState({
    title: "",
    slug: "",
    content: "",
    excerpt: "",
    author: "",
    category: "",
    isRecommended: false,
    status: "draft",
    // SEO fields
    metaTitle: "",
    metaDescription: "",
    metaKeywords: "",
  });

  const [featuredPreview, setFeaturedPreview] = useState(null);
  const [featuredFile, setFeaturedFile] = useState(null); // new file to upload

  const [ogPreview, setOgPreview] = useState(null);
  const [ogFile, setOgFile] = useState(null); // new file to upload

  const [saving, setSaving] = useState(false);

  // Load existing blog data
  useEffect(() => {
    const loadBlog = async () => {
      let blogList = blogs;
  
      if (blogList.length === 0) {
        await fetchBlogs();
        blogList = useAdminBlogStore.getState().blogs;
      }
  
      const blogToEdit = blogList.find((b) => b.id === Number(id));
  
      if (!blogToEdit) {
        toast.error("Blog not found");
        navigate("/admin/blogs");
        return;
      }
  
      setForm({
        title: blogToEdit.title || "",
        slug: blogToEdit.slug || "",
        content: blogToEdit.content || "",
        excerpt: blogToEdit.excerpt || "",
        author: blogToEdit.author || "Admin",
        category: blogToEdit.category || "",
        isRecommended: blogToEdit.isRecommended || false,
        status: blogToEdit.status || "draft",
        metaTitle: blogToEdit.seo?.metaTitle || "",
        metaDescription: blogToEdit.seo?.metaDescription || "",
        metaKeywords: blogToEdit.seo?.metaKeywords?.join(", ") || "",
      });
  
      setFeaturedPreview(blogToEdit.featuredImageUrl || null);
      setOgPreview(blogToEdit.ogImageUrl || null);
    };
  
    loadBlog();
  }, [id]);

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFeaturedImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFeaturedFile(file);
      setFeaturedPreview(URL.createObjectURL(file));
    }
  };

  const handleOgImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setOgFile(file);
      setOgPreview(URL.createObjectURL(file));
    }
  };

  const handleQuillChange = (value) => {
    setForm((prev) => ({ ...prev, content: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title.trim() || !form.content.trim()) {
      toast.error("Title and content are required");
      return;
    }

    setSaving(true);

    const submitData = new FormData();

    // Main fields
submitData.append("title", form.title);
submitData.append("excerpt", form.excerpt || "");
submitData.append("content", form.content);
submitData.append("author", form.author || "Admin");
submitData.append("category", form.category || "");
submitData.append("status", form.status);
submitData.append("isRecommended", form.isRecommended);

// SEO object
const seo = {
  metaTitle: form.metaTitle || "",
  metaDescription: form.metaDescription || "",
  metaKeywords: form.metaKeywords
    ? form.metaKeywords.split(",").map(k => k.trim()).filter(Boolean)
    : [],
};

submitData.append("seo", JSON.stringify(seo));

// Images
if (featuredFile) {
  submitData.append("featuredImage", featuredFile);
}

if (ogFile) {
  submitData.append("ogImage", ogFile);
}

    try {
      await updateBlog(id, submitData);
      toast.success("Blog updated successfully!");
      //navigate("/admin/blogs");
      setTimeout(() => {
        navigate("/admin/blogs");
      }, 500);
    } catch (err) {
      console.error("Update error:", err);
      toast.error(err?.response?.data?.message || "Failed to update blog");
    } finally {
      setSaving(false);
    }
  };

  if (storeLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
      
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 bg-gray-200 min-h-screen ">
    <ToastContainer position="top-right" autoClose={3000} />
      <div className="">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Edit Blog</h1>
            <p className="text-gray-600 mt-1">Update your blog post details</p>
          </div>
         <button
             type="button"
             onClick={() => navigate("/admin/blogs")}
             className="absolute top-6 right-6 p-2 rounded-full bg-white shadow-md hover:bg-red-50 hover:scale-110 transition"
           >
             <AiOutlineClose className="w-6 h-6 text-gray-600 hover:text-red-600" />
           </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-7">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              name="title"
              value={form.title}
              onChange={handleTextChange}
              maxLength={120}
              className="w-full px-4 py-3 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-xl shadow-sm text-gray-900
                       placeholder-gray-400 transition-all duration-300 hover:border-indigo-300 focus:outline-none focus:ring-4 focus:ring-indigo-500/10
                       focus:border-indigo-500 focus:bg-white focus:shadow-lg"
              placeholder="Blog title"
            />
            <div className="text-xs text-right mt-1 text-gray-500">
              {form.title.length} / 120
            </div>
          </div>

          {/* Slug */}
          {/* <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Slug</label>
            <input
              name="slug"
              value={form.slug}
              onChange={handleTextChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500"
              placeholder="your-blog-slug"
            />
          </div> */}

          {/* Excerpt */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Excerpt</label>
            <textarea
              name="excerpt"
              value={form.excerpt}
              onChange={handleTextChange}
              rows={3}
              maxLength={300}
              className="w-full px-4 py-3 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-xl shadow-sm text-gray-900
                       placeholder-gray-400 transition-all duration-300 hover:border-indigo-300 focus:outline-none focus:ring-4 focus:ring-indigo-500/10
                       focus:border-indigo-500 focus:bg-white focus:shadow-lg"
              placeholder="Short summary for previews and SEO"
            />
          </div>

          {/* Content */}
          {/* <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Content <span className="text-red-500">*</span>
            </label>
            <div className="border border-gray-300 rounded-xl overflow-hidden bg-white">
              <ReactQuill
                theme="snow"
                value={form.content}
                onChange={handleQuillChange}
                modules={quillModules}
                className="min-h-[380px]"
              />
            </div>
          </div> */}
          <div>
  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
    Content <span className="text-red-500">*</span>
  </label>

  <div className="border border-gray-300 rounded-xl overflow-hidden bg-white">
    <ReactQuill
      theme="snow"
      value={form.content}
      onChange={handleQuillChange}
      modules={quillModules}
      className="quill-custom"
    />
  </div>
</div>

          {/* Category & Author */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Category</label>
              <input
                name="category"
                value={form.category}
                onChange={handleTextChange}
                className="w-full px-4 py-3 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-xl shadow-sm text-gray-900
                       placeholder-gray-400 transition-all duration-300 hover:border-indigo-300 focus:outline-none focus:ring-4 focus:ring-indigo-500/10
                       focus:border-indigo-500 focus:bg-white focus:shadow-lg"
                placeholder="e.g. Technology, Career, Lifestyle"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Author</label>
              <input
                name="author"
                value={form.author}
                onChange={handleTextChange}
                className="w-full px-4 py-3 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-xl shadow-sm text-gray-900
                       placeholder-gray-400 transition-all duration-300 hover:border-indigo-300 focus:outline-none focus:ring-4 focus:ring-indigo-500/10
                       focus:border-indigo-500 focus:bg-white focus:shadow-lg"
                placeholder="Author name"
              />
            </div>
          </div>

          {/* Images */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Featured Image */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Featured Image</label>
              <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFeaturedImageChange}
                  className="hidden"
                />
                {featuredPreview ? (
                  <img
                    src={featuredPreview}
                    alt="Featured preview"
                    className="w-full h-full object-cover rounded-xl"
                  />
                ) : (
                  <div className="text-center p-6 text-gray-500">
                    <p className="text-lg font-medium">Click to change featured image</p>
                    <p className="text-sm">PNG, JPG</p>
                  </div>
                )}
              </label>
              {featuredFile && (
                <p className="text-xs text-indigo-600 mt-2">New image selected</p>
              )}
            </div>

            {/* OG Image */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">OG Image (Social Sharing)</label>
              <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleOgImageChange}
                  className="hidden"
                />
                {ogPreview ? (
                  <img
                    src={ogPreview}
                    alt="OG preview"
                    className="w-full h-full object-cover rounded-xl"
                  />
                ) : (
                  <div className="text-center p-6 text-gray-500">
                    <p className="text-lg font-medium">Click to change OG image</p>
                    <p className="text-sm">1200×630 recommended</p>
                  </div>
                )}
              </label>
              {ogFile && (
                <p className="text-xs text-indigo-600 mt-2">New OG image selected</p>
              )}
            </div>
          </div>

          {/* SEO Section */}
          <div className="space-y-6 bg-gray-50 p-6 rounded-xl border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">SEO & Meta Settings</h3>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Meta Title</label>
              <input
                name="metaTitle"
                value={form.metaTitle}
                onChange={handleTextChange}
                maxLength={70}
                className="w-full px-4 py-3 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-xl shadow-sm text-gray-900
                       placeholder-gray-400 transition-all duration-300 hover:border-indigo-300 focus:outline-none focus:ring-4 focus:ring-indigo-500/10
                       focus:border-indigo-500 focus:bg-white focus:shadow-lg"
                placeholder="Title shown in search results (60-70 chars ideal)"
              />
              <div className="text-xs text-right mt-1 text-gray-500">
                {form.metaTitle.length} / 70
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Meta Description</label>
              <textarea
                name="metaDescription"
                value={form.metaDescription}
                onChange={handleTextChange}
                maxLength={160}
                rows={3}
                className="w-full px-4 py-3 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-xl shadow-sm text-gray-900
                       placeholder-gray-400 transition-all duration-300 hover:border-indigo-300 focus:outline-none focus:ring-4 focus:ring-indigo-500/10
                       focus:border-indigo-500 focus:bg-white focus:shadow-lg"
                placeholder="Description shown in search results (150-160 chars ideal)"
              />
              <div className="text-xs text-right mt-1 text-gray-500">
                {form.metaDescription.length} / 160
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Meta Keywords</label>
              <input
                name="metaKeywords"
                value={form.metaKeywords}
                onChange={handleTextChange}
                className="w-full px-4 py-3 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-xl shadow-sm text-gray-900
                       placeholder-gray-400 transition-all duration-300 hover:border-indigo-300 focus:outline-none focus:ring-4 focus:ring-indigo-500/10
                       focus:border-indigo-500 focus:bg-white focus:shadow-lg"
                placeholder="keyword1, keyword2, keyword3 (comma separated)"
              />
              <p className="text-xs text-gray-500 mt-1">Separate with commas</p>
            </div>
          </div>

          {/* Toggles */}
          <div className="flex flex-wrap gap-8 py-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form.status === "published"}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    status: e.target.checked ? "published" : "draft",
                  }))
                }
                className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500"
              />
              <span className="text-gray-700 font-medium">Published</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form.isRecommended}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, isRecommended: e.target.checked }))
                }
                className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500"
              />
              <span className="text-gray-700 font-medium">Recommended</span>
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-6 ">
            <button
              type="button"
              onClick={() => navigate("/admin/blogs")}
              className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition font-medium"
              disabled={saving}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className={`px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl shadow-lg hover:shadow-xl transition font-medium flex items-center gap-2 ${
                saving ? "opacity-70 cursor-not-allowed" : "hover:scale-105"
              }`}
            >
              {saving ? (
                <>
                  <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                  Saving...
                </>
              ) : (
                "Update Blog"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}