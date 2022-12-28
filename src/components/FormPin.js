import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import InputPin from './InputPin';

const FormPin = ({ handleSubmit }) => {
  const navigate = useNavigate()
  const [pin, setPin] = useState({
    digit1: '',
    digit2: '',
    digit3: '',
    digit4: ''
  })
  const canSave = [pin.digit1, pin.digit2, pin.digit3, pin.digit4].every(Boolean)

  const handleChange = (e) => {
    setPin((prevState) => ({...prevState, [e.target.name]: e.target.value}))
  }

  const handleFullySubmit = (e) => {
    e.preventDefault()
    handleSubmit(pin)
    setPin({
      digit1: '',
      digit2: '',
      digit3: '',
      digit4: ''
    })
  }

  return (
    <form onSubmit={(e) => handleFullySubmit(e)} className='my-form'>
      <div className='pin-inputs-wrapper'>
        <InputPin name="digit1" digit={pin.digit1} handleChange={handleChange}/> 
        <InputPin name="digit2" digit={pin.digit2} handleChange={handleChange}/> 
        <InputPin name="digit3" digit={pin.digit3} handleChange={handleChange}/> 
        <InputPin name="digit4" digit={pin.digit4} handleChange={handleChange}/> 
      </div>

      <div className="profile-btns" style={{marginTop: "100px"}}>
        <button className={`my-btn ${!canSave ? 'disabled-btn' : 'action-create'}`} disabled={!canSave}>
          Confirm
        </button>
        <button type='button' className='my-btn action-cancel' onClick={() => navigate('/')}>
          Cancel
        </button>
      </div>
    </form>
  )
}

export default FormPin