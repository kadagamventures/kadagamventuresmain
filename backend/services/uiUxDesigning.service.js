const UiUx = require("../models/uiUxDesigning.model");

// UPSERT
exports.upsertUiUx = async (data) => {
  return UiUx.findOneAndUpdate(
    { slug: "ui-ux-designing" },
    data,
    { upsert: true, new: true }
  );
};

// GET (PUBLIC)
exports.getUiUx = async () => {
  return UiUx.findOne({
    slug: "ui-ux-designing",
    isActive: true,
  });
};

// UPDATE FULL
exports.updateUiUx = async (data) => {
  return UiUx.findOneAndUpdate(
    { slug: "ui-ux-designing" },
    data,
    { new: true }
  );
};

// DELETE FULL
exports.deleteUiUx = async () => {
  return UiUx.findOneAndDelete({
    slug: "ui-ux-designing",
  });
};

// ADD PRICING PLAN
exports.addPricingPlan = async (plan) => {
  return UiUx.findOneAndUpdate(
    { slug: "ui-ux-designing" },
    { $push: { pricingPlans: plan } },
    { new: true }
  );
};

// UPDATE PRICING PLAN
exports.updatePricingPlan = async (planId, data) => {
  return UiUx.findOneAndUpdate(
    { "pricingPlans._id": planId },
    { $set: { "pricingPlans.$": data } },
    { new: true }
  );
};

// DELETE PRICING PLAN
exports.deletePricingPlan = async (planId) => {
  return UiUx.findOneAndUpdate(
    { slug: "ui-ux-designing" },
    { $pull: { pricingPlans: { _id: planId } } },
    { new: true }
  );
};
