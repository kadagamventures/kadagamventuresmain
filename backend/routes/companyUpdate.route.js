const express = require("express");
const router = express.Router();
const adminAuth = require("../middlewares/adminAuth.middleware");
const upload = require("../middlewares/companyUpdateUpload.middleware");
const controller = require("../controllers/companyUpdate.controller");

// ADMIN
router.post("/", adminAuth, upload.single("pdf"), controller.createUpdate);
router.get("/admin", adminAuth, controller.getAllUpdates);

// PUBLIC
router.get("/", controller.getUpdates);

module.exports = router;
