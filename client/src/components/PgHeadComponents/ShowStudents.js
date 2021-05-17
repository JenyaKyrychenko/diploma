import React, {useEffect} from 'react'
import {Loader} from "../Loader";
import {useHttp} from "../../hooks/http.hook";

export const ShowStudents = ({students, loading}) => {
    const {loadFile} = useHttp()
    useEffect(() => {
        if (!loading) {
            return <Loader/>
        }
    })

    const getFile = async (email,fileName)=>{
        try {
            const response = await loadFile('/api/researchwork/','POST',{email,fileName})
            const blob = await response.blob()
            const downloadUrl = window.URL.createObjectURL(blob)
            var link = document.createElement('a')
            link.href = downloadUrl
            link.download = `${fileName}_${email}.docx`
            document.body.appendChild(link)
            link.click()
            link.remove()
        }catch (e) {
            alert(e.message)
        }
    }

    if (!students) {
        return <div className="container-fluid declarationContainer"><h3>На даний момент студентів немає </h3></div>
    }

    var number = 0 // for correct listID

    return (
        <div className='card shadow mb-4'>
            <div className="card-body">
                <h3>Список студентів</h3>
                <div className="table-responsive">
                    <table className="table table-bordered centerText" id="dataTable" width="100%" cellSpacing="0">
                        <thead>
                        <tr>
                            <th>№</th>
                            <th>Ім'я</th>
                            <th>Прізвище</th>
                            <th>Email</th>
                            <th>Спеціальність</th>
                            <th>Дослідницька пропозиція</th>
                            <th>Заява на вступ</th>
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
                                    <td><button className='btn btn-link' onClick={()=>getFile(student.email,'researchwork')}>Досл. пропозиція</button></td>
                                    <td><button className='btn btn-link' onClick={()=>getFile(student.email,'declaration')}>Заява</button></td>
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