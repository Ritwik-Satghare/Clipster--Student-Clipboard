import Navbar from "./components/Navbar.jsx";
import NavbarAuth from "./components/NavbarAuth.jsx";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import SharePage from "./pages/SharePage.jsx";
import RetrievePage from "./pages/RetrievePage.jsx";

// Axios global defaults

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

function App() {
  const [isAuth, setIsAuth] = useState(() => {
    return document.cookie.includes("token=");
  });
  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />
      {isAuth ? <NavbarAuth setIsAuth={setIsAuth} /> : <Navbar />}
      <div className="Body">
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          >
            {/* Default redirect to /share */}
            <Route index element={<Navigate to="/share" replace />} />
            <Route path="/share" element={<SharePage />} />
            <Route path="/retrieve" element={<RetrievePage />} />
          </Route>
          <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
