import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const booking = location.state?.booking;

  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [upiId, setUpiId] = useState("");
  const [bank, setBank] = useState("");

  if (!booking) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-bold">No booking found</h2>
        <button
          onClick={() => navigate("/customer")}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Go Back
        </button>
      </div>
    );
  }

  const handlePayment = () => {
    if (paymentMethod === "card" && (!cardNumber || !expiry || !cvv)) {
      alert("Please enter all card details");
      return;
    }
    if (paymentMethod === "upi" && !upiId) {
      alert("Please enter your UPI ID");
      return;
    }
    if (paymentMethod === "netbanking" && !bank) {
      alert("Please select a bank");
      return;
    }

    // ✅ Save booking per user
    const allBookings = JSON.parse(localStorage.getItem("bookings")) || {};
    const userBookings = allBookings[currentUser.email] || [];
    userBookings.push(booking);
    allBookings[currentUser.email] = userBookings;
    localStorage.setItem("bookings", JSON.stringify(allBookings));

    alert(`✅ Payment successful via ${paymentMethod}! Booking confirmed.`);
    navigate("/customer");
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded mt-10">
      <h2 className="text-2xl font-bold mb-4">Payment for {booking.name}</h2>
      <p className="mb-4">
        <strong>Total:</strong> ₹{booking.totalCost}
      </p>

      {/* Payment Method Selection */}
      <div className="mb-4">
        <label className="block mb-2 font-semibold">Select Payment Method:</label>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="card">Credit / Debit Card</option>
          <option value="upi">UPI</option>
          <option value="netbanking">Net Banking</option>
          <option value="cod">Cash on Delivery (Pay at Pickup)</option>
        </select>
      </div>

      {/* Conditional Inputs */}
      {paymentMethod === "card" && (
        <div>
          <input
            type="text"
            placeholder="Card Number"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            className="w-full p-2 mb-3 border rounded"
          />
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="MM/YY"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              className="w-1/2 p-2 mb-3 border rounded"
            />
            <input
              type="password"
              placeholder="CVV"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              className="w-1/2 p-2 mb-3 border rounded"
            />
          </div>
        </div>
      )}

      {paymentMethod === "upi" && (
        <input
          type="text"
          placeholder="Enter UPI ID (e.g. user@upi)"
          value={upiId}
          onChange={(e) => setUpiId(e.target.value)}
          className="w-full p-2 mb-3 border rounded"
        />
      )}

      {paymentMethod === "netbanking" && (
        <select
          value={bank}
          onChange={(e) => setBank(e.target.value)}
          className="w-full p-2 mb-3 border rounded"
        >
          <option value="">Select Bank</option>
          <option value="SBI">SBI</option>
          <option value="HDFC">HDFC</option>
          <option value="ICICI">ICICI</option>
          <option value="Axis">Axis</option>
        </select>
      )}

      {paymentMethod === "cod" && (
        <p className="text-gray-700 mb-3">
          💵 You can pay in cash when you pick up your car.
        </p>
      )}

      <button
        onClick={handlePayment}
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
      >
        Pay & Confirm
      </button>
    </div>
  );
}
