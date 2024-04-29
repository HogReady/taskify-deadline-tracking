import React, { useState, useEffect } from "react";


// Declaring TaskList component
function TaskList({
  tasks,
  status,
  onTaskChange,
  buttonText,
  handleTimeChange,
  handleMarkAsDone,
  handleMarkAsUndone, // Add new prop to handle marking tasks as undone
  handleRemoveTask, // New prop for removing
}) {
  const [selectedPriority, setSelectedPriority] = useState("all"); // State to store selected priority
  const [selectedCategory, setSelectedCategory] = useState("all"); // State to store selected category
  const [allCategories, setAllCategories] = useState([]); // State to store all unique categories



  useEffect(() => {
    // Extracting all unique categories from tasks
    const categories = [...new Set(tasks.map((task) => task.category))];
    // Setting all categories including the "all" option
    setAllCategories(["all", ...categories]);
  }, [tasks]);

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

  // Filter and sort tasks based on status, selected priority, and deadline
  const filteredTasks = tasks
    .filter((task) => {
      if (selectedPriority === "all") {
        return task.status === status;
      } else {
        return task.status === status && task.priority === selectedPriority;
      }
    })
    .filter((task) => {
      if (selectedCategory === "all") {
        return true;
      } else {
        return task.category === selectedCategory;
      }
    })
    .sort((taskA, taskB) => {
      // Sort by priority: high > medium > low > no priority
      const priorityOrder = {
        "high-priority": 1,
        "medium-priority": 2,
        "low-priority": 3,
        "no-priority": 4,
      };
      const priorityComparison =
        priorityOrder[taskA.priority] - priorityOrder[taskB.priority];
      if (priorityComparison !== 0) {
        return priorityComparison;
      }
      // Sort by deadline within the same priority level
      return new Date(taskA.deadline) - new Date(taskB.deadline);
    });
    

  // Return JSX representing the TaskList component UI
  return (
    // Container for task list
    <div className="task-list">
      <h2>
        {status === "pending"
          ? "Pending Tasks"
          : status === "missing"
          ? "Missing Tasks"
          : "Completed Tasks"}
      </h2>
      {/* Dropdown menu to filter by priority */}
      <select
        value={selectedPriority}
        onChange={(e) => setSelectedPriority(e.target.value)}
      >
        <option value="all">All Priority</option>
        <option value="high-priority">High Priority</option>
        <option value="medium-priority">Medium Priority</option>
        <option value="low-priority">Low Priority</option>
        <option value="no-priority">No Priority</option>
      </select>
      {/* Dropdown menu to filter by category */}
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        {allCategories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      <ul>
        {/* Map through filtered and sorted tasks */}
        {filteredTasks.map((task) => (
          <li key={task.id}>
            <br />
            <strong>Title: </strong> {task.title} <br />
            <strong>Description: </strong> {task.description} <br />
            <strong>Deadline: </strong> {task.deadline.toLocaleString()} <br />
            <strong style={{ color: getPriorityColor(task.priority) }}>
              Priority:{" "}
            </strong>{" "}
            <span style={{ color: getPriorityColor(task.priority) }}>
              {task.priority}
            </span>
            <br />
            <strong>Category: </strong> {task.category}
            <br />
            
            {/* Conditional rendering for button based on task status */}
            {status !== "completed" && (
              <button onClick={() => handleMarkAsDone(task.id)}>
                Mark as done
              </button>
            )}
            {/* Button to mark task as undone */}
            {status === "completed" && (
              <button onClick={() => handleMarkAsUndone(task.id)}>
                Mark as undone
              </button>
            )}
            <button onClick={() => handleRemoveTask(task.id)}>Remove</button>

            
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
