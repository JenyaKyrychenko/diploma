import React from 'react'
import {NavLink} from "react-router-dom";

export const MentorSidebar = () => {
    return (
        <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

            {/*Sidebar - Brand*/}
            <NavLink className="sidebar-brand d-flex align-items-center justify-content-center" to="/">
                <div className="sidebar-brand-icon rotate-n-15">
                    <i className="fas fa-laugh-wink"></i>
                </div>
                <div className="sidebar-brand-text mx-3">APEPS <sup>2</sup></div>
            </NavLink>

            <hr className="sidebar-divider my-0"/>

            {/*Nav Item - Declaration*/}
            <li className="nav-item">
                <NavLink className="nav-link" to='/mentor/confirm'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                         className="bi bi-briefcase-fill fileLoadSvg" viewBox="0 0 16 16">
                        <path
                            d="M6.5 1A1.5 1.5 0 0 0 5 2.5V3H1.5A1.5 1.5 0 0 0 0 4.5v1.384l7.614 2.03a1.5 1.5 0 0 0 .772 0L16 5.884V4.5A1.5 1.5 0 0 0 14.5 3H11v-.5A1.5 1.5 0 0 0 9.5 1h-3zm0 1h3a.5.5 0 0 1 .5.5V3H6v-.5a.5.5 0 0 1 .5-.5z"/>
                        <path
                            d="M0 12.5A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5V6.85L8.129 8.947a.5.5 0 0 1-.258 0L0 6.85v5.65z"/>
                    </svg>
                    <span>Зареєструватися научним керівником</span>
                </NavLink>
            </li>

            {/*Divider*/}
            <hr className="sidebar-divider my-0"/>

            {/*Nav Item - Declaration*/}
            <li className="nav-item">
                <NavLink className="nav-link" to='/mentor/students'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                         className="bi bi-collection-fill fileLoadSvg" viewBox="0 0 16 16">
                        <path
                            d="M0 13a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 16 13V6a1.5 1.5 0 0 0-1.5-1.5h-13A1.5 1.5 0 0 0 0 6v7zM2 3a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 0-1h-11A.5.5 0 0 0 2 3zm2-2a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7A.5.5 0 0 0 4 1z"/>
                    </svg>
                    <span>Список студентів</span>
                </NavLink>
            </li>

            {/*Divider*/}
            <hr className="sidebar-divider my-0"/>

            {/*Nav Item - Declaration*/}
            <li className="nav-item">
                <NavLink className="nav-link" to='/mentor/choosestudent'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                         className="bi bi-bookmark-check-fill fileLoadSvg" viewBox="0 0 16 16">
                        <path fillRule="evenodd"
                              d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5zm8.854-9.646a.5.5 0 0 0-.708-.708L7.5 7.793 6.354 6.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"/>
                    </svg>
                    <span>Обрати підопичного студента</span>
                </NavLink>
            </li>



        </ul>

    )
}