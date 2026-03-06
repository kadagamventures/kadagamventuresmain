import React, { useEffect, useState } from "react";
import { useBusinessStore } from "../../zustand/useBusinessStore";

const BusinessSettings = () => {
    const { business, fetchBusiness, saveBusiness, loading } =
        useBusinessStore();

    const [form, setForm] = useState({
        businessName: "",
        gstNumber: "",
        panNumber: "",
        cin: "",
        state: "",
        address: "",
        phone: "",
        email: "",
        authorizedPerson: "",
        invoicePrefix: "INV",
        bankDetails: {
            bankName: "",
            accountNumber: "",
            ifscCode: "",
            branch: "",
            upiId: "",
        },
    });

    useEffect(() => {
        fetchBusiness();
    }, []);

    useEffect(() => {
        if (business) {
            setForm({
                ...form,
                ...business,
                bankDetails: {
                    ...form.bankDetails,
                    ...business.bankDetails,
                },
            });
        }
    }, [business]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleBankChange = (e) => {
        setForm({
            ...form,
            bankDetails: {
                ...form.bankDetails,
                [e.target.name]: e.target.value,
            },
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await saveBusiness(form);
    };

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h2 className="text-3xl font-semibold mb-8">
                Business Settings
            </h2>

            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-lg rounded-xl p-8 space-y-10"
            >
                {/* Business Info */}
                <div>
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">
                        Business Information
                    </h2>

                    <div className="grid md:grid-cols-2 gap-6">
                        <Input label="Business Name" name="businessName" value={form.businessName} onChange={handleChange} />
                        <Input label="GST Number" name="gstNumber" value={form.gstNumber} onChange={handleChange} />
                        <Input label="PAN Number" name="panNumber" value={form.panNumber} onChange={handleChange} />
                        <Input label="CIN" name="cin" value={form.cin} onChange={handleChange} />
                        <Input label="State" name="state" value={form.state} onChange={handleChange} />
                        <Input label="Phone" name="phone" value={form.phone} onChange={handleChange} />
                        <Input label="Email" name="email" value={form.email} onChange={handleChange} />
                        <Input label="Authorized Person" name="authorizedPerson" value={form.authorizedPerson} onChange={handleChange} />
                        <Input label="Invoice Prefix" name="invoicePrefix" value={form.invoicePrefix} onChange={handleChange} />
                    </div>

                    <div className="mt-6">
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Address
                        </label>
                        <textarea
                            name="address"
                            value={form.address}
                            onChange={handleChange}
                            rows={3}
                            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                {/* Bank Details */}
                <div>
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">
                        Bank Details
                    </h2>

                    <div className="grid md:grid-cols-2 gap-6">
                        <Input label="Bank Name" name="bankName" value={form.bankDetails.bankName} onChange={handleBankChange} />
                        <Input label="Account Number" name="accountNumber" value={form.bankDetails.accountNumber} onChange={handleBankChange} />
                        <Input label="IFSC Code" name="ifscCode" value={form.bankDetails.ifscCode} onChange={handleBankChange} />
                        <Input label="Branch" name="branch" value={form.bankDetails.branch} onChange={handleBankChange} />
                        <Input label="UPI ID" name="upiId" value={form.bankDetails.upiId} onChange={handleBankChange} />
                    </div>
                </div>

                <div className="text-right">
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
                    >
                        {loading ? "Saving..." : "Save Settings"}
                    </button>
                </div>
            </form>
        </div>
    );
};

const Input = ({ label, ...props }) => (
    <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
            {label}
        </label>
        <input
            {...props}
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
        />
    </div>
);

export default BusinessSettings;
