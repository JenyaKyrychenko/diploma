import React, {useCallback, useContext, useEffect, useState} from 'react'
import {Footer} from "../../components/Footer";
import {Topbar} from "../../components/Topbar";
import {AuthContext} from "../../context/AuthContext";
import {useHttp} from "../../hooks/http.hook";
import {Loader} from "../../components/Loader";
import {MentorSidebar} from "../../components/MentorsComponents/MentorSidebar";
import {ShowStudentsList} from "../../components/MentorsComponents/ShowStudentsList";

export const MentorChooseStudent = () => {
    const {userId} = useContext(AuthContext)
    const {request, loading} = useHttp()
    const [userData, setUserData] = useState(null)
    const [students, setStudents] = useState(null)
    const [specialities, setSpecialities] = useState(null)

    const getName = useCallback(async () => {
        try {
            const user = await request(`/api/auth/users/${userId}`, 'GET') // user data
            setUserData(user)
        } catch (e) {
        }
    }, [userId, request])

    useEffect(() => {
        getName()
    }, [getName])

    useEffect(() => {
        const getStudents = async () => {
            if (userData) {
                const mentorSpecialities = await request('/api/mentor/specialities', 'POST', {email: userData.email})
                if(mentorSpecialities.message){
                    return
                }
                const students = await request('/api/auth/users/students/nomentor')
                setStudents(students)
                setSpecialities(mentorSpecialities)
            }
        }
        getStudents()
    }, [request, userData])

    if (loading || !userData) {
        return <Loader/>
    }

    return (
        <div id='wrapper'>
            <MentorSidebar/>
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    <Topbar userData={userData}/>
                    <ShowStudentsList students={students} loading={loading} specialities={specialities} userData={userData}/>
                </div>
                <Footer/>
            </div>
        </div>
    )
}