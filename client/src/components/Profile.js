import React from 'react'

export const Profile = ({userData}) => {

    return (
        <div className="container-fluid">

            <h1>{userData.id}</h1>
            <h1>{userData.firstName}</h1>
            <h1>{userData.lastName}</h1>
            <h1>{userData.status}</h1>

        </div>
    )
}