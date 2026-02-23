const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
    street: String,
    city: String,
    state: String,
    country: { type: String, default: "India" },
    pincode: String
}, { _id: false });

const companySchema = new mongoose.Schema({
    companyName: { type: String, required: true },
    legalName: String,
    gstNumber: String,
    panNumber: String,
    registrationNumber: String,

    email: String,
    phone: String,
    website: String,

    contactPerson: {
        name: String,
        designation: String,
        phone: String,
        email: String
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    billingAddress: addressSchema,
    shippingAddress: addressSchema

}, { timestamps: true });

module.exports = mongoose.model("Company", companySchema);
