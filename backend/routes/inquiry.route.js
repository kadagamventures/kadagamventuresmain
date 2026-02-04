const express = require("express");
const router = express.Router();
const adminAuth = require("../middlewares/adminAuth.middleware");
const controller = require("../controllers/inquiry.controller");

// Public
router.post("/", controller.createInquiry);

// Admin
router.get("/", adminAuth, controller.getAllInquiries);
router.get("/services", adminAuth, controller.getServiceInquiries);
router.get("/products", adminAuth, controller.getProductInquiries);

module.exports = router;
