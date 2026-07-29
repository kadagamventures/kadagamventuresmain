// const Blog = require("../models/blog.model");
// const slugify = require("slugify");
const prisma = require("../config/prisma");
const slugify = require("slugify");

// CREATE

// exports.createBlog = async (data) => {
//   // generate base slug
//   const baseSlug = slugify(data.title, {
//     lower: true,
//     strict: true,
//     trim: true,
//   });

//   let slug = baseSlug;
//   let counter = 1;

//   // ensure unique slug
//   while (await Blog.findOne({ slug })) {
//     slug = `${baseSlug}-${counter}`;
//     counter++;
//   }

//   return Blog.create({
//     ...data,
//     slug,
//     publishedAt: data.status === "published" ? new Date() : null,
//   });
// };
exports.createBlog = async (data) => {
  const baseSlug = slugify(data.title, {
    lower: true,
    strict: true,
    trim: true,
  });

  let slug = baseSlug;
  let counter = 1;

  while (
    await prisma.blog.findUnique({
      where: { slug },
    })
  ) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  return prisma.blog.create({
    data: {
      title: data.title,
      slug,
      content: data.content,
      excerpt: data.excerpt,
      author: data.author,
      category: data.category,
      tags: data.tags || [],
      featuredImage: data.featuredImage,
      ogImage: data.ogImage,
      isRecommended:
  String(data.isRecommended).toLowerCase() === "true",
      status: data.status,
      metaTitle: data.seo?.metaTitle,
      metaDescription: data.seo?.metaDescription,
      metaKeywords: data.seo?.metaKeywords || [],
      publishedAt:
        data.status === "published" ? new Date() : null,
    },
  });
};


// PUBLIC
// exports.getPublishedBlogs = () =>
//   Blog.find({ status: "published" }).sort({ publishedAt: -1 });
exports.getPublishedBlogs = () =>
  prisma.blog.findMany({
    where: {
      status: "published",
    },
    orderBy: {
      publishedAt: "desc",
    },
  });

// exports.getBlogBySlug = (slug) =>
//   Blog.findOne({ slug, status: "published" });
exports.getBlogBySlug = (slug) =>
  prisma.blog.findFirst({
    where: {
      slug,
      status: "published",
    },
  });


// exports.getAllBlogs = () =>
//   Blog.find().sort({ createdAt: -1 });
exports.getAllBlogs = () =>
  prisma.blog.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });


// exports.getRecommendedBlogs = () =>
//     Blog.find({
//       status: "published",
//       isRecommended: true,
//     })
//       .sort({ publishedAt: -1 })
//       .limit(5); // 👈 show top 5 only
exports.getRecommendedBlogs = () =>
  prisma.blog.findMany({
    where: {
      status: "published",
      isRecommended: true,
    },
    orderBy: {
      publishedAt: "desc",
    },
    take: 5,
  });
  

      
// ADMIN
//exports.getBlogById = (id) => Blog.findById(id);
exports.getBlogById = (id) =>
  prisma.blog.findUnique({
    where: {
      id: Number(id),
    },
  });

// exports.updateBlog = (id, data) =>
//   Blog.findByIdAndUpdate(
//     id,
//     {
//       ...data,
//       publishedAt:
//         data.status === "published" ? new Date() : null,
//     },
//     { new: true }
//   );

exports.updateBlog = (id, data) =>
  prisma.blog.update({
    where: {
      id: Number(id),
    },
    data: {
      title: data.title,
      content: data.content,
      excerpt: data.excerpt,
      author: data.author,
      category: data.category,
      tags: data.tags,
      featuredImage: data.featuredImage,
      ogImage: data.ogImage,
      isRecommended:
  String(data.isRecommended).toLowerCase() === "true",
      status: data.status,
      metaTitle: data.seo?.metaTitle,
      metaDescription: data.seo?.metaDescription,
      metaKeywords: data.seo?.metaKeywords,
      publishedAt:
        data.status === "published" ? new Date() : null,
    },
  });


// exports.deleteBlog = (id) =>
//   Blog.findByIdAndDelete(id);

exports.deleteBlog = (id) =>
  prisma.blog.delete({
    where: {
      id: Number(id),
    },
  });
