const Joi = require("joi");

/* CREATE / UPSERT */
exports.createWebsiteSchema = Joi.object({
  description: Joi.string().required(),

  platforms: Joi.array()
    .items(Joi.string())
    .min(1)
    .required(),

  pricingPlans: Joi.array()
    .items(
      Joi.object({
        planName: Joi.string().required(),
        priceFrom: Joi.number().required(),
        priceTo: Joi.number().required(),
        duration: Joi.string().optional(),
        features: Joi.array().items(Joi.string()).required(),
        isPopular: Joi.boolean().optional(),
      })
    )
    .min(1)
    .required(),
});

/* SINGLE PRICING PLAN */
exports.pricingPlanSchema = Joi.object({
  planName: Joi.string().required(),
  priceFrom: Joi.number().required(),
  priceTo: Joi.number().required(),
  duration: Joi.string().optional(),
  features: Joi.array().items(Joi.string()).min(1).required(),
  isPopular: Joi.boolean().optional(),
});
