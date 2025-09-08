import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  PieChart, Pie, Cell, Tooltip, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer
} from "recharts";

export default function AdminDashboard() {
  const [cars, setCars] = useState([]);
  const [bookings, setBookings] = useState({});
  const [user, setUser] = useState({});
  const [formData, setFormData] = useState({ name: "", type: "", pricePerDay: "", image: "", Pickup: "" });
  const [editIndex, setEditIndex] = useState(null);
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("darkMode")) || false
  );

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch cars
    fetch("https://aswana123-as.github.io/Cars_1_API/Cars.json")
      .then((res) => res.json())
      .then((data) => {
        const localCars = JSON.parse(localStorage.getItem("adminCars")) || [];
        setCars([...data, ...localCars]);
      })
      .catch((err) => console.error("Error fetching cars:", err));

    // Load bookings
    const storedBookings = JSON.parse(localStorage.getItem("bookings")) || {};
    setBookings(storedBookings);

    // Load user
    const currentUser = JSON.parse(localStorage.getItem("currentUser")) || {};
    setUser(currentUser);
  }, []);

  // --- Analytics ---

  // Flatten all bookings from all users
  const allBookings = Object.values(bookings).flat();

  const totalCars = cars.length;
  const totalBookings = allBookings.length;
  const totalRevenue = allBookings.reduce((sum, b) => sum + (b.totalCost || 0), 0);

  const bookingCount = allBookings.reduce((acc, b) => {
    acc[b.name] = (acc[b.name] || 0) + 1;
    return acc;
  }, {});

  const bookingData = Object.entries(bookingCount)
    .map(([name, count]) => ({ name, bookings: count }))
    .sort((a, b) => b.bookings - a.bookings);

  const typeCount = cars.reduce((acc, car) => {
    acc[car.type] = (acc[car.type] || 0) + 1;
    return acc;
  }, {});

  const typeData = Object.entries(typeCount).map(([type, count]) => ({
    name: type,
    value: count,
  }));

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A569BD"];

  const formatCurrency = (v) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "INR" }).format(v);

  // --- Car Management ---

  const saveCarsToLocal = (updatedCars) => {
    localStorage.setItem(
      "adminCars",
      JSON.stringify(updatedCars.filter((c) => c.isLocal))
    );
  };

  const handleAddOrUpdate = () => {
    if (!formData.name || !formData.type || !formData.pricePerDay || !formData.image || !formData.Pickup) {
      alert("Please fill all fields");
      return;
    }

    let updatedCars;
    if (editIndex !== null) {
      updatedCars = cars.map((car, i) =>
        i === editIndex
          ? {
              ...formData,
              id: car.id,
              pricePerDay: Number(formData.pricePerDay),
              isLocal: true,
            }
          : car
      );
      setEditIndex(null);
    } else {
      const newCar = {
        ...formData,
        id: Date.now(),
        pricePerDay: Number(formData.pricePerDay),
        isLocal: true,
      };
      updatedCars = [...cars, newCar];
    }

    setCars(updatedCars);
    saveCarsToLocal(updatedCars);
    setFormData({ id: "", name: "", type: "", pricePerDay: "", image: "", Pickup: "" });
  };

  const handleEdit = (index) => {
    setFormData(cars[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedCars = cars.filter((_, i) => i !== index);
    setCars(updatedCars);
    saveCarsToLocal(updatedCars);
  };

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <div className={darkMode ? "bg-gray-900 text-white min-h-screen p-8" : "bg-gray-100 text-black min-h-screen p-8"}>
      <h1 className="text-3xl font-bold mb-6">📊 Admin Analytics Dashboard</h1>

      <h1 className="text-4xl font-extrabold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-yellow-500 to-pink-500">
        👋 Welcome, {user.name}
      </h1>

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-4 py-2 rounded bg-yellow-500 text-white hover:bg-yellow-600"
        >
          {darkMode ? "☀️" : "🌙"}
        </button>
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
        >
          Exit
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className={darkMode ? "bg-gray-800 shadow p-6 rounded text-center" : "bg-white shadow p-6 rounded text-center"}>
          <h3 className="text-lg font-semibold">Total Cars</h3>
          <p className="text-2xl font-bold text-blue-600">{totalCars}</p>
        </div>
        <div className={darkMode ? "bg-gray-800 shadow p-6 rounded text-center" : "bg-white shadow p-6 rounded text-center"}>
          <h3 className="text-lg font-semibold">Total Bookings</h3>
          <p className="text-2xl font-bold text-green-600">{totalBookings}</p>
        </div>
        <div className={darkMode ? "bg-gray-800 shadow p-6 rounded text-center" : "bg-white shadow p-6 rounded text-center"}>
          <h3 className="text-lg font-semibold">Revenue</h3>
          <p className="text-2xl font-bold text-purple-600">{formatCurrency(totalRevenue)}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className={darkMode ? "bg-gray-800 shadow rounded p-6" : "bg-white shadow rounded p-6"}>
          <h3 className="text-lg font-bold mb-4">Car Types Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={typeData} dataKey="value" nameKey="name" outerRadius={100} label>
                {typeData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className={darkMode ? "bg-gray-800 shadow rounded p-6" : "bg-white shadow rounded p-6"}>
          <h3 className="text-lg font-bold mb-4">Bookings per Car</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={bookingData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="bookings" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Car Management */}
      <div className={darkMode ? "bg-gray-800 shadow rounded p-6" : "bg-white shadow rounded p-6"}>
        <h3 className="text-lg font-bold mb-4">🚗 Car Management</h3>

        {/* Form */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Car Name"
            className="border p-2 rounded w-full"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Type (SUV, Sedan...)"
            className="border p-2 rounded w-full"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          />
          <input
            type="number"
            placeholder="Price Per Day"
            className="border p-2 rounded w-full"
            value={formData.pricePerDay}
            onChange={(e) => setFormData({ ...formData, pricePerDay: e.target.value })}
          />
          <input
            type="text"
            placeholder="Image URL"
            className="border p-2 rounded w-full"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          />
          <input
            type="text"
            placeholder="Pickup Location"
            className="border p-2 rounded w-full"
            value={formData.Pickup}
            onChange={(e) => setFormData({ ...formData, Pickup: e.target.value })}
          />
          <button
            onClick={handleAddOrUpdate}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {editIndex !== null ? "Update Car" : "Add Car"}
          </button>
        </div>

        {/* Cars List */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cars.map((car, index) => (
            <div key={index} className="border rounded p-4 shadow flex flex-col">
              <img src={car.image} alt={car.name} className="h-32 w-full object-cover mb-2 rounded" />
              <h4 className="font-bold text-lg">{car.name}</h4>
              <p className="text-sm text-gray-600">{car.type}</p>
              <p className="text-blue-600 font-semibold">Rs {car.pricePerDay}</p>
              <p className="text-gray-500 text-sm">Pickup: {car.Pickup}</p>
              {car.isLocal && (
                <div className="mt-2 flex gap-2">
                  <button
                    onClick={() => handleEdit(index)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="bg-red-600 text-white px-2 py-1 rounded text-sm"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
