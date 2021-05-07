import React, {useEffect} from 'react'
import {Loader} from "../Loader";

export const ShowStudents = ({students, loading}) =>{
    useEffect(()=>{
        if(loading){
            return <Loader/>
        }
    })

    if(!students){
        return <div className="container-fluid declarationContainer"><h3>На даний момент у Вас немає студентів</h3></div>
    }

    return (
        <div className="card-body">
            <div className="table-responsive">
                <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                    <thead>
                    <tr>
                        <th>№</th>
                        <th>Ім'я</th>
                        <th>Прізвище</th>
                        <th>email</th>
                    </tr>
                    </thead>
                    <tbody>
                    {students ? students.map((e,index)=>{
                        return <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{e.firstName}</td>
                            <td>{e.lastName}</td>
                            <td>{e.email}</td>
                        </tr>
                    }): ''}
                    </tbody>
                </table>
            </div>
        </div>
    )
}