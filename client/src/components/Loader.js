import React from 'react'

export const Loader = () => {
    return (
        <div className='loader-container'>
            <div className="spinner-border" role="status" style={{position: 'absolute', top: '50%', left: '50%'}}>
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>

    )
}