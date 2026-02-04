import React from "react";

const ServiceContent = ({ sections = [] }) => {
    if (!sections.length) return null;

    return (
        <section
            data-aos="fade-top"
            data-aos-duration="800"
            className="max-w-7xl mx-auto px-6 space-y-20">
            {sections.map((section, index) => (
                <div key={index} className="max-w-3xl">

                    <h2 className="text-2xl font-semibold mb-3">
                        {section.title}
                    </h2>


                    {section.description && (
                        <p className="text-gray-600 mb-6">
                            {section.description}
                        </p>
                    )}

                    {section.ordered ? (
                        <ol className="list-decimal list-inside space-y-3 text-gray-700">
                            {section.items.map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ol>
                    ) : (
                        <ul className="list-disc list-inside space-y-3 text-gray-700">
                            {section.items.map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                    )}
                </div>
            ))}
        </section>
    );
};

export default ServiceContent;
