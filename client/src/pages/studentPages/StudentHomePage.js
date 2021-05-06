import React,{useContext,useState,useEffect,useCallback} from 'react'
import {Sidebar} from "../../components/Sidebar";
import {Footer} from "../../components/Footer";
import {Topbar} from "../../components/Topbar";
import {Content} from "../../components/Content";
import {AuthContext} from "../../context/AuthContext";
import {useHttp} from "../../hooks/http.hook";
import {Loader} from "../../components/Loader";

export const StudentHomePage = () => {
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

    if(loading){
        return <Loader/>
    }

    return (
        <div id='wrapper'>
            <Sidebar/>
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    <Topbar userData={userData}/>
                    <Content specialitys={specialitys}/>
                </div>
                <Footer/>
            </div>
        </div>
    )
}