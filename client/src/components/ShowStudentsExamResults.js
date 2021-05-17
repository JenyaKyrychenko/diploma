import React, {useEffect, useState, useContext} from 'react'
import {Loader} from "./Loader";
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {useMessage} from "../hooks/message.hook";

export const ShowStudentsExamResults = ({allStudents, loading, exams, specialitys, title}) => {
    const {request} = useHttp()
    const message = useMessage()
    const {userStatus} = useContext(AuthContext)

    const [searchValue, setSearchValue] = useState('')
    const [students, setStudents] = useState(null)

    const changeSearch = async (event) => {
        await setSearchValue(event.target.value)
        const student = await request(`/api/auth/users/students/search`, 'POST', {searchValue})
        setStudents(student)
    }

    const searchBySpeciality = async (event) => {
        const student = await request(`/api/auth/users/students/search/speciality`, 'POST', {searchSpeciality: event.target.value})
        setStudents(student)
    }

    const resetSearch = () => {
        setStudents(allStudents)
    }

    const confirmAddmission = async (event) => {
        const userId = event.target.id
        const res = await request(`/api/auth/addmission/add/result/${userId}`, 'POST', {result: true})
        message(res.message)
    }

    const deniedAddmission = async (event) => {
        const userId = event.target.id
        const res = await request(`/api/auth/addmission/add/result/${userId}`, 'POST', {result: false})
        message(res.message)
    }


    useEffect(() => {
        const getStudents = () => {
            if (allStudents) {
                setStudents(allStudents)
            }
        }
        getStudents()
    }, [allStudents])

    useEffect(() => {
        if (!loading || !exams) {
            return <Loader/>
        }
    })

    if (!students) {
        return <div className="container-fluid declarationContainer"><h3>На даний момент студентів немає </h3></div>
    }

    return (
        <div className="container-fluid marginBottom">
            <div className='card-header py-3'>
                <h4 className='m-0 font-weight-bold text-dark'>{title ? title : 'Результати іспитів'}</h4>
                <div className="input-group mb-3 marginTop">
                    <input onChange={changeSearch} value={searchValue} type="text" className="form-control"
                           placeholder="Пошук" aria-label="Username"/>
                    <span className="input-group-text" id="basic-addon3">Або</span>
                    <select onChange={searchBySpeciality} className="form-select" aria-label="Default select example">
                        <option value=''>Спеціальність</option>
                        {specialitys ?
                            specialitys.map((spec, index) => {
                                return <option key={index}>{spec.specialityCode}</option>
                            })
                            : ''}
                    </select>
                </div>
                <div className="declarationContainer">
                    <button className='btn btn-outline-primary buttonConfirmPage' onClick={resetSearch}>Показати всіх
                        студентів
                    </button>
                </div>
            </div>
            <div className='card shadow mb-4'>
                <div className="accordion" id="accordionExample">
                    {students ? students.map((student, index) => {
                        return (
                            <div key={index} className="accordion-item">
                                <h2 className="accordion-header" id={`heading${student.id}`}>
                                    <button className="accordion-button text-dark" type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target={`#collapse${student.id}`} aria-expanded="false"
                                            aria-controls={`collapse${student.id}`}>
                                        <strong> Прізвище:&ensp;</strong> {student.lastName}
                                        &emsp; <strong>Ім'я:&ensp;</strong> {student.firstName}
                                        &emsp; <strong> Email:&ensp;</strong> {student.email}
                                        &emsp; <strong>Спеціальність:&ensp;</strong> {student.speciality.specialityCode}
                                        &emsp; <strong>Результат:&ensp;</strong> {student.admissionResult === true ? 'Зарахований' : student.admissionResult === false ? 'Відмовлено' : 'Не обрано'}
                                    </button>
                                </h2>
                                <div id={`collapse${student.id}`} className="accordion-collapse collapse"
                                     aria-labelledby={`heading${student.id}`}
                                     data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        {exams ? exams.map((examResult, index) => {
                                            if (examResult.userId === student.id) {
                                                return (
                                                    <ul key={index} className="list-group">
                                                        <li key={index} className="list-group-item">
                                                            <strong> Іспит:&ensp;</strong> {examResult.exam.subjectExam === 'english' ? 'Іноземна мова' : examResult.exam.subjectExam === 'speciality' ?
                                                            'Зі спеціальності' : examResult.exam.subjectExam === 'additional' ? 'Додатковий' : null} &emsp;
                                                            <strong>Місце
                                                                проведення:&ensp;</strong> {examResult.exam.examAddress}&emsp;
                                                            <strong>Дата
                                                                проведення:&ensp;</strong> {new Date(examResult.exam.examDate).toLocaleDateString()} &emsp;
                                                            <strong>Спеціальність:&ensp;</strong> {examResult.speciality.specialityCode} &ensp;
                                                            <strong>Оцінка:&ensp;</strong> {examResult.examMark}

                                                        </li>
                                                    </ul>

                                                )
                                            } else {
                                                return null
                                            }
                                        }) : ''}
                                        {userStatus === 'pghead' && student.admissionResult === null ?
                                            <>
                                                <button onClick={confirmAddmission} id={student.id}
                                                        className='btn btn-outline-success buttonConfirmPage'>Зарахувати
                                                </button>
                                                &#8195;
                                                <button onClick={deniedAddmission} id={student.id}
                                                        className='btn btn-outline-danger buttonConfirmPage'>Відмовити
                                                </button>
                                            </>
                                            : ''}
                                    </div>
                                </div>
                            </div>
                        )
                    }) : ''}
                </div>
            </div>
        </div>
    )
}