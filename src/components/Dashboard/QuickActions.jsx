import React from 'react'
import createCourse from '../../assets/icons/QuickCreateCourse.svg'
import settings from '../../assets/icons/QuickSettings.svg'
import { useNavigate } from 'react-router'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

function QuickActions() {
    const navigate = useNavigate()
    const action = [
        {
            title: 'Create Courses',
            icon: createCourse,
            path: '/course'
        },
        {
            title: 'Settings',
            icon: settings,
            path: '/setting'
        }
    ]
    return (
        <motion.div
            className="bg-white  border border-gray-200 divide-y divide-gray-300 rounded-xl h-fit"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
        >
            <div className="flex items-center justify-between px-4 py-3">
                <h2 className="text-sm font-semibold text-gray-900">Quick Actions</h2>
            </div>

            <div>
                {action.map((item, idx) => {
                    return (
                        <div
                            key={idx}
                            className="flex items-center justify-between px-4 py-4"
                        >
                            <div className="text-sm">
                                <span className="flex items-center text-sm font-medium text-gray-400">
                                    <img
                                        src={item.icon}
                                        alt="icon"
                                        className="w-7 h-7 mr-2"
                                    />
                                    <p className="font-semibold text-gray-600">
                                        {item.title}
                                    </p>
                                </span>
                            </div>
                            <button
                                className=" text-gray-600 px-4 py-1.5 rounded-md"
                                onClick={() => navigate(item.path)}
                            >
                                <ArrowRight size={20} />
                            </button>
                        </div>
                    );
                })}
            </div>
        </motion.div>
    )
}

export default QuickActions
