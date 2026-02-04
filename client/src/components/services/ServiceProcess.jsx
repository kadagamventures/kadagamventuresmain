import React from "react";

const ServiceProcess = ({ process }) => {
    if (!process || !process.steps?.length) return null;

    const { title, description, steps } = process;

    return (
        <section className="max-w-7xl mx-auto p-6">
            {/* Heading */}
            <h2 className="text-3xl font-semibold mb-4">{title}</h2>

            {description && (
                <p className="text-gray-600 w-full mb-10">
                    {description}
                </p>
            )}

            {/* Process Flow */}
            <div className="flex flex-wrap font-sans items-center justify-center gap-6 md:gap-8">
                {steps.map((step, i) => (
                    <React.Fragment key={i}>
                        {/* Step */}
                        <div className="flex flex-col items-center text-center min-w-30">
                            {step.icon && (
                                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gray-100 mb-3">
                                    <step.icon className="w-8 h-8 text-gray-700" />
                                </div>
                            )}

                            <span className="font-sans text-[#111111BF] text-lg">
                                {step.title}
                            </span>

                            {step.description && (
                                <p className="text-sm text-gray-500 mt-1 max-w-35">
                                    {step.description}
                                </p>
                            )}
                        </div>

                        {/* Dotted Arrow */}
                        {i !== steps.length - 1 && (
                            <div className="hidden md:flex items-center" aria-hidden="true">
                                <svg
                                    width="90"
                                    height="16"
                                    viewBox="0 0 120 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="text-gray-400"
                                >
                                    <line
                                        x1="0"
                                        y1="8"
                                        x2="104"
                                        y2="8"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeDasharray="6 6"
                                    />
                                    <polygon
                                        points="104,0 120,8 104,16"
                                        fill="currentColor"
                                    />
                                </svg>
                            </div>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </section>
    );
};

export default ServiceProcess;
