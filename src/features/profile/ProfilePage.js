import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { selectUser, setPersona, setIsPin } from '../auth/authSlice';
import { setNotification } from '../notifications/notificationSlice';

const ProfilePage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isEdit, setIsEdit] = useState(false)
  const user = useSelector(selectUser)

  const handleEditPersona = (e) => {
    const personId = e.currentTarget.dataset['personid']
    navigate(`/auth/profile/update/${personId}`)
  }

  const handleChangePersona = (e) => {
    const personId = e.currentTarget.dataset['personid']

    const personExists = user.persona.find((p) => p._id === personId)
    if(!personExists) {
      return dispatch(setNotification({ status: 404, message: `No persona with that name!`}))
    }
    dispatch(setPersona({ persona : personExists }))
    dispatch(setIsPin({ isPin: false }))
    dispatch(setNotification({ status: 200, message: `Changed to persona ${personExists.name}!`}))
    navigate("/")
  }

  const profileElements = user.persona.map((person) => {
    return(
      <div 
        key={person.name} 
        className='persona-box' 
        data-personid={person._id} 
        onClick={isEdit ? handleEditPersona : handleChangePersona}
      >
        <div className='persona-back'>
          <div className='persona-front'>
            {
              isEdit && (
                <div className='persona-edit'>
                  <i className="fa-regular fa-pen-to-square"></i>
                </div>
              )
            }
            <h1 className='my-heading persona-char'>{person.name.replaceAll(' ', '').charAt(0)}</h1>
            { 
              person.isChild && <i className="fa-solid fa-lock"></i>
            }
          </div>
        </div>
        <h3 className='persona-name'>{person.name}</h3>
      </div>
    )
  })

  return (
    <div className='profile-container'>
      <h1 className='my-heading profile-heading'>
        {isEdit ? "Manage Profiles" : "Who's watching?"}
      </h1>
      <div className='profiles-wrapper'>
        {profileElements}
      </div>

      <div className={`profile-actions ${isEdit ? 'profile-actions-confirm' : ''}`}>
        {  
          !isEdit && (
            <>
              <Link className='action-add my-btn' to="/auth/profile/addadult">Add Adult</Link>
              <Link className='action-add my-btn' to={{pathname: "/auth/profile/addchild"}}>Add Child</Link>
            </>
          )
        }
        <button onClick={() => setIsEdit((prev) => !prev)} className='action-edit'>
          { isEdit ? 'Confirm' : 'Manage Profiles'}
        </button>
      </div>
    </div>
  )
}

export default ProfilePage