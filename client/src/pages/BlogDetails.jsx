import React, { useEffect } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";

import RightClipAccent from "../components/RightClipAccent";
import useBlogsStore from "../zustand/useBlogsStore";

import fallbackImage from "../assets/Logo/Kadagamventuresdimlogo.png";

import { FaPen, FaArrowLeft } from "react-icons/fa";
import DOMPurify from "dompurify";
import SocialLinks from "../components/SocialLinks";

const BlogDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const baseUrl = "https://www.kadagamventures.com";

  const handleContentClick = (e) => {
    const link = e.target.closest("a");

    if (!link) return;

    const url = link.getAttribute("href");

    if (!url) return;

    // INTERNAL LINKS
    if (url.startsWith("/")) {
      e.preventDefault();
      const finalUrl = url.endsWith("/") ? url : `${url}/`;
      navigate(finalUrl);
    }

    // EXTERNAL LINKS
    if (url.startsWith("http")) {
      e.preventDefault();
      window.open(url, "_blank");
    }
  };

  const createSections = (html) => {
    const container = document.createElement("div");
    container.innerHTML = html;

    const sections = [];
    let currentSection = document.createElement("div");

    Array.from(container.children).forEach((node) => {
      if (node.tagName === "H2") {
        if (currentSection.innerHTML) {
          sections.push(currentSection);
        }
        currentSection = document.createElement("div");
      }

      currentSection.appendChild(node);
    });

    if (currentSection.innerHTML) {
      sections.push(currentSection);
    }

    return sections;
  };

  const { blogs, fetchBlogs, getBlogBySlug, getRecommendedBlogs, loading } =
    useBlogsStore();

  useEffect(() => {
    if (!blogs.length) fetchBlogs();
  }, [fetchBlogs, blogs.length]);

  const blog = getBlogBySlug(slug);
  const recommended = getRecommendedBlogs().filter((b) => b.slug !== slug);

  if (loading || !blog) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 text-lg">
        Loading blog post...
      </div>
    );
  }

  const date = new Date(blog.publishedAt).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  //const blocks = blog.content.split("\n\n").filter(Boolean);

  const isHeading = (text) => {
    const t = text.trim();

    return (
      t.length < 80 &&
      !t.includes(".") &&
      !t.startsWith("●") &&
      !t.startsWith("-") &&
      !t.startsWith("Q") &&
      !t.match(/^\d+\./)
    );
  };

  const canonicalUrl =
    location.pathname.endsWith("/")
      ? `${baseUrl}${location.pathname}`
      : `${baseUrl}${location.pathname}/`;

  return (
    <main className="bg-white min-h-screen">
      {/* ================= SEO ================= */}
      <Helmet>
        {/* Title */}
        <title>{blog.seo?.metaTitle || blog.title}</title>

        {/* Meta Description */}
        <meta
          name="description"
          content={blog.seo?.metaDescription || blog.excerpt}
        />

        {/* Keywords (optional) */}
        {blog.seo?.metaKeywords && (
          <meta
            name="keywords"
            content={blog.seo.metaKeywords.join(", ")}
          />
        )}

        {/* Canonical */}
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph */}
        <meta property="og:title" content={blog.title} />
        <meta
          property="og:description"
          content={blog.seo?.metaDescription || blog.excerpt}
        />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={blog.featuredImageUrl} />

        {/* Article Info */}
        <meta property="article:published_time" content={blog.publishedAt} />
        <meta property="article:author" content={blog.author} />

        {/* Robots */}
        <meta name="robots" content="index, follow" />
      </Helmet>

      <div className="px-7 pt-3 xl:pt-6"></div>

      {/* ================= HERO ================= */}
      <section className="relative h-[50vh] lg:h-[70vh] overflow-hidden">
        <RightClipAccent />

        {/* Image fills completely */}
        <img
          src={blog.featuredImageUrl || fallbackImage}
          alt={blog.title}
          className="absolute inset-0 w-full h-full object-contain mt-10 "
          loading="eager"
        />

        {/* Back Button */}
        <button
          data-aos="fade-right"
          data-aos-duration="800"
          onClick={() => navigate(-1)}
          className="absolute xl:top-16 left-6 flex items-center gap-2
                   bg-white/90 backdrop-blur px-4 py-2 rounded-lg shadow-md
                   text-sm font-medium text-gray-700 hover:text-black hover:bg-white transition z-10"
        >
          <FaArrowLeft size={14} />
          Go Back
        </button>
      </section>

      <section
        className="flex flex-col mx-auto
            max-w-7xl mt-3"
      >
        <div
          data-aos="fade-left"
          data-aos-duration="800"
          className="flex flex-col xl:flex-row items-start gap-3 xl:items-center justify-between "
        >
          <h1 className="text-xl font-sans lg:text-3xl font-semibold leading-tight tracking-tight  text-wrap">
            {blog.title}
          </h1>
          <p>{date}</p>
        </div>

        <div className="h-0.75 w-full bg-linear-to-r from-[#303D73] via-[#730009] to-transparent my-3 rounded" />
      </section>

      {/* ================= META ================= */}
      <section
        data-aos="fade-left"
        data-aos-duration="800"
        className="space-y-3  mx-auto
            max-w-7xl"
      >
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          <span>{date}</span>
          <span className="flex items-center justify-center gap-2">
            <FaPen size={12} /> {blog.author}
          </span>
          <span className="bg-gray-100 px-3 py-1 rounded-full text-xs">
            {blog.category}
          </span>
        </div>

        {/* tags */}
        <div
          data-aos="zoom-out"
          data-aos-duration="800"
          className="flex gap-2 flex-wrap"
        >
          {blog.tags?.map((tag) => (
            <span
              key={tag}
              className="bg-blue-50 text-blue-600 text-xs px-3 py-1 rounded-full"
            >
              #{tag}
            </span>
          ))}
          <SocialLinks />
        </div>

      </section>

      <section className="px-4 sm:px-6 md:px-8 lg:px-0">
        <article
          data-aos="fade-down"
          data-aos-duration="800"
          className="
            mx-auto
            max-w-7xl
            space-y-5 sm:space-y-6 md:space-y-7
            text-gray-800
            leading-relaxed sm:leading-loose
        "
        >
          {/* {blocks.map((block, i) => {
                        const text = block.trim();

                        // bullet points
                        if (text.startsWith("●")) {
                            return (
                                <ul
                                    key={i}
                                    className="ml-5 list-disc space-y-2 text-base sm:text-lg"
                                >
                                    <li>{text.replace("●", "")}</li>
                                </ul>
                            );
                        }

                        // FAQ questions
                        if (text.startsWith("Q")) {
                            return (
                                <h3
                                    key={i}
                                    className="
                            text-lg sm:text-xl md:text-2xl
                            font-semibold
                            mt-8 md:mt-10
                              text-[#000000BF]
                        "
                                >
                                    {text}
                                </h3>
                            );
                        }

                        // section headings
                        if (isHeading(text)) {
                            return (
                                <h2
                                    key={i}
                                    className="
                            text-xl sm:text-2xl md:text-3xl
                            font-semibold
                            mt-10 md:mt-12
                            mb-3 md:mb-4
                            text-[#000000BF]
                        "
                                >
                                    {text}
                                </h2>
                            );
                        }

                        // normal paragraph
                        return (
                            <p
                                key={i}
                                className="
                        text-base sm:text-lg md:text-[18px]
                        text-gray-700
                    "
                            >
                                {text}
                            </p>
                        );
                    })} */}
          {/* <section className="px-4 sm:px-6 md:px-8 lg:px-0">
    <article
        data-aos="fade-down"
        data-aos-duration="800"
        className="mx-auto max-w-7xl blog-content"
        dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(blog.content),
        }}
    />
</section> */}
          <section className="px-4 sm:px-6 md:px-8 lg:px-0">
            <div className="mx-auto max-w-5xl">
              {createSections(blog.content).map((section, index) => {
                const img = section.querySelector("img");

                let imageHTML = "";
                let textHTML = section.innerHTML;

                if (img) {
                  imageHTML = img.outerHTML;

                  // remove image from text
                  img.remove();

                  textHTML = section.innerHTML;
                }

                return (
                  <div key={index} className="content-section mb-10" onClick={handleContentClick}>
                    {img ? (
                      <div className="grid md:grid-cols-2 gap-10 items-start">
                        {/* LEFT SIDE TEXT */}
                        <div
                          className="blog-content-s"
                          dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(textHTML),
                          }}
                        />

                        {/* RIGHT SIDE IMAGE */}
                        <div

                          dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(imageHTML),
                          }}
                        />
                      </div>
                    ) : (
                      <div
                        className="blog-content-s"
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(textHTML),
                        }}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        </article>
      </section>

      {/* ================= RECOMMENDED BLOGS ================= */}
      {recommended.length > 0 && (
        <section className="bg-gray-50 py-16 md:py-24 ">
          <div className="p-7">
            <h2 className="text-3xl md:text-4xl font-bold text-center md:text-left mb-12">
              Recommended Reads
            </h2>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {recommended.slice(0, 3).map((item) => (
                <Link
                  key={item.id}
                  to={`/blogs/${item.slug}/`}
                  className="group bg-white rounded-2xl overflow-hidden transition-all duration-300 border border-gray-100"
                >
                  <div className="aspect-4/2 relative ">
                    <img
                      src={item.featuredImageUrl || fallbackImage}
                      alt={item.title}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-xl line-clamp-2 group-hover:text-[#9F080B] transition-colors">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-gray-600 line-clamp-2 text-sm md:text-base">
                      {item.excerpt}
                    </p>
                    <div className="mt-4 text-sm text-gray-500 mb-2">
                      {new Date(item.publishedAt).toLocaleDateString("en-IN", {
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                    <SocialLinks />
                  </div>
                </Link>

              ))}

            </div>
          </div>

        </section>
      )}
    </main>
  );
};

export default BlogDetails;
