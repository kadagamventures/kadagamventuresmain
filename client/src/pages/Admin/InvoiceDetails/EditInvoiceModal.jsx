import React, { useState, useMemo } from "react";
import { useInvoiceStore } from "../../../zustand/InvoiceStore";

const EditInvoiceModal = ({ invoice, close }) => {
    const { updateInvoice } = useInvoiceStore();

    const [form, setForm] = useState({
        invoiceType: invoice.invoiceType,
        placeOfSupply: invoice.placeOfSupply || "",
        dueDate: invoice.dueDate
            ? invoice.dueDate.substring(0, 10)
            : "",
        advanceAmount: invoice.advanceAmount || 0,
        termsAndConditions: invoice.termsAndConditions || "",
        services: invoice.services.map((s) => ({
            serviceName: s.serviceName,
            description: s.description || "",
            sacCode: s.sacCode || "",
            price: s.price,
            quantity: s.quantity,
            gstRate: s.gstRate,
        })),
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleServiceChange = (index, field, value) => {
        const updated = [...form.services];
        updated[index][field] = value;
        setForm({ ...form, services: updated });
    };

    const addService = () => {
        setForm({
            ...form,
            services: [
                ...form.services,
                {
                    serviceName: "",
                    description: "",
                    sacCode: "",
                    price: "",
                    quantity: 1,
                    gstRate: 18,
                },
            ],
        });
    };

    const removeService = (index) => {
        const updated = form.services.filter((_, i) => i !== index);
        setForm({ ...form, services: updated });
    };

    // Preview Calculation
    const preview = useMemo(() => {
        let sub = 0;
        let gst = 0;

        form.services.forEach((s) => {
            const taxable =
                Number(s.price || 0) * Number(s.quantity || 0);
            const gstAmount =
                (taxable * Number(s.gstRate || 0)) / 100;
            sub += taxable;
            gst += gstAmount;
        });

        return {
            subTotal: sub,
            gst,
            grandTotal: Math.round(sub + gst),
        };
    }, [form.services]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            invoiceType: form.invoiceType,
            placeOfSupply: form.placeOfSupply,
            dueDate: form.dueDate,
            advanceAmount: Number(form.advanceAmount),
            termsAndConditions: form.termsAndConditions,
            services: form.services.map((s) => ({
                serviceName: s.serviceName,
                description: s.description,
                sacCode: s.sacCode,
                price: Number(s.price),
                quantity: Number(s.quantity),
                gstRate: Number(s.gstRate),
            })),
        };

        await updateInvoice(invoice.id, payload);
        close();
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
            <div className="bg-white w-250 max-h-[95vh] overflow-y-auto p-8 rounded-xl shadow-xl">

                <h2 className="text-2xl font-semibold mb-6">
                    Edit Invoice – {invoice.invoiceNumber}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-8">

                    {/* Basic Info */}
                    <div className="grid grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Invoice Type
                            </label>
                            <select
                                name="invoiceType"
                                value={form.invoiceType}
                                onChange={handleChange}
                                className="w-full border p-3 rounded-lg"
                            >
                               <option value="Tax_Invoice">Tax Invoice</option>
                               <option value="Proforma_Invoice">Proforma Invoice</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Place of Supply
                            </label>
                            <input
                                name="placeOfSupply"
                                value={form.placeOfSupply}
                                onChange={handleChange}
                                className="w-full border p-3 rounded-lg"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Due Date
                            </label>
                            <input
                                type="date"
                                name="dueDate"
                                value={form.dueDate}
                                onChange={handleChange}
                                className="w-full border p-3 rounded-lg"
                            />
                        </div>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">
                            Services
                        </h3>

                        {form.services.map((service, i) => (
                            <div key={i} className="border p-4 rounded-lg mb-4 space-y-3">

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-medium">
                                            Service Name
                                        </label>
                                        <input
                                            value={service.serviceName}
                                            onChange={(e) =>
                                                handleServiceChange(i, "serviceName", e.target.value)
                                            }
                                            className="w-full border p-2 rounded"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium">
                                            SAC Code
                                        </label>
                                        <input
                                            value={service.sacCode}
                                            onChange={(e) =>
                                                handleServiceChange(i, "sacCode", e.target.value)
                                            }
                                            className="w-full border p-2 rounded"
                                        />
                                    </div>
                                </div>

                                <textarea
                                    placeholder="Description"
                                    value={service.description}
                                    onChange={(e) =>
                                        handleServiceChange(i, "description", e.target.value)
                                    }
                                    className="w-full border p-2 rounded"
                                />

                                <div className="grid grid-cols-3 gap-4">
                                    <input
                                        type="number"
                                        placeholder="Price"
                                        value={service.price}
                                        onChange={(e) =>
                                            handleServiceChange(i, "price", e.target.value)
                                        }
                                        className="border p-2 rounded"
                                    />

                                    <input
                                        type="number"
                                        placeholder="Qty"
                                        value={service.quantity}
                                        onChange={(e) =>
                                            handleServiceChange(i, "quantity", e.target.value)
                                        }
                                        className="border p-2 rounded"
                                    />

                                    <input
                                        type="number"
                                        placeholder="GST %"
                                        value={service.gstRate}
                                        onChange={(e) =>
                                            handleServiceChange(i, "gstRate", e.target.value)
                                        }
                                        className="border p-2 rounded"
                                    />
                                </div>

                                {form.services.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeService(i)}
                                        className="text-red-600 text-sm"
                                    >
                                        Remove Service
                                    </button>
                                )}
                            </div>
                        ))}

                        <button
                            type="button"
                            onClick={addService}
                            className="text-blue-600 font-medium"
                        >
                            + Add Service
                        </button>
                    </div>

                    {/* Advance & Terms */}
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Advance Amount
                            </label>
                            <input
                                type="number"
                                name="advanceAmount"
                                value={form.advanceAmount}
                                onChange={handleChange}
                                className="w-full border p-3 rounded-lg"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Terms & Conditions
                            </label>
                            <textarea
                                name="termsAndConditions"
                                value={form.termsAndConditions}
                                onChange={handleChange}
                                className="w-full border p-3 rounded-lg"
                            />
                        </div>
                    </div>

                    {/* Preview */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <p>Subtotal: ₹ {preview.subTotal.toFixed(2)}</p>
                        <p>GST: ₹ {preview.gst.toFixed(2)}</p>
                        <p className="font-bold">
                            Grand Total: ₹ {preview.grandTotal.toFixed(2)}
                        </p>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end space-x-4 pt-4 border-t">
                        <button
                            type="button"
                            onClick={close}
                            className="px-5 py-2 border rounded-lg"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="px-5 py-2 bg-blue-600 text-white rounded-lg"
                        >
                            Update Invoice
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditInvoiceModal;