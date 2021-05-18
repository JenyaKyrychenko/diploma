import React from 'react'
import {NavLink} from "react-router-dom";

export const AdminSidebar = () => {
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

        </ul>

    )
}