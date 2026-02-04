const Joi = require("joi");

/* ===========================
   CREATE CAREER
=========================== */
exports.createCareerSchema = Joi.object({
  title: Joi.string().trim().min(3).required(),
  location: Joi.string().trim().required(),
  experience: Joi.string().trim().required(),
  employmentType: Joi.string().trim().required(),
  overview: Joi.string().trim().min(10).required(),

  responsibilities: Joi.array().items(
    Joi.string().trim().min(3)
  ).optional(),

  skills: Joi.array().items(
    Joi.string().trim().min(2)
  ).optional(),

  whatWeOffer: Joi.array().items(
    Joi.string().trim().min(3)
  ).optional(),

  howToApply: Joi.string().trim().optional(),

  positionCount: Joi.number().integer().min(1).required(),
})
.options({ abortEarly: false, allowUnknown: false });


/* ===========================
   UPDATE CAREER (ADMIN)
=========================== */
exports.updateCareerSchema = Joi.object({
  title: Joi.string().trim().min(3).optional(),
  location: Joi.string().trim().optional(),
  experience: Joi.string().trim().optional(),
  employmentType: Joi.string().trim().optional(),
  overview: Joi.string().trim().min(10).optional(),

  responsibilities: Joi.array().items(
    Joi.string().trim().min(3)
  ).optional(),

  skills: Joi.array().items(
    Joi.string().trim().min(2)
  ).optional(),

  whatWeOffer: Joi.array().items(
    Joi.string().trim().min(3)
  ).optional(),

  howToApply: Joi.string().trim().optional(),

  positionCount: Joi.number().integer().min(1).optional(),
  isActive: Joi.boolean().optional(),
})
.min(1) // ✅ prevents empty update {}
.options({ abortEarly: false, allowUnknown: false });


/* ===========================
   APPLY CAREER (PUBLIC)
=========================== */
exports.applyCareerSchema = Joi.object({
  firstName: Joi.string().trim().min(2).required(),
  lastName: Joi.string().trim().min(1).required(),

  email: Joi.string().email().lowercase().trim().required(),
  phone: Joi.string().trim().min(8).required(),

  gender: Joi.string().valid("Male", "Female", "Other").optional(),
  location: Joi.string().trim().required(),
  experience: Joi.string().trim().required(),

  currentSalary: Joi.string().trim().optional(),
  expectedSalary: Joi.string().trim().optional(),
  noticePeriod: Joi.string().trim().optional(),
  joiningTime: Joi.string().trim().optional(),

  joiningDate: Joi.date().optional(),

  isImmediateJoiner: Joi.boolean()
    .truthy("true")
    .falsy("false")
    .required(),
})
.options({ abortEarly: false, allowUnknown: false });
