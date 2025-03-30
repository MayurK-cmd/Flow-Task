import { Link, Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Tasks from "../pages/Tasks";
import Category from "../pages/Category";

const MainPage = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    // Fetch user info (Replace with actual API call)
    const user = { firstName: "John" }; // Replace with actual data
    setFirstName(user.firstName);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/"); // Redirect to login page
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Navbar (Full Width) */}
      <div className="bg-white text-black py-4 px-6 flex justify-between items-center shadow-md w-full">
        <h1 className="text-2xl font-bold">FlowTask</h1>
        <div className="flex items-center gap-4">
          <span className="text-lg font-semibold hidden sm:block">{firstName}</span>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
          >
            Logout
          </button>
          {/* Hamburger Menu */}
          <button className="sm:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Main Content with Sidebar */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className={`fixed inset-y-0 left-0 bg-white shadow-md p-6 w-64 transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} sm:relative sm:translate-x-0 transition-transform duration-300 ease-in-out z-50`}>
          <nav className="space-y-4">
            <Link to="/home" className="block py-2 px-4 rounded-md hover:bg-gray-200">
              Dashboard
            </Link>
            <Link to="/home/tasks" className="block py-2 px-4 rounded-md hover:bg-gray-200">
              Tasks
            </Link>
            <Link to="/home/category" className="block py-2 px-4 rounded-md hover:bg-gray-200">
              Category
            </Link>
          </nav>
        </div>

        {/* Page Content */}
        <div className="flex-1 flex items-center justify-center p-6 sm:ml-64">
          <Routes>
            <Route path="/home" element={<h2 className="text-3xl font-semibold">Welcome to FlowTask</h2>} />
            <Route path="/home/tasks" element={<Tasks />} />
            <Route path="/home/category" element={<Category />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default MainPage;