import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {useMessage} from "../hooks/message.hook";
import {Loader} from "./Loader";

export const Content = ({specialitys}) => {
    const message = useMessage()
    const {userId} = useContext(AuthContext)
    const {request} = useHttp()
    const [chosenSpeciality, setChosenSpeciality] = useState(null)

    const specialityChoose = async (e) => {
        e.preventDefault()
        try {
            const res = await request(`/api/speciality/users/${userId}/add`, 'POST', {specialityCode: chosenSpeciality})
            message(res)
        } catch (e) {
            console.log(e)
        }
    }

    const handleChange = (event) => {
        setChosenSpeciality(event.target.value)
    }

    if(!specialitys){
        return <Loader/>
    }

    return (
        <div className="container-fluid">
            <form name='specialityChoose' className="row g-3 needs-validation" noValidate onSubmit={()=>alert('Hello')}>
                <div className="col-md-3">
                    <label htmlFor="validationCustom04" className="form-label">Спеціальність:</label>
                    <select onClick={handleChange} className="form-select" id="validationCustom04">
                        <option>Спеціальність</option>
                        {specialitys.map((s,index) => {
                            return <option key={index}>{s.specialityCode}</option>
                        })}
                    </select>
                </div>
                <div>
                    <button type='submit' onClick={specialityChoose} className="btn btn-success btn-icon-split">
                        <span className="text">Обрати</span>
                    </button>
                </div>
            </form>
        </div>

    )
}