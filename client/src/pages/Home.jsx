import { Outlet, useNavigate, useLocation } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="p-6">
      <div className="flex justify-center space-x-12 mb-8">
        <button
          onClick={() => navigate("/share")}
          className={`px-10 py-3 rounded-2xl font-bold text-lg shadow-md transition-all duration-300 ${
            location.pathname === "/share"
              ? "bg-lime-500 text-white scale-105"
              : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
          }`}
        >
          Share
        </button>

        <button
          onClick={() => navigate("/retrieve")}
          className={`px-10 py-3 rounded-2xl font-bold text-lg shadow-md transition-all duration-300 ${
            location.pathname === "/retrieve"
              ? "bg-lime-500 text-white scale-105"
              : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
          }`}
        >
          Retrieve
        </button>
      </div>
      <Outlet />
    </div>
  );
}
