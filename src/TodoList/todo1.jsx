import React, { useState } from "react";

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [completed, setCompleted] = useState([]);

  const handleAddTodo = () => {
    if (newTodo !== "") {
      setTodos([...todos, newTodo]);
      setCompleted([...completed, false]);
      setNewTodo("");
    }
  };

  const handleDeleteTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);

    const newCompleted = [...completed];
    newCompleted.splice(index, 1);
    setCompleted(newCompleted);
  };

  const handleToggleCompleted = (index) => {
    const newCompleted = [...completed];
    newCompleted[index] = !newCompleted[index];
    setCompleted(newCompleted);
  };

  return (
    <div class="m-5">
      <input
        type="text"
        placeholder="Enter todo"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button
        class="btn btn-warning mx-1 p-0 px-1 mb-1"
        onClick={handleAddTodo}
      >
        Add
      </button>
      <br />
      <br />
      <ul style={{ listStyleType: "none" }}>
        {todos.map((todo, index) => (
          <li
            key={index}
            onClick={() => handleToggleCompleted(index)}
            style={{
              textDecoration: completed[index] ? "line-through" : "none",
            }}
          >
            {todo}{" "}
            <button
              class="mx-1 mb-1 px-1 p-0 btn btn-secondary"
              onClick={() => handleDeleteTodo(index)}
            >
              Del
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;
