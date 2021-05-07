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

            {/*Heading*/}
            <div className="sidebar-heading">
                Interface
            </div>

            {/*Nav Item - Pages Collapse Menu*/}
            <li className="nav-item">
                <NavLink className="nav-link collapsed" to='#' data-toggle="collapse" data-target="#collapseTwo"
                         aria-expanded="true" aria-controls="collapseTwo">
                    <i className="fas fa-fw fa-cog"></i>
                    <span>Components</span>
                </NavLink>
                <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo"
                     data-parent="#accordionSidebar">
                    <div className="bg-white py-2 collapse-inner rounded">
                        <h6 className="collapse-header">Custom Components:</h6>
                        <a className="collapse-item" href="buttons.html">Buttons</a>
                        <a className="collapse-item" href="cards.html">Cards</a>
                    </div>
                </div>
            </li>

            {/*Nav Item - Utilities Collapse Menu*/}
            <li className="nav-item">
                <NavLink className="nav-link collapsed" to='#' data-toggle="collapse" data-target="#collapseUtilities"
                         aria-expanded="true" aria-controls="collapseUtilities">
                    <i className="fas fa-fw fa-wrench"></i>
                    <span>Utilities</span>
                </NavLink>
                <div id="collapseUtilities" className="collapse" aria-labelledby="headingUtilities"
                     data-parent="#accordionSidebar">
                    <div className="bg-white py-2 collapse-inner rounded">
                        <h6 className="collapse-header">Custom Utilities:</h6>
                        <a className="collapse-item" href="utilities-color.html">Colors</a>
                        <a className="collapse-item" href="utilities-border.html">Borders</a>
                        <a className="collapse-item" href="utilities-animation.html">Animations</a>
                        <a className="collapse-item" href="utilities-other.html">Other</a>
                    </div>
                </div>
            </li>

            {/*Divider*/}
            <hr className="sidebar-divider"/>

            {/*Heading*/}
            <div className="sidebar-heading">
                Addons
            </div>

            {/*Nav Item - Pages Collapse Menu*/}
            <li className="nav-item active">
                <NavLink className="nav-link" to="#" data-toggle="collapse" data-target="#collapsePages"
                         aria-expanded="true"
                         aria-controls="collapsePages">
                    <i className="fas fa-fw fa-folder"></i>
                    <span>Pages</span>
                </NavLink>
                <div id="collapsePages" className="collapse show" aria-labelledby="headingPages"
                     data-parent="#accordionSidebar">
                    <div className="bg-white py-2 collapse-inner rounded">
                        <h6 className="collapse-header">Login Screens:</h6>
                        <a className="collapse-item" href="login.html">Login</a>
                        <a className="collapse-item" href="register.html">Register</a>
                        <a className="collapse-item" href="forgot-password.html">Forgot Password</a>
                        <div className="collapse-divider"></div>
                        <h6 className="collapse-header">Other Pages:</h6>
                        <a className="collapse-item" href="404.html">404 Page</a>
                        <a className="collapse-item active" href="blank.html">Blank Page</a>
                    </div>
                </div>
            </li>

            {/*Nav Item - Charts*/}
            <li className="nav-item">
                <a className="nav-link" href="charts.html">
                    <i className="fas fa-fw fa-chart-area"></i>
                    <span>Charts</span></a>
            </li>

            {/*Nav Item - Tables*/}
            <li className="nav-item">
                <a className="nav-link" href="tables.html">
                    <i className="fas fa-fw fa-table"></i>
                    <span>Tables</span></a>
            </li>

            {/*Divider*/}
            <hr className="sidebar-divider d-none d-md-block"/>


        </ul>
    )
}