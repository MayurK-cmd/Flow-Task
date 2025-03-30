import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const navigate = useNavigate();

  // Validation functions
  const validateName = (name) => /^[A-Za-z]+$/.test(name);
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  
  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!regex.test(password)) {
      setPasswordError("Password must be at least 8 characters long, include an uppercase letter, a number, and a special character.");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
    setFirstNameError(validateName(e.target.value) ? "" : "First name should contain only letters.");
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
    setLastNameError(validateName(e.target.value) ? "" : "Last name should contain only letters.");
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
    if (!validatePassword(password) || firstNameError || lastNameError || emailError) {
      return;
    }

    try {
      const res = await axios.post("http://localhost:3000/auth/signup", { 
        firstName, lastName, emailId, password 
      });

      localStorage.setItem("token", res.data.token);

      toast.success("Signup successful!", {
        position: "top-right",
        autoClose: 3000,
      });

      setTimeout(() => {
        navigate("/dashboard");
      }, 3000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed!", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-gray-900 text-center">Sign Up</h2>
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={handleFirstNameChange}
            required
            className="w-full px-4 py-2 border rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500"
          />
          {firstNameError && <p className="text-red-500 text-sm">{firstNameError}</p>}

          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={handleLastNameChange}
            required
            className="w-full px-4 py-2 border rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500"
          />
          {lastNameError && <p className="text-red-500 text-sm">{lastNameError}</p>}

          <input
            type="email"
            placeholder="Email ID"
            value={emailId}
            onChange={handleEmailChange}
            required
            className="w-full px-4 py-2 border rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500"
          />
          {emailError && <p className="text-red-500 text-sm">{emailError}</p>}

          <div className="relative">
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
            className={`w-full py-2 font-semibold rounded-lg transition duration-300 ${
              firstNameError || lastNameError || emailError || passwordError
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
            disabled={!!(firstNameError || lastNameError || emailError || passwordError)}
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Already signed up?
          {/* <Link to="/" className="text-blue-600 hover:underline ml-1">
            Login
          </Link> */}
        </p>
      </div>

      <ToastContainer />
    </div>
  );
};


export default Signup;
