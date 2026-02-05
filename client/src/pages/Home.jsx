import React, { useRef } from 'react'
import HeroHome from '../components/HeroHome'
import OurProducts from '../components/OurProducts'
import Journey from '../components/Journey'
import Vision from '../components/Vision'
import ServiceCoursel from '../components/ServiceCoursel'
import ContactUs from '../components/ContactUs'
import OurClients from '../components/OurClients'

const Home = () => {

    const contactRef = useRef(null);

    const scrollToContact = () => {
        contactRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start"
        })
    }

    return (
        <main className=''>
            <section>
                <HeroHome onGetStarted={scrollToContact} />
            </section>
            <section>
                <OurProducts />
            </section>
            <section>
                <OurClients />
            </section>
            <section>
                <Journey />
            </section>
            <section>
                <Vision />
            </section>
            <section>
                <ServiceCoursel />
            </section>
            <section ref={contactRef} className='p-8'>
                <ContactUs />
            </section>
        </main>
    )
}

export default Home