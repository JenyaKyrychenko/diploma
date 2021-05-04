import React, {useContext} from 'react'
import {AuthContext} from "../../context/AuthContext";
import {useHttp} from "../../hooks/http.hook";

export const StudentHomePage = () =>{
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
            <h1>StudentHomePage</h1>
            <button onClick={getName}>Get Name</button>
            <button onClick={auth.logout}>Logout</button>
        </div>
    )
}