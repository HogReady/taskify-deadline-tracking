import React, { useState } from "react";

function EditForm({ initialTask, onSubmit, onCancel, categories }) {
    const [task, setTask] = useState(initialTask || {}); // Use initialTask or empty object


  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(task);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title:</label>
      <input
        type="text"
        id="title"
        name="title"
        value={task.title}
        onChange={handleChange}
      />
      <label htmlFor="description">Description:</label>
      <textarea
        id="description"
        name="description"
        value={task.description}
        onChange={handleChange}
      />
      <label htmlFor="deadline">Deadline Date and Time:</label>
      <input
        type="datetime-local"
        id="deadline"
        name="deadline"
        value={task.deadline}
        onChange={handleChange}
      />
      <label htmlFor="priority">Priority:</label>
      <select
        id="priority"
        name="priority"
        value={task.priority}
        onChange={handleChange}
      >
        <option value="no-priority">No Priority</option>
        <option value="low-priority">Low Priority</option>
        <option value="medium-priority">Medium Priority</option>
        <option value="high-priority">High Priority</option>
      </select>
      <label>Category:</label>
      <div>
        {categories.map((category) => (
          <label key={category}>
            <input
              type="radio"
              name="category"
              value={category}
              checked={task.category === category}
              onChange={handleChange}
            />
            {category}
          </label>
        ))}
      </div>
      <button type="submit">Save Changes</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
}

export default EditForm;
