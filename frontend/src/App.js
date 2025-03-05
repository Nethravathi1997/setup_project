import React, { useState } from "react";
import TodoApp from "./components/TodoApp";

const App = () => {
  const [todos, setTodos] = useState([]);

  return (
    <div>
      <h1>TODO App</h1>
      <TodoApp/>
    </div>
  );
};

export default App;
