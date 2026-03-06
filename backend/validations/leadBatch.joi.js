const Joi = require("joi");

// Common reusable fields
const objectId = Joi.string().regex(/^[0-9a-fA-F]{24}$/);

// -----------------------------
// CREATE VALIDATION
// -----------------------------
exports.createLeadBatchSchema = Joi.object({
  leadName: Joi.string().trim().min(2).max(150).required(),

  totalLeads: Joi.number()
    .integer()
    .min(0)
    .required(),

  leadGeneratedDate: Joi.date().required(),

  source: Joi.string()
    .trim()
    .max(100)
    .optional(),

  campaignName: Joi.string()
    .trim()
    .max(150)
    .optional(),

  costPerLead: Joi.number()
    .min(0)
    .optional(),

  totalCost: Joi.number()
    .min(0)
    .optional(),

  notes: Joi.string()
    .max(1000)
    .optional(),

  status: Joi.string()
    .valid("active", "archived")
    .optional(),
});


// -----------------------------
// UPDATE VALIDATION
// -----------------------------
exports.updateLeadBatchSchema = Joi.object({
  leadName: Joi.string().trim().min(2).max(150).optional(),

  totalLeads: Joi.number()
    .integer()
    .min(0)
    .optional(),

  leadGeneratedDate: Joi.date().optional(),

  source: Joi.string()
    .trim()
    .max(100)
    .optional(),

  campaignName: Joi.string()
    .trim()
    .max(150)
    .optional(),

  costPerLead: Joi.number()
    .min(0)
    .optional(),

  totalCost: Joi.number()
    .min(0)
    .optional(),

  notes: Joi.string()
    .max(1000)
    .optional(),

  status: Joi.string()
    .valid("active", "archived")
    .optional(),
});