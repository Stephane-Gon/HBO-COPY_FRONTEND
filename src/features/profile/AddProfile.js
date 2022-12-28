import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { useAddProfileMutation } from './profileApiSlice';
import { selectUser } from '../auth/authSlice';

const AddProfile = ({ isChild = false }) => {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [ addProfile ] = useAddProfileMutation()
  const user = useSelector(selectUser)

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await addProfile({
        navigate,
        name,
        age: isChild ? age : user.age,
        isChild,
        _id: user._id
      }).unwrap()
    } catch { }
  }
  
  return (
    <div className='profile-container'>
      <h1 className='my-heading profile-heading'>
        {isChild ? 'Add Child': 'Add Adult'}
      </h1>

      <form onSubmit={handleSubmit} className='my-form' style={{width: '25%'}}>
        <input 
          className='my-input' 
          type="text" 
          placeholder='Name' 
          value={name} 
          onChange={(e) => setName(e.target.value)}
        />

        {
          isChild && (
            <input 
              className='my-input' 
              type="number" 
              placeholder='Age' 
              value={age} 
              onChange={(e) => setAge(e.target.value)}
            />
          )
        }


        <div className="profile-btns" >
          <button className={`my-btn ${!name ? 'disabled-btn' : 'action-create'}`} disabled={!name}>
            Save
          </button>
          <button type='button' className='my-btn action-cancel' onClick={() => navigate('/auth/profile/manage')}>
            Cancel
          </button>
        </div>
      </form>
    
    </div>
  )
}

export default AddProfile