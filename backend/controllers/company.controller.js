const CompanyService = require("../services/company.service");

class companyController {

    static async create(req, res) {
        try {
            const company = await CompanyService.create(req.body);
            res.status(201).json(company);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    static async getAll(req, res) {
        try {
            const result = await CompanyService.getAll(req.query);
            res.json(result);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async getById(req, res) {
        try {
            const company = await CompanyService.getById(req.params.id);
            res.json(company);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    static async update(req, res) {
        try {
            const company = await CompanyService.update(
                req.params.id,
                req.body
            );
            res.json(company);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    static async delete(req, res) {
        try {
            const result = await CompanyService.delete(req.params.id);
            res.json(result);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

}

module.exports = companyController;