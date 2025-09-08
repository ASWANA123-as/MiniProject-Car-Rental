import React, { useState, useEffect } from 'react';

const CarRentalContactForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    pickupDate: '',
    dropoffDate: '',
    carType: '',
    message: ''
  });

  const [darkMode, setDarkMode] = useState(() => {
    return JSON.parse(localStorage.getItem('darkMode')) || false;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Your request has been submitted!');
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      pickupDate: '',
      dropoffDate: '',
      carType: '',
      message: ''
    });
  };

  return (
   
      <div className={!darkMode?"min-h-screen flex flex-col justify-center items-center bg-gray-100" :"min-h-screen flex flex-col justify-center items-center bg-gray-900 text-gray-900 text-white transition-colors duration-300 p-4"}>

        {/* Toggle Button */}
        <div className="w-full max-w-xl flex justify-end mb-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition"
          >
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>

        {/* Form Container */}
        <div className={!darkMode?"w-full max-w-xl p-6 bg-white dark:bg-gray-800 text-gray-900" :"w-full max-w-xl p-6 text-gray-100 rounded-lg shadow-md transition-colors duration-300"}>
          <h2 className="text-2xl font-bold mb-6 text-center">Car Rental Contact Form</h2>
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Full Name */}
            <div>
              <label className="block font-medium mb-1">Full Name *</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className={!darkMode?"w-full border border-gray-300": "w-full border border-gray-300 border-gray-600 bg-white bg-gray-700 text-gray-900 text-white rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500 focus:border-blue-400"}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block font-medium mb-1">Email Address *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={!darkMode?"w-full border border-gray-300": "w-full border border-gray-300 border-gray-600 bg-white bg-gray-700 text-gray-900 text-white rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500 focus:border-blue-400"}
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block font-medium mb-1">Phone Number *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className={!darkMode?"w-full border border-gray-300": "w-full border border-gray-300 border-gray-600 bg-white bg-gray-700 text-gray-900 text-white rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500 focus:border-blue-400"}
              />
            </div>

            {/* Pickup Date */}
            <div>
              <label className="block font-medium mb-1">Pickup Date *</label>
              <input
                type="date"
                name="pickupDate"
                value={formData.pickupDate}
                onChange={handleChange}
                required
                className={!darkMode?"w-full border border-gray-300": "w-full border border-gray-300 border-gray-600 bg-white bg-gray-700 text-gray-900 text-white rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500 focus:border-blue-400"}
              />
            </div>

            {/* Drop-off Date */}
            <div>
              <label className="block font-medium mb-1">Drop-off Date *</label>
              <input
                type="date"
                name="dropoffDate"
                value={formData.dropoffDate}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500 dark:focus:border-blue-400"
              />
            </div>

            {/* Car Type */}
            <div>
              <label className="block font-medium mb-1">Car Type *</label>
              <select
                name="carType"
                value={formData.carType}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500 dark:focus:border-blue-400"
              >
                <option value="">-- Select a car --</option>
                <option value="sedan">Sedan</option>
                <option value="suv">SUV</option>
                <option value="van">Van</option>
                <option value="luxury">Luxury</option>
              </select>
            </div>

            {/* Message */}
            <div>
              <label className="block font-medium mb-1">Additional Notes</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                placeholder="Any special requests or questions?"
                className={!darkMode?"w-full border border-gray-300": "w-full border border-gray-300 border-gray-600 bg-white bg-gray-700 text-gray-900 text-white rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500 focus:border-blue-400"}
              />
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded transition duration-200"
              >
                Send Request
              </button>
            </div>

          </form>
        </div>
      </div>
   
  );
};

export default CarRentalContactForm;
