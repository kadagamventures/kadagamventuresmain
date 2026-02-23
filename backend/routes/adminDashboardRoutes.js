const express = require("express");

const router = express.Router();

const {
  getDashboardStats,
} = require("../controllers/adminDashboardController");

const adminAuth = require("../middlewares/adminAuth.middleware");

router.get(
  "/dashboard-stats",
  adminAuth, // protect admin route
  getDashboardStats
);  

module.exports = router;