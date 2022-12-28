import { useDispatch } from "react-redux";

import { clearNotification } from "./notificationSlice";

const Notification = ({status, message}) => {
  const dispatch = useDispatch()

  const handleClick = () => {
    dispatch(clearNotification())
  }

  let dynamicStyle = {color : String(status)[0] === "2" ? 'rgb(76, 148, 76)' : 'rgb(187, 36, 36)'}

  return (
    <div style={dynamicStyle} className='users-wrapper notification-wrapper'>
      <div className='users-wrapper-blur'></div>
      <i onClick={handleClick} className="fa-solid fa-xmark"></i>
      <h4 className='notification-error'><b>Status {status}: </b>{message}</h4>
    </div>
  )
}

export default Notification