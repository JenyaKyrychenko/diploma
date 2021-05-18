import React, {useCallback, useContext, useEffect, useState} from 'react'
import {Footer} from "../../components/Footer";
import {Topbar} from "../../components/Topbar";
import {AuthContext} from "../../context/AuthContext";
import {useHttp} from "../../hooks/http.hook";
import {Loader} from "../../components/Loader";
import {Profile} from "../../components/Profile";
import {DepHeadSidebar} from "../../components/DepHeadComponents/DepHeadSidebar";

export const DepHeadProfilePage = () => {
    const {userId} = useContext(AuthContext)
    const {request, loading} = useHttp()
    const [userData, setUserData] = useState(null)

    const getName = useCallback(async ()=>{
        try {
            const data = await request(`/api/auth/users/${userId}`, 'GET')
            setUserData(data)
        }catch (e) {
        }
    }, [userId, request])



    useEffect(()=>{
        getName()
    },[getName])

    if(loading){
        return <Loader/>
    }

    return (
        <div id='wrapper'>
            <DepHeadSidebar/>
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    <Topbar userData={userData}/>
                    <Profile userData={userData}/>
                </div>
                <Footer/>
            </div>
        </div>
    )
}