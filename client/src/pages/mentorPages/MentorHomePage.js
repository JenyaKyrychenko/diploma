import React, {useContext} from 'react'
import {AuthContext} from "../../context/AuthContext";
import {useHttp} from "../../hooks/http.hook";
import {NavLink} from "react-router-dom";
import {StudentSidebar} from "../../components/StudentSidebar";
import {Topbar} from "../../components/Topbar";
import {Footer} from "../../components/Footer";

export const MentorHomePage = () =>{
    const auth = useContext(AuthContext)
    const {request} = useHttp()

    const getName = async () => {
        try {
            const id = auth.userId
            const data = await request(`/api/auth/users/${id}`, 'GET')
            alert(data.user.firstName + ' ' + data.user.lastName)
        }catch (e) {

        }
    }
    return (
        <div id='wrapper'>
            <StudentSidebar/>
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    <Topbar/>
                </div>
                <Footer/>
            </div>
        </div>
    )
}