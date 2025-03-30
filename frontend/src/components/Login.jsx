import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import loginImage from "../assets/image.jpg"; // Correctly import image
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!regex.test(password)) {
      setPasswordError(
        "Password must be at least 8 characters long, include an uppercase letter, a number, and a special character."
      );
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleEmailChange = (e) => {
    setEmailId(e.target.value);
    setEmailError(validateEmail(e.target.value) ? "" : "Invalid email format.");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    validatePassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(emailId)) {
      setEmailError("Invalid email format.");
      return;
    }

    if (!validatePassword(password)) {
      return;
    }

    try {
      const res = await axios.post("http://localhost:3000/auth/login", {
        emailId, 
        password
      });

      localStorage.setItem("token", res.data.token);

      toast.success("Login successful!", {
        position: "top-right",
        autoClose: 3000,
      });

      setTimeout(() => {
        navigate("/dashboard");
      }, 3000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed!", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="flex h-screen relative">
      {/* FlowTask Logo (Top Right) */}
      <div className="absolute top-4 right-6 text-xl font-bold text-black-600">
        app name here
      </div>

      {/* Left Side - Image */}
      <div className="w-1/2 hidden lg:flex items-center justify-center bg-gray-100">
        <img src={loginImage} alt="Login" className="rounded-lg shadow-lg" />
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-6">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold text-center mb-6">Login</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input 
              type="email"
              placeholder="Email ID"
              value={emailId}
              onChange={handleEmailChange}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
              required
            />
            {emailError && <p className="text-red-500 text-sm">{emailError}</p>}

            <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              required
              className="w-full px-4 py-2 border rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            </div>
            {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              Login
            </button>
          </form>

          {/* Signup Redirect Button */}
          <p className="text-center text-gray-600 mt-4">
            Not signed up?
            <Link to="/signup" className="text-blue-600 hover:underline ml-1">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
