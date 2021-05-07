import React, {useCallback, useContext, useEffect, useState} from 'react'
import {StudentSidebar} from "../../components/StudentSidebar";
import {Footer} from "../../components/Footer";
import {Topbar} from "../../components/Topbar";
import {AuthContext} from "../../context/AuthContext";
import {useHttp} from "../../hooks/http.hook";
import {Loader} from "../../components/Loader";
import {ShowExams} from "../../components/StudentsComponents/ShowExams";

export const StudentExams = () => {
    const {userId} = useContext(AuthContext)
    const {request, loading} = useHttp()
    const [userData, setUserData] = useState(null)
    const [exams, setExams] = useState()
    const [specialityId, setSpecialityId] = useState(null)
    const [speciality, setSpeciality] = useState(null)

    const getName = useCallback(async () => {
        try {
            const data = await request(`/api/auth/users/${userId}`, 'GET')
            setSpecialityId(data.specialityId)
            setUserData(data)
        } catch (e) {
        }
    }, [userId, request])

    const getExams = useCallback(async () => {
        try {
            if (specialityId) {
                const data = await request(`/api/exam/${specialityId}`, 'GET')
                setExams(data.exams)
                setSpeciality(data.speciality)
            }
        } catch (e) {
        }
    }, [specialityId, request])


    useEffect(() => {
        getName()
    }, [getName])

    useEffect(() => {
        getExams()
    }, [getExams])

    if (loading) {
        return <Loader/>
    }

    return (
        <div id='wrapper'>
            <StudentSidebar/>
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    <Topbar userData={userData}/>
                    <ShowExams speciality={speciality} exams={exams}/>
                </div>
                <Footer/>
            </div>
        </div>
    )
}