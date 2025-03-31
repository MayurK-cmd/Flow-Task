import React, { useState } from "react";

const categories = ["Work", "Personal", "Urgent", "Low Priority", "Others"];

const TaskModal = ({ isOpen, onClose, task, onUpdate }) => {
  const [editedTask, setEditedTask] = useState(task);
  const [selectedCategories, setSelectedCategories] = useState(Array.isArray(task.category) ? task.category : []);
  const [showCategorySelection, setShowCategorySelection] = useState(false);

  if (!isOpen || !task) return null;

  const handleCategoryClick = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((cat) => cat !== category));
      setShowCategorySelection(true); // Show category selection when a category is removed
    }
  };

  const handleAddCategory = (category) => {
    if (selectedCategories.length < 2 && !selectedCategories.includes(category)) {
      setSelectedCategories([...selectedCategories, category]);
    }
    if (selectedCategories.length + 1 >= 2) {
      setShowCategorySelection(false);
    }
  };

  const handleSave = () => {
    onUpdate({ ...editedTask, category: selectedCategories });
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
          onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
          className="w-full p-2 border rounded-md mb-4"
        />

        <label className="block mb-2">Description</label>
        <textarea
          name="description"
          value={editedTask.description}
          onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
          className="w-full p-2 border rounded-md mb-4"
        ></textarea>

        <label className="block mb-2">Category</label>
        <div className="flex flex-wrap gap-2 mb-4">
          {selectedCategories.map((category) => (
            <button
              key={category}
              className="px-4 py-2 rounded-full bg-blue-500 text-white border"
              onClick={() => handleCategoryClick(category)}
            >
              {category} <span className="ml-2">×</span>
            </button>
          ))}
          {selectedCategories.length < 2 && (
            <button
              className="px-4 py-2 rounded-full bg-gray-200 text-black border"
              onClick={() => setShowCategorySelection(true)}
            >
              +
            </button>
          )}
        </div>

        {showCategorySelection && selectedCategories.length < 2 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {categories
              .filter((category) => !selectedCategories.includes(category))
              .map((category) => (
                <button
                  key={category}
                  className="px-4 py-2 rounded-full bg-gray-300 text-black border"
                  onClick={() => handleAddCategory(category)}
                >
                  {category}
                </button>
              ))}
          </div>
        )}

        <div className="flex justify-end space-x-4">
          <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 rounded-md" >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;