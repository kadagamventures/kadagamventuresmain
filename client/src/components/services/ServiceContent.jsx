// import React from "react";

// const ServiceContent = ({ sections = [] }) => {
//     if (!sections.length) return null;

//     return (
//         <section
//             data-aos="fade-top"
//             data-aos-duration="800"
//             className="max-w-7xl mx-auto px-6 space-y-20">
//             {sections.map((section, index) => (
//                 <div key={index} className="w-full">

//                     <h2 className="text-2xl font-semibold mb-3">
//                         {section.title}
//                     </h2>


//                     {section.description && (
//                         <p className="text-gray-600 mb-6">
//                             {section.description}
//                         </p>
//                     )}

//                     {section.ordered ? (
//                         <ol className="list-decimal list-inside space-y-3 text-gray-700">
//                             {section.items.map((item, i) => (
//                                 <li key={i}>{item}</li>
//                             ))}
//                         </ol>
//                     ) : (
//                         <ul className="list-disc list-inside space-y-3 text-gray-700">
//                             {section.items.map((item, i) => (
//                                 <li key={i}>{item}</li>
//                             ))}
//                         </ul>
//                     )}
//                      {/* ✅ FAQs Section */}
//                      {section.faqs && section.faqs.length > 0 && (
//                         <div className="mt-10">
//                             <h3 className="text-xl font-semibold mb-4">
//                                 Frequently Asked Questions
//                             </h3>

//                             <div className="space-y-4">
//                                 {section.faqs.map((faq, i) => (
//                                     <div
//                                         key={i}
//                                         className="border border-gray-200 rounded-lg p-4 bg-gray-50"
//                                     >
//                                         <h4 className="font-semibold text-lg mb-2">
//                                             {faq.question}
//                                         </h4>

//                                         <p className="text-gray-600 leading-relaxed">
//                                             {faq.answer}
//                                         </p>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             ))}
//         </section>
//     );
// };

// export default ServiceContent;

import React from "react";

const ServiceContent = ({ sections = [] }) => {
    if (!sections.length) return null;

    return (
        <section
            data-aos="fade-top"
            data-aos-duration="800"
            className="max-w-7xl mx-auto px-6 space-y-7"
        >
            {sections.map((section, index) => (
                <div key={index} className="w-full">

                    {/* Title */}
                    <h2 className="text-2xl font-semibold mb-3">
                        {section.title}
                    </h2>

                    {/* Description */}
                    {section.description && (
                        <p className="text-gray-600 mb-6 text-justify leading-relaxed">
                            {section.description}
                        </p>
                    )}

                    {section.items && section.items.length > 0 && (
                        section.ordered ? (
                            <ol className="list-decimal list-inside space-y-3 text-gray-700 text-justify leading-relaxed">
                                {section.items.map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ol>
                        ) : (
                            <ul className="list-disc list-inside space-y-3 text-gray-700 text-justify leading-relaxed">
                                {section.items.map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ul>
                        )
                    )}

                    {/* FAQs Section */}
                   {/* FAQs Section */}
{section.faqs && section.faqs.length > 0 && (
    <div className="mt-10 w-full">
        <h3 className="text-xl font-semibold mb-4">
            Frequently Asked Questions
        </h3>

        <div className="space-y-4">
            {section.faqs.map((faq, i) => (
                <div
                    key={i}
                    className="border border-gray-200 rounded-lg p-4 bg-gray-50"
                >
                    <h4 className="font-semibold text-lg mb-2">
                        {faq.question}
                    </h4>

                    {/* ✅ Handle string OR array */}
                    {Array.isArray(faq.answer) ? (
                        <ul className="list-disc list-inside space-y-1 text-gray-600 leading-relaxed text-justify">
                            {faq.answer.map((point, index) => (
                                <li key={index}>{point}</li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-600 leading-relaxed text-justify">
                            {faq.answer}
                        </p>
                    )}

                </div>
            ))}
        </div>
    </div>
)}

                </div>
            ))}
        </section>
    );
};

export default ServiceContent;