import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectToken } from "../features/auth/authSlice";


const RequireUnAuth = () => {
  const token = useSelector(selectToken)
  const location = useLocation()

  return (
    !token ? <Outlet /> : <Navigate to="/auth/profile/manage" state={{ from: location}} replace />
  )
}

export default RequireUnAuth