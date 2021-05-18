import React, {useCallback, useContext, useEffect, useState} from 'react'
import {Footer} from "../../components/Footer";
import {Topbar} from "../../components/Topbar";
import {AuthContext} from "../../context/AuthContext";
import {useHttp} from "../../hooks/http.hook";
import {Loader} from "../../components/Loader";
import {ShowStudents} from "../../components/PgHeadComponents/ShowStudents";
import {DepHeadSidebar} from "../../components/DepHeadComponents/DepHeadSidebar";

export const DepHeadShowAllStudents = () => {
    const {userId} = useContext(AuthContext)
    const {request, loading} = useHttp()
    const [userData, setUserData] = useState(null)
    const [students, setStudents] = useState(null)
    const [specialitys, setSpecialitys] = useState(null)

    const getName = useCallback(async () => {
        try {
            const data = await request(`/api/auth/users/${userId}`, 'GET')
            const specialitys = await request('/api/speciality/', 'GET')
            setSpecialitys(specialitys)
            setUserData(data)
        } catch (e) {
        }
    }, [userId, request])

    useEffect(() => {
        getName()
    }, [getName])

    useEffect(()=>{
        const getStudents = async ()=>{
            const students = await request('/api/auth/users/students')
            setStudents(students)
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
                    <ShowStudents students={students} loading={loading} specialitys={specialitys}/>
                </div>
                <Footer/>
            </div>
        </div>
    )
}