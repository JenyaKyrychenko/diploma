import React, {useCallback, useContext, useEffect, useState} from 'react'
import {AuthContext} from "../../context/AuthContext";
import {useHttp} from "../../hooks/http.hook";
import {Topbar} from "../../components/Topbar";
import {Footer} from "../../components/Footer";
import {Loader} from "../../components/Loader";
import {DepHeadSidebar} from "../../components/DepHeadComponents/DepHeadSidebar";

export const DepHeadHomePage = () =>{
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

    useEffect(()=>{
        if(loading){
            return <Loader/>
        }
    })

    return (
        <div id='wrapper'>
            <DepHeadSidebar/>
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    <Topbar userData={userData}/>
                </div>
                <Footer/>
            </div>
        </div>
    )
}