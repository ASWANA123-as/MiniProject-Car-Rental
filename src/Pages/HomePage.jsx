import React from "react";

function HomePage() {
  const cars = [
    {
      id: 1,
      name: "Tesla Model 3",
      price: "₹4,500/day",
      img: "https://www.tesla.com/sites/default/files/modelsx-new/social/model-3-hero-social.jpg",
    },
    {
      id: 2,
      name: "BMW X5",
      price: "₹6,800/day",
      img: "https://www.bmwusa.com/content/dam/bmwusa/X5/2024/Overview/BMW-MY24-X5-Overview-01.jpg",
    },
    {
      id: 3,
      name: "Audi A6",
      price: "₹5,200/day",
      img: "https://www.audi.in/dam/nemo/models/a6/a6-limousine/my-2024/overview/1920x1080-gallery/1920x1080_DSC09069.jpg",
    },
  ];

  return (
    <>
     
      <section className="relative bg-blue-600 text-white py-20 px-6 text-center">
        <h2 className="text-4xl font-bold mb-4">Rent Your Dream Car Today</h2>
        <p className="mb-6 text-lg">Affordable. Reliable. Convenient.</p>
        <button className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-100">
          Book Now
        </button>
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
