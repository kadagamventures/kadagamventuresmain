const express = require("express");
const router = express.Router();
const upload = require("../middlewares/uploadLead.middleware");

const {
  createLeadBatch,
  updateLeadBatch,
  deleteLeadBatch,
  getLeadBatches,
  getLeadBatch,
  getLeadFileUrl,
  getLeadStats
} = require("../controllers/leadBatch.controller");
const adminAuth = require("../middlewares/adminAuth.middleware");

router.post("/", upload.single("file"), adminAuth, createLeadBatch);
router.put("/:id", upload.single("file"), adminAuth, updateLeadBatch);
router.delete("/:id",adminAuth, deleteLeadBatch);
router.get("/:id/file", getLeadFileUrl);

router.get("/",adminAuth, getLeadBatches);
router.get("/:id",adminAuth, getLeadBatch);
router.get("/stats/summary",adminAuth, getLeadStats);

module.exports = router;