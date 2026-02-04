const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/appError");
const blogService = require("../services/blog.service");
const blogSchema = require("../validations/blog.joi");
const {
  uploadToS3,
  getSignedImageUrl,
  deleteFromS3,
} = require("../utils/s3");

// ADMIN – CREATE BLOG
exports.createBlog = asyncHandler(async (req, res, next) => {
  const { error } = blogSchema.createBlogSchema.validate(req.body);
  if (error) return next(new AppError(error.details[0].message, 400));

  if (!req.files?.featuredImage) {
    return next(new AppError("Featured image required", 400));
  }

  const featuredImage = await uploadToS3({
    file: req.files.featuredImage[0],
    folder: "blogs/featured",
  });

  const ogImage = req.files.ogImage
    ? await uploadToS3({
        file: req.files.ogImage[0],
        folder: "blogs/og",
      })
    : null;

  const blog = await blogService.createBlog({
    ...req.body,
    featuredImage,
    ogImage,
  });

  res.status(201).json({ success: true, data: blog });
});

// PUBLIC – GET BLOGS
exports.getBlogs = asyncHandler(async (req, res) => {
  const blogs = await blogService.getPublishedBlogs();

  const response = await Promise.all(
    blogs.map(async (blog) => ({
      ...blog.toObject(),
      featuredImageUrl: await getSignedImageUrl(blog.featuredImage),
      ogImageUrl: await getSignedImageUrl(blog.ogImage),
    }))
  );

  res.json({ success: true, data: response });
});

// PUBLIC – GET BY SLUG
exports.getBlogBySlug = asyncHandler(async (req, res, next) => {
  const blog = await blogService.getBlogBySlug(req.params.slug);

  if (!blog) return next(new AppError("Blog not found", 404));

  res.json({
    success: true,
    data: {
      ...blog.toObject(),
      featuredImageUrl: await getSignedImageUrl(blog.featuredImage),
      ogImageUrl: await getSignedImageUrl(blog.ogImage),
    },
  });
});

// PUBLIC – RECOMMENDED BLOGS
exports.getRecommendedBlogs = asyncHandler(async (req, res) => {
    const blogs = await blogService.getRecommendedBlogs();
  
    const response = await Promise.all(
      blogs.map(async (blog) => ({
        ...blog.toObject(),
        featuredImageUrl: await getSignedImageUrl(blog.featuredImage),
        ogImageUrl: await getSignedImageUrl(blog.ogImage),
      }))
    );
  
    res.json({
      success: true,
      data: response,
    });
  });
  

// ADMIN – UPDATE
exports.updateBlog = asyncHandler(async (req, res, next) => {
  const blog = await blogService.getBlogById(req.params.id);
  if (!blog) return next(new AppError("Blog not found", 404));

  if (req.files?.featuredImage) {
    await deleteFromS3(blog.featuredImage);

    blog.featuredImage = await uploadToS3({
      file: req.files.featuredImage[0],
      folder: "blogs/featured",
    });
  }

  if (req.files?.ogImage) {
    await deleteFromS3(blog.ogImage);

    blog.ogImage = await uploadToS3({
      file: req.files.ogImage[0],
      folder: "blogs/og",
    });
  }

  Object.assign(blog, req.body);
  await blog.save();

  res.json({ success: true, data: blog });
});

// ADMIN – DELETE
exports.deleteBlog = asyncHandler(async (req, res, next) => {
  const blog = await blogService.getBlogById(req.params.id);
  if (!blog) return next(new AppError("Blog not found", 404));

  await deleteFromS3(blog.featuredImage);
  await deleteFromS3(blog.ogImage);

  await blog.deleteOne();

  res.json({
    success: true,
    message: "Blog and images deleted successfully",
  });
});
