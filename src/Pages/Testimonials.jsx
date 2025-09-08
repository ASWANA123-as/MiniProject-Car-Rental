function Testimonials({state}) {
  const feedback = [
    {
      name: "Amit Sharma",
      review:
        "Booking was super easy and the car was in excellent condition. I’ll definitely rent again!",
      location: "Delhi",
    },
    {
      name: "Sarah Khan",
      review:
        "Loved the service! Affordable pricing and quick pickup process. Highly recommended.",
      location: "Mumbai",
    },
    {
      name: "Ravi Patel",
      review:
        "Great variety of cars and very professional support team. My family trip was amazing.",
      location: "Bangalore",
    },
  ];

  return (
    <section className={!state?"py-16 bg-white text-gray-900":"py-16 bg-black text-gray-900"}>
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className={state?"text-3xl font-bold mb-10 text-white":"text-3xl font-bold mb-10 text-grey"}>🌟 What Our Customers Say</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {feedback.map((item, index) => (
            <div
              key={index}
              className="bg-gray-50 shadow-md rounded-lg p-6 hover:shadow-lg transition"
            >
              <p className="text-gray-700 italic mb-4">“{item.review}”</p>
              <h4 className="font-semibold text-yellow-600">{item.name}</h4>
              <p className="text-sm text-gray-500">{item.location}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
