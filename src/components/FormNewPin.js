import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import InputPin from './InputPin';

const FormNewPin = ({ handleSubmit }) => {
  const navigate = useNavigate()
  const [oldPin, setOldPin] = useState({
    digit1: '',
    digit2: '',
    digit3: '',
    digit4: ''
  })
  const [newPin, setNewPin] = useState({
    digit1: '',
    digit2: '',
    digit3: '',
    digit4: ''
  })
  const canSave = [
    oldPin.digit1, oldPin.digit2, oldPin.digit3, oldPin.digit4, 
    newPin.digit1, newPin.digit2, newPin.digit3, newPin.digit4
  ].every(Boolean)

  const handleOldChange = (e) => {
    setOldPin((prevState) => ({...prevState, [e.target.name]: e.target.value}))
  }

  const handleNewChange = (e) => {
    setNewPin((prevState) => ({...prevState, [e.target.name]: e.target.value}))
  }

  const handleFullySubmit = (e) => {
    e.preventDefault()

    handleSubmit(oldPin, newPin)
    setNewPin({
      digit1: '',
      digit2: '',
      digit3: '',
      digit4: ''
    })
    setOldPin({
      digit1: '',
      digit2: '',
      digit3: '',
      digit4: ''
    })
  }

  return (
    <form onSubmit={(e) => handleFullySubmit(e)} className='my-form custom'>
      <h2 className='my-heading'>Current PIN</h2>
      <div className='pin-inputs-wrapper custom'>
        <InputPin name="digit1" digit={oldPin.digit1} handleChange={handleOldChange}/> 
        <InputPin name="digit2" digit={oldPin.digit2} handleChange={handleOldChange}/> 
        <InputPin name="digit3" digit={oldPin.digit3} handleChange={handleOldChange}/> 
        <InputPin name="digit4" digit={oldPin.digit4} handleChange={handleOldChange}/> 
      </div>

      <h2 className='my-heading'>New PIN</h2>
      <div className='pin-inputs-wrapper custom'>
        <InputPin name="digit1" digit={newPin.digit1} handleChange={handleNewChange}/> 
        <InputPin name="digit2" digit={newPin.digit2} handleChange={handleNewChange}/> 
        <InputPin name="digit3" digit={newPin.digit3} handleChange={handleNewChange}/> 
        <InputPin name="digit4" digit={newPin.digit4} handleChange={handleNewChange}/> 
      </div>

      <div className="profile-btns" style={{marginTop: "0"}}>
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

export default FormNewPin