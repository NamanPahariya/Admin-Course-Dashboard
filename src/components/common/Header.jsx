import React from 'react'

function Header({ title }) {
    return (
        <div className="flex justify-between items-center flex-wrap gap-4 max-w-7xl mx-auto py-2 px-4 sm:px-6 lg:px-8 mt-5">
            <h1 className="text-2xl font-semibold text-black">{title}</h1>
            <div className="flex gap-3 relative"></div>
        </div>
    )
}

export default Header
