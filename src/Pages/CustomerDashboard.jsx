import { useState, useEffect, } from "react";
import { useNavigate } from "react-router-dom";
import CheckoutModal from "./CheckoutModal";
import NavBar from "../Components/NavBar";
CheckoutModal
export default function CustomerDashboard() {
  const [cars, setCars] = useState([]);
  const [bookedCars, setBookedCars] = useState(
    JSON.parse(localStorage.getItem("bookings")) || []
  );
  const [searchType, setSearchType] = useState("");
  const [searchName, setsearchname] = useState("");
  const [searchLocation, setsearchlocation] = useState("");
  const [SearchPrice, SetSearchPrice] = useState("");
  const [minPrice, setMinPrice] = useState(0);     // default minimum price
const [maxPrice, setMaxPrice] = useState(10000); 
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("darkMode")) || false
    
  );
  const [rentalDays, setRentalDays] = useState({}); // store rental duration per car
  const [selectedCar, setSelectedCar] = useState(null);
  const [pickupDate, setPickupDate] = useState("");
  const [dropoffDate, setDropoffDate] = useState("");
const [bookings, setBookings] = useState([]);
  // Fetch cars from API
  useEffect(() => {
    fetch("https://aswana123-as.github.io/Cars_1_API/Cars.json")
      .then(res => res.json())
    .then(apiCars => {
      // Load admin-added cars from localStorage
      const localCars = JSON.parse(localStorage.getItem("adminCars")) || [];
      console.log(localCars,'localcars')
      setCars([...apiCars, ...localCars]);
    })
      .catch((err) => console.error("Error fetching cars:", err));
  }, []);
  const navigate = useNavigate();

  // Save dark mode preference
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);
  const handleBook=(car)=>{
   
      if (bookedCars.find((c) => c.id === car.id)) {
     alert(`You already booked ${car.name}`);
     return;
   }
   else{
 setSelectedCar(car);
   }
  }

//   const handleBook = (car) => {
//     const days = rentalDays[car.id] || 1; // default 1 day if not entered
//     setSelectedCar(car);
//     console.log(days,'uuuu')
//     const totalCost = car.pricePerDay * days;
// console.log(totalCost,'uu5555uu')
//     if (bookedCars.find((c) => c.id === car.id)) {
//       alert(`You already booked ${car.name}`);
//       return;
//     }
    
 

//     const booking = { ...car, days, totalCost };
//     const updatedBookings = [...bookedCars, booking];
//     setBookedCars(updatedBookings);
//     localStorage.setItem("bookings", JSON.stringify(updatedBookings));
//     alert(`You booked ${car.name} for ${days} days! Total: RS${totalCost}`);
//   };
     const handleCheckout = () => {
    if (!pickupDate || !dropoffDate) {
      alert("Please select pickup and drop-off dates");
      return;
    }

    const start = new Date(pickupDate);
    const end = new Date(dropoffDate);
    const duration = Math.ceil((end - start) / (1000 * 60 * 60 * 24)); // days

    if (duration <= 0) {
      alert("Drop-off date must be after pickup date");
      return;
    }

    const booking = {
      id: Date.now(),
      ...selectedCar,
      pickupDate,
      dropoffDate,
      duration,
      totalCost: selectedCar.pricePerDay * duration,
    };

    const updatedBookings = [...bookings, booking];
    setBookings(updatedBookings);
    // localStorage.setItem("bookings", JSON.stringify(updatedBookings));

    // alert(`Booking Confirmed! Total: ₹${booking.totalCost}`);
    setSelectedCar(null);
    setPickupDate("");
    setDropoffDate("");
    navigate("/payment",{state:{booking}});

  };
{console.log(cars,'cars')}
  // Filter cars
const filteredCars = cars.filter(
  (car) =>
    car.type?.toLowerCase().includes(searchType.toLowerCase()) &&
    car.name?.toLowerCase().includes(searchName.toLowerCase()) &&
     car.pricePerDay >= minPrice &&
    car.pricePerDay <= maxPrice&&
     car.Pickup?.toLowerCase().includes(searchLocation.toLowerCase())

);
  

  return (
    <div
      className={
        darkMode
          ? "bg-gray-900 text-white min-h-screen"
          : "bg-gray-100 text-gray-900 min-h-screen"
      }
    >
      <NavBar/>
      <div className="p-6">
        {/* Header with Dark Mode Toggle */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Customer Dashboard</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
          >
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
           <button
              onClick={() => navigate("/")}
              className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
            >
              Exit
            </button>
        </div>

        {/* Search Bar */}
      
<div
  className={`shadow-lg rounded-xl p-6 mb-8 transition-colors duration-300 ${
    darkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"
  }`}
>
  <h2 className={`text-xl font-semibold mb-6 ${darkMode ? "text-gray-100" : "text-gray-800"}`}>
    🔎 Find Your Car
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    {/* Car Type */}
    <input
      type="text"
      placeholder="Type (SUV, Sedan, Sport)"
      value={searchType}
      onChange={(e) => setSearchType(e.target.value)}
      className={`w-full p-3 border rounded-xl shadow-sm focus:ring-2 focus:outline-none focus:ring-blue-500 transition-colors duration-300 ${
        darkMode
          ? "bg-gray-800 border-gray-700 text-gray-100"
          : "bg-white border-gray-300 text-gray-900"
      }`}
    />

    {/* Car Name */}
    <input
      type="text"
      placeholder="Car Name"
      value={searchName}
      onChange={(e) => setsearchname(e.target.value)}
      className={`w-full p-3 border rounded-xl shadow-sm focus:ring-2 focus:outline-none focus:ring-blue-500 transition-colors duration-300 ${
        darkMode
          ? "bg-gray-800 border-gray-700 text-gray-100"
          : "bg-white border-gray-300 text-gray-900"
      }`}
    />

    {/* Price Range */}
    <div className="flex gap-2">
      <input
        type="number"
        placeholder="Min Price"
        value={minPrice}
        onChange={(e) => setMinPrice(Number(e.target.value))}
        className={`w-1/2 p-3 border rounded-xl shadow-sm focus:ring-2 focus:outline-none focus:ring-blue-500 transition-colors duration-300 ${
          darkMode
            ? "bg-gray-800 border-gray-700 text-gray-100"
            : "bg-white border-gray-300 text-gray-900"
        }`}
      />
      <input
        type="number"
        placeholder="Max Price"
        value={maxPrice}
        onChange={(e) => setMaxPrice(Number(e.target.value))}
        className={`w-1/2 p-3 border rounded-xl shadow-sm focus:ring-2 focus:outline-none focus:ring-blue-500 transition-colors duration-300 ${
          darkMode
            ? "bg-gray-800 border-gray-700 text-gray-100"
            : "bg-white border-gray-300 text-gray-900"
        }`}
      />
    </div>

    {/* Pickup Location */}
    <input
      type="text"
      placeholder="Pickup Location"
      value={searchLocation}
      onChange={(e) => setsearchlocation(e.target.value)}
      className={`w-full p-3 border rounded-xl shadow-sm focus:ring-2 focus:outline-none focus:ring-blue-500 transition-colors duration-300 ${
        darkMode
          ? "bg-gray-800 border-gray-700 text-gray-100"
          : "bg-white border-gray-300 text-gray-900"
      }`}
    />
  </div>

  {/* Search Button */}
  {/* <div className="flex justify-end mt-6">
    <button
      onClick={() => console.log("apply filters")}
      className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow hover:bg-blue-700 transition duration-300"
    >
      Apply Filters
    </button>
  </div> */}
</div>


        {/* Car List */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {console.log(filteredCars,'filteredCars')}
          {filteredCars.length > 0 ? (
            filteredCars.map((car) => (
              <div
                key={car.id}
                className={`rounded shadow p-4 transition 
                  ${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"}`}
              >
                <img
                  src={car.image}
                  alt={car.name}
                  className="mb-3 rounded h-40 w-full object-cover"
                />
                <h3 className="text-lg font-bold">{car.name}</h3>
                <p className="text-gray-400">{car.type}</p>
                <p className="text-blue-400 font-semibold">RS{car.pricePerDay}/day</p>

                
               

                <button
                  onClick={() => handleBook(car)}
                  className="mt-3 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 w-full"
                >
                  Book Now
                </button>
              </div>
            ))
          ) : (
            <p>No cars found for this type.</p>
          )}
        </div>

       

      </div>
  {selectedCar && (
        <CheckoutModal
          selectedCar={selectedCar}
          onClose={() => setSelectedCar(null)}
        />
      )}

    </div>
  );
}
