import React, { useEffect, useState } from "react";
import { getTasks, createTask } from "../services/taskService";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      alert("Failed to fetch tasks");
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();

    try {
      const newTask = await createTask({ title });

      setTasks([newTask, ...tasks]); // update UI instantly
      setTitle(""); // clear input

    } catch (error) {
      alert("Failed to create task");
    }
  };

  return (
    <div>
      <h2>Dashboard</h2>

      {/* Create Task Form */}
      <form onSubmit={handleCreateTask}>
        <input
          type="text"
          placeholder="Enter task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit">Add Task</button>
      </form>

      {/* Task List */}
      {tasks.length === 0 ? (
        <p>No tasks found</p>
      ) : (
        tasks.map((task) => (
          <div key={task._id}>
            <h4>{task.title}</h4>
            <p>Status: {task.status}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Dashboard;