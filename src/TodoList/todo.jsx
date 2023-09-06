import React, { useState, useEffect } from "react";
import axios from "axios";
import "./todo.css";
import { MdDelete } from "react-icons/md";
import { GrEdit } from "react-icons/gr";
import Category from "./category";
function Todo() {
  const [item, setItem] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/todo")
      .then((res) => {
        setItem(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [item]);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3001/todo/${id}`)
      .then((res) => {
        const updatedItems = item.filter((item) => item.id !== id);
        setItem(updatedItems);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleUpdate = (id, updatedTodoName) => {
    axios
      .put(`http://localhost:3001/todo/${id}`, {
        Todo_name: updatedTodoName,
      })
      .then((res) => {
        const updatedItems = item.map((item) =>
          item.id === id ? { ...item, Todo_name: updatedTodoName } : item
        );
        setItem(updatedItems);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      <div class="d-flex">
        {item.map((data) => (
          <div class="card m-2 w-3 ">
            <div class="card-body">
              <h5 class="card-title">
                <b>Task:</b> {data.Todo_name}
              </h5>
              <h6 class="card-text">Category:{data.Category}</h6>
              <a href="#" class="card-link">
                <MdDelete size={30} onClick={() => handleDelete(data.id)} />
              </a>
              <a href="#" class="ml-5">
                <GrEdit
                  size={20}
                  onClick={() => {
                    const updatedTodoName = prompt(
                      "Please enter the updated task name",
                      data.Todo_name
                    );
                    if (updatedTodoName !== null) {
                      handleUpdate(data.id, updatedTodoName);
                    }
                  }}
                />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Todo;
