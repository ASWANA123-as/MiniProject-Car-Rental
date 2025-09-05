function About({ state }) {
  return (
    <section
      className={
        state
          ? "bg-gray-900 text-white "
          : "bg-gray-100 text-gray-900 "
      }
    >
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-6">🚗 About Us</h2>
        <p
          className={`text-lg leading-relaxed mb-6 ${
            state ? "text-gray-300" : "text-gray-700"
          }`}
        >
          At <span className="font-semibold text-blue-600">CarRental</span>, we make renting cars
          simple, fast, and affordable. Whether you’re looking for a luxury
          sedan, a family SUV, or a budget-friendly hatchback, we’ve got the
          perfect ride for every occasion. With 24/7 customer support and
          locations across the country, your journey is always in safe hands.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div
            className={`shadow-md p-6 rounded-lg ${
              state ? "bg-gray-800 text-white" : "bg-white text-gray-800"
            }`}
          >
            <h3 className="text-xl font-semibold text-blue-600 mb-2">
              Wide Selection
            </h3>
            <p>
              Choose from economy cars, luxury vehicles, SUVs, and more.
            </p>
          </div>

          <div
            className={`shadow-md p-6 rounded-lg ${
              state ? "bg-gray-800 text-white" : "bg-white text-gray-800"
            }`}
          >
            <h3 className="text-xl font-semibold text-blue-600 mb-2">
              Affordable Pricing
            </h3>
            <p>
              Competitive rates with no hidden charges—what you see is what you pay.
            </p>
          </div>

          <div
            className={`shadow-md p-6 rounded-lg ${
              state ? "bg-gray-800 text-white" : "bg-white text-gray-800"
            }`}
          >
            <h3 className="text-xl font-semibold text-blue-600 mb-2">
              Trusted Service
            </h3>
            <p>
              Thousands of happy customers trust us with their journeys every year.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
