import React from 'react'
import { footerConfig } from '../config/footerConfig'

const SocialLinks = () => {
    return (
        <div className="flex gap-3 mb-6">
            {footerConfig.social.map((item, index) => {
                const Icon = item.icon;
                return (
                    <a
                        key={index}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 flex items-center justify-center
                                                    rounded-full bg-gray-800 text-gray-300
                                                    hover:bg-[#9F090C] hover:text-white transition"
                    >
                        <Icon size={16} />
                    </a>
                );
            })}
        </div>
    )
}

export default SocialLinks