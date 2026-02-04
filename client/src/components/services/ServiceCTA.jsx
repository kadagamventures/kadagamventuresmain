import React from 'react'

const ServiceCTA = ({ title = "Boost Your Rankings" }) => {
    return (
        <section className='max-w-7xl mx-auto px-6'>
            <button
                className='w-full text-white font-semibold mx-auto bg-[#405BAA] rounded-2xl py-4 px-8'
            >{title}</button>
        </section>
    )
}

export default ServiceCTA