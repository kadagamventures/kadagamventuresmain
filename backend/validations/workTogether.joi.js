const Joi = require("joi");

exports.createWorkTogetherSchema = Joi.object({
  firstName: Joi.string().min(2).max(50).required(),

  email: Joi.string().email().required(),

  company: Joi.string().allow("").optional(),

  projectDetails: Joi.string().min(10).max(1000).required(),
});
