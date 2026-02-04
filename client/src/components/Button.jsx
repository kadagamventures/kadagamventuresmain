import React from 'react'

const Button = ({ title, onClick }) => {
    return (
        <button className='bg-[#FF002D] font-bold py-3 rounded-xl px-16 font-sans text-white cursor-pointer' onClick={onClick}>
            {title}
        </button>
    )
}

export default Button