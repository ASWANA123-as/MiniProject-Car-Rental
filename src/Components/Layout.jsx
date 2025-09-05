import React from 'react'
import { Outlet } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import Header from './Header'
import NavBar from './NavBar'
import Footer from './Footer'
import HomePage from '../Pages/HomePage'
import About from '../Pages/About'
import Testimonials from '../Pages/Testimonials'


function Layout() {
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("darkMode")) || false
    
  );
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);
  return (
    <div className={darkMode ? "bg-gray-900 text-white" : "bg-white text-black"}>
           <NavBar/>
           <div className="flex justify-end p-4">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
        >
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>
        <Header state={darkMode}/>
    <About state={darkMode}/>
         <HomePage state={darkMode}/>
         <Testimonials state={darkMode}/>
        <Footer/>
    </div>
  )
}

export default Layout