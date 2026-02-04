import React from "react";
import contactusgrow from "../../assets/contactus/contactusgrow.png";

import useServiceContactStore from "../../zustand/useServiceContactStore"


const ServiceContact = () => {

    const { form, setField, submitForm, loading } = useServiceContactStore()


    return (
        <section className="bg-black h-fit p-8 relative">
            <div className="max-w-7xl mx-auto px-6 flex flex-row gap-16 items-center">

                <div className="bg-white rounded-2xl p-10 shadow-xl max-w-xl w-full">
                    <h2 className="text-2xl font-bold mb-2">
                        Ready to get started
                    </h2>
                    <p className="text-gray-500 text-sm mb-8">
                        Fill out the form below and we’ll get back to you within 24 hours
                    </p>

                    <form
                        onSubmit={(e) => {
                            e.preventDefault()
                            submitForm()
                        }}
                        className="space-y-6">
                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium">
                                    First Name*
                                </label>
                                <input
                                    type="text"
                                    value={form.firstName}
                                    onChange={(e) => setField("firstName", e.target.value)}
                                    className="mt-2 w-full border rounded-lg px-4 py-2 outline-none"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium">
                                    Email ID*
                                </label>
                                <input
                                    type="email"
                                    value={form.email}
                                    onChange={(e) => setField("email", e.target.value)}
                                    className="mt-2 w-full border rounded-lg px-4 py-2 outline-none"
                                />
                            </div>
                        </div>

                        {/* Company */}
                        <div>
                            <label className="text-sm font-medium">
                                Company (Optional)
                            </label>
                            <input
                                type="text"
                                value={form.company}
                                onChange={(e) => setField("company", e.target.value)}
                                className="mt-2 w-full border rounded-lg px-4 py-2 outline-none"
                            />
                        </div>

                        {/* Project Details */}
                        <div>
                            <label className="text-sm font-medium">
                                Project Details*
                            </label>
                            <textarea
                                value={form.projectDetails}
                                onChange={(e) => setField("projectDetails", e.target.value)}
                                rows={4}
                                className="mt-2 w-full border rounded-lg px-4 py-2 outline-none resize-none"
                            />
                        </div>

                        {/* CTA */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 bg-[#405BAA] text-white rounded-xl font-medium hover:bg-[#405BAA]/90 transition"
                        >
                            {loading ? "Sending..." : "Let’s Work Together"}
                        </button>
                    </form>
                </div>

                {/* Illustration */}
                <div className="hidden lg:flex justify-center">
                    <img
                        src={contactusgrow}
                        alt="Grow with us"
                        className="absolute right-0 bottom-0 object-contain hidden xl:block"
                    />
                </div>
            </div>
        </section>
    );
};

export default ServiceContact;
