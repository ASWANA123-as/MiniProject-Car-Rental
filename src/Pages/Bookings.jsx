import { useState, useEffect } from "react";


export default function BookingsPage() {
  const [bookedCars, setBookedCars] = useState([]);

  useEffect(() => {
    // Load bookings from localStorage
    const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
    setBookedCars(bookings);
  }, []);
  const handleDelete = (index) => {
    const updatedBookings = bookedCars.filter((_, i) => i !== index);
    setBookedCars(updatedBookings);
    localStorage.setItem("bookings", JSON.stringify(updatedBookings));
  };

  return (
    <div className="min-h-screen bg-gray-100">
    

      <section className="mt-10 max-w-6xl mx-auto px-4">
        <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-3">
            📑 My Bookings
          </h2>

          {bookedCars.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200 rounded-lg">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Car</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Duration</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Pickup</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Dropoff</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Total Cost</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {bookedCars.map((car, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 text-sm font-medium text-gray-800">{car.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{car.duration} days</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{car.pickupDate}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{car.dropoffDate}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-green-600">₹{car.totalCost}</td>
                      <td className="px-6 py-4 text-sm">
                      <button
                        onClick={() => handleDelete(index)}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                      >
                        Cancel
                      </button>
                    </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500 mt-6 text-center italic">
              🚗 No cars booked yet. Start booking your first ride!
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
