import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../Components/NavBar";
import CheckoutModal from "./CheckoutModal";

export default function WishlistPage() {
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState([]);
  const [duplicate,setDuplicate]=useState(false)
  const [selectedCar, setSelectedCar] = useState(null);
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("darkMode")) || false
  );
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("wishlist")) || {};
    setWishlist(stored[currentUser?.email] || []);
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const handleRemove = (id) => {
    const updated = wishlist.filter((car) => car.id !== id);
    setWishlist(updated);

    const stored = JSON.parse(localStorage.getItem("wishlist")) || {};
    stored[currentUser?.email] = updated;
    localStorage.setItem("wishlist", JSON.stringify(stored));
  };

  const handleBook = (car) => {
    const booking=JSON.parse(localStorage.getItem("bookings"))
    const userBookings = booking[currentUser?.email] || [];
     const alreadyBooked = userBookings.some((b) => b.id === car.id);

  if (alreadyBooked) {
    alert(`You already booked ${car.name}. Cannot book again.`);
  } else {
    setSelectedCar(car);
    // navigate("/customer", { state: { preselectCarId: car.id } });
  }

    // if(duplicate){
    //       alert(`You already booked ${car.name}. Cannot book again.`);
    // }
    // else{
    //     setSelectedCar(car)
    // };
 
    // navigate("/customer", { state: { preselectCarId: car.id } });
  };

  return (
    <div className={darkMode ? "bg-gray-900 text-white min-h-screen" : "bg-gray-100 text-gray-900 min-h-screen"}>
      <NavBar />

      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">❤️ My Wishlist</h1>
          <div className="flex gap-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="px-4 py-2 rounded bg-yellow-500 text-white hover:bg-yellow-600"
            >
              {darkMode ? "☀️" : "🌙"}
            </button>
            <button
              onClick={() => navigate("/customer")}
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              Back to Cars
            </button>
          </div>
        </div>

        {wishlist.length === 0 ? (
          <p className="text-lg mt-10">Your wishlist is empty.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {wishlist.map((car) => (
              <div
                key={car.id}
                className={`rounded shadow p-4 transition ${
                  darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
                }`}
              >
                <img
                  src={car.image}
                  alt={car.name}
                  className="mb-3 rounded h-40 w-full object-cover"
                />
                <h3 className="text-lg font-bold">{car.name}</h3>
                <p className="text-gray-400">{car.type}</p>
                <p className="text-blue-400 font-semibold">₹{car.pricePerDay}/day</p>

                <div className="flex flex-col gap-2 mt-4">
                  <button
                    onClick={() => handleBook(car)}
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                  >
                    Book Now
                  </button>
                  <button
                    onClick={() => handleRemove(car.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {console.log(selectedCar,'yyy')}
      {selectedCar && (
              <CheckoutModal
                selectedCar={selectedCar}
                onClose={() => setSelectedCar(null)}
              />
            )}
    </div>
  );
}
