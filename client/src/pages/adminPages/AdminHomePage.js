import React, {useCallback, useContext, useEffect, useState} from 'react'
import {AuthContext} from "../../context/AuthContext";
import {useHttp} from "../../hooks/http.hook";
import {Topbar} from "../../components/Topbar";
import {Footer} from "../../components/Footer";
import {Loader} from "../../components/Loader";
import {AdminSidebar} from "../../components/AdminComponents/AdminSidebar";
import {AdminShowUsers} from "../../components/AdminComponents/AdminShowUsers";

export const AdminHomePage = () =>{
    const {userId} = useContext(AuthContext)
    const {request, loading} = useHttp()
    const [userData, setUserData] = useState(null)
    const [users, setUsers] = useState(null)

    const getName = useCallback(async ()=>{
        try {
            const data = await request(`/api/auth/users/${userId}`, 'GET')
            const users = await request(`/api/auth/users/`)
            setUsers(users)
            setUserData(data)
        }catch (e) {
        }
    }, [userId, request])

    useEffect(()=>{
        getName()
    },[getName])

    useEffect(()=>{
        if(loading){
            return <Loader/>
        }
    })

    return (
        <div id='wrapper'>
            <AdminSidebar/>
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    <Topbar userData={userData}/>
                    <AdminShowUsers users={users} loading={loading}/>
                </div>
                <Footer/>
            </div>
        </div>
    )
}