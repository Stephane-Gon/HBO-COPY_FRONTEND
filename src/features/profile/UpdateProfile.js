import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { selectUser } from '../auth/authSlice'
import { setNotification } from '../notifications/notificationSlice'
import { useUpdateProfileMutation, useDeleteProfileMutation } from './profileApiSlice'

const UpdateProfile = () => {
  const params = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(selectUser)
  const [ updateProfile ] = useUpdateProfileMutation()
  const [ deleteProfile ] = useDeleteProfileMutation()

  const personaId = params.profileid
  const persona = user.persona.find((person) => person._id === personaId)
  useEffect(() => {
    if(!persona) {
      dispatch(setNotification({ status: 400, message: "No person with that id!"}))
      navigate('/auth/profile/manage')
    }
  }, [])
  
  const [name, setName] = useState(persona?.name)
  const [age, setAge] = useState(persona?.age)
  const [ageRes, setAgeRes] = useState(persona?.ageRestriction)


  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await updateProfile({
        navigate,
        name,
        age: persona.isChild ? age : persona.age,
        ageRestriction : persona.isChild ? ageRes : persona.ageRestriction,
        personaId,
        userId: user._id
      })
    } catch { }
  }

  const handleDelete = async () => {
    try {
      await deleteProfile({
        navigate,
        personaId,
        userId: user._id
      })
    } catch { }
  }


  return (
    <div className='profile-container'>
      <h1 className='my-heading profile-heading'>
        Update "{persona?.name}" Account
      </h1>

      <form onSubmit={handleSubmit} className='my-form' style={{width: '25%'}}>
        <label htmlFor='name-input' className='my-label'>Name</label>
        <input 
          id='name-input'
          className='my-input' 
          type="text" 
          placeholder='Name' 
          value={name} 
          onChange={(e) => setName(e.target.value)}
        />

        {
          persona?.isChild && (
            <>
              <label htmlFor='age-input' className='my-label'>Age</label>
              <input 
                id='age-input'
                className='my-input' 
                type="number" 
                placeholder='Age' 
                value={age} 
                onChange={(e) => setAge(e.target.value)}
              />

              <label className='my-label'>Age Restriction</label>
              <div className='age-res-container'>
                <div className='age-res-input-wrapper'>
                  <span 
                    className={`age-res-input ${ageRes >= 7 ? 'active' : ''}`}
                    onClick={() => setAgeRes(7)}
                  >
                  </span>
                  <h3>7+</h3>
                </div>
                
                <div className='age-res-input-wrapper'>
                  <span 
                      className={`age-res-input ${ageRes >= 10 ? 'active' : ''}`}
                      onClick={() => setAgeRes(10)}
                    >
                  </span>
                  <h3>10+</h3>
                </div>
                  
                <div className='age-res-input-wrapper'>
                  <span 
                    className={`age-res-input ${ageRes >= 13 ? 'active' : ''}`}
                    onClick={() => setAgeRes(13)}
                  >
                  </span>
                  <h3>13+</h3>
                </div>
                  
                <div className='age-res-input-wrapper'>
                  <span 
                    className={`age-res-input ${ageRes >= 16 ? 'active' : ''}`}
                    onClick={() => setAgeRes(16)}
                  >
                  </span>
                  <h3>16+</h3>
                </div>
                  
                <div className='age-res-input-wrapper'>
                  <span 
                    className={`age-res-input ${ageRes >= 18 ? 'active' : ''}`}
                    onClick={() => setAgeRes(18)}
                  >
                  </span>
                  <h3>18+</h3>
                </div>
                  
              </div>
            </>
          )
        }


        <div className="profile-btns" style={{marginTop: "100px"}}>
          <button className={`my-btn ${!name ? 'disabled-btn' : 'action-create'}`} disabled={!name}>
            Save
          </button>
          <button type='button' className='my-btn action-cancel' onClick={() => navigate('/auth/profile/manage')}>
            Cancel
          </button>
        </div>
        <button onClick={handleDelete} type='button' className='my-btn delete-profile-btn'>
          Delete
         </button>
      </form>
      
    
    </div>
  )
}

export default UpdateProfile