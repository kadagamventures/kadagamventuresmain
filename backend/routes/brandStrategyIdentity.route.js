const express = require("express");
const router = express.Router();
const adminAuth = require("../middlewares/adminAuth.middleware");
const controller = require("../controllers/brandStrategyIdentity.controller");

// 🔐 ADMIN
router.post("/", adminAuth, controller.createOrUpdate);
router.put("/", adminAuth, controller.updateService);
router.delete("/", adminAuth, controller.deleteService);

router.post("/pricing", adminAuth, controller.addPricingPlan);
router.put("/pricing/:planId", adminAuth, controller.updatePricingPlan);
router.delete("/pricing/:planId", adminAuth, controller.deletePricingPlan);

// 🌍 PUBLIC
router.get("/", controller.getService);

module.exports = router;
