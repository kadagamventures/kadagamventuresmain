import React from 'react'
import RightClipAccent from '../RightClipAccent'

import ServiceHero from './ServiceHero'
import ServiceCTA from './ServiceCTA'
import ServiceContact from './ServiceContact'
import ServiceContent from './ServiceContent'
import ServiceProcess from './ServiceProcess'

const ServiceLayout = ({ service }) => {

    if (!service) return null;

    return (
        <main
            className='xl:space-y-20'
        >
            <ServiceHero {...service} />
            <ServiceContent sections={service.sections} />
            <ServiceProcess process={service.process || []} />
            {/* <ServiceCTA /> */}
            <ServiceContact />

        </main>
    )
}

export default ServiceLayout