const Joi = require("joi");

exports.createBrandStrategySchema = Joi.object({
  description: Joi.string().required(),

  platforms: Joi.array().items(Joi.string()).optional(),

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
