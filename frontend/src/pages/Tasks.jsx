import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const Tasks = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    category: "",
  });
  const [firstName, setFirstName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  useEffect(() => {
    const user = { firstName: "John" };
    setFirstName(user.firstName);

    setTasks([
      { id: 1, title: "Task 1", completed: false, category: "Work" },
      { id: 2, title: "Task 2", completed: true, category: "Personal" },
    ]);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const categories = ["Work", "Personal", "Health", "Finance"];
  const statuses = ["Incomplete", "Complete"];

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewTask({ title: "", description: "", category: "" });
  };

  const handleOpenSearchModal = () => setIsSearchModalOpen(true);
  const handleCloseSearchModal = () => setIsSearchModalOpen(false);

  const handleChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const handleAddTask = () => {
    if (newTask.title && newTask.category) {
      setTasks([...tasks, { id: tasks.length + 1, ...newTask, completed: false }]);
      handleCloseModal();
    } else {
      alert("Title and category are required.");
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="bg-white text-black py-4 px-6 flex justify-between items-center shadow-md w-full">
        <h1 className="text-2xl font-bold">FlowTask</h1>
        <div className="flex items-center">
          <span className="text-lg font-semibold mr-4">{firstName}</span>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="flex flex-1">
        <div className="w-1/4 bg-white text-black p-6 border-r shadow-md">
          <nav className="space-y-4">
            <Link to="/home" className="block py-2 px-4 rounded-md hover:bg-gray-200">Dashboard</Link>
            <Link to="/home/tasks" className="block py-2 px-4 rounded-md hover:bg-gray-200">Tasks</Link>
            <Link to="/home/category" className="block py-2 px-4 rounded-md hover:bg-gray-200">Category</Link>
          </nav>
        </div>

        <div className="flex-1 p-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex space-x-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="p-2 border rounded-md"
              >
                <option value="">All Categories</option>
                {categories.map((cat, index) => (
                  <option key={index} value={cat}>{cat}</option>
                ))}
              </select>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="p-2 border rounded-md"
              >
                <option value="">All Status</option>
                {statuses.map((status, index) => (
                  <option key={index} value={status}>{status}</option>
                ))}
              </select>
              <button onClick={handleOpenSearchModal} className="p-2 border rounded-md">
                <FaSearch size={20} />
              </button>
            </div>
            <button onClick={handleOpenModal} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              + Add Task
            </button>
          </div>

          <ul className="space-y-3">
            {tasks.map((task) => (
              <li key={task.id} className="p-4 border rounded-md shadow-sm">
                <span className={task.completed ? "line-through text-gray-500" : ""}>
                  {task.title} ({task.category})
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {isModalOpen && (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-40 bg-opacity-30 backdrop-blur-sm">
    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
      <h3 className="text-2xl font-semibold mb-4">Add New Task</h3>
      <input
        type="text"
        name="title"
        value={newTask.title}
        onChange={handleChange}
        placeholder="Task Title"
        className="w-full p-2 border rounded-md mb-3"
      />
      <textarea
        name="description"
        value={newTask.description}
        onChange={handleChange}
        placeholder="Task Description (Optional)"
        className="w-full p-2 border rounded-md mb-3"
      ></textarea>
      <select
        name="category"
        value={newTask.category}
        onChange={handleChange}
        className="w-full p-2 border rounded-md mb-3"
      >
        <option value="">Select a Category</option>
        {categories.map((cat, index) => (
          <option key={index} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      <div className="flex justify-end space-x-3">
        <button
          onClick={handleCloseModal}
          className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
        >
          Cancel
        </button>
        <button
          onClick={handleAddTask}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
        >
          Add Task
        </button>
      </div>
    </div>
  </div>
)}




      {isSearchModalOpen && (
        <div className="absolute top-16 right-10 bg-white p-4 rounded-lg shadow-lg w-72">
          <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search Task" className="w-full p-2 border rounded-md" />
          <button onClick={handleCloseSearchModal} className="mt-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 w-full">Close</button>
        </div>
      )}
    </div>
  );
};

export default Tasks;
