import React, {useContext} from 'react'
import undrawProfile from './../img/undraw_profile.svg'
import {NavLink} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";
import {Loader} from "./Loader";

export const Topbar = ({userData})=>{
    const {logout} = useContext(AuthContext)

    const logoutHandler = () =>{
        logout()
    }

    if(!userData){
        return <Loader/>
    }

    return(
        <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

            {/*Sidebar Toggle (Topbar)*/}
            <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                <i className="fa fa-bars"></i>
            </button>

           {/* Topbar Navbar*/}
            <ul className="navbar-nav ml-auto">

                {/*Nav Item - Search Dropdown (Visible Only XS)*/}
                <li className="nav-item dropdown no-arrow d-sm-none">
                    <NavLink className="nav-link dropdown-toggle" to="#" id="searchDropdown" role="button"
                       data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i className="fas fa-search fa-fw"></i>
                    </NavLink>
                    {/*Dropdown - Messages*/}
                    <div className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
                         aria-labelledby="searchDropdown">
                        <form className="form-inline mr-auto w-100 navbar-search">
                            <div className="input-group">
                                <input type="text" className="form-control bg-light border-0 small"
                                       placeholder="Search for..." aria-label="Search"
                                       aria-describedby="basic-addon2"/>
                                    <div className="input-group-append">
                                        <button className="btn btn-primary" type="button">
                                            <i className="fas fa-search fa-sm"></i>
                                        </button>
                                    </div>
                            </div>
                        </form>
                    </div>
                </li>

                <div className="topbar-divider d-none d-sm-block"></div>

                {/*Nav Item - User Information*/}
                <li className="nav-item dropdown no-arrow">
                    <NavLink className="nav-link dropdown-toggle" to="#" id="userDropdown" role="button"
                       data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {userData && <span className="mr-2 d-none d-lg-inline text-gray-600 small">{userData.status} {userData.firstName} {userData.lastName}</span>}
                        <img className="img-profile rounded-circle"
                             src={undrawProfile} alt='Profile'/>
                    </NavLink>
                    {/*Dropdown - User Information*/}
                    <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                         aria-labelledby="userDropdown">
                        <a className="dropdown-item" href={`/${userData.status}/profile`}>
                            <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                            Profile
                        </a>
                        <div className="dropdown-divider"></div>
                        <button onClick={logoutHandler} className="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal">
                            <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                            Logout
                        </button>
                    </div>
                </li>

            </ul>

        </nav>

    )
}

