import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function NavBar({state}) {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    setCurrentUser(user);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    window.location.href = "/"; // redirect to home
  };

  return (
    <nav className="bg-yellow-600 text-white px-6 py-4 flex justify-between items-center">
      {/* Logo / App Name */}
      <Link to="/" className="text-2xl font-bold">Wheelio</Link>

      {/* Nav Links */}
      <div className="flex items-center gap-6">
        <Link to="/" className="hover:text-gray-200 transition">Home</Link>

         <Link to="/contact" className="hover:text-gray-200 transition">Contact</Link>

        {/* If not logged in */}
        {!currentUser && (
          <>
            <Link to="/login" theme={state} className="hover:text-gray-200 transition">Login</Link>
            <Link to="/register" className="hover:text-gray-200 transition">Register</Link>
          </>
        )}

        {/* If logged in */}
        {currentUser && (
          <>
            {/* Admin-specific links */}
            {currentUser.role === "Admin" && (
              <Link to="/admin" className="hover:text-gray-200 transition">Dashboard</Link>
            )}

            {/* Customer-specific links */}
            {currentUser.role === "Customer" && (
              <>
                <Link to="/customer" className="hover:text-gray-200 transition">Dashboard</Link>
                <Link to="bookings" className="hover:text-gray-200 transition">Bookings</Link>
                <Link
  to="/wishlist"
  className="text-white hover:underline px-3 py-2"
>
  ❤️ Wishlist
</Link>

              </>
            )}

            {/* Logout button */}
            <button
              onClick={handleLogout}
              className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-200 transition"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
