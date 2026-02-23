const express = require("express");
const router = express.Router();
const adminAuth = require("../middlewares/adminAuth.middleware");
const controller = require("../controllers/websiteDevelopment.controller");

/* ================= ADMIN ================= */

// CREATE / UPSERT
router.post("/", adminAuth, controller.createOrUpdateWebsite);

// UPDATE FULL DOCUMENT
router.put("/", adminAuth, controller.updateWebsite);

// DELETE FULL DOCUMENT
router.delete("/", adminAuth, controller.deleteWebsite);

// PRICING PLANS
router.post("/pricing", adminAuth, controller.addPricingPlan);
router.put("/pricing/:planId", adminAuth, controller.updatePricingPlan);
router.delete("/pricing/:planId", adminAuth, controller.deletePricingPlan);

/* ================= PUBLIC ================= */

router.get("/", controller.getWebsite);

module.exports = router;
