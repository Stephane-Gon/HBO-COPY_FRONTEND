import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import { useSignUpMutation, useSignInMutation } from '../auth/authApiSlice';

const Auth = () => {
  const navigate = useNavigate()
  const [showPass, setShowPass] = useState(false)
  const [hasAccount, setHasAccount] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    age: '',
    password: '',
    confirmPassword: ''
  })
  const [addNewUser, { isLoading }] = useSignUpMutation()
  const [signIn] = useSignInMutation()

  const canSignIn = [formData.email, formData.password].every(Boolean) && !isLoading
  const canSignUp = [formData.firstName, formData.email, formData.age, formData.password, formData.confirmPassword].every(Boolean) && !isLoading

  const handleChange = (e) => {
    setFormData((prevState) => ({...prevState, [e.target.name]: e.target.value}))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if(!hasAccount && canSignUp) {
      try {
        await addNewUser({formData, navigate}).unwrap()
      } catch {}
    } else if(hasAccount && canSignIn) {
      try {
        await signIn({formData, navigate}).unwrap()
      } catch {}
    }
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      age: '',
      password: '',
      confirmPassword: ''
    })
  }

  const switchMode = () => {
    setHasAccount((prevState) => !prevState)
    setShowPass(false)
  }
  
  return (
    <div className='users-list-main'>
        <h1 className='my-heading'>{hasAccount ? 'Sign In' : 'Sign Up'}</h1>
        <div className='users-wrapper'>
          <div className='users-wrapper-blur'></div>
          <form className='my-form' onSubmit={handleSubmit}>
            {
              !hasAccount && (
                <>
                  <input 
                    className="my-input"
                    type="text" 
                    name="firstName"
                    placeholder="First Name" 
                    value={formData.firstName}
                    onChange={handleChange}
                    autoFocus
                    required
                  />
                  <input 
                    className="my-input"
                    type="text" 
                    name="lastName"
                    placeholder="Last Name" 
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                  <input 
                    className="my-input"
                    type="number" 
                    name="age"
                    placeholder="Age" 
                    value={formData.age}
                    onChange={handleChange}
                    required
                  />
                </>
              )
            }
            <input 
              className="my-input"
              type="email" 
              name="email"
              placeholder="Email" 
              value={formData.email}
              onChange={handleChange}
              required
            />
             <input 
              className="my-input"
              type={showPass ? 'text' : 'password'} 
              name="password"
              placeholder="Password" 
              value={formData.password}
              onChange={handleChange}
              required
            />

            {
              !hasAccount && (
                <input 
                  className="my-input"
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password" 
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              )
            }
            {
              hasAccount ? (
                <button type='submit' className={`my-btn ${!canSignIn ? 'disabled-btn' : ''}`} disabled={!canSignIn}>
                  Sign In
                </button>
              ) : (
                <button type='submit' className={`my-btn ${!canSignUp ? 'disabled-btn' : ''}`} disabled={!canSignUp}>
                  Sign Up
                </button>
              )
            }

            <div className='form-utils'>
              <h3 onClick={switchMode} className='auth-toggler' >Already have an account?</h3> 
              <span className='pass-toogler'>
                <h4>Show password?</h4>
                <i onClick={() => setShowPass(!showPass)} className="fa-solid fa-eye"></i>
              </span>
            </div>
            

          </form>
        </div>
      </div>
  )
}

export default Auth