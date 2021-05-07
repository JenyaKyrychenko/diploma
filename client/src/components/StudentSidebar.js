import React from 'react'
import {NavLink} from "react-router-dom";

export const StudentSidebar = () => {
    return (
        <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

            {/*Sidebar - Brand*/}
            <NavLink className="sidebar-brand d-flex align-items-center justify-content-center" to="/">
                <div className="sidebar-brand-icon rotate-n-15">
                    <i className="fas fa-laugh-wink"></i>
                </div>
                <div className="sidebar-brand-text mx-3">SB Admin <sup>2</sup></div>
            </NavLink>

            {/*Divider*/}
            <hr className="sidebar-divider my-0"/>

            {/*Nav Item - Declaration*/}
            <li className="nav-item">
                <NavLink className="nav-link" to='/student/createform'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                         className="bi bi-archive-fill fileLoadSvg" viewBox="0 0 16 16">
                        <path
                            d="M12.643 15C13.979 15 15 13.845 15 12.5V5H1v7.5C1 13.845 2.021 15 3.357 15h9.286zM5.5 7h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1zM.8 1a.8.8 0 0 0-.8.8V3a.8.8 0 0 0 .8.8h14.4A.8.8 0 0 0 16 3V1.8a.8.8 0 0 0-.8-.8H.8z"/>
                    </svg>
                    <span>Формування заяви</span>
                </NavLink>
            </li>

            {/*Divider*/}
            <hr className="sidebar-divider"/>


            <li className="nav-item">
                <NavLink className="nav-link" to='/student/speciality'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                         className="bi bi-bookmark-check-fill fileLoadSvg" viewBox="0 0 16 16">
                        <path fillRule="evenodd"
                              d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5zm8.854-9.646a.5.5 0 0 0-.708-.708L7.5 7.793 6.354 6.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"/>
                    </svg>
                    <span>Обрати спеціальність</span>
                </NavLink>
            </li>

            {/*Divider*/}
            <hr className="sidebar-divider d-none d-md-block"/>

            <li className="nav-item">
                <NavLink className="nav-link" to='/student/researchwork'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                         className="bi bi-book-fill fileLoadSvg" viewBox="0 0 16 16">
                        <path
                            d="M8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z"/>
                    </svg>
                    <span>Дослідницька пропозиція</span>
                </NavLink>
            </li>

            <hr className="sidebar-divider d-none d-md-block"/>

            <li className="nav-item">
                <NavLink className="nav-link" to='/student/exams'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                         className="bi bi-calendar fileLoadSvg" viewBox="0 0 16 16">
                        <path
                            d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
                    </svg>
                    <span>Іспити</span>
                </NavLink>
            </li>
        </ul>

    )
}