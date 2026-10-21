import React, { useEffect, useState } from 'react'
import { DeleteCourse, getCourse } from '../../Api';
import { Dropdown, Empty, Image, Modal } from 'antd';
import { Ellipsis, Eye, Pencil, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion'
import CourseModal from './CourseModal';
import { del } from 'motion/react-m';


function CourseTable({ showModal, setShowModal }) {
    const [course, setAllCourses] = useState([]);
    const [targetCourse, setTargetCourse] = useState(null)
    const [deleteTarget, setDeleteTarget] = useState(null)
    const [viewTarget, setViewTarget] = useState(null)


    const listCourse = async () => {
        const result = await getCourse();
        console.log(result);
        setAllCourses(result)
    }
    useEffect(() => {

        listCourse();
    }, [])

    function eventMenu(course) {
        return {
            items: [
                {
                    key: 'View',
                    label: "view",
                    icon: <Eye size={16} />
                },
                {
                    key: 'Edit',
                    label: "Edit",
                    icon: <Pencil size={16} />
                },
                {
                    key: 'Delete',
                    label: "Delete",
                    icon: <Trash2 size={16} />,
                    danger: true
                },
            ],
            onClick: ({ key }) => {
                if (key === 'Edit') {
                    setTargetCourse(course)
                    setShowModal(true)
                }
                if (key === 'Delete') {
                    setDeleteTarget(course)
                }
                if (key === 'View') {
                    setViewTarget(course);
                }
            }
        }
    }

    async function deleteCourse() {
        const courseId = deleteTarget.courseId;
        const result = await DeleteCourse(courseId)
        if (result) {
            setDeleteTarget(null);
            listCourse();
        }
    }
    return (
        <motion.div className="bg-white rounded-xl border border-gray-200 pb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}>
            <div className="overflow-x-auto rounded-xl">
                <table className="min-w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                                Image
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                                Title
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                                Link
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {course && course.length > 0 ? (
                            course.map((item) => (
                                <tr key={item.courseId}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10">
                                                <div className="h-10 w-10 rounded-full bg-gradient-to-r flex items-center justify-center text-white font-semibold cursor-pointer">
                                                    {item.courseImage ? ( // Fixed: changed from course.file to course.courseImage
                                                        <Image
                                                            src={item.courseImage}
                                                            alt="course"
                                                            className="h-full w-full object-cover rounded-full"
                                                            style={{
                                                                width: "40px",
                                                                height: "40px",
                                                                borderRadius: "50%",
                                                            }}
                                                            preview={{
                                                                mask: false,
                                                                maskClassName: "rounded-full",
                                                            }}
                                                        />
                                                    ) : (
                                                        <Avatar
                                                            icon={<User size={20} />}
                                                            className="bg-gray-400"
                                                            style={{ width: "100%", height: "100%" }}
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-700">
                                            {item.courseName}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            ₹{item.coursePrice}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-700">
                                            {item.courseUrl ? (
                                                <a
                                                    href={item.courseUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 hover:text-blue-800 underline"
                                                >
                                                    {item.courseUrl}
                                                </a>
                                            ) : (
                                                <span className="text-gray-400">No URL</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 relative">
                                        <Dropdown
                                            menu={eventMenu(item)}
                                            trigger={["click"]}
                                            placement="bottomRight"
                                        >
                                            <button>
                                                <Ellipsis className="text-gray-600 hover:text-gray-800" />
                                            </button>
                                        </Dropdown>
                                    </td>
                                </tr>
                            ))

                        ) : (<Empty />)}
                    </tbody>
                </table>
            </div>

            {showModal && <CourseModal onUpdate={listCourse} onClose={() => { setShowModal(false); setTargetCourse(null) }} targetCourse={targetCourse} />}

            <Modal open={!!deleteTarget} okText="delete" title="delete course" onOk={deleteCourse} onCancel={() => setDeleteTarget(null)} okButtonProps={{ danger: true }}>
                <p>Are you sure you want to delete <b>{deleteTarget?.courseName}?</b></p>
            </Modal>

            <Modal
                title="Course Details"
                open={!!viewTarget}
                onCancel={() => setViewTarget(null)}
                width={700}
                centered
                okText="Open link"
                onOk={() => window.open(viewTarget?.courseUrl, '_blank', 'noopener,noreferrer')}
                okButtonProps={{ disabled: !viewTarget?.courseUrl }}
            >
                {viewTarget && (
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 260, damping: 22 }}
                    >
                        {/* Header */}
                        <div className="flex items-start gap-4 pb-6 border-b">
                            <div className="shrink-0">
                                {viewTarget.courseImage ? (
                                    <Image
                                        src={viewTarget.courseImage}
                                        alt={viewTarget.courseName}
                                        width={64}
                                        height={64}
                                        className="rounded-full object-cover"
                                        style={{ borderRadius: "50%", objectFit: "cover" }}
                                    />
                                ) : (
                                    <Avatar
                                        size={64}
                                        className="bg-gray-200 flex items-center justify-center"
                                        icon={<User />}
                                    />
                                )}
                            </div>

                            <div className="min-w-0 flex-1">
                                <h2 className="truncate text-xl font-semibold text-gray-800">
                                    {viewTarget.courseName || "Course"}
                                </h2>
                                <p className="mt-1 text-gray-600">
                                    {viewTarget.courseDescription || "No description provided."}
                                </p>
                            </div>
                        </div>

                        {/* Body */}
                        <div className="pt-6">
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div className="rounded-xl border p-4 hover:shadow-sm transition-all">
                                    <p className="mb-1 text-xs font-medium uppercase tracking-wide text-gray-500">
                                        Price
                                    </p>
                                    <div className="text-sm font-semibold text-gray-900 min-h-[20px]">
                                        ₹{viewTarget.coursePrice}
                                    </div>
                                </div>

                                <div className="rounded-xl border p-4 hover:shadow-sm transition-all">
                                    <p className="mb-1 text-xs font-medium uppercase tracking-wide text-gray-500">
                                        Created On
                                    </p>
                                    <div className="text-sm font-semibold text-gray-900 min-h-[20px]">
                                        {viewTarget.createdAt
                                            ? new Date(viewTarget.createdAt).toLocaleString()
                                            : "—"}
                                    </div>
                                </div>

                                <div className="rounded-xl border p-4 hover:shadow-sm transition-all sm:col-span-2">
                                    <p className="mb-1 text-xs font-medium uppercase tracking-wide text-gray-500">
                                        Course URL
                                    </p>
                                    <div className="text-sm font-semibold min-h-[20px] break-all">
                                        {viewTarget.courseUrl ? (
                                            <a
                                                href={viewTarget.courseUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:text-blue-800 underline"
                                            >
                                                {viewTarget.courseUrl}
                                            </a>
                                        ) : (
                                            <span className="text-gray-400">No URL</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </Modal>
        </motion.div>
    )
}

export default CourseTable
