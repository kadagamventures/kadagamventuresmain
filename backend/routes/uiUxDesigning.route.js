const express = require("express");
const router = express.Router();
const adminAuth = require("../middlewares/adminAuth.middleware");
const controller = require("../controllers/uiUxDesigning.controller");

// 🔐 ADMIN
router.post("/", adminAuth, controller.createOrUpdateUiUx);
router.put("/", adminAuth, controller.updateUiUx);
router.delete("/", adminAuth, controller.deleteUiUx);

router.post("/pricing", adminAuth, controller.addPricingPlan);
router.put("/pricing/:planId", adminAuth, controller.updatePricingPlan);
router.delete("/pricing/:planId", adminAuth, controller.deletePricingPlan);

// 🌍 PUBLIC
router.get("/", controller.getUiUx);

module.exports = router;
