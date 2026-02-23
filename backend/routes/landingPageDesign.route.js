const express = require("express");
const router = express.Router();
const adminAuth = require("../middlewares/adminAuth.middleware");
const controller = require("../controllers/landingPageDesign.controller");

// 🔐 ADMIN
router.post("/", adminAuth, controller.createOrUpdateLandingPage);
router.put("/", adminAuth, controller.updateLandingPage);
router.delete("/", adminAuth, controller.deleteLandingPage);

router.post("/pricing", adminAuth, controller.addPricingPlan);
router.put("/pricing/:planId", adminAuth, controller.updatePricingPlan);
router.delete("/pricing/:planId", adminAuth, controller.deletePricingPlan);

// 🌍 PUBLIC
router.get("/", controller.getLandingPage);

module.exports = router;
