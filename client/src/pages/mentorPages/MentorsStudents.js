import React, {useCallback, useContext, useEffect, useState} from 'react'
import {Footer} from "../../components/Footer";
import {Topbar} from "../../components/Topbar";
import {AuthContext} from "../../context/AuthContext";
import {useHttp} from "../../hooks/http.hook";
import {Loader} from "../../components/Loader";

import {MentorSidebar} from "../../components/MentorsComponents/MentorSidebar";
import {ShowMentorsStudents} from "../../components/MentorsComponents/ShowMentorsStudents";

export const MentorsStudents = () => {
    const {userId} = useContext(AuthContext)
    const {request, loading} = useHttp()
    const [userData, setUserData] = useState(null)
    const [students, setStudents] = useState(null)

    const getName = useCallback(async () => {
        try {
            const data = await request(`/api/auth/users/${userId}`, 'GET')
            const students = await request(`/api/mentor/students`, 'POST',{email:data.email})
            if(students.length > 0){
                setStudents(students)
            }
            setUserData(data)
        } catch (e) {
        }
    }, [userId, request])

    useEffect(() => {
        getName()
    }, [getName])

    if (loading) {
        return <Loader/>
    }

    return (
        <div id='wrapper'>
            <MentorSidebar/>
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    <Topbar userData={userData}/>
                    <ShowMentorsStudents students={students} loading={loading}/>
                </div>
                <Footer/>
            </div>
        </div>
    )
}