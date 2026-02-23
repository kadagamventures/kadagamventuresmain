import React, { useState } from "react";
import { useInvoiceStore } from "../../../zustand/InvoiceStore";
import { IoClose } from "react-icons/io5";

const AddPaymentModal = ({ invoiceId, close }) => {
    const { addPayment } = useInvoiceStore();

    const [form, setForm] = useState({
        amount: "",
        paymentMethod: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addPayment(invoiceId, {
            ...form,
            amount: Number(form.amount),
        });
        close();
    };

    return (
        <div
            className="fixed inset-0 bg-black/40 flex justify-center items-center z-50"
            onClick={close} // click outside to close
        >
            <div
                className="bg-white p-6 rounded w-[400px] space-y-4 relative"
                onClick={(e) => e.stopPropagation()} // prevent close when clicking inside
            >
                {/* Close Icon */}
                <button
                    onClick={close}
                    className="absolute top-3 right-3 text-gray-500 hover:text-black"
                >
                    <IoClose size={20} />
                </button>

                <h2 className="font-semibold text-lg">Add Payment</h2>

                <form onSubmit={handleSubmit} className="space-y-3">
                    <input
                        type="number"
                        placeholder="Amount"
                        className="w-full border p-2 rounded"
                        onChange={(e) =>
                            setForm({ ...form, amount: e.target.value })
                        }
                        required
                    />

                    <input
                        placeholder="Payment Method"
                        className="w-full border p-2 rounded"
                        onChange={(e) =>
                            setForm({
                                ...form,
                                paymentMethod: e.target.value,
                            })
                        }
                    />

                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={close}
                            className="w-full bg-gray-200 px-4 py-2 rounded"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="w-full bg-green-600 text-white px-4 py-2 rounded"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddPaymentModal;