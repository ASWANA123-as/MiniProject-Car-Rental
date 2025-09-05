import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  PieChart, Pie, Cell, Tooltip, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer
} from "recharts";

export default function AdminDashboard() {
  const [cars, setCars] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [formData, setFormData] = useState({  name: "", type: "", pricePerDay: "", image: "" });
  const [editIndex, setEditIndex] = useState(null);
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("darkMode")) || false
  );

  useEffect(() => {
    // Fetch cars from API
    fetch("https://aswana123-as.github.io/Cars_1_API/Cars.json")
      .then((res) => res.json())
      .then((data) => {
        const localCars = JSON.parse(localStorage.getItem("adminCars")) || [];
        setCars([...data, ...localCars]);
      })
      .catch((err) => console.error("Error fetching cars:", err));

    // Load bookings
    const storedBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    setBookings(storedBookings);
  }, []);

  const navigate = useNavigate();

  // --- Analytics ---
  const totalCars = cars.length;
  const totalBookings = bookings.length;
  const totalRevenue = bookings.reduce((sum, b) => sum + (b.totalCost || 0), 0);

  const typeCount = cars.reduce((acc, car) => {
    acc[car.type] = (acc[car.type] || 0) + 1;
    return acc;
  }, {});

  const typeData = Object.entries(typeCount).map(([type, count]) => ({
    name: type,
    value: count,
  }));

  const bookingCount = bookings.reduce((acc, b) => {
    acc[b.name] = (acc[b.name] || 0) + 1;
    return acc;
  }, {});

  const bookingData = Object.entries(bookingCount)
    .map(([name, count]) => ({ name, bookings: count }))
    .sort((a, b) => b.bookings - a.bookings);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A569BD"];
  const formatCurrency = (v) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "INR" }).format(v);

  // --- Car Management Functions ---
  const saveCarsToLocal = (updatedCars) => {
  localStorage.setItem(
    "adminCars",
    JSON.stringify(updatedCars.filter((c) => c.isLocal))
  );
};
const handleAddOrUpdate = () => {
  console.log(formData,'formData')
  if (!formData.name || !formData.type || !formData.pricePerDay || !formData.image) {
    alert("Please fill all fields");
    return;
  }

  let updatedCars;
  if (editIndex !== null) {
    // Update existing car
    updatedCars = cars.map((car, i) =>
      i === editIndex
        ? {
            ...formData,
            id: car.id, // keep existing id
            pricePerDay: Number(formData.pricePerDay),
            isLocal: true,
          }
        : car
    );
    setEditIndex(null);
  } else {
    // Add new car with unique id
    const newCar = {
      ...formData,
      id: Date.now(), // ✅ unique id
      pricePerDay: Number(formData.pricePerDay),
      isLocal: true,
    };
    updatedCars = [...cars, newCar];
  }
  {console.log(updatedCars,'updatedCars')}

  setCars(updatedCars);
  saveCarsToLocal(updatedCars);
  setFormData({ id: "", name: "", type: "", price: "", image: "" });
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

      <div className="flex gap-4 mb-6">
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
