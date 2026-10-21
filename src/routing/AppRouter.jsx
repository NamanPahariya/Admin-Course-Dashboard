import { createBrowserRouter } from "react-router";
import Login from "../pages/Login";
import SideBar from "../components/common/SideBar";
import Dashboard from "../pages/Dashboard";
import MainLayout from "../pages/MainLayout";
import Course from "../pages/Course";
import Setting from "../pages/Setting";
import { authLoader } from "../pages/auth/authLoader";
import { guestLoader } from "../pages/auth/guestLoader";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Login />,
        loader: guestLoader,
    },
    {

        element: <MainLayout />,
        loader: authLoader,
        children: [
            {
                path: '/dashboard',
                element: <Dashboard />
            },
            {
                path: '/course',
                element: <Course />
            },
            {
                path: '/setting',
                element: <Setting />
            }
        ]
    }
])