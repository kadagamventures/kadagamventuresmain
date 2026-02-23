const express = require("express");
const router = express.Router();
const adminAuth = require("../middlewares/adminAuth.middleware");
const controller = require("../controllers/brandingGraphicDesign.controller");

// 🔐 ADMIN
router.post("/", adminAuth, controller.createOrUpdateBranding);
router.put("/", adminAuth, controller.updateBranding);
router.delete("/", adminAuth, controller.deleteBranding);

router.post("/pricing", adminAuth, controller.addPricingPlan);
router.put("/pricing/:planId", adminAuth, controller.updatePricingPlan);
router.delete("/pricing/:planId", adminAuth, controller.deletePricingPlan);

// 🌍 PUBLIC
router.get("/", controller.getBranding);

module.exports = router;
