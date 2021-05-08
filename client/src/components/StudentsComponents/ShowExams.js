import React, {useEffect} from 'react'
import {Loader} from "../Loader";

export const ShowExams = ({speciality, exams, loading}) => {
    useEffect(() => {
        if (loading) {
            return <Loader/>
        }
    })

    if (!exams || !speciality) {
        return <div className="container-fluid declarationContainer"><h3>Іспитів для вашої спеціальності на данний
            момент немає</h3></div>
    }

    return (

        /*English exams*/
        <div>
            <div className='card shadow mb-4'>
                <div className='card-header py-3'>
                    <h4 className='m-0 font-weight-bold text-dark'>Іспити з іноземної мови</h4>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                            <thead>
                            <tr>
                                <th>№</th>
                                <th>Дата проведення</th>
                                <th>Місце проведення</th>
                                <th>Спеціальність</th>
                            </tr>
                            </thead>
                            <tbody>
                            {exams ? exams.map((e, index) => {
                                if (e.subjectExam === 'english') {
                                    return <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{new Date(e.examDate).toLocaleDateString()}</td>
                                        <td>{e.examAddress}</td>
                                        <td>{speciality.specialityCode}</td>
                                    </tr>
                                } else {
                                    return null
                                }
                            }) : ''}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/*Speciality exams*/}
            <div className='card shadow mb-4'>
                <div className='card-header py-3'>
                    <h4 className='m-0 font-weight-bold text-dark'>Іспити зі спеціальності</h4>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                            <thead>
                            <tr>
                                <th>№</th>
                                <th>Дата проведення</th>
                                <th>Місце проведення</th>
                                <th>Спеціальність</th>
                            </tr>
                            </thead>
                            <tbody>
                            {exams ? exams.map((e, index) => {
                                if (e.subjectExam === 'speciality') {
                                    return <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{new Date(e.examDate).toLocaleDateString()}</td>
                                        <td>{e.examAddress}</td>
                                        <td>{speciality.specialityCode}</td>
                                    </tr>
                                } else {
                                    return null
                                }
                            }) : ''}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/*Additional exams*/}
            <div className='card shadow mb-4'>
                <div className='card-header py-3'>
                    <h4 className='m-0 font-weight-bold text-dark'>Додаткові іспити</h4>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                            <thead>
                            <tr>
                                <th>№</th>
                                <th>Дата проведення</th>
                                <th>Місце проведення</th>
                                <th>Спеціальність</th>
                            </tr>
                            </thead>
                            <tbody>
                            {exams ? exams.map((e, index) => {
                                if (e.subjectExam === 'additional') {
                                    return <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{new Date(e.examDate).toLocaleDateString()}</td>
                                        <td>{e.examAddress}</td>
                                        <td>{speciality.specialityCode}</td>
                                    </tr>
                                } else {
                                    return null
                                }
                            }) : ''}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}