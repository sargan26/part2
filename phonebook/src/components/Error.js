import React from 'react'
import 'C:/Users/vmUser/part2/phonebook/src/index.css'

const Error = ({ message }) => {
    if (message === null) {
      return null     
    }

    return (
      <div className="error">
        {message}
      </div>
    )
  }

export default Error
