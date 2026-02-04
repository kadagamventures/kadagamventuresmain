import React, { useEffect } from "react"
import blogsimage from "../assets/Blogs/blognew.png"
import RightClipAccent from "../components/RightClipAccent"
import useBlogsStore from "../zustand/useBlogsStore.js"
import BlogCard from "../components/BlogCard.jsx"

const Blogs = () => {
    const { blogs, fetchBlogs, loading } = useBlogsStore()

    useEffect(() => {
        fetchBlogs()
    }, [])

    return (
        <main>
            {/* HERO */}
            <section className="bg-black min-h-[40vh] xl:min-h-[60vh] relative flex items-center justify-center">
                <RightClipAccent />

                <img
                    src={blogsimage}
                    alt="blogs"
                    className="h-52 w-auto object-contain max-w-full"
                />
            </section>

            {/* BLOG GRID */}
            <section className="max-w-7xl mx-auto px-6 py-16">
                {loading ? (
                    <p className="text-center text-gray-500">Loading blogs...</p>
                ) : (
                    <div className="grid sm:grid-cols-2 gap-14">
                        {blogs.map((blog, index) => (
                            <div
                                key={blog._id}
                                data-aos="fade-right"
                                data-aos-duration="800"
                                data-aos-delay={index * 50}
                            >
                                <BlogCard blog={blog} />
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </main>
    )
}

export default Blogs
