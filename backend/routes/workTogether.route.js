const express = require("express");
const router = express.Router();
const controller = require("../controllers/workTogether.controller");
const adminAuth = require("../middlewares/adminAuth.middleware");

// Public
router.post("/", controller.createRequest);

// Admin
router.get("/", adminAuth, controller.getAllRequests);

module.exports = router;
