const InvoiceService = require("../services/invoice.service");

class InvoiceController {

    // Create Invoice
    static async create(req, res) {
        try {
            const invoice = await InvoiceService.create(req.body);
            res.status(201).json(invoice);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    // Get All Invoices
    static async getAll(req, res) {
        try {
            const result = await InvoiceService.getAll(req.query);
            res.json(result);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // Get Invoice By ID
    static async getById(req, res) {
        try {
            const invoice = await InvoiceService.getById(req.params.id);
            res.json(invoice);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    // Update Invoice
    static async update(req, res) {
        try {
            const invoice = await InvoiceService.update(
                req.params.id,
                req.body
            );
            res.json(invoice);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    // Add Payment
    static async addPayment(req, res) {
        try {
            const invoice = await InvoiceService.addPayment(
                req.params.id,
                req.body
            );
            res.json(invoice);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    // Soft Delete Invoice
    static async delete(req, res) {
        try {
            const invoice = await InvoiceService.delete(req.params.id);
            res.json(invoice);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    // Generate PDF
    static async generatePDF(req, res) {
        try {
            const invoice = await InvoiceService.generatePDF(req.params.id);
            res.json(invoice);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    // Get Signed URL
    static async getSignedUrl(req, res) {
        try {
            const url = await InvoiceService.getSignedUrl(req.params.id);
            res.json({ url });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    // Send Invoice Email
    static async sendEmail(req, res) {
        try {
            const result = await InvoiceService.sendInvoiceEmail(req.params.id);
            res.json(result);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

module.exports = InvoiceController;
