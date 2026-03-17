import React from "react";
import { refundData } from "../data/refundData";
import SocialLinks from "../components/SocialLinks";

const RefundPolicy = () => {
    const data = refundData["refund-and-cancellation-policy"];

    return (
        <div className="min-h-screen lg:mt-16 bg-white px-6 py-10 md:px-20">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                    {data.title}
                </h1>

                <p className="text-gray-600 mb-8">
                    {data.description}
                </p>
                <SocialLinks />

                {data.sections.map((section, index) => (
                    <div key={index} className="mb-8">
                        <h2 className="text-xl font-semibold mb-3">
                            {section.title}
                        </h2>

                        <ul className="list-disc pl-6 space-y-2 text-gray-700">
                            {section.items.map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RefundPolicy;