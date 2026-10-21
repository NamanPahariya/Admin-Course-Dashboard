import { Empty, Image } from 'antd';
import React from 'react'
import { useNavigate } from 'react-router'
import { motion } from 'framer-motion'


function RecentCourses({ course }) {
    const navigate = useNavigate();
    return (
        <motion.div
            className="bg-white rounded-xl lg:col-span-2 border border-gray-300 divide-y divide-gray-300 h-fit"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
        >
            <div className="flex items-center justify-between px-4 py-3">
                <h2 className="text-sm font-semibold text-gray-900">Recent Courses</h2>
                <button
                    className="text-sm text-gray-500 hover:underline"
                    onClick={() => navigate('/course')}
                >
                    View All
                </button>
            </div>
            <div>
                {course && course.length > 0 ? (
                    course.map((course) => (
                        <div key={course.courseId} className=' flex items-center justify-between px-4 py-4 space-x-4'>
                            <div className="flex items-center space-x-4">
                                <Image
                                    src={course.courseImage}
                                    alt="course"
                                    className="h-full w-full object-cover rounded-full"
                                    style={{
                                        width: "40px",
                                        height: "40px",
                                        borderRadius: "50%",
                                        cursor: "pointer",
                                    }}
                                    preview={{
                                        mask: false,
                                        maskClassName: "rounded-full",
                                    }}
                                />
                                <div>
                                    <p className="font-semibold text-gray-900">
                                        {course.courseName}
                                    </p>
                                    <p className="text-gray-400 whitespace-pre-line text-sm">
                                        {course.courseDescription}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <Empty description="No courses found" image={Empty.PRESENTED_IMAGE_SIMPLE} />
                )}
            </div>


        </motion.div>
    )
}

export default RecentCourses
