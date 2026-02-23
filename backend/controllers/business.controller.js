const Business = require("../models/business.model");

class BusinessController {

    static async createOrUpdate(req, res) {
        try {
            let business = await Business.findOne();

            if (!business) {
                business = await Business.create(req.body);
            } else {
                Object.assign(business, req.body);
                await business.save();
            }

            res.json(business);


        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    static async get(req, res) {
        try {
            const business = await Business.findOne();
            res.json(business);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

}

module.exports = BusinessController;