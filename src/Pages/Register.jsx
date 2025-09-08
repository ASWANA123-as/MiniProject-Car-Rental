import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "Customer" });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(form);
    navigate("/login");
  };

  return (
    <div
      className="h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: `url('https://wallpapercave.com/wp/wp2707526.jpg')`,
      }}
    >
      <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg w-[90%] max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">🚗 Register</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={handleChange}
            className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="Customer">Customer</option>
            <option value="Admin">Admin</option>
          </select>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded font-semibold transition"
          >
            Create Account
          </button>
        </form>

        <p className="text-center text-gray-700 text-sm mt-4">
          Already have an account?{" "}
          <span
            className="text-blue-600 hover:underline cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login here
          </span>
        </p>
      </div>
    </div>
  );
}
