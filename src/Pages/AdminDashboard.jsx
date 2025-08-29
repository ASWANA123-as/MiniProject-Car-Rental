import { useState, useEffect } from "react";

export default function AdminDashboard() {
  const [cars, setCars] = useState([]);
  const [newCar, setNewCar] = useState({
    name: "",
    type: "",
    price: "",
    image: "",
  });

  // Load cars from API + localStorage
  useEffect(() => {
    fetch("https://aswana123-as.github.io/cars-API/Cars.json")
      .then((res) => res.json())
      .then((data) => {
        const localCars = JSON.parse(localStorage.getItem("adminCars")) || [];
        setCars([...data, ...localCars]);
      })
      .catch((err) => console.error("Error fetching cars:", err));
  }, []);

  // Handle form input
  const handleChange = (e) => {
    setNewCar({ ...newCar, [e.target.name]: e.target.value });
  };

  // Add new car
  const handleAddCar = () => {
    if (!newCar.name || !newCar.type || !newCar.price || !newCar.image) {
      alert("Please fill all fields");
      return;
    }

    const updatedCars = [...cars, { ...newCar, id: Date.now() }];
    setCars(updatedCars);

    // Save only new cars in localStorage
    const localCars = JSON.parse(localStorage.getItem("adminCars")) || [];
    localStorage.setItem("adminCars", JSON.stringify([...localCars, newCar]));

    setNewCar({ name: "", type: "", price: "", image: "" });
  };

  // Delete car (only local ones)
  const handleDeleteCar = (id) => {
    const updatedCars = cars.filter((car) => car.id !== id);
    setCars(updatedCars);

    // Update localStorage
    const localCars = JSON.parse(localStorage.getItem("adminCars")) || [];
    const newLocalCars = localCars.filter((car) => car.id !== id);
    localStorage.setItem("adminCars", JSON.stringify(newLocalCars));
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Add Car Form */}
      <div className="bg-white p-4 shadow rounded mb-6">
        <h2 className="text-xl font-semibold mb-4">Add New Car</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            name="name"
            value={newCar.name}
            onChange={handleChange}
            placeholder="Car Name"
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="type"
            value={newCar.type}
            onChange={handleChange}
            placeholder="Car Type"
            className="p-2 border rounded"
          />
          <input
            type="number"
            name="price"
            value={newCar.price}
            onChange={handleChange}
            placeholder="Price/Day"
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="image"
            value={newCar.image}
            onChange={handleChange}
            placeholder="Image URL"
            className="p-2 border rounded"
          />
        </div>
        <button
          onClick={handleAddCar}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Car
        </button>
      </div>

      {/* Car List */}
      <h2 className="text-2xl font-semibold mb-4">Car List</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cars.length > 0 ? (
          cars.map((car) => (
            <div key={car.id || car.name} className="bg-white shadow p-4 rounded">
              <img
                src={car.image}
                alt={car.name}
                className="h-40 w-full object-cover rounded mb-3"
              />
              <h3 className="text-lg font-bold">{car.name}</h3>
              <p className="text-gray-600">{car.type}</p>
              <p className="text-blue-600 font-semibold">${car.price}/day</p>

              {car.id && (
                <button
                  onClick={() => handleDeleteCar(car.id)}
                  className="mt-3 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              )}
            </div>
          ))
        ) : (
          <p>No cars available</p>
        )}
      </div>
    </div>
  );
}
