import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Navigation, Pagination } from "swiper/modules";


function HomePage(state) {
   const navigate = useNavigate();
   const [display, setCars] = useState([]);
const [search, setSearch] = useState("");

  const handleLoginClick = () => {
    navigate("/login"); // navigates to Login page
  };
const user = JSON.parse(localStorage.getItem("currentUser"));
  const handleRentNow = (car) => {
    

    if (!user) {
      // 🚨 Not logged in → redirect to login
      alert("Please login first to rent a car!");
      navigate("/login");
    } else if (user.role === "Customer") {
      // ✅ Logged in as customer → go to checkout in dashboard
      navigate("/customer", { state: { selectedCar: car } });
    } else {
      // 🚫 If admin tries booking
      alert("Admins cannot rent cars. Please login as a customer.");
    }
  };


  useEffect(() => {
    fetch("https://aswana123-as.github.io/Cars_1_API/Cars.json")
      .then(res => res.json())
    .then(featuredCars => {
      console.log(featuredCars,'featuredCars')
      // Load admin-added cars from localStorage
      const displayCars=featuredCars.filter((fcar)=>{
        return fcar.featuredCar==true;
      })
      console.log(displayCars,'displayCars');
      setCars([displayCars]);
    })
      .catch((err) => console.error("Error fetching cars:", err));
  }, []);


  return (
    <>
     
  

      
     <section className="p-6 flex-1">
  <h3 className={state?"text-2xl font-bold mb-6 text-white-800 dark:text-gray-200":"text-2xl font-bold mb-6 text-black-800 dark:text-gray-200"}>🚗 Featured Cars</h3>

  {display[0]?.length > 0 ? (
    <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={20}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      breakpoints={{
        640: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }}
      className="py-4"
    >
      {display[0].map((car) => (
        <SwiperSlide key={car.id}>
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden hover:scale-105 transform transition-all duration-300">
            <img
              src={car.image}
              alt={car.name}
              className="h-48 w-full object-cover"
            />
            <div className="p-4">
              <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-200">{car.name}</h4>
              <p className="text-gray-600 dark:text-gray-300 font-medium">
                ₹{car.pricePerDay.toLocaleString()} / day
              </p>
             {user?.role=='Customer'&&(<button 
                onClick={() => handleRentNow(car)}
                className="mt-4 w-full bg-yellow-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
              >
                Rent Now
              </button>)} 
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  ) : (
    <p className="text-gray-500 dark:text-gray-300">No featured cars available at the moment.</p>
  )}
</section>


      
     
      </>
    
  );
}

export default HomePage
