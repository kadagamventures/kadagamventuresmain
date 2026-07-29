const mongoose = require("mongoose");

const serviceAgreementSchema = new mongoose.Schema({

    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
        required: true
    },

    agreementNumber: {
        type: String,
        unique: true
    },

    agreementType: {
        type: String,
        enum: ["one-time", "monthly", "quarterly", "yearly"],
        default: "one-time"
    },

    startDate: Date,
    endDate: Date,

    status: {
        type: String,
        enum: ["draft", "sent", "active", "expired", "terminated"],
        default: "draft"
    },

    documentUrl: String,

    emailTracking: {
        sent: { type: Boolean, default: false },
        sentAt: Date,
        opened: { type: Boolean, default: false },
        openedAt: Date
    },

    notes: String

}, { timestamps: true });

module.exports = mongoose.model("ServiceAgreement", serviceAgreementSchema);