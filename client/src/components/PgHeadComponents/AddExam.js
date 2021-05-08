import React, {useEffect, useState} from 'react'
import {useHttp} from "../../hooks/http.hook";
import {useMessage} from "../../hooks/message.hook";
import {Loader} from "../Loader";
import {ShowAndDeleteExams} from "./ShowAndDeleteExams";

export const AddExam = ({specialitys}) => {
    const message = useMessage()
    const {request} = useHttp()

    const [subject, setSubject] = useState('')
    const [specialityId, setSpecialityId] = useState('')
    const [examDate, setExamDate] = useState('')
    const [examAddress, setExamAddress] = useState('')
    const [reset, setReset] = useState(null)

    const [formErrors, setFormErrors] = useState({specialityId: '', subject: '', examDate: '', examAddress: ''})

    const changeSpecialityId = (event) => {
        setSpecialityId(event.target.value)
    }

    const changeSubject = (event) => {
        setSubject(event.target.value)
    }
    const changeExamDate = (event) => {
        setExamDate(event.target.value)
    }

    const changeExamAddress = (event) => {
        setExamAddress(event.target.value)
    }

    const validateField = () => {
        let specialityIdValid = specialityId !== '';
        formErrors.specialityId = specialityIdValid ? '' : "Оберіть спеціальність";

        let subjectValid = subject !== ''
        formErrors.subject = subjectValid ? '' : "Оберіть іспит.";

        let examDateValid = examDate.length !== 0;
        formErrors.examDate = examDateValid ? '' : "Оберіть дату";

        let examAddressValid = examAddress.length < 50 && examAddress.length > 3 && examAddress.match("[А-Яа-яA-Za-z' -іїІЇ]+");
        formErrors.examAddress = examAddressValid ? '' : "[3-50] символів";

        setFormErrors(formErrors)
    }

    const addExam = async (event) => {
        event.preventDefault()
        for (let e in formErrors) {
            if (formErrors[e]) {
                alert(formErrors[e])
                return
            }
        }
        try {
            const res = await request('/api/exam/create','POST',{subject,specialityId, examDate, examAddress})
            message(res.message)
            console.log(reset)
            setReset('Hello')
        }catch (e) {
            console.log(e)
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
            <h2>Призначити екзамен</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="validationCustom04" className="form-label">Іспит:</label>
                    <select onChange={changeSubject} value={subject} className="form-select" id="validationCustom04">
                        <option value=''>Іспит</option>
                        <option value='english'>Іноземна мова</option>
                        <option value='speciality'>Зі спеціальності</option>
                        <option value='additional'>Додатковий</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="validationCustom04" className="form-label">Спеціальність:</label>
                    <select onChange={changeSpecialityId} value={specialityId} className="form-select"
                            id="validationCustom04">
                        <option value=''>Спеціальність</option>
                        {specialitys.map((s, index) => {
                            return <option key={index} value={s.id}>{s.specialityCode}</option>
                        })}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="examDate" className="form-label">Дата іспиту:</label>
                    <input onChange={changeExamDate} value={examDate} type="date"
                           className={`form-control ${!examDate ? 'has-error' : 'validated'}`}
                           id="examDate"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="examAddress" className="form-label">Місце проведення:</label>
                    <input onChange={changeExamAddress} value={examAddress} type="text"
                           className={`form-control ${formErrors.examAddress ? 'has-error' : 'validated'}`}
                           id="examAddress"/>
                    <p className='red-color'>{formErrors.examAddress}</p>
                </div>
                <div className='buttonConfirmPage'>
                    <button onClick={addExam} type="submit" className="btn btn-primary buttonSubmit">Підтвердити</button>
                </div>
            </form>
            <ShowAndDeleteExams specialitys={specialitys}/>
        </div>

    )
}