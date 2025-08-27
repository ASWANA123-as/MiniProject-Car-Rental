import React from 'react'

function Header() {
  return (
    <div>
         <header className="flex justify-between items-center p-4 shadow bg-white">
        <h1 className="text-2xl font-bold text-blue-600">CarRentalX</h1>
        <nav className="space-x-4">
          <a href="/" className="text-gray-700 hover:text-blue-600">Home</a>
          <a href="/about" className="text-gray-700 hover:text-blue-600">About</a>
          <a href="/cars" className="text-gray-700 hover:text-blue-600">Cars</a>
          <a href="/contact" className="text-gray-700 hover:text-blue-600">Contact</a>
        </nav>
      </header>
    </div>
  )
}

export default Header