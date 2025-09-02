import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CheckoutModal({ selectedCar, onClose }) {
  const [pickupDate, setPickupDate] = useState("");
  const [dropoffDate, setDropoffDate] = useState("");
  const navigate = useNavigate();

  if (!selectedCar) return null;

  const duration =
    pickupDate && dropoffDate
      ? Math.max(
          Math.ceil(
            (new Date(dropoffDate) - new Date(pickupDate)) /
              (1000 * 60 * 60 * 24)
          ),
          0
        )
      : 0;

  const handleCheckout = () => {
    if (!pickupDate || !dropoffDate) {
      alert("Please select pickup and drop-off dates");
      return;
    }
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

    // ✅ Navigate to payment page with booking
    navigate("/payment", { state: { booking } });
    onClose(); // close modal
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>

        <h3 className="text-2xl font-bold mb-4 text-gray-800">
          Checkout: {selectedCar.name}
        </h3>

        <p className="text-gray-600 mb-4">
          Price per day:{" "}
          <span className="font-semibold text-blue-600">
            ₹{selectedCar.pricePerDay}
          </span>
        </p>

        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1">
            <label className="block text-gray-700 mb-1">Pick-up Date</label>
            <input
              type="date"
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex-1">
            <label className="block text-gray-700 mb-1">Drop-off Date</label>
            <input
              type="date"
              value={dropoffDate}
              onChange={(e) => setDropoffDate(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Dynamic Total Cost */}
        {pickupDate && dropoffDate && duration > 0 && (
          <p className="mb-4 text-lg text-gray-800">
            Duration: <span className="font-semibold">{duration} days</span>
            <br />
            Total Cost:{" "}
            <span className="font-bold text-green-600">
              ₹{selectedCar.pricePerDay * duration}
            </span>
          </p>
        )}

        <button
          onClick={handleCheckout}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition-all duration-200"
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
}
