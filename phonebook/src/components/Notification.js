import React from 'react'
import 'C:/Users/vmUser/part2/phonebook/src/index.css'

const Notification = ({ message }) => {
    if (message === null) {
      return null
      
    }

    return (
      <div className="notification">
        {message}
      </div>
    )
  }

export default Notification
