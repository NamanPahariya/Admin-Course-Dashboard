import React from 'react'
import Profile from '../components/settings/Profile'
import Security from '../components/settings/Security'

function Setting() {
    return (
        <div className="flex-1 overflow-auto relative z-10 bg-white">
            <main className="max-w-4xl mx-auto py-6 px-4 lg:px-8">
                <Profile />
                <Security />
            </main>
        </div>
    )
}

export default Setting
