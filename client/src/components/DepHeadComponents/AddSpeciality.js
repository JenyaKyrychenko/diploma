import React, {useState, useEffect} from 'react'
import {useHttp} from "../../hooks/http.hook";
import {useMessage} from "../../hooks/message.hook";
import {Loader} from "../Loader";
import {ShowSpecialitys} from "./ShowSpecialitys";

export const AddSpeciality = ({specialitys, setSpecialitys}) => {
    const message = useMessage()
    const {request} = useHttp()

    const [specialityCode, setSpecialityCode] = useState('')
    const [specialityName, setSpecialityName] = useState('')
    const [industryCode, setIndustryCode] = useState('')
    const [industryName, setIndustryName] = useState('')

    const [formErrors, setFormErrors] = useState({specialityCode:'', specialityName:'',industryCode:'',industryName:''})

    const changeSpecialityCode = (event) => {
        setSpecialityCode(event.target.value)
    }

    const changeSpecialityName = (event) => {
        setSpecialityName(event.target.value)
    }
    const changeIndustryName = (event) => {
        setIndustryName(event.target.value)
    }

    const changeIndustryCode= (event) => {
        setIndustryCode(event.target.value)
    }

    const validateField = () => {
        let specialityCodeValid = specialityCode.length <= 3 && specialityCode.length >= 2;
        formErrors.specialityCode = specialityCodeValid ? '' : "Має бути 3 цифри(Код спеціальності)";

        let specialityNameValid = specialityName.length < 50 && specialityName.length > 3  && specialityName.match("[А-Яа-яA-Za-z' -іїІЇ]+");
        formErrors.specialityName = specialityNameValid ? '' : "[3-50] символів(Назва спеціальності)";

        let industryCodeValid = industryCode.length <= 2 && industryCode.length > 1;
        formErrors.industryCode = industryCodeValid ? '' : "Має бути 2 цифри.(Код галузі)";

        let industryNameValid = industryName.length < 50 && industryName.length > 3  && industryName.match("[А-Яа-яA-Za-z' -іїІЇ]+");
        formErrors.industryName = industryNameValid ? '' : "[3-50] символів.(Назва галузі)";

        setFormErrors(formErrors)
    }

    const createSpeciality= async (event)=>{
        event.preventDefault()
        for (let e in formErrors) {
            if (formErrors[e]) {
                alert(formErrors[e])
                return
            }
        }
        try {
            const res = await request('/api/speciality/create','POST', {industryCode, industryName, specialityName, specialityCode})
            if(res.exists){
                message(res.message)
                return
            }
            const specList = await request('/api/speciality/')
            message(res.message)
            setSpecialitys(specList)
        }catch (e) {
        }
    }

    useEffect(() => {
        validateField()
    })

    if (!specialitys) {
        return <Loader/>
    }

    return (
        <div className="container-fluid declarationContainer">
            <h2>Додати спеціальність</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="exampleIndustryCode" className="form-label">Код Галузі:</label>
                    <input onChange={changeIndustryCode} value={industryCode} type="number" className={`form-control ${formErrors.industryCode ? 'has-error' : 'validated'}`} id="exampleSpecialityCode"
                           aria-describedby="IndustryCodeHelp"/>
                    <p className='red-color'>{formErrors.industryCode}</p>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleIndustryName" className="form-label">Назва галузі:</label>
                    <input onChange={changeIndustryName} value={industryName} type="text" className={`form-control ${formErrors.industryName? 'has-error' : 'validated'}`}
                           id="exampleIndustryName"/>
                    <p className='red-color'>{formErrors.industryName}</p>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleSpecialityCode" className="form-label">Код спеціальності:</label>
                    <input onChange={changeSpecialityCode} value={specialityCode} type="number" className={`form-control ${formErrors.specialityCode ? 'has-error' : 'validated'}`} id="exampleSpecialityCode"
                           aria-describedby="SpecialityCodeHelp"/>
                    <p className='red-color'>{formErrors.specialityCode}</p>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleSpecialityName" className="form-label">Назва спеціальності:</label>
                    <input onChange={changeSpecialityName} value={specialityName} type="text" className={`form-control ${formErrors.specialityName? 'has-error' : 'validated'}`}
                           id="exampleSpecialityName"/>
                    <p className='red-color'>{formErrors.specialityName}</p>
                </div>
                <div className='buttonConfirmPage'>
                    <button onClick={createSpeciality} type="submit" className="btn btn-primary">Підтвердити</button>
                </div>
            </form>
            <div className='showSpecialitys'>
                <ShowSpecialitys specialitys={specialitys} setSpecialitys={setSpecialitys}/>
            </div>

        </div>


    )
}