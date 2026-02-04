const express = require("express");
const router = express.Router();
const adminAuth = require("../middlewares/adminAuth.middleware");
const controller = require("../controllers/subscriberAdmin.controller");

// 🔐 ADMIN ONLY
router.get("/", adminAuth, controller.getAllSubscribers);
router.get("/active", adminAuth, controller.getActiveSubscribers);

module.exports = router;
