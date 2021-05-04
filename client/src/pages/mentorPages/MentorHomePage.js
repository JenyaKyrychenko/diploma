import React, {useContext} from 'react'
import {AuthContext} from "../../context/AuthContext";
import {useHttp} from "../../hooks/http.hook";
import {NavLink} from "react-router-dom";

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
        <div>
            <h1>Mentor HomePage</h1>
            <button onClick={getName}>Get Name</button>
            <button onClick={auth.logout}>Logout</button>
            <NavLink to='/mentor/createform'><strong>To</strong></NavLink>
        </div>
    )
}