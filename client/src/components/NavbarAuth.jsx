import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const NavbarAuth = ({ setIsAuth }) => {
  const navigate = useNavigate();

  const logout = () => {
    setIsAuth(false);
    localStorage.removeItem("isAuth"); // clear frontend auth
    document.cookie = "token=; Max-Age=0; path=/"; // clear cookie
    toast.success("Logged out successfully!"); 
  };

  return (
    <nav className="bg-gray-800/90 text-white px-6 py-4 flex justify-between items-center shadow-xl rounded-xl mx-4 my-4 backdrop-blur-md">
      {/* Left side - Logo / Home */}
      <div
        className="cursor-pointer text-2xl font-extrabold text-red-400"
        onClick={() => navigate("/")}
      >
        Clipster
      </div>

      {/* Right side - Logout */}
      <div className="flex space-x-10">
        <NavLink
          onClick={logout}
          to="/login"
          className="transition-transform duration-300 font-bold hover:scale-125 hover:text-red-800 text-gray-200"
        >
          Logout
        </NavLink>
      </div>
    </nav>
  );
};

export default NavbarAuth;
