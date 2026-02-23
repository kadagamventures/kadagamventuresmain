const express = require("express");
const router = express.Router();
const companyController = require("../controllers/company.controller");

router.post("/create-company", companyController.create);
router.get("/getAllCompany", companyController.getAll);
router.get("/getCompanyById/:id", companyController.getById);
router.put("/update-company/:id", companyController.update);
router.delete("/delete-company/:id", companyController.delete);

module.exports = router;