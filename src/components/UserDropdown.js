import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSignOutMutation } from '../features/auth/authApiSlice'

const UserDropdown = () => {
  const navigate = useNavigate()
  const [ signOut ] = useSignOutMutation()

  const handleLogOut = () => {
    signOut({ navigate })
  }
  return (
    <div data-close="true" className='dropdown-menu' >
      <Link to="/auth/profile/favorites">My Favourites</Link>
      <Link to="/auth/profile/manage">Change Profile</Link>
      <Link to="/auth/mypage">Settings</Link>
      <hr data-close="true"></hr>
      <h3 onClick={handleLogOut} className="sec-heading logout-heading">Logout</h3>
    </div>
  )
}

export default UserDropdown