import React from 'react'
import './Status.css'

export const Status = ({status}) => {
  return (
    <div>
        <h1 className='welcome-header'>{status}</h1>
    </div>
  )
}
