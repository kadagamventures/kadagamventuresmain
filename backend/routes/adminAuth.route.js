// const express = require("express");
// const router = express.Router();

// const {
//   adminLogin,
//   refreshToken,
//   logout,
// } = require("../controllers/adminAuth.controller");

// router.post("/login", adminLogin);
// router.post("/refresh", refreshToken);
// router.post("/logout", logout);

// module.exports = router;

const express = require("express");
const router = express.Router();

const {
  adminLogin,
} = require("../controllers/adminAuth.controller");

router.post("/login", adminLogin);

module.exports = router;
