import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import useAdminBlogStore from "../../zustand/AdminBlogStore";

export default function AdminBlogs() {
  const { blogs, fetchBlogs, deleteBlog, loading } = useAdminBlogStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    try {
      await deleteBlog(id);
      toast.success("Blog deleted successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete blog");
    }
  };

  return (
    <div className="p-6 md:p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-semibold text-gray-800">Blog Management</h2>
          <p className="text-gray-600 mt-1">
            Create, edit and manage blog posts
          </p>
        </div>

        <button
          onClick={() => navigate("/admin/blogs/add")}
          className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all font-medium"
        >
          <FaPlus size={18} /> Create New Blog
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent"></div>
        </div>
      ) : blogs?.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl shadow-lg">
          <div className="bg-gray-100 border-2 border-dashed rounded-xl w-24 h-24 mx-auto mb-6 flex items-center justify-center">
            <FaPlus className="text-gray-400" size={32} />
          </div>
          <p className="text-gray-600 text-lg mb-4">No blogs found</p>
          <button
            onClick={() => navigate("/admin/blogs/add")}
            className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition"
          >
            <FaPlus size={16} /> Create First Blog
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              {blog.featuredImageUrl ? (
                <div className="relative overflow-hidden h-48">
                  <img
                    src={blog.featuredImageUrl}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-60 transition-opacity" />
                </div>
              ) : (
                <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-300 flex items-center justify-center">
                  <span className="text-gray-500 text-sm">No image</span>
                </div>
              )}

              <div className="p-5">
                <h3 className="font-bold text-lg text-gray-900 line-clamp-2 mb-2">
                  {blog.title}
                </h3>

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-indigo-100 text-indigo-700 text-xs px-2.5 py-1 rounded-full">
                    {blog.category || "Uncategorized"}
                  </span>
                  {blog.isRecommended && (
                    <span className="bg-blue-100 text-blue-700 text-xs px-2.5 py-1 rounded-full">
                      Recommended
                    </span>
                  )}
                  <span
                    className={`text-xs px-2.5 py-1 rounded-full ${
                      blog.status === "published"
                        ? "bg-green-100 text-green-700"
                        : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    {blog.status === "published" ? "Published" : "Draft"}
                  </span>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {blog.excerpt || "No excerpt..."}
                </p>

                <div className="flex gap-2">
                  <button
                    onClick={() => navigate(`/admin/blogs/view/${blog._id}`)}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg text-sm font-medium transition flex items-center justify-center gap-1.5"
                  >
                    <FaEye size={14} /> View
                  </button>
                  <button
                    onClick={() => navigate(`/admin/blogs/edit/${blog._id}`)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium transition flex items-center justify-center gap-1.5"
                  >
                    <FaEdit size={14} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(blog._id)}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg text-sm font-medium transition flex items-center justify-center gap-1.5"
                  >
                    <FaTrash size={14} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
