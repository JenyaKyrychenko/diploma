import React from 'react'

export const ShowExams = ({speciality, exams}) =>{

    if(!exams || !speciality){
        return <div className="container-fluid declarationContainer"><h3>Іспитів для вашої спеціальності на данний момент немає</h3></div>
    }
    return (
        <div className="card-body">
            <div className="table-responsive">
                <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                    <thead>
                    <tr>
                        <th>№</th>
                        <th>Дата проведення</th>
                        <th>Місце проведення</th>
                        <th>Предмет</th>
                        <th>Спеціальність</th>
                    </tr>
                    </thead>
                    <tbody>
                        {exams ? exams.map((e,index)=>{
                            return <tr key={index}>
                                <td>{e.id}</td>
                                <td>{new Date(e.examDate).toLocaleDateString()}</td>
                                <td>{e.examAddress}</td>
                                <td>{e.subjectExam}</td>
                                <td>{speciality.specialityCode}</td>
                            </tr>
                        }): ''}
                    </tbody>
                </table>
            </div>
        </div>
    )
}