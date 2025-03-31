import React, { useState } from "react";

const TaskModal = ({ isOpen, onClose, task, onUpdate }) => {
  const [editedTask, setEditedTask] = useState(task);

  if (!isOpen || !task) return null;

  const handleChange = (e) => {
    setEditedTask({ ...editedTask, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    onUpdate(editedTask);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-40 bg-opacity-30 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-md shadow-md w-96">
        <h2 className="text-xl font-semibold mb-4">Edit Task</h2>
        <label className="block mb-2">Title</label>
        <input
          type="text"
          name="title"
          value={editedTask.title}
          onChange={handleChange}
          className="w-full p-2 border rounded-md mb-4"
        />

        <label className="block mb-2">Description</label>
        <textarea
          name="description"
          value={editedTask.description}
          onChange={handleChange}
          className="w-full p-2 border rounded-md mb-4"
        ></textarea>

        <label className="block mb-2">Category</label>
        <input
          type="text"
          name="category"
          value={editedTask.category}
          onChange={handleChange}
          className="w-full p-2 border rounded-md mb-4"
        />

        <div className="flex justify-end space-x-4">
          
          <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 rounded-md">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
