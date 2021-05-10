import React, {useEffect} from 'react'
import {Loader} from "../Loader";

export const ShowStudents = ({students, loading}) => {
    useEffect(() => {
        if (!loading) {
            return <Loader/>
        }
    })

    if (!students) {
        return <div className="container-fluid declarationContainer"><h3>На даний момент студентів немає </h3></div>
    }

    var number = 0 // for correct listID

    return (
        <div className='card shadow mb-4'>
            <div className="card-body">
                <h3>Список студентів</h3>
                <div className="table-responsive">
                    <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                        <thead>
                        <tr>
                            <th>№</th>
                            <th>Ім'я</th>
                            <th>Прізвище</th>
                            <th>Email</th>
                            <th>Спеціальність</th>
                        </tr>
                        </thead>
                        <tbody>
                        {students ? students.map(student => {
                            if (student) {
                                number++
                                return <tr key={number}>
                                    <td>{number}</td>
                                    <td>{student.firstName}</td>
                                    <td>{student.lastName}</td>
                                    <td>{student.email}</td>
                                    <td>{student.speciality.specialityCode}</td>
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
    )
}