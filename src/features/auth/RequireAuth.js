import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectToken } from "./authSlice";
import { setNotification } from "../notifications/notificationSlice";


const RequireAuth = () => {
  const dispatch = useDispatch()
  const token = useSelector(selectToken)
  const location = useLocation()
  // console.log('Entrou no required auth')

  // console.log(token)
  if(!token) dispatch(setNotification({status: 403, message: 'You need to login to view this page.'}))

  return (
    token ? <Outlet /> : <Navigate to="/auth/login" state={{ from: location}} replace />
  )
}

export default RequireAuth