import React, {useEffect, useState} from 'react'
import {useHttp} from "../../hooks/http.hook";
import {Loader} from "../Loader";

export const ShowAndDeleteExams = ({specialitys}) => {
    const {request} = useHttp()
    const [exams, setExams] = useState(null)

    const deleteExam = async (event) => {
        const examId = event.target.id
        try {
            await request(`/api/exam/${examId}/delete`, 'DELETE')
            const exams = await request('/api/exam/')
            setExams(exams)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        const getExams = async () => {
            const exams = await request('/api/exam/')
            setExams(exams)
        }
        getExams()
    }, [request])

    if (!exams) {
        return <Loader/>
    }

    return (
        <div className='card shadow mb-4'>
            <div className='card-header py-3'>
                <h4 className='m-0 font-weight-bold text-dark'>Список екзаменів</h4>
            </div>
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                        <thead className='centerText'>
                        <tr>
                            <th>Іспит</th>
                            <th>Спеціальність</th>
                            <th>Дата проведення</th>
                            <th>Місце проведення</th>
                            <th>Видалити</th>
                        </tr>
                        </thead>
                        <tbody className='centerText'>
                        {exams ? exams.map((e, index) => {
                            return <tr key={index}>


                                <td>{e.subjectExam === 'english' ? 'Іноземна мова' : e.subjectExam === 'speciality' ?
                                    'Зі спеціальності' : e.subjectExam === 'additional' ? 'Додатковий' : null}</td>


                                {specialitys.map((s,index)=>{
                                    if(s.id === e.specialityId){
                                        return <td key={index}>{s.specialityCode}</td>
                                    } else {
                                        return null
                                    }
                                })}
                                <td>{new Date(e.examDate).toLocaleDateString()}</td>
                                <td>{e.examAddress}</td>
                                <td>
                                    <button onClick={deleteExam} id={e.id} className='btn btn-outline-danger'>
                                        &mdash;
                                    </button>
                                </td>
                            </tr>
                        }) : ''}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    )
}