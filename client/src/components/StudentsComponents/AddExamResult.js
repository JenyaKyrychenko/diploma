import React, {useEffect, useState} from 'react'
import {useHttp} from "../../hooks/http.hook";
import {useMessage} from "../../hooks/message.hook";
import {Loader} from "../Loader";
import {ShowExamResults} from "./ShowExamResults";

export const AddExamResult = ({exams, examResults, userData}) => {
    const message = useMessage()
    const {request} = useHttp()

    const [userExamResults, setUserExamResults] = useState(null)
    const [exam, setExam] = useState()
    const [examMark, setExamMark] = useState('')

    const [formErrors, setFormErrors] = useState({examMark: ''})

    const changeExam = (event) => {
        setExam(event.target.value)
    }

    const changeExamMark = (event) => {
        setExamMark(event.target.value)
    }

    const validateField = () => {
        let examMarkValid = examMark >= 1
        formErrors.examMark = examMarkValid ? '' : "Введіть оцінку!";

        setFormErrors(formErrors)
    }

    const addExamResult = async (event) => {
        event.preventDefault()
        if(!exam){
            message('Оберіть іспит')
        }
        for (let e in formErrors) {
            if (formErrors[e]) {
                message(formErrors[e])
                return
            }
        }
        try {
            const res = await request(`/api/examresults/${userData.id}/add`, 'POST',
                {
                    examId: exam, examMark, specialityId: userData.speciality.id
                })
            message(res.message)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        const getMyExam = () => {
            var myExams = []
            for (let e in exams) {
                for (let result in examResults) {
                    if (exams[e].id === examResults[result].examId) {
                        myExams.push(examResults[result])
                    }
                }
            }
            setUserExamResults(myExams)
        }
        getMyExam()
    }, [examResults, exams])

    useEffect(() => {
        validateField()
    })

    if (!exams || !userExamResults) {
        return <Loader/>
    }

    return (
        <div className="container-fluid declarationContainer">
            <h2>Зареєструвати результат іспиту</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="validationCustom04" className="form-label">Іспит:</label>
                    <select onChange={changeExam} value={exam}
                            className='form-select'
                            id="validationCustom04">
                        <option value=''>Іспит</option>
                        {exams.map((exam, index) => {
                            return <option key={index} value={exam.id}>{
                                exam.subjectExam === 'english' ? 'Іноземна мова' : exam.subjectExam === 'speciality' ?
                                    'Зі спеціальності' : exam.subjectExam === 'additional' ? 'Додатковий' : null
                            }, {exam.examAddress}</option>
                        })}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="examMark" className="form-label">Оцінка:</label>
                    <input onChange={changeExamMark} value={examMark} type="number"
                           className={`form-control ${!formErrors.examMark ? 'validated' : 'has-error'}`}
                           id="examMark"/>
                </div>
                <div className='buttonConfirmPage'>
                    <button onClick={addExamResult} type="submit" className="btn btn-primary buttonSubmit">Підтвердити
                    </button>
                </div>
            </form>
            <ShowExamResults examResults={userExamResults} exams={exams}/>
        </div>

    )
}