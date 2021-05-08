import React from 'react'
import {NavLink} from "react-router-dom";

export const PgHeadSidebar = () => {
    return (
        <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

            {/*Sidebar - Brand*/}
            <NavLink className="sidebar-brand d-flex align-items-center justify-content-center" to="/">
                <div className="sidebar-brand-icon rotate-n-15">
                    <i className="fas fa-laugh-wink"></i>
                </div>
                <div className="sidebar-brand-text mx-3">SB Admin <sup>2</sup></div>
            </NavLink>

            <hr className="sidebar-divider my-0"/>

            {/*Nav Item - Declaration*/}
            <li className="nav-item">
                <NavLink className="nav-link" to='/pghead/students'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                         className="bi bi-person-lines-fill fileLoadSvg" viewBox="0 0 16 16">
                        <path
                            d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z"/>
                    </svg>
                    <span>Список студентів</span>
                </NavLink>
            </li>

            <hr className="sidebar-divider my-0"/>

            {/*Nav Item - Declaration*/}
            <li className="nav-item">
                <NavLink className="nav-link" to='/pghead/exam/add'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                         className="bi bi-bookmark-plus-fill fileLoadSvg" viewBox="0 0 16 16">
                        <path fillRule="evenodd"
                              d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5zm6.5-11a.5.5 0 0 0-1 0V6H6a.5.5 0 0 0 0 1h1.5v1.5a.5.5 0 0 0 1 0V7H10a.5.5 0 0 0 0-1H8.5V4.5z"/>
                    </svg>
                    <span>Призначити екзамен</span>
                </NavLink>
            </li>


        </ul>

    )
}