import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";

export default function Login({theme}) {

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = loginUser(form.email, form.password);
    if (!user) return setError("Invalid credentials");
    localStorage.setItem("currentUser", JSON.stringify(user));

    if (user.role === "Admin") navigate("/admin");
    else navigate("/customer");
  };

  return (
    <div
      className="flex justify-center items-center h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://wallpaperaccess.com/full/1354675.jpg')",
      }}
    >
      <div className="bg-white bg-opacity-90 backdrop-blur-md p-8 rounded-xl shadow-lg w-[90%] max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">🚗 Login to Wheelio</h2>
        {error && <p className="text-red-500 mb-4 text-sm text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded transition duration-300"
          >
            Login
          </button>
        </form>
        <p className="text-center text-gray-600 text-sm mt-4">
  Don't have an account?{" "}
  <span
    className="text-blue-500 underline cursor-pointer"
    onClick={() => navigate("/register")}
  >
    Register
  </span>
</p>

      </div>
    </div>
  );
}
