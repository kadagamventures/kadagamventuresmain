import React from "react";
import { termsData } from "../data/termData";

const TermsAndConditions = () => {
    const data = termsData["terms-and-conditions"];

    return (
        <div className="min-h-screen font-sans mt-16 bg-white px-6 py-10 md:px-20">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                    {data.title}
                </h1>

                <p className="text-gray-600 mb-8">{data.description}</p>

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

                {data.process && (
                    <div className="mt-12">
                        <h2 className="text-xl font-semibold mb-4">
                            {data.process.title}
                        </h2>

                        <div className="flex flex-wrap gap-4">
                            {data.process.steps.map((step, i) => (
                                <div
                                    key={i}
                                    className="px-4 py-2 bg-gray-100 rounded-lg"
                                >
                                    {step.title}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TermsAndConditions;
