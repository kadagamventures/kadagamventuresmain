import React, { useState, useEffect } from "react";
import { useCompanyStore } from "../zustand/useCompanyStore";

const CompanyForm = ({ close }) => {
    const {
        selectedCompany,
        createCompany,
        updateCompany,
    } = useCompanyStore();

    const [form, setForm] = useState({
        companyName: "",
        legalName: "",
        email: "",
        phone: "",
        gstNumber: "",
        panNumber: "",
        billingAddress: {
            street: "",
            city: "",
            state: "",
            pincode: "",
        },
    });

    useEffect(() => {
        if (selectedCompany) {
            setForm({
                ...selectedCompany,
                billingAddress: {
                    street: selectedCompany.billingAddress?.street || "",
                    city: selectedCompany.billingAddress?.city || "",
                    state: selectedCompany.billingAddress?.state || "",
                    pincode: selectedCompany.billingAddress?.pincode || "",
                },
            });
        }
    }, [selectedCompany]);

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleAddressChange = (e) => {
        setForm({
            ...form,
            billingAddress: {
                ...form.billingAddress,
                [e.target.name]: e.target.value,
            },
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (selectedCompany) {
            await updateCompany(selectedCompany._id, form);
        } else {
            await createCompany(form);
        }

        close();
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-[600px]">
                <h2 className="text-xl font-semibold mb-4">
                    {selectedCompany ? "Edit Company" : "Add Company"}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">

                    <input
                        name="companyName"
                        value={form.companyName}
                        onChange={handleChange}
                        placeholder="Company Name"
                        className="w-full border p-3 rounded"
                        required
                    />

                    <input
                        name="legalName"
                        value={form.legalName}
                        onChange={handleChange}
                        placeholder="Legal Name"
                        className="w-full border p-3 rounded"
                    />

                    <input
                        name="gstNumber"
                        value={form.gstNumber}
                        onChange={handleChange}
                        placeholder="GST Number"
                        className="w-full border p-3 rounded"
                    />

                    <input
                        name="panNumber"
                        value={form.panNumber}
                        onChange={handleChange}
                        placeholder="PAN Number"
                        className="w-full border p-3 rounded"
                    />

                    <input
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Email"
                        className="w-full border p-3 rounded"
                    />

                    <input
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="Phone"
                        className="w-full border p-3 rounded"
                    />

                    <div className="border-t pt-4">
                        <h3 className="font-medium mb-2">Billing Address</h3>

                        <input
                            name="street"
                            value={form.billingAddress.street}
                            onChange={handleAddressChange}
                            placeholder="Street"
                            className="w-full border p-2 rounded mb-2"
                        />

                        <div className="grid grid-cols-2 gap-3">
                            <input
                                name="city"
                                value={form.billingAddress.city}
                                onChange={handleAddressChange}
                                placeholder="City"
                                className="border p-2 rounded"
                            />

                            <input
                                name="state"
                                value={form.billingAddress.state}
                                onChange={handleAddressChange}
                                placeholder="State"
                                className="border p-2 rounded"
                            />
                        </div>

                        <input
                            name="pincode"
                            value={form.billingAddress.pincode}
                            onChange={handleAddressChange}
                            placeholder="Pincode"
                            className="w-full border p-2 rounded mt-2"
                        />
                    </div>

                    <div className="flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={close}
                            className="px-4 py-2 border rounded"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CompanyForm;
