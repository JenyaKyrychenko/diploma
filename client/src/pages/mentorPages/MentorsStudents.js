import React, {useCallback, useContext, useEffect, useState} from 'react'
import {Footer} from "../../components/Footer";
import {Topbar} from "../../components/Topbar";
import {AuthContext} from "../../context/AuthContext";
import {useHttp} from "../../hooks/http.hook";
import {Loader} from "../../components/Loader";
import {ShowStudentsExamResults} from "../../components/ShowStudentsExamResults";
import {MentorSidebar} from "../../components/MentorsComponents/MentorSidebar";

export const MentorsStudents = () => {
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
            const examResults = await request(`/api/examresults/`) // all examResults
            if(userData) {
                const isMentor = await request('/api/mentor/email', 'POST', {email: userData.email})
                if (isMentor) {
                    const students = await request('/api/mentor/students', 'POST', {email: userData.email}) // all mentor's users with status:'student'
                    if(students){
                        setStudents(students)
                    }
                }
            }
            const specialitys = await request(`/api/speciality/`) // all specialitys
            setSpecialitys(specialitys)
            setUserExamResults(examResults)
        }
        getStudents()
    },[request, userData])

    if (loading || !userData) {
        return <Loader/>
    }

    return (
        <div id='wrapper'>
            <MentorSidebar/>
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    <Topbar userData={userData}/>
                    <ShowStudentsExamResults allStudents={students} loading={loading} exams={userExamResults} specialitys={specialitys} title='Список ваших студентів'/>
                </div>
                <Footer/>
            </div>
        </div>
    )
}