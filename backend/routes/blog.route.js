const express = require("express");
const router = express.Router();
const adminAuth = require("../middlewares/adminAuth.middleware");
const controller = require("../controllers/blog.controller");
const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage() });

router.post(
  "/",
  adminAuth,
  upload.fields([
    { name: "featuredImage", maxCount: 1 },
    { name: "ogImage", maxCount: 1 },
  ]),
  controller.createBlog
);

router.put(
  "/:id",
  adminAuth,
  upload.fields([
    { name: "featuredImage", maxCount: 1 },
    { name: "ogImage", maxCount: 1 },
  ]),
  controller.updateBlog
);

router.delete("/:id", adminAuth, controller.deleteBlog);

// Public
router.get("/recommended", controller.getRecommendedBlogs);
router.get("/", controller.getBlogs);
router.get("/:slug", controller.getBlogBySlug);

module.exports = router;
