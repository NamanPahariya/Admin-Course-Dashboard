import React from 'react'
import { Lock } from 'lucide-react'
import SettingSection from './SettingSection'

function Security() {
    return (
        <SettingSection icon={Lock} title="Security">
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">


                <div className="text-center sm:text-left">
                    <button className='bg-gray-400 text-white rounded-md p-2'>Change Password</button>
                </div>
            </div>
        </SettingSection>
    )
}

export default Security
