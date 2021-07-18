import React from 'react'
import {Loader} from "./Loader";

export const Profile = ({userData}) => {

    if (!userData) {
        return <Loader/>
    }

    return (
        <div className="container-fluid">

            <div className="card border-dark mb-3">
                <div className="card-header">Профіль</div>
                <div className="card-body text-dark">
                    <h5 className="card-title">Ім'я</h5>
                    <p className="card-text">{userData.firstName}</p>
                    <hr/>
                    <h5 className="card-title">Прізвище</h5>
                    <p className="card-text">{userData.lastName}</p>
                    <hr/>
                    <h5 className="card-title">Email</h5>
                    <p className="card-text">{userData.email}</p>
                    {userData.status === 'student' ?
                        <>
                            <hr/>
                            <h5 className="card-title">Спеціальність</h5>
                            {userData.speciality ? <p className="card-text">{userData.speciality.specialityCode}</p> : <p>Не обрано</p>}
                            <hr/>
                            <h5 className="card-title">Науковий керівник</h5>
                            {userData.mentor ?
                                <p className="card-text"> {userData.mentor.scienceTitle} {userData.mentor.firstName} {userData.mentor.lastName} </p>
                                : <p>Не обрано</p>}
                            <hr/>
                            <h5 className="card-title">Результат вступу</h5>
                            <p className="card-text"> {userData.admissionResult === true ? 'Зараховано' : userData.admissionResult === false ? 'Відмовлено' : 'Ще не визначено'} </p>
                        </>
                        : ''}
                </div>
            </div>

        </div>
    )
}