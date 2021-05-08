import React, {useContext, useState} from 'react'
import {useHttp} from "../../hooks/http.hook";
import {AuthContext} from "../../context/AuthContext";
import {useMessage} from "../../hooks/message.hook";

export const ChooseSpeciality = ({specialitys}) => {
    const message = useMessage()
    const {userId} = useContext(AuthContext)
    const {request} = useHttp()
    const [chosenSpeciality, setChosenSpeciality] = useState(null)

    const specialityChoose = async (e) => {
        e.preventDefault()
        if(chosenSpeciality === ''){
            message('Оберіть спеціальність')
            return
        }
        try {
            const res = await request(`/api/speciality/users/${userId}/add`, 'POST', {specialityCode: chosenSpeciality})
            message(res.message)
        } catch (e) {
            console.log(e)
        }
    }

    const handleChange = (event) => {
        setChosenSpeciality(event.target.value)
    }

    if(!specialitys){
        return ''
    }

    return (
        <div className="container-fluid">
            <form name='specialityChoose' className="row g-3 needs-validation" noValidate>
                <div className="col-md-3">
                    <label htmlFor="validationCustom04" className="form-label">Спеціальність:</label>
                    <select onClick={handleChange} className="form-select" id="validationCustom04">
                        <option value=''>Спеціальність</option>
                        {specialitys.map((s,index) => {
                            return <option key={index}>{s.specialityCode}</option>
                        })}
                    </select>
                </div>
                    <div className='buttonConfirmPage'>
                        <button onClick={specialityChoose} type="submit" className="btn btn-primary buttonSubmit">Підтвердити</button>
                    </div>
            </form>
        </div>

    )
}