const express = require("express");
const router = express.Router();
const BusinessController = require("../controllers/business.controller");

router.post("/setup", BusinessController.createOrUpdate);
router.get("/get", BusinessController.get);

module.exports = router;