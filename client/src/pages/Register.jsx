import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const registerUser = async (e) => {
    e.preventDefault();
    const { name, email, password } = data;
    try {
      const response = await axios.post("/register", { name, email, password });
      if (response.data.success) {
        toast.success(response.data.success);
        setData({ name: "", email: "", password: "" });
        navigate("/login");
      }
    } catch (error) {
      if (error.response?.data?.error) {
        toast.error(error.response.data.error);
      }
      console.log(`there was an error: ${error}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 pb-40">
      <form
        onSubmit={registerUser}
        className="dark:bg-gray-800 p-8 rounded-3xl shadow-2xl w-full max-w-md space-y-6 transform transition-all duration-300 hover:scale-105"
      >
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white text-center">
          Register
        </h2>

        <input
          type="text"
          placeholder="Enter Name..."
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
          required
          className="w-full p-4 rounded-xl border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 outline-none transition-all duration-300 text-white"
        />

        <input
          type="email"
          placeholder="Enter Email..."
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
          required
          className="w-full p-4 rounded-xl border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 outline-none transition-all duration-300 text-white"
        />

        <input
          type="password"
          placeholder="Enter Password..."
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
          required
          className="w-full p-4 rounded-xl border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 outline-none transition-all duration-300 text-white"
        />

        <button
          type="submit"
          className="w-40 block mx-auto py-4 bg-lime-500 hover:bg-lime-600 active:scale-95 rounded-xl text-white font-bold text-lg shadow-md transform transition-all duration-200"
        >
          Register
        </button>

        <p className="text-center text-gray-500 dark:text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-500 hover:underline cursor-pointer"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
