import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { FaArrowLeft } from "react-icons/fa";

import useAdminBlogStore from "../../zustand/AdminBlogStore";
import { AiOutlineClose } from "react-icons/ai";

export default function AdminViewBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { blogs, fetchBlogs, loading } = useAdminBlogStore();

  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const load = async () => {
      if (blogs.length === 0) {
        await fetchBlogs();
      }
  
      const found = blogs.find((b) => b.id === Number(id));
  
      if (found) {
        setBlog(found);
      } else {
        toast.error("Blog not found");
      }
    };
  
    load();
  }, [id, blogs, fetchBlogs]);

  if (loading || !blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-12 w-12 border-4 border-indigo-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 bg-gray-200 min-h-screen rounded-2xl">
      <div className=" ">
        {/* Header */}
        <div className="p-6  flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{blog.title}</h1>
            <p className="text-gray-600 mt-1">
              {new Date(blog.publishedAt || blog.createdAt).toLocaleDateString(
                "en-IN",
                {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                }
              )}
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate("/admin/blogs")}
            className="absolute top-6 right-6 p-2 rounded-full bg-white shadow-md hover:bg-red-50 hover:scale-110 transition"
          >
            <AiOutlineClose className="w-6 h-6 text-gray-600 hover:text-red-600" />
          </button>
        </div>

        {/* Images */}
        <div className="grid md:grid-cols-2 gap-6 p-6">
          {blog.featuredImageUrl && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Featured Image</h3>
              <img
                src={blog.featuredImageUrl}
                alt={blog.title}
                className="w-full h-64 object-cover rounded-xl shadow"
                onError={() => console.log("Featured image failed to load")}
              />
            </div>
          )}

          {blog.ogImageUrl && (
            <div>
              <h3 className="text-lg font-semibold mb-3">OG Image (Social)</h3>
              <img
                src={blog.ogImageUrl}
                alt="Open Graph"
                className="w-full h-64 object-cover rounded-xl shadow"
                onError={() => console.log("OG image failed to load")}
              />
            </div>
          )}
        </div>

        {/* Main Info */}
        <div className="p-6  grid md:grid-cols-2 gap-6">
          <div>
            <strong className="block text-gray-700">Category:</strong>
            <p>{blog.category || "—"}</p>
          </div>
          <div>
            <strong className="block text-gray-700">Author:</strong>
            <p>{blog.author || "Admin"}</p>
          </div>
          <div>
            <strong className="block text-gray-700">Status:</strong>
            <span
              className={`inline-block px-3 py-1 rounded-full text-sm ${
                blog.status === "published"
                  ? "bg-green-100 text-green-800"
                  : "bg-orange-100 text-orange-800"
              }`}
            >
              {blog.status}
            </span>
          </div>
          <div>
            <strong className="block text-gray-700">Recommended:</strong>
            <span
              className={`inline-block px-3 py-1 rounded-full text-sm ${
                blog.isRecommended
                  ? "bg-blue-100 text-blue-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {blog.isRecommended ? "Yes" : "No"}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 ">
          <h2 className="text-2xl font-semibold mb-4">Content</h2>
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </div>

        {/* SEO */}
        <div className="p-6  bg-gray-50">
          <h2 className="text-2xl font-semibold mb-4">SEO Details</h2>
          <div className="space-y-4">
            <div>
              <strong>Meta Title:</strong> {blog.seo?.metaTitle || "—"}
            </div>
            <div>
              <strong>Meta Description:</strong>{" "}
              {blog.seo?.metaDescription || "—"}
            </div>
            <div>
              <strong>Meta Keywords:</strong>{" "}
              {blog.seo?.metaKeywords?.join(", ") || "—"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
