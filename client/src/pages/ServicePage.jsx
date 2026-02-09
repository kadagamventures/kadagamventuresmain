import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { servicesData } from "../data/servicesData";
import ServiceLayout from "../components/services/ServiceLayout";

const ServicePage = () => {
    const { serviceSlug } = useParams();
    const service = servicesData[serviceSlug];

    useEffect(() => {
        console.log("meta",
            document.querySelector('meta[name="description"]')?.content
        );
    }, []);

    if (!service) {
        return (
            <>
                <Helmet>
                    <title>Service Not Found | Kadagam Ventures</title>
                    <meta
                        name="description"
                        content="The service you are looking for does not exist."
                    />
                </Helmet>

                <div className="flex flex-col items-center justify-center min-h-[50vh] text-center text-gray-500">
                    <h2 className="text-3xl md:text-4xl font-semibold">
                        Service not found
                    </h2>
                </div>
            </>
        );
    }

    return (
        <>
            {/* SEO META TAGS */}
            <Helmet>
                <title>{service.metatitle}</title>
                <meta name="description" content={service.metadescription} />
                <meta property="og:title" content={service.title} />
                <meta property="og:description" content={service.description} />
                <meta property="og:type" content="website" />


                {service.image && (
                    <meta property="og:image" content={service.image} />
                )}

                <meta name="robots" content="index, follow" />
            </Helmet>

            <ServiceLayout service={service} slug={serviceSlug} />
        </>
    );
};

export default ServicePage;