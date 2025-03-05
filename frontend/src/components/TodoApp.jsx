import React, { useState, useEffect } from "react";

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  // Fetch todos from backend
  const fetchTodos = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/todos");
      if (!response.ok) throw new Error("Failed to fetch todos");
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  // Add a new todo
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return; // Prevent empty todos
    try {
      const response = await fetch("http://localhost:5000/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });
      if (!response.ok) throw new Error("Failed to add todo");
      setTitle(""); // Clear input
      fetchTodos(); // Refresh the list
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  // Delete a todo
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/todos/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete todo");
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div>
      <h2>Todo App</h2>
      
      {/* Todo Form */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new task"
        />
        <button type="submit">Add</button>
      </form>

      {/* Todo List */}
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            {todo.title}
            <button onClick={() => handleDelete(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
