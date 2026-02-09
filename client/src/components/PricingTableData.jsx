import React, { useEffect } from "react";
import usePricingTable from "../zustand/usePricingTableStore";

import { FaCheckCircle } from "react-icons/fa";


const PricingTableData = ({ slug }) => {
    const { pricingData, fetchPricingTable, loading, error } = usePricingTable();

    useEffect(() => {
        fetchPricingTable();
    }, []);

    if (loading) return <p className="text-center py-10">Loading pricing...</p>;
    if (error) return <p className="text-red-500 text-center">{error}</p>;

    const service = pricingData
        ?.map(item => item.data)
        ?.find(item => item.slug === slug);

    if (!service) return null;

    const scrollToContact = () => {
        const section = document.getElementById("contact-us");
        section?.scrollIntoView({ behavior: "smooth" });
    };


    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-6xl mx-auto px-4">

                {/* Title */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold">{service.title}</h2>
                    <p className="text-gray-600 mt-2">{service.description}</p>
                </div>

                {/* Pricing Cards */}
                <div className="grid md:grid-cols-2 gap-8 font-sans">

                    {service.pricingPlans.map((plan) => (
                        <div
                            key={plan._id}
                            className={`rounded-2xl shadow-lg p-8 border transition 
                                ${plan.isPopular
                                    ? "border-gray-300/75 scale-105 bg-white"
                                    : "border-gray-200 bg-white"
                                }`}
                        >
                            {plan.isPopular && (
                                <span className="bg-black text-white text-xs px-3 py-1 rounded-full">
                                    Most Popular
                                </span>
                            )}

                            <h3 className="text-xl font-semibold mt-4">
                                {plan.planName}
                            </h3>

                            <p className="text-2xl font-bold my-3 blur-s">
                                ₹ {plan.priceFrom.toLocaleString()} – ₹ {plan.priceTo.toLocaleString()}
                            </p>

                            <p className="text-gray-500 mb-4">
                                Duration: {plan.duration}
                            </p>

                            {/* Features */}
                            <ul className="space-y-2 mb-6">
                                {plan.features.map((feature, index) => (
                                    <li key={index} className="flex items-center gap-2">
                                        <FaCheckCircle />{feature}
                                    </li>
                                ))}
                            </ul>

                            <button
                                onClick={scrollToContact}
                                className="w-full mt-6 bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
                            >
                                Contact Us
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            {/* Pricing Note */}
            <p className="text-sm text-gray-500 text-center mt-12">
                *Prices may vary based on your requirements and customization.
            </p>

        </section>
    );
};

export default PricingTableData;
