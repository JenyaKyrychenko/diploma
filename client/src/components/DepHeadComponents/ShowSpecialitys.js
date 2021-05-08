import React from 'react'
import {useHttp} from "../../hooks/http.hook";
import {Loader} from "../Loader";

export const ShowSpecialitys = ({specialitys, setSpecialitys}) => {
    const {request} = useHttp()

    const deleteSpeciality = async (event) => {
        const specialityId = event.target.id
        try {
            await request(`/api/speciality/${specialityId}/delete`, 'DELETE')
            const specialitys = await request('/api/speciality/')
            setSpecialitys(specialitys)
        } catch (e) {
            console.log(e)
        }
    }

    if (!specialitys) {
        return <Loader/>
    }

    return (
        <div className='card shadow mb-4'>
            <div className='card-header py-3'>
                <h4 className='m-0 font-weight-bold text-dark'>Список спеціальностей</h4>
            </div>
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                        <thead>
                        <tr>
                            <th>Код галузі</th>
                            <th>Назва галузі</th>
                            <th>Код спеціальності</th>
                            <th>Назва спеціальності</th>
                            <th>Видалити</th>
                        </tr>
                        </thead>
                        <tbody>
                        {specialitys ? specialitys.map((s, index) => {
                            return <tr key={index}>
                                <td>{s.industryCode}</td>
                                <td>{s.industryName}</td>
                                <td>{s.specialityCode}</td>
                                <td>{s.specialityName}</td>
                                <td>
                                    <button onClick={deleteSpeciality} id={s.id} className='btn btn-outline-danger'>
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