import React from "react";
import { Link } from "react-router-dom";

function Header({state}) {
  return (
    <header
       className={`py-20 text-center ${
        state ? "bg-gray-800 text-white" : "bg-blue-600 text-white"
      }`}
     style={{
    backgroundImage: `url("https://tse4.mm.bing.net/th/id/OIP.PG4d8BQzt8oW1M5B2pphlgHaDt?rs=1&pid=ImgDetMain&o=7&rm=3")`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '400px' // optional: ensures the div has height
  }}
    >
      {/* Overlay */}
      {/* <div className="absolute inset-0 bg-black bg-opacity-60"></div> */}

      {/* Content */}
      <div className="relative z-10 text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
          Welcome to Car Rental App
        </h1>
        <p className="text-lg md:text-xl mb-6 drop-shadow">
          Rent your dream car anytime, anywhere!
        </p>

        {/* Buttons */}
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

        <p className="mt-6 text-sm text-gray-300 italic">
          * If you are a first-time user, please register
        </p>
      </div>
    </header>
  );
}

export default Header;
