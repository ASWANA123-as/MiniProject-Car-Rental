import { useState, useEffect } from "react";

export default function CustomerDashboard() {
  const [cars, setCars] = useState([]);
  const [bookedCars, setBookedCars] = useState(
    JSON.parse(localStorage.getItem("bookings")) || []
  );

  // Fetch cars from GitHub API
  useEffect(() => {
    fetch("https://aswana123-as.github.io/Cars_1_API/Cars.json")
      .then((res) => res.json())
      .then((data) => setCars(data))
      .catch((err) => console.error("Error fetching cars:", err));
  }, []);

  const handleBook = (car) => {
    // prevent duplicate booking
    if (bookedCars.find((c) => c.id === car.id)) {
      alert(`You already booked ${car.name}`);
      return;
    }

    const updatedBookings = [...bookedCars, car];
    setBookedCars(updatedBookings);
    localStorage.setItem("bookings", JSON.stringify(updatedBookings));
    alert(`You booked ${car.name}!`);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Customer Dashboard</h1>

      {/* Car List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cars.length > 0 ? (
          cars.map((car) => (
            <div key={car.id} className="bg-white rounded shadow p-4">
              <img
                src={car.image}
                alt={car.name}
                className="mb-3 rounded h-40 w-full object-cover"
              />
              <h3 className="text-lg font-bold">{car.name}</h3>
              <p className="text-gray-600">{car.type}</p>
              <p className="text-blue-600 font-semibold">${car.price}/day</p>
              <button
                onClick={() => handleBook(car)}
                className="mt-3 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
              >
                Book Now
              </button>
            </div>
          ))
        ) : (
          <p>Loading cars...</p>
        )}
      </div>

      {/* My Bookings */}
      <h2 className="text-2xl font-semibold mt-10 mb-4">My Bookings</h2>
      {bookedCars.length > 0 ? (
        <ul className="list-disc pl-6">
          {bookedCars.map((car, index) => (
            <li key={index} className="mb-2">
              {car.name} - ${car.price}/day
            </li>
          ))}
        </ul>
      ) : (
        <p>No cars booked yet.</p>
      )}
    </div>
  );
}
