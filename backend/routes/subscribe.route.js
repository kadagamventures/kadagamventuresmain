const express = require("express");
const router = express.Router();
const controller = require("../controllers/subscribe.controller");

router.post("/", controller.subscribe);
router.get("/unsubscribe", controller.unsubscribe);

module.exports = router;
