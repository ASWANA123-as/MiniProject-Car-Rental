import React from 'react'
import { Link } from 'react-router-dom'

function NavBar() {
  return (
    <div>
        <nav className="bg-indigo-600 text-white px-6 py-3 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-xl font-bold tracking-wide">
         CAR RENTAL
        </h1>

        {/* Nav Links */}
        <div className="flex space-x-6">
          <Link to="/" className="hover:text-gray-200 transition">Home</Link>
          <Link to="/about" className="hover:text-gray-200 transition">About</Link>
          <Link to="/cars" className="hover:text-gray-200 transition">CARS</Link>
          <Link to="/contact" className="hover:text-gray-200 transition">Contact</Link>
         
        </div>
      </div>
    </nav>
    </div>
  )
}

export default NavBar