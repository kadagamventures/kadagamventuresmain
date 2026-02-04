import React from "react"
import { Link } from "react-router-dom"

import { GoArrowUpRight } from "react-icons/go";

import fallbackImage from "../assets/Logo/Kadagamventuresdimlogo.png"

const BlogCard = ({ blog }) => {
    const date = new Date(blog.publishedAt).toLocaleDateString("en-IN")

    return (
        <Link
            to={`/blogs/${blog.slug}`}
            className="group block bg-white  overflow-hidden hover:shadow-xl p-4 rounded-2xl transition duration-300 "
        >
            {/* IMAGE */}
            <div className="relative h-72 overflow-hidden">
                <img
                    src={blog.featuredImageUrl || fallbackImage}
                    alt={blog.title}
                    onError={(e) => {
                        e.currentTarget.onerror = null
                        e.currentTarget.src = fallbackImage
                    }}
                    className={`w-full h-full ${fallbackImage ? "object-contain" : "object-cover"}  border rounded-2xl border-[#405BAA] transition duration-500`}
                />

                {/* CATEGORY BADGE */}
                <span className={`absolute top-3 right-3  bg-white text-black  text-sm px-3 py-1 rounded-lg font-medium`}>
                    ■ {blog.category}
                </span>
            </div>

            {/* CONTENT */}
            <div className="p-5">
                {/* Title + Date */}
                <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg font-semibold line-clamp-2 group-hover:text-[#9F080B] transition">
                        {blog.title}
                    </h3>

                    <span className="text-sm text-gray-500 whitespace-nowrap">
                        {date}
                    </span>
                </div>

                {/* Divider */}
                <div className="h-0.75 w-full bg-linear-to-r from-[#303D73] via-[#730009] to-transparent my-3 rounded" />

                {/* Excerpt */}
                <p className="text-sm text-gray-600 line-clamp-2">
                    {blog.excerpt}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between mt-4">
                    <span className="text-blue-600 text-sm font-medium">
                        Know more
                    </span>
                    <div className="w-9 h-9 rounded-full border flex items-center justify-center group-hover:bg-[#9F080B] group-hover:text-white group-hover:rotate-45 transition-all duration-300">
                        <GoArrowUpRight size={20} />
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default BlogCard
