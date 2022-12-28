import { useEffect } from 'react';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { selectUser } from '../auth/authSlice'
import { useAddPinMutation, useReplacePinMutation } from './profileApiSlice'

import FormPin from '../../components/FormPin'
import FormNewPin from '../../components/FormNewPin'


const CreatePin = () => {
  const navigate = useNavigate()
  const [ addPin ] = useAddPinMutation()
  const [ replacePin, { isSuccess: isReplaceSuccess }] = useReplacePinMutation()
  const user = useSelector(selectUser)

  const handleAddPin = (pin) => {
    const formatedPin = pin.digit1.concat(pin.digit2, pin.digit3, pin.digit4)
    
    addPin({ _id: user._id, pin: formatedPin })
    navigate('/auth/mypage')
  }

  const handleAddNewPin = (oldPin, newPin) => {
    const formatedOldPin = oldPin.digit1.concat(oldPin.digit2, oldPin.digit3, oldPin.digit4)
    const formatedNewPin = newPin.digit1.concat(newPin.digit2, newPin.digit3, newPin.digit4)

    replacePin({
      _id: user._id, 
      oldPin: formatedOldPin, 
      newPin: formatedNewPin
    }).unwrap()
  }

  useEffect(() => {
    if(isReplaceSuccess) navigate('/auth/mypage')
  }, [isReplaceSuccess])


  return (
    <>
      <h1 className='my-heading' style={{margin: "50px auto 0 auto", width: "fit-content"}}>{ user?.pin ? 'Change PIN' : 'Create PIN'}</h1>
      <div className='users-wrapper' style={{marginTop: "100px"}}>
        <div className='users-wrapper-blur'></div>

        { user?.pin ? (
          <FormNewPin handleSubmit={handleAddNewPin} />
        ): (
          <>
            <p style={{marginBlock: "20px 40px"}}>
              Create a PIN in order to block content from your childs, and the configuration
              on their child persona's.
            </p>
            <FormPin handleSubmit={handleAddPin} /> 
          </>
        )}
        
      </div>
    </>
  )
}

export default CreatePin