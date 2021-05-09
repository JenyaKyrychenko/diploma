import React, {useEffect} from 'react'
import {Loader} from "../Loader";

export const ShowExamResults = ({examResults}) => {

    useEffect(() => {
        const loader = () => {
            return <Loader/>
        }
        if (!examResults) loader()
    }, [examResults])

    return (
        <div className='card shadow mb-4'>
            <div className='card-header py-3'>
                <h4 className='m-0 font-weight-bold text-dark'>Результати іспитів</h4>
            </div>
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                        <thead className='centerText'>
                        <tr>
                            <th>Іспит</th>
                            <th>Дата проведення</th>
                            <th>Місце проведення</th>
                            <th>Оцінка</th>
                            <th>Спеціальність</th>
                        </tr>
                        </thead>
                        <tbody className='centerText'>
                        {examResults ? examResults.map((e, index) => {
                            return <tr key={index}>
                                <td>{e.exam.subjectExam}</td>
                                <td>{new Date(e.exam.examDate).toLocaleDateString()}</td>
                                <td>{e.exam.examAddress}</td>
                                <td>{e.examMark}</td>
                                <td>{e.speciality.specialityCode}</td>
                            </tr>
                        }) : ''}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    )
}