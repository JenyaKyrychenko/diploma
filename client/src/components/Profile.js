import React from 'react'

export const Profile = ({userData}) => {

    return (
        <div className="container-fluid">

            <h1>{userData.user.id}</h1>
            <h1>{userData.user.firstName}</h1>
            <h1>{userData.user.lastName}</h1>
            <h1>{userData.user.status}</h1>

        </div>
    )
}