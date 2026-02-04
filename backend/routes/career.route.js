// const express = require("express");
// const router = express.Router();
// const upload = require("../middlewares/upload.middleware");
// const controller = require("../controllers/career.controller");

// // Admin
// router.post("/", controller.createCareer);
// router.get("/admin/applications", controller.getApplications);
// router.get("/admin/applications/:id", controller.getApplicationById);
// router.put("/admin/applications/:id", controller.updateApplication);
// router.delete("/admin/applications/:id", controller.deleteApplication);
// // ADMIN – CAREER MANAGEMENT
// router.put("/:id", controller.updateCareer);
// router.delete("/:id", controller.deleteCareer);


// // Public
// router.get("/", controller.getCareers);
// router.post("/:id/apply", upload.single("resume"), controller.applyCareer);

// module.exports = router;


const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload.middleware");
const controller = require("../controllers/career.controller");
const adminAuth = require("../middlewares/adminAuth.middleware");

// 🔐 ADMIN ONLY
router.post("/", adminAuth, controller.createCareer);
router.get("/admin/applications", adminAuth, controller.getApplications);
router.get("/admin/applications/:id", adminAuth, controller.getApplicationById);
router.put("/admin/applications/:id", adminAuth, controller.updateApplication);
router.delete("/admin/applications/:id", adminAuth, controller.deleteApplication);
router.put("/:id", adminAuth, controller.updateCareer);
router.delete("/:id", adminAuth, controller.deleteCareer);

// 🌍 PUBLIC
router.get("/", controller.getCareers);
router.post("/:id/apply", upload.single("resume"), controller.applyCareer);

module.exports = router;
