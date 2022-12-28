import { Outlet } from "react-router-dom";
import { useSelector } from 'react-redux'

import { selectPersona, selectPin } from '../auth/authSlice'
import ProfilePin from "./ProfilePin";


const RequirePin = () => {
  const persona = useSelector(selectPersona)
  const isPin = useSelector(selectPin)

  if(isPin) {
    return <Outlet />
  }

  return (
    persona.isChild ? <ProfilePin /> : <Outlet />
  )
}

export default RequirePin