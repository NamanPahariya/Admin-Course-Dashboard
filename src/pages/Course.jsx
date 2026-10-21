import React, { useState } from 'react'
import Header from '../components/common/Header'
import { Plus } from 'lucide-react'
import CourseTable from '../components/Courses/CourseTable'

function Course() {
    const [showModal, setShowModal] = useState(false);
    return (
        <div className="flex-1 overflow-auto relative z-10 bg-white">
            <Header title="Courses" />
            <main className="max-w-7xl mx-auto py-2 px-4 lg:px-8">
                <div className="flex flex-wrap mb-2">
                    <button
                        className="bg-blue-600 border-2 text-white rounded-lg mt-2 pl-4 pr-4 py-2 flex gap-1"
                        onClick={() => setShowModal(true)}
                    >
                        {" "}

                        <Plus /> Add Courses{" "}
                    </button>

                </div>
                <CourseTable showModal={showModal} setShowModal={setShowModal} />
            </main>

        </div >
    )
}

export default Course
