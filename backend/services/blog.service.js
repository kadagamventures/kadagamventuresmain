const Blog = require("../models/blog.model");
const slugify = require("slugify");

// CREATE
// exports.createBlog = async (data) => {
//   const slug = slugify(data.title, { lower: true });

//   return Blog.create({
//     ...data,
//     slug,
//     publishedAt: data.status === "published" ? new Date() : null,
//   });
// };
exports.createBlog = async (data) => {
  // generate base slug
  const baseSlug = slugify(data.title, {
    lower: true,
    strict: true,
    trim: true,
  });

  let slug = baseSlug;
  let counter = 1;

  // ensure unique slug
  while (await Blog.findOne({ slug })) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  return Blog.create({
    ...data,
    slug,
    publishedAt: data.status === "published" ? new Date() : null,
  });
};


// PUBLIC
exports.getPublishedBlogs = () =>
  Blog.find({ status: "published" }).sort({ publishedAt: -1 });

exports.getBlogBySlug = (slug) =>
  Blog.findOne({ slug, status: "published" });


exports.getAllBlogs = () =>
  Blog.find().sort({ createdAt: -1 });


// exports.getRecommendedBlogs = () =>
//   Blog.find({ status: "published", isRecommended: true });

exports.getRecommendedBlogs = () =>
    Blog.find({
      status: "published",
      isRecommended: true,
    })
      .sort({ publishedAt: -1 })
      .limit(5); // 👈 show top 5 only
  

      
// ADMIN
exports.getBlogById = (id) => Blog.findById(id);

exports.updateBlog = (id, data) =>
  Blog.findByIdAndUpdate(
    id,
    {
      ...data,
      publishedAt:
        data.status === "published" ? new Date() : null,
    },
    { new: true }
  );

exports.deleteBlog = (id) =>
  Blog.findByIdAndDelete(id);
