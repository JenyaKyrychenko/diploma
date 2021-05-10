import React, {useCallback, useContext, useEffect, useState} from 'react'
import {Footer} from "../../components/Footer";
import {Topbar} from "../../components/Topbar";
import {AuthContext} from "../../context/AuthContext";
import {useHttp} from "../../hooks/http.hook";
import {Loader} from "../../components/Loader";
import {ShowStudentsExamResults} from "../../components/ShowStudentsExamResults";
import {DepHeadSidebar} from "../../components/DepHeadComponents/DepHeadSidebar";

export const DepHeadExamResults = () => {
    const {userId} = useContext(AuthContext)
    const {request, loading} = useHttp()
    const [userData, setUserData] = useState(null)
    const [students, setStudents] = useState(null)
    const [userExamResults, setUserExamResults] = useState(null)
    const [specialitys, setSpecialitys] = useState(null)

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

    useEffect(()=>{
        const getStudents = async ()=>{
            const students = await request('/api/auth/users/students') // all users with status:'student'
            const examResults = await request(`/api/examresults/`) // all examResults
            const specialitys = await request(`/api/speciality/`) // all specialitys
            setSpecialitys(specialitys)
            setStudents(students)
            setUserExamResults(examResults)
        }
        getStudents()
    },[request])

    if (loading) {
        return <Loader/>
    }

    return (
        <div id='wrapper'>
            <DepHeadSidebar/>
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    <Topbar userData={userData}/>
                    <ShowStudentsExamResults allStudents={students} loading={loading} exams={userExamResults} specialitys={specialitys}/>
                </div>
                <Footer/>
            </div>
        </div>
    )
}