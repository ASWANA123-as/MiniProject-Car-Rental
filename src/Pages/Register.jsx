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
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-96">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} className="w-full p-2 mb-3 border rounded" />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} className="w-full p-2 mb-3 border rounded" />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} className="w-full p-2 mb-3 border rounded" />
        <select name="role" value={form.role} onChange={handleChange} className="w-full p-2 mb-3 border rounded">
          <option value="Customer">Customer</option>
          <option value="Admin">Admin</option>
        </select>
        <button className="w-full bg-green-500 text-white p-2 rounded">Register</button>
      </form>
    </div>
  );
}
