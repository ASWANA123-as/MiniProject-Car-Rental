import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import NavBar from './NavBar'
import Footer from './Footer'
import HomePage from '../Pages/HomePage'
function Layout() {
  return (
    <div>
           <NavBar/>
        <Header/>
    
         <HomePage/>
        <Footer/>
    </div>
  )
}

export default Layout