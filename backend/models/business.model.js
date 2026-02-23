const mongoose = require("mongoose");

const businessSchema = new mongoose.Schema({
    businessName: { type: String, required: true },
    gstNumber: String,
    panNumber: String,
    cin: String,
    state: String,
    address: String,
    phone: String,
    email: String,
    logoUrl: String,
    signatureUrl: String,
    authorizedPerson: String,

    bankDetails: {
        bankName: String,
        accountNumber: String,
        ifscCode: String,
        branch: String,
        upiId: String
    },

    invoicePrefix: {
        type: String,
        default: "INV"
    },

    nextInvoiceNumber: {
        type: Number,
        default: 1
    }

}, { timestamps: true });

module.exports = mongoose.model("BusinessSettings", businessSchema);
