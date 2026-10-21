import React, { useEffect, useState } from 'react'
import Header from '../components/common/Header'
import { getCourse } from '../Api'
import RecentCourses from '../components/Dashboard/RecentCourses';
import RecentCareer from '../components/Dashboard/RecentCareer';
import QuickActions from '../components/Dashboard/QuickActions';

function Dashboard() {
    const [course, setAllCourses] = useState([]);

    useEffect(() => {
        const listCourse = async () => {
            const result = await getCourse();
            console.log(result);
            setAllCourses(result)
        }
        listCourse();
    }, [])

    return (
        <div className="flex-1 overflow-auto relative z-10">
            <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
                <Header title="Dashbord" />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <RecentCourses course={course} />
                    <QuickActions />
                    <RecentCareer />
                </div>
            </main>
        </div>
    )
}

export default Dashboard
