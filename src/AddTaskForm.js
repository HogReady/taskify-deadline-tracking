import React, { useState } from "react";
import "./AddTaskForm.css"; // Import CSS file for styling

function AddTaskForm({ onAddTask, handleEditTask, onTaskChange }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadlineDateTime, setDeadlineDateTime] = useState(""); // Combined date and time

  const [priority, setPriority] = useState("no-priority");
  const [category, setCategory] = useState("");
  const [customCategory, setCustomCategory] = useState("");
  const [categories, setCategories] = useState([
    "🌲Outdoor",
    "🚴‍♂️Fitness",
    "📖Academics",
    "👌Personal",
    "🍰Birthdays",
  ]);

  // Array to store tasks
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const deadline = new Date(deadlineDateTime);
    onAddTask({ title, description, deadline, priority, category });
    setTitle("");
    setDescription("");
    setDeadlineDateTime("");
    setPriority("no-priority");
    setCategory("");
  };

  const handleCustomCategoryChange = (e) => {
    setCustomCategory(e.target.value);
  };

  const handleAddCustomCategory = () => {
    if (customCategory.trim() !== "" && !categories.includes(customCategory)) {
      setCategories([...categories, customCategory]);
      setCategory(customCategory);
      setCustomCategory("");
    }
  };

  const handleRemoveCategory = (categoryToRemove) => {
    setCategories(
      categories.filter((category) => category !== categoryToRemove)
    );
    if (category === categoryToRemove) {
      setCategory("");
    }
  };

  // Function to get color based on priority
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high-priority":
        return "red";
      case "medium-priority":
        return "orange";
      case "low-priority":
        return "green";
      case "no-priority":
        return "gray";
      default:
        return "gray";
    }
  };

  const markTaskAsDone = (task) => {
    task.completed = true;
    setCompletedTasks([...completedTasks, task]);
    setTasks(tasks.filter((t) => t !== task));
  };

  const markTaskAsUndone = (task) => {
    task.completed = false;
    setTasks([...tasks, task]);
    setCompletedTasks(completedTasks.filter((t) => t !== task));
  };

  const handleRemoveTask = (task) => {
    if (!task.completed) {
      setTasks(tasks.filter((t) => t !== task));
    } else {
      setCompletedTasks(completedTasks.filter((t) => t !== task));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title:</label>
      <input
        type="text"
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <label htmlFor="description">Description:</label>
      <textarea
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <label htmlFor="deadline">Deadline Date and Time:</label>
      <input
        type="datetime-local"
        id="deadline"
        value={deadlineDateTime}
        onChange={(e) => setDeadlineDateTime(e.target.value)}
        required
      />
      <fieldset>
        <legend>Priority:</legend>
        <div className="radio-group">
          {/* Priority radio buttons */}
          <label>
            <input
              type="radio"
              value="no-priority"
              checked={priority === "no-priority"}
              onChange={(e) => setPriority(e.target.value)}
            />
            <span style={{ color: getPriorityColor("no-priority") }}>
              No Priority
            </span>
          </label>
          <label>
            <input
              type="radio"
              value="low-priority"
              checked={priority === "low-priority"}
              onChange={(e) => setPriority(e.target.value)}
            />
            <span style={{ color: getPriorityColor("low-priority") }}>
              Low Priority
            </span>
          </label>
          <label>
            <input
              type="radio"
              value="medium-priority"
              checked={priority === "medium-priority"}
              onChange={(e) => setPriority(e.target.value)}
            />
            <span style={{ color: getPriorityColor("medium-priority") }}>
              Medium Priority
            </span>
          </label>
          <label>
            <input
              type="radio"
              value="high-priority"
              checked={priority === "high-priority"}
              onChange={(e) => setPriority(e.target.value)}
            />
            <span style={{ color: getPriorityColor("high-priority") }}>
              High Priority
            </span>
          </label>
        </div>
      </fieldset>
      <fieldset>
        <legend>Category:</legend>
        <div className="radio-group">
          {/* Category radio buttons */}
          {categories.map((cat) => (
            <label key={cat}>
              <input
                type="radio"
                value={cat}
                checked={category === cat}
                onChange={() => setCategory(cat)}
              />
              {cat}
            </label>
          ))}
          <label>
            <input
              type="radio"
              value="Custom"
              checked={category === "Custom"}
              onChange={() => setCategory("Custom")}
            />
            Custom
          </label>
        </div>
        {/* Dropdown for custom category */}
        {category === "Custom" && (
          <div>
            <input
              type="text"
              value={customCategory}
              onChange={handleCustomCategoryChange}
              placeholder="Enter custom category"
            />
            <button type="button" onClick={handleAddCustomCategory}>
              Add Custom Category
            </button>
          </div>
        )}
      </fieldset>
      {/* Button to remove selected category */}
      {category !== "" && category !== "Custom" && (
        <button type="button" onClick={() => handleRemoveCategory(category)}>
          Remove Selected Category
        </button>
      )}
      <button type="submit">Add Task</button>
      <div>
        <form onSubmit={handleSubmit}>{/* Your form code here */}</form>
        {/* Display tasks */}
        <div>
          {tasks.map((task, index) => (
            <div key={index}>
              <p>{task.title}</p>
              {/* Button to mark task as done */}
              <button onClick={() => markTaskAsDone(task)}>Mark as Done</button>
              {/* Button to remove task */}
              <button onClick={() => handleRemoveTask(task)}>Remove</button>
            </div>
          ))}
        </div>
        {/* Display completed tasks */}
        <div>
          {completedTasks.map((task, index) => (
            <div key={index}>
              <p>{task.title}</p>
              {/* Button to mark task as undone */}
              <button onClick={() => markTaskAsUndone(task)}>
                Mark as Undone
              </button>
              {/* Button to remove task */}
              <button onClick={() => handleRemoveTask(task)}>Remove</button>
            </div>
          ))}
        </div>
      </div>
    </form>
  );
}

export default AddTaskForm;
