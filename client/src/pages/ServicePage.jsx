import React from 'react'
import { useParams } from "react-router-dom";
import { servicesData } from '../data/servicesData';
import ServiceLayout from '../components/services/ServiceLayout';

const ServicePage = () => {
    const { serviceSlug } = useParams();

    const service = servicesData[serviceSlug];

    if (!service) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] text-center text-gray-500">
                <h2 className="text-3xl md:text-4xl font-semibold">
                    Service not found
                </h2>
                <p className="mt-2 text-sm md:text-base text-gray-400">
                    The service you’re looking for doesn’t exist or has been removed.
                </p>
            </div>

        );
    }

    return <ServiceLayout service={service} />;
}

export default ServicePage