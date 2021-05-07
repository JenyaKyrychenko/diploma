import React, {useCallback, useContext, useEffect, useState} from 'react'
import {AuthContext} from "../../context/AuthContext";
import {useHttp} from "../../hooks/http.hook";
import {Topbar} from "../../components/Topbar";
import {Footer} from "../../components/Footer";
import {Loader} from "../../components/Loader";
import {MentorSidebar} from "../../components/MentorSidebar";
import {RegisterAsMentor} from "../../components/MentorsComponents.js/RegisterAsMentor";

export const MentorMentoring = () =>{
    const {userId} = useContext(AuthContext)
    const {request, loading} = useHttp()
    const [userData, setUserData] = useState(null)
    const [specialitys, setSpecialitys] = useState(null)

    const getName = useCallback(async ()=>{
        try {
            const data = await request(`/api/auth/users/${userId}`, 'GET')
            setUserData(data)
        }catch (e) {
        }
    }, [userId, request])

    const getSpeciality = useCallback(async () => {
        try {
            const specialitysData = await request('/api/speciality/', 'GET')
            setSpecialitys(specialitysData)
        } catch (e) {
            console.log(e)
        }
    }, [request])

    useEffect(()=>{
        getName()
        getSpeciality()
    },[getName, getSpeciality])

    useEffect(()=>{
        if(loading){
            return <Loader/>
        }
    })

    return (
        <div id='wrapper'>
            <MentorSidebar/>
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    <Topbar userData={userData}/>
                    <RegisterAsMentor specialitys={specialitys} userData={userData}/>
                </div>
                <Footer/>
            </div>
        </div>
    )
}