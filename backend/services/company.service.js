const { model } = require("mongoose");
const Company = require("../models/company.model");

class CompanyService {

    static async create(data) {
        const company = await Company.create(data);
        return company;
    }

    static async getAll(query) {
        const { page = 1, limit = 10 } = query;

        const companies = await Company.find({ isDeleted: false })

            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(Number(limit));

        const total = await Company.countDocuments({ isDeleted: false });


        return { companies, total };
    }

    static async getById(id) {
        const company = await Company.findOne({
            _id: id,
            isDeleted: false
        });

        if (!company)
            throw new Error("Company not found");

        return company;
    }


    static async update(id, data) {
        const company = await Company.findOneAndUpdate(
            { _id: id, isDeleted: false },
            data,
            { new: true, runValidators: true }
        );

        if (!company)
            throw new Error("Company not found");

        return company;
    }


    static async delete(id) {

        const company = await Company.findOne({
            _id: id,
            isDeleted: false
        });

        if (!company)
            throw new Error("Company not found");

        company.isDeleted = true;
        await company.save();


        return { message: "Company deleted successfully" };
    }

}

module.exports = CompanyService;