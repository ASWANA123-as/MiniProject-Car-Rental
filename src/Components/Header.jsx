import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="bg-blue-600 text-white py-20 text-center">
      <h1 className="text-5xl font-bold mb-4">Welcome to Car Rental App</h1>
      <p className="text-xl mb-6">Rent your dream car anytime, anywhere!</p>

      <div className="flex justify-center gap-4">
        <Link
          to="/login"
          className="bg-white text-blue-600 px-6 py-2 rounded font-semibold hover:bg-gray-200 transition"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="bg-white text-blue-600 px-6 py-2 rounded font-semibold hover:bg-gray-200 transition"
        >
          Register
        </Link>
      </div>

      <p className="mt-6 text-sm text-gray-200 italic">
        * If you are a first-time user, please register
      </p>
    </header>
  );
}

export default Header;
