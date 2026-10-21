import React, { useState } from 'react'
import CourseIcon from '../../assets/icons/CourseIcon.svg'
import HomeIcon from '../../assets/icons/HomeIcon.svg'
import SettingIcon from '../../assets/icons/SettingIcon.svg'
import AdminImage from '../../assets/image/AdminImage.jpeg'
import { Link, replace, useNavigate } from 'react-router'
import { LogOut, Menu } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Image, Modal } from 'antd'
function SideBar() {
    const [isSideBarOpen, setIsSideBarOpen] = useState(true)
    const [isLogoutVisible, setIsLogoutVisible] = useState(false)
    const navigate = useNavigate()

    const sideBarItems = [
        {
            icon: HomeIcon,
            title: 'Dashboard',
            path: '/dashboard'
        },
        {
            icon: CourseIcon,
            title: 'Courses',
            path: '/course'
        },
        {
            icon: SettingIcon,
            title: 'setting',
            path: '/setting'
        }
    ]
    function confirmLogout() {
        localStorage.removeItem('token');
        navigate('/', { replace: true })
    }

    return (
        <motion.div
            className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${isSideBarOpen ? "w-64" : "w-20"
                }`}
            animate={{ width: isSideBarOpen ? 256 : 95 }}
        >
            <div className="h-full bg-white text-black backdrop-blur-md p-4 flex flex-col border-r border-gray-300">
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsSideBarOpen(!isSideBarOpen)}
                    className="p-2 rounded-full hover:bg-gray-300 transition-colors max-w-fit"
                >
                    <Menu size={24} />
                </motion.button>
                <div className="mt-6 mb-4">
                    <div className="flex items-center gap-3 p-2 rounded-lg bg-gray-100">
                        <div className="w-10 h-10 bg-black border-4 border-green-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                            T
                        </div>
                        <AnimatePresence>
                            {isSideBarOpen && (
                                <motion.div
                                    className="flex flex-col"
                                    initial={{ opacity: 0, width: 0 }}
                                    animate={{ opacity: 1, width: "auto" }}
                                    exit={{ opacity: 0, width: 0 }}
                                    transition={{ duration: 0.2, delay: 0.2 }}
                                >
                                    <span className="font-semibold text-sm">Telusko</span>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
                <nav className="mt-6 flex-grow">

                    {sideBarItems.map((item) => (
                        <div key={item.path}>
                            <Link to={item.path}>
                                <motion.div className="flex items-center p-4 text-sm font-medium rounded-lg hover:bg-gray-100 transition-colors mb-2">
                                    <img
                                        src={item.icon}
                                        alt={item.name}
                                        className="w-5 h-5 min-w-[20px]"
                                    />
                                    <AnimatePresence>
                                        {isSideBarOpen && (
                                            <motion.span
                                                className="ml-4 whitespace-nowrap"
                                                initial={{ opacity: 0, width: 0 }}
                                                animate={{ opacity: 1, width: "auto" }}
                                                exit={{ opacity: 0, width: 0 }}
                                                transition={{ duration: 0.2, delay: 0.3 }}
                                            >
                                                {item.title}
                                            </motion.span>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            </Link>
                        </div>
                    ))}
                </nav>
                <div className="mt-auto flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors">
                    <Image
                        src={AdminImage}
                        alt="Profile Image"
                        width={50}
                        height={50}
                        className="rounded-full object-cover cursor-pointer"
                        preview={{
                            maskClassName: "rounded-full",
                        }}
                    />
                    <AnimatePresence>
                        {isSideBarOpen && (
                            <motion.div
                                className="flex flex-col"
                                initial={{ opacity: 0, width: 0 }}
                                animate={{ opacity: 1, width: "auto" }}
                                exit={{ opacity: 0, width: 0 }}
                                transition={{ duration: 0.2, delay: 0.3 }}
                            >
                                <span className="text-sm font-medium">Admin</span>
                                <LogOut
                                    size={18}
                                    className="cursor-pointer text-gray-600 hover:text-red-500 transition-colors"
                                    onClick={() => setIsLogoutVisible(true)}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <Modal
                title="Confirm Logout"
                open={isLogoutVisible}
                okText="logout"
                okButtonProps={{ danger: true }}
                onCancel={() => setIsLogoutVisible(false)}
                onOk={() => {
                    confirmLogout(),
                        setIsLogoutVisible(false);
                }}
            >
                <p>Are you sure you want to logout?</p>

            </Modal>


        </motion.div>
    )
}

export default SideBar
