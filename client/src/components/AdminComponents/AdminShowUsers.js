import React, {useEffect} from 'react'
import {Loader} from "../Loader";
import {useMessage} from "../../hooks/message.hook";
import {useHttp} from "../../hooks/http.hook";

export const AdminShowUsers = ({users, loading}) => {
    const message = useMessage()
    const {request} = useHttp()
    const statuses = ['student', 'mentor','dephead','phhead']

    const changeStatus = async (event)=>{
        const userId = event.target.id
        const status = event.target.value
        try {
            const response = await request('/api/auth/admin/status','POST',{userId,status})
            message(response.message)
        }catch (e) {

        }
    }

    useEffect(() => {
        if (!loading) {
            return <Loader/>
        }
    })

    if (!users) {
        return <div className="container-fluid declarationContainer"><h3>На даний момент користувачів немає </h3></div>
    }

    var number = 0 // for correct listID

    return (
        <div className='card shadow mb-4'>
            <div className="card-body">
                <h3>Список користувачів</h3>
                <div className="table-responsive">
                    <table className="table table-bordered centerText" id="dataTable" width="100%" cellSpacing="0">
                        <thead>
                        <tr>
                            <th>№</th>
                            <th>Ім'я</th>
                            <th>Прізвище</th>
                            <th>Email</th>
                            <th>Статус</th>
                        </tr>
                        </thead>
                        <tbody>
                        {users ? users.map(user => {
                            if (user) {
                                number++
                                return <tr key={number}>
                                    <td>{number}</td>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <select onChange={changeStatus} className="form-select" id={user.id}>
                                            <option value=''>{user.status}</option>
                                            {statuses.map((status,index)=>{
                                                if(status !== user.status) {
                                                    return <option key={index} value={status}>{status}</option>
                                                } else return ''
                                            })}
                                        </select>
                                    </td>
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