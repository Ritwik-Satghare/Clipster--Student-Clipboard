import React from "react";
import { Link, NavLink } from "react-router-dom";
import AboutModal from "./AboutModal";

const Navbar = ({ isAuth }) => {
  return (
    <nav className="bg-gray-800/90 text-white px-6 py-4 flex justify-between items-center shadow-xl rounded-xl mx-4 my-4 backdrop-blur-md">
      {/* Left side - Logo / Home */}
      <div>
        <Link className="text-2xl font-extrabold text-red-400" to="/">
          Clipster
        </Link>
      </div>

      {/* Right side - Links */}
      <div className="flex space-x-10">
        <NavLink
          to="/register"
          className={({ isActive }) =>
            `transition-transform duration-300 font-bold hover:scale-125 ${
              isActive ? "text-lime-500 scale-125" : "text-gray-200"
            }`
          }
        >
          Register
        </NavLink>

        <NavLink
          to="/login"
          className={({ isActive }) =>
            `transition-transform duration-300 font-bold hover:scale-125 ${
              isActive ? "text-lime-500 scale-125" : "text-gray-200"
            }`
          }
        >
          Login
        </NavLink>
      </div>
      <AboutModal />
    </nav>
  );
};

export default Navbar;
