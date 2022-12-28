import { useEffect, useState, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import decode from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';

import { selectToken, logOut, selectUser, selectPersona } from '../features/auth/authSlice';
import { setNotification } from '../features/notifications/notificationSlice';

import UserDropdown from './UserDropdown';

const Header = ({ setSide }) => {
  const ref = useRef(null)
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  const [showDropdown, setShowDropdown] = useState(false)
  
  //* Selectors
  const stateToken = useSelector(selectToken)
  let user = useSelector(selectUser)
  let persona = useSelector(selectPersona)

  //* ESTE EFFECT VERIFICA CADA VEZ QUE O USER TROCA DE PÁGINA
  //* SE O AT AINDA TÊM VALIDADE
  useEffect(() => {
    if(stateToken) {
      const decodedToken = decode(stateToken)
      if(decodedToken.exp * 1000 < new Date().getTime()) {
        dispatch(logOut())
        dispatch(setNotification({status: 403, message: "Your session expired please login again!"}))
        navigate('/auth/login')
      }
    }
  }, [location])

  useEffect(() => {
    const getTarget = (e) => {
      let isDropDown = e.target.dataset['close']
      if(!isDropDown) setShowDropdown(false)
    }

    if(showDropdown) {
      window.addEventListener('click', getTarget)
    }

    return () =>  window.removeEventListener('click', getTarget)
  }, [showDropdown])

  //* EFFECT QUE TORNA O HEADER DINÁICO
  useEffect(() =>  {
    const handleScroll = () => {
      if(window.scrollY <= 400) {
        ref.current.className = 'nav-bar'
      } else if(window.scrollY > 400) {
        ref.current.className = 'nav-bar-active'
      }
    }
    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  

  let subTitle = ''
  if (location.pathname === '/') {
    subTitle = 'Home'
  } else if(location.pathname === '/tmdb/movies') {
    subTitle = 'Movies'
  } else if(location.pathname === '/tmdb/shows') {
    subTitle = 'Shows'
  }

  return (
    <header ref={ref} className='nav-bar'>
      <span className='nav-links'>
        <i data-burger={true} onClick={() => setSide((prevState) => !prevState)} className="fa-solid fa-bars"></i>
        <ul>
          <Link to="/tmdb/movies">Movies</Link>
          <Link to="/tmdb/shows">Shows</Link>

          <Link to="/users/list">Users</Link>
        </ul>
      </span>
      <span className='nav-logo'>
        <Link className='nav-logo-link' to="/">HBstreamingO</Link>
        <h5>{subTitle}</h5>
      </span>
      <span className='nav-utils'>
        <Link to="/tmdb/search">
          <i className="fa-solid fa-magnifying-glass"></i>
        </Link>
        {
          user ? (
            <span data-close="true" className='nav-user-info' onClick={() => setShowDropdown((prevState) => !prevState)}>
              <span data-close="true" className='nav-user-icon align-center'>{persona.name.replace(' ', '').substring(0, 1).toUpperCase()}</span>
              <h3 data-close="true">{persona.name}</h3>
            </span>
          ) : (
            <Link to="auth/login"><b>Sign In</b></Link>
          )
        }
      </span>
      { showDropdown && <UserDropdown />}
    </header>
  )
}

export default Header