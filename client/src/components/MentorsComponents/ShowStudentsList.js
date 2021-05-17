import React, {useEffect} from 'react'
import {Loader} from "../Loader";
import {useHttp} from "../../hooks/http.hook";
import {useMessage} from "../../hooks/message.hook";

export const ShowStudentsList = ({students, loading, specialities, userData}) => {
    const {request} = useHttp()
    const message = useMessage()

    const chooseStudent = async (event) => {
        try {
            const res = await request(`/api/mentor/add/student/${event.target.id}`,'POST',{mentorEmail:userData.email})
            message(res.message)
        }catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        if (!loading || !specialities) {
            return <Loader/>
        }
    })


    if (!students) {
        return <div className="container-fluid declarationContainer"><h3>На даний момент немає вільних студентів </h3>
        </div>
    }

    if (!specialities) {
        return <Loader/>
    }

    return (
        <div className='card shadow mb-4'>
            <div className='card-header py-3'>
                <h4 className='m-0 font-weight-bold text-dark'>Обрати підопічного студента</h4>
                <p> Ваші спеціальності -
                {specialities.map(spec=> <span key={spec.id}> &nbsp;{spec.specialityCode} &nbsp;</span>)}
                </p>
            </div>
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                        <thead className='centerText'>
                        <tr>
                            <th>Прізвище</th>
                            <th>Ім'я</th>
                            <th>Email</th>
                            <th>Спеціальність</th>
                            <th>Обрати</th>
                        </tr>
                        </thead>
                        <tbody className='centerText'>
                        {students ? students.map((student) => {
                            return specialities.map(spec => {
                                if (student.specialityId === spec.id) {
                                    return <tr key={student.id}>


                                        <td>{student.lastName}</td>
                                        <td>{student.firstName}</td>
                                        <td>{student.email}</td>
                                        <td>{student.speciality.specialityCode}</td>
                                        <td>
                                            <button onClick={chooseStudent} id={student.id} className='btn btn-outline-success'>
                                                &#10010;
                                            </button>
                                        </td>
                                    </tr>
                                }
                            })
                        }) : ''}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}