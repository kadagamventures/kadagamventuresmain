const express = require("express");
const router = express.Router();
const adminAuth = require("../middlewares/adminAuth.middleware");
const controller = require("../controllers/mobileAppDevelopment.controller");

// 🔐 ADMIN
router.post("/", adminAuth, controller.createOrUpdateMobileApp);
router.put("/", adminAuth, controller.updateMobileApp);
router.delete("/", adminAuth, controller.deleteMobileApp);

// ADMIN – ADD PRICING PLAN
router.post(
    "/pricing",
    adminAuth,
    controller.addPricingPlan
  );

  
router.put(
  "/pricing/:planId",
  adminAuth,
  controller.updatePricingPlan
);

router.delete(
  "/pricing/:planId",
  adminAuth,
  controller.deletePricingPlan
);

// 🌍 PUBLIC
router.get("/", controller.getMobileApp);

module.exports = router;
