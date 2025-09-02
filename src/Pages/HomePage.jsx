import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
function HomePage() {
   const navigate = useNavigate();
const [search, setSearch] = useState("");
  const handleLoginClick = () => {
    navigate("/login"); // navigates to Login page
  };
  const cars = [
    {
      id: 1,
      name: "Tesla Model 3",
      price: "₹4,500/day",
      img: "https://www.bing.com/th/id/OIP.D-paruT1nvRn917pZp7QogHaEo?w=244&h=211&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",
    },
    {
      id: 2,
      name: "BMW X5",
      price: "₹6,800/day",
      img: "https://tse3.mm.bing.net/th/id/OIP.rUCGL0diLE8tlmuTcVnU5gHaEK?rs=1&pid=ImgDetMain&o=7&rm=3",
    },
    {
      id: 3,
      name: "Audi A6",
      price: "₹5,200/day",
      img: "https://www.autocar.co.uk/sites/autocar.co.uk/files/images/car-reviews/first-drives/legacy/audi-e-tron-facelift-front-three-quarter.jpg",
    },
  ];

  return (
    <>
     
    <section>
       <div className="mt-10 max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 flex flex-col md:flex-row gap-4 items-center">
          <input
            type="text"
            placeholder="Pick-up Location"
            className="w-full md:w-1/4 p-2 border rounded"
          />
          
          <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
            Search
          </button>
        </div>
    </section>

<section>
  <section className="max-w-4xl mx-auto mt-10 px-6">
        <input
          type="text"
          placeholder="Search by car name or type..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 border rounded shadow"
        />
      </section>
</section>

      
      <section className="p-6 flex-1">
        <h3 className="text-2xl font-bold mb-6 text-gray-800">Featured Cars</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {cars.map((car) => (
            <div key={car.id} className="bg-white shadow rounded-lg overflow-hidden hover:scale-105 transition">
              <img src={car.img} alt={car.name} className="h-48 w-full object-cover" />
              <div className="p-4">
                <h4 className="text-xl font-semibold">{car.name}</h4>
                <p className="text-gray-600">{car.price}</p>
                <button className="mt-3 w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                  Rent Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      
     
      </>
    
  );
}

export default HomePage
