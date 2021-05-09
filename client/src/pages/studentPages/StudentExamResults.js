import React, {useCallback, useContext, useEffect, useState} from 'react'
import {StudentSidebar} from "../../components/StudentsComponents/StudentSidebar";
import {Footer} from "../../components/Footer";
import {Topbar} from "../../components/Topbar";
import {AuthContext} from "../../context/AuthContext";
import {useHttp} from "../../hooks/http.hook";
import {Loader} from "../../components/Loader";
import {AddExamResult} from "../../components/StudentsComponents/AddExamResult";

export const StudentExamResults = () => {
    const {userId} = useContext(AuthContext)
    const {request, loading} = useHttp()
    const [userData, setUserData] = useState(null)
    const [exams, setExams] = useState()
    const [specialityId, setSpecialityId] = useState(null)
    const [examResults, setExamResults] = useState(null)

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

    useEffect(() => {
        const getExamResults = async ()=>{
            const examResults = await request(`/api/examresults/${userId}`)
            setExamResults(examResults)
        }
        getExamResults()
    }, [request, userId])

    if (loading) {
        return <Loader/>
    }

    return (
        <div id='wrapper'>
            <StudentSidebar/>
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    <Topbar userData={userData}/>
                    <AddExamResult exams={exams} examResults={examResults} userData={userData}/>
                </div>
                <Footer/>
            </div>
        </div>
    )
}