import React from 'react'
import SettingSection from './SettingSection'
import { User } from 'lucide-react'
import { Image } from 'antd'
import AdminImage from '../../assets/image/AdminImage.jpeg'

function Profile() {
    return (
        <SettingSection icon={User} title={"Profile"}>
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
                <Image
                    src={AdminImage}
                    alt="Profile Image"
                    width={100}
                    height={100}
                    className="rounded-full object-cover cursor-pointer"
                    preview={{
                        maskClassName: "rounded-full",
                    }}
                />

                <div className="text-center sm:text-left">
                    <h3 className="text-lg font-semibold text-gray-900">Admin</h3>
                    <p className="text-gray-500">Harsh Rawal</p>
                </div>
            </div>
        </SettingSection>
    )
}

export default Profile
