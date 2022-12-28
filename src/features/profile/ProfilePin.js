import React, { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { selectUser, setIsPin } from '../auth/authSlice'
import { useAddPinMutation, useCheckPinMutation } from './profileApiSlice'

import FormPin from "../../components/FormPin";

const ProfilePin = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  const [ addPin, { isSuccess: isAddSuccess } ] = useAddPinMutation()
  const [ checkPin, { isSuccess: isCheckSuccess } ] = useCheckPinMutation()
  const user = useSelector(selectUser)

  const handlePin = (pin) => {
    const formatedPin = pin.digit1.concat(pin.digit2, pin.digit3, pin.digit4)

    if(user.pin) {
      checkPin({ _id: user._id, pin: formatedPin }).unwrap()
    } else {
      addPin({ _id: user._id, pin: formatedPin }).unwrap()
    }
  }

  useEffect(() => {
    if(isCheckSuccess || isAddSuccess) {
      dispatch(setIsPin({isPin: true}))
      navigate(location.pathname)
    }
  }, [isCheckSuccess, isAddSuccess])

  return (
    <div className='pin-container'>
      <h1 className='my-heading profile-heading'>
        {
          user.pin ? 'Use Pin' : 'Create Pin'
        }
      </h1>
      <p>Use PIN to switch accounts.</p>
      <FormPin handleSubmit={handlePin}/>
    </div>
  )
}

export default ProfilePin