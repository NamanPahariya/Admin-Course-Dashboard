import React from 'react'
import { motion } from 'framer-motion'
import { Empty } from 'antd'
function RecentCareer() {
    return (
        <motion.div
            className="bg-white rounded-xl lg:col-span-2 border border-gray-300 divide-y divide-gray-300 h-fit"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
        >
            <div className="flex items-center justify-between px-4 py-3">
                <h2 className="text-sm font-semibold text-gray-900">
                    Recent Career Openings
                </h2>
            </div>

            <div>

                <div className="flex justify-center items-center py-6">
                    <Empty
                        description="Upcoming Feature"
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                    />
                </div>
            </div>
        </motion.div>
    )
}

export default RecentCareer
