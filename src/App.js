import React, { useState } from "react";
import TaskList from "./TaskList";
import AddTaskForm from "./AddTaskForm";
import "./App.css";
import moment from "moment";

function generateId() {
  const possibleChars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let chars = "";
  for (let i = 0; i < 10; i++) {
    chars += possibleChars.charAt(
      Math.floor(Math.random() * possibleChars.length)
    );
  }
  return chars;
}

function TaskManager() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Task 1",
      description: "Tatae",
      status: "pending",
      deadline: new Date(2023, 5, 1),
    },
    {
      id: 2,
      title: "Task 2",
      description: "Tatae",
      status: "missing",
      deadline: new Date(2023, 8, 1),
    },
    {
      id: 3,
      title: "Task 3",
      description: "Tatae",
      status: "completed",
      deadline: new Date(2022, 12, 31),
    },
  ]);
  
  const handleMarkAsUndone = (taskId) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === taskId) {
          const now = new Date(); // Get current date
          if (task.deadline > now) {
            // If the deadline is in the future, set status to "pending"
            return { ...task, status: "pending" };
          } else {
            // If the deadline has already passed, set status to "missing"
            return { ...task, status: "missing" };
          }
        }
        return task;
      })
    );
  };

  const handleTimeChange = (taskId, hours, minutes) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === taskId) {
          const newDeadline = moment(task.deadline)
            .add(hours, "hours")
            .add(minutes, "minutes")
            .toDate();
          return { ...task, deadline: newDeadline };
        }
        return task;
      })
    );
  };

  const handleAddTask = (newTask) => {
    setTasks([...tasks, { ...newTask, id: generateId(), status: "pending" }]);
  };

  // Define handleMarkAsDone function to change task status to 'completed'
  const handleMarkAsDone = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, status: "completed" } : task
      )
    );
  };

  const handleRemoveTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  return (
    <div className="App">
      <h1>Task Manager</h1>
      <div className="tasks-section">
        <TaskList
          title="Pending Tasks"
          tasks={tasks}
          status="pending"
          handleTimeChange={handleTimeChange}
          handleMarkAsDone={handleMarkAsDone} // Pass handleMarkAsDone function as prop
          handleMarkAsUndone={handleMarkAsUndone}
          onTaskChange={(updatedTask) => {
            setTasks(
              tasks.map(
                (task) => (task.id === updatedTask.id ? updatedTask : task) // Update task if IDs match
              )
            );
          }}
          handleRemoveTask={handleRemoveTask}
        />
        <TaskList
          title="Missing Tasks"
          tasks={tasks}
          status="missing"
          handleTimeChange={handleTimeChange}
          handleMarkAsDone={handleMarkAsDone} // Pass handleMarkAsDone function as prop
          handleMarkAsUndone={handleMarkAsUndone}
          onTaskChange={(updatedTask) => {
            setTasks(
              tasks.map(
                (task) => (task.id === updatedTask.id ? updatedTask : task) // Update task if IDs match
              )
            );
          }}
          handleRemoveTask={handleRemoveTask}
        />
        <TaskList
          title="Completed Tasks"
          tasks={tasks}
          status="completed"
          handleMarkAsDone={handleMarkAsDone} // Pass handleMarkAsDone function as prop
          handleMarkAsUndone={handleMarkAsUndone}
          onTaskChange={(updatedTask) => {
            setTasks(
              tasks.map(
                (task) => (task.id === updatedTask.id ? updatedTask : task) // Update task if IDs match
              )
            );
          }}
          handleRemoveTask={handleRemoveTask}
        />
      </div>
      <AddTaskForm onAddTask={handleAddTask} />
    </div>
  );
}

export default TaskManager;
