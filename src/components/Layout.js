import { useState, useEffect, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectStatus, selectMessage } from '../features/notifications/notificationSlice';

import Header from './Header';
import BurgerMenu from './BurgerMenu';
import Footer from './Footer';
import Notification from '../features/notifications/Notification';

const Layout = () => {
  const refSide = useRef(null)
  const refApp = useRef(null)
  const [sideMenu, setSideMenu] = useState(false)

  const status = useSelector(selectStatus)
  const message = useSelector(selectMessage)


   //* EFFECT QUE LIDA COM A LÓGICA DO BURGER MENU
   useEffect(() => {
    if(refSide.current.classList.contains('active')) {
      document.body.classList.remove("no-scroll")
      refApp.current.className = 'app'
      refSide.current.className = 'burger-menu'
    }
    else {
      document.body.classList.add("no-scroll")
      refApp.current.className = 'app active'
      refSide.current.className = 'burger-menu active'
    }

    const getTarget = (e) => {
      if(!e.target.dataset['burger']) setSideMenu(false)
    }

    if(sideMenu) {
      window.addEventListener('click', getTarget)
    }

    return () =>  window.removeEventListener('click', getTarget)

  }, [sideMenu])


  return (
    <>
      <Header setSide={setSideMenu} />
      <BurgerMenu setSide={setSideMenu} ref={refSide}/> 
      {
        status && message && <Notification status={status} message={message} />
      }
      <main ref={refApp} className='app'>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default Layout