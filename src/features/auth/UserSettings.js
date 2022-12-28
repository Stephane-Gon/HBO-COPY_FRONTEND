import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

import { useUpdateInfoMutation, useDeleteAccountMutation } from '../auth/authApiSlice'
import { selectUser } from './authSlice';

import SpinningLoader from '../../components/SpinningLoader'

const UserSettings = () => {
  const navigate = useNavigate()
  const user = useSelector(selectUser)
  
  const [updateUser, { isLoading }] = useUpdateInfoMutation()
  const [deleteUser] = useDeleteAccountMutation()

  const [formData, setFormData] = useState({
    firstName: user?.firstName,
    lastName: user?.lastName
  })


  const handleChange = (e) => {
    setFormData((prevState) => ({...prevState, [e.target.name]: e.target.value}))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    updateUser({
      firstName: formData.firstName,
      lastName: formData.lastName,
      _id: user._id
    })
  }

  const handleDelete = () => {
    deleteUser({_id : user._id, navigate})
  }

  return (
    <div className='users-list-main'>
      <h1 className='my-heading'>Settings</h1>
      <div className='users-wrapper'>
        <div className='users-wrapper-blur'></div>
          {
            isLoading ? (
              <SpinningLoader />
            ) : (
              <form onSubmit={handleSubmit} className='account-form'>
                <h2 className='sec-heading'>Account</h2>
                <label htmlFor='input-email'>Email:</label>
                <input 
                  className="my-input disabled-input"
                  type="text" 
                  name="email"
                  value={user?.email}
                  disabled
                  id="input-email"
                />
                <label htmlFor='input-firstName'>First Name:</label>
                <input 
                  className="my-input"
                  type="text" 
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  id="input-firstName"
                />
                <label htmlFor='input-lastName'>Last Name:</label>
                <input 
                  className="my-input" 
                  type="text" 
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  id="input-lastName"
                />
                <button 
                  type='submit' 
                  className={`my-btn ${!formData.firstName ? 'disabled-btn' : ''}`} 
                  disabled={!formData.firstName}
                >
                  Submit
                </button>
              </form>
            )
          }

      </div>

      <div className='users-wrapper delete-wrapper'>
        <div className='users-wrapper-blur'></div>
        <h2 className='sec-heading'>Delete account</h2>
        <button className="my-btn" onClick={handleDelete}>Delete</button>
      </div>

      <div className='users-wrapper delete-wrapper'>
        <div className='users-wrapper-blur'></div>
        <h2 className='sec-heading' style={{ marginBottom: "20px"}}>Parental Controll</h2>
        <p style={{ width: "90%", margin: "0 auto"}}>
          You will need a PIN to create and edit Child personas. 
          To controll the content your child has access to, create a child persona,
          and choose an age restriction adequate to his age.
        </p>
        <div className='pin-info-wrapper'>
          <span className='pin-display'>
            <h3>PIN</h3>
            <h4>****</h4>
          </span>
          <i onClick={() => navigate('/auth/profile/pin')} className="fa-regular fa-pen-to-square"></i>
        </div>
      </div>
    </div>
  )
}

export default UserSettings