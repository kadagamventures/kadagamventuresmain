const express = require("express");
const router = express.Router();
const InvoiceController = require("../controllers/invoice.controller");

router.post("/create-invoice", InvoiceController.create);
router.get("/getAllInvoice", InvoiceController.getAll);
router.get("/getInvoiceById/:id", InvoiceController.getById);
router.put("/update-invoice/:id", InvoiceController.update);
router.post("/add-payment/:id", InvoiceController.addPayment);
router.delete("/delete-invoice/:id", InvoiceController.delete);
router.post("/generate-pdf/:id", InvoiceController.generatePDF);
router.get("/signed-url/:id", InvoiceController.getSignedUrl);
router.post("/send-email/:id", InvoiceController.sendEmail);

module.exports = router;