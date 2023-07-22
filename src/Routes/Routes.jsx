import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import Dashboard from "../Layout/Dashboard";
import DashboardPage from "../Pages/DashBoard/DashboardPage/DashboardPage";
import Check from "../Pages/DashBoard/Checking/Check";
import AddClassForm from "../Pages/DashBoard/InstructorPanel/AddClass/AddClassForm";
import MyClasses from "../Pages/DashBoard/InstructorPanel/MyClass/MyClasses";
import Instructors from "../Pages/InstructorsPage/Instructors";
import ManageUsers from "../Pages/DashBoard/AdminPanel/ManageUsers/ManageUsers";
import ManageClasses from "../Pages/DashBoard/AdminPanel/ManageClasses/ManageClasses";
import ClassesPage from "../Pages/ClassesPage/ClassesPage";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/instructors',
                element: <Instructors />
            },
            {
                path: '/classPage',
                element: <ClassesPage />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/signUp',
                element: <SignUp />
            }

        ]
    },
    {
        path: 'dashboard',
        element: <Dashboard />,
        children: [
            {
                path: 'dashboardPage',
                element: <DashboardPage />
            },
            {
                path: 'check',
                element: <Check />
            },
            // admin routes
            {
                path: 'manageUsers',
                element: <ManageUsers />
            },
            {
                path: 'manageClasses',
                element: <ManageClasses />
            },
            // instructor routes
            {
                path: 'addClass',
                element: <AddClassForm />
            },
            {
                path: 'myClass',
                element: <MyClasses />
            }
        ]
    }
]);