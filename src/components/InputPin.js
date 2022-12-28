import React from 'react'

const InputPin = ({digit, handleChange, name}) => {
  return (
    <input 
      className='my-input' 
      type="password"
      maxLength={1} 
      value={digit} 
      name={name}
      onChange={handleChange}
    />
  )
}

export default InputPin