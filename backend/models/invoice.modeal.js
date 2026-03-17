const mongoose = require("mongoose");

//
// SERVICE SCHEMA
//
const serviceSchema = new mongoose.Schema({
    serviceName: { type: String, required: true },
    description: String,
    sacCode: String,

    price: { type: Number, required: true },
    quantity: { type: Number, default: 1 },
    gstRate: { type: Number, default: 18 },

    taxableAmount: Number,
    cgst: Number,
    sgst: Number,
    igst: Number,
    total: Number
}, { _id: false });


//
// PAYMENT SCHEMA
//
const paymentSchema = new mongoose.Schema({
    amount: { type: Number, required: true },
    paymentMethod: String,
    transactionId: String,
    paymentDate: { type: Date, default: Date.now },
    notes: String
}, { _id: false });


const invoiceSchema = new mongoose.Schema({

    invoiceNumber: {
        type: String,
        unique: true,
        required: true
    },

    invoiceType: {
        type: String,
        enum: ["Tax Invoice", "Proforma Invoice"],
        default: "Tax Invoice"
    },

    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
        required: true
    },

    invoiceDate: {
        type: Date,
        default: Date.now
    },

    dueDate: Date,

    placeOfSupply: String,

    status: {
        type: String,
        enum: [
            "draft",
            "sent",
            "partial",
            "paid",
            "overdue",
            "cancelled"
        ],
        default: "draft"
    },

    services: [serviceSchema],

    subTotal: { type: Number, default: 0 },
    totalGST: { type: Number, default: 0 },
    roundOff: { type: Number, default: 0 },
    grandTotal: { type: Number, default: 0 },

    advanceAmount: { type: Number, default: 0 },
    totalPaid: { type: Number, default: 0 },
    pendingAmount: { type: Number, default: 0 },

    amountInWords: String,

    payments: [paymentSchema],

    termsAndConditions: String,

    pdfKey: String,

    emailTracking: {
        sent: { type: Boolean, default: false },
        sentCount: { type: Number, default: 0 },
        lastSentAt: Date,
        history: [
            {
                sentAt: Date,
                sentTo: String
            }
        ]
    },


    isDeleted: {
        type: Boolean,
        default: false
    },

}, { timestamps: true });


//
// INDEXES (IMPORTANT FOR PERFORMANCE)
//
invoiceSchema.index({ company: 1 });
invoiceSchema.index({ status: 1 });
invoiceSchema.index({ invoiceDate: -1 });


//
// PRE SAVE LOGIC
//
invoiceSchema.pre("save", async function () {

    let subTotal = 0;
    let totalGST = 0;

    const Business = mongoose.model("BusinessSettings");
    const business = await Business.findOne();

    const sellerState = business?.state;

    if (!sellerState) {
        throw new Error("Business state not configured");
    }

    this.services.forEach(service => {

        service.taxableAmount = service.price * service.quantity;

        const gstAmount = (service.taxableAmount * service.gstRate) / 100;

        if (this.placeOfSupply === sellerState) {
            service.cgst = gstAmount / 2;
            service.sgst = gstAmount / 2;
            service.igst = 0;
        } else {
            service.cgst = 0;
            service.sgst = 0;
            service.igst = gstAmount;
        }

        service.total = service.taxableAmount + gstAmount;

        subTotal += service.taxableAmount;
        totalGST += gstAmount;
    });

    this.subTotal = subTotal;
    this.totalGST = totalGST;

    const calculatedGrand = subTotal + totalGST;

    this.roundOff = Number((Math.round(calculatedGrand) - calculatedGrand).toFixed(2));
    this.grandTotal = Math.round(calculatedGrand);

    this.totalPaid = this.payments.reduce((acc, p) => acc + p.amount, 0);

    const totalReceived = this.totalPaid + this.advanceAmount;

    if (totalReceived > this.grandTotal) {
        throw new Error("Payment exceeds invoice amount");
    }

    this.pendingAmount = this.grandTotal - totalReceived;

    // Do not auto-change cancelled invoices
    if (this.status === "cancelled") {
        return;
    }

    const now = new Date();

    // FULLY PAID
    if (this.pendingAmount <= 0 && this.grandTotal > 0) {
        this.status = "paid";
    }

    // PARTIAL PAYMENT
    else if (totalReceived > 0 && this.pendingAmount > 0) {
        this.status = "partial";
    }

    // OVERDUE (only if unpaid or partially paid)
    else if (this.dueDate && now > this.dueDate && this.pendingAmount > 0) {
        this.status = "overdue";
    }

    // NO PAYMENT
    else {
        this.status = "draft";
    }

});

module.exports = mongoose.model("Invoice", invoiceSchema);