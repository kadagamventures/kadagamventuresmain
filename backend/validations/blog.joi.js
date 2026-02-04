const Joi = require("joi");

exports.createBlogSchema = Joi.object({
  title: Joi.string().trim().min(5).required(),
  content: Joi.string().required(),
  excerpt: Joi.string().optional(),
  author: Joi.string().required(),
  category: Joi.string().required(),
  tags: Joi.array().items(Joi.string()).optional(),

  isRecommended: Joi.boolean().optional(),
  status: Joi.string().valid("draft", "published").required(),

  seo: Joi.object({
    metaTitle: Joi.string().optional(),
    metaDescription: Joi.string().optional(),
    metaKeywords: Joi.array().items(Joi.string()).optional(),
  }).optional(),
})
.options({ allowUnknown: false });
