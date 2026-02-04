import React from 'react'
import HeroHome from '../components/HeroHome'
import OurProducts from '../components/OurProducts'
import Journey from '../components/Journey'
import Vision from '../components/Vision'
import ServiceCoursel from '../components/ServiceCoursel'
import ContactUs from '../components/ContactUs'

const Home = () => {
    return (
        <main className=''>
            <section>
                <HeroHome />
            </section>
            <section>
                <OurProducts />
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
            <section className='p-8'>
                <ContactUs />
            </section>
        </main>
    )
}

export default Home