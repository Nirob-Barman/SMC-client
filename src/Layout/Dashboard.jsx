import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import NavBar from '../Pages/Shared/NavBar/NavBar';
import { AuthContext } from '../providers/AuthProvider';

const Dashboard = () => {

    const { userRole } = useContext(AuthContext);

    // const userRole = 'admin';
    // const userRole = 'instructor';
    // const userRole = 'student';

    return (
        <div>
            <div>
                <NavBar />
            </div>
            <div className='text-center'>
                DashBoard
            </div>
            <div>
                <div className="drawer">
                    <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content">
                        <Outlet />
                        <label htmlFor="my-drawer" className="btn btn-primary drawer-button">Open drawer</label>
                    </div>
                    <div className="drawer-side">
                        <label htmlFor="my-drawer" className="drawer-overlay"></label>
                        <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">

                            {
                                userRole === 'admin' && <>

                                    <li>
                                        <NavLink to="/dashboard/adminHome">Admin Home</NavLink>
                                        <NavLink to="/dashboard/adminGround">Admin Ground</NavLink>
                                        <NavLink to="/dashboard/manageUsers">Manage Users</NavLink>
                                        <NavLink to="/dashboard/manageClasses">Manage Classes</NavLink>
                                    </li>
                                </>
                            }

                            {
                                userRole === 'instructor' && <>

                                    <li>
                                        <NavLink to="/dashboard/instructorHome">Instructor Home</NavLink>
                                        <NavLink to="/dashboard/instructorGround">Instructor Ground</NavLink>
                                        <NavLink to="/dashboard/addClass">Add Class</NavLink>
                                        <NavLink to="/dashboard/myClass">My Classes</NavLink>
                                    </li>
                                </>
                            }

                            {
                                userRole === 'student' && <>

                                    <li>
                                        <NavLink to="/dashboard/studentHome">Student Home</NavLink>
                                        <NavLink to="/dashboard/studentGround">Student Ground</NavLink>
                                    </li>
                                </>
                            }

                            {/* Sidebar content here */}
                            <li>
                                <div className="divider"></div>
                            </li>
                            <li>
                                <Link to="/dashboard/check">Check</Link>
                            </li>
                            <li><a>Sidebar Item 2</a></li>

                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;