import React from 'react'
import SideBar from '../components/common/SideBar'
import { Outlet } from 'react-router'

function MainLayout() {
    return (
        <div className='flex h-screen overflow-hidden'>
            <SideBar />
            <Outlet />
        </div>
    )
}

export default MainLayout
